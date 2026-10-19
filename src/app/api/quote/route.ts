import nodemailer from "nodemailer";
import { COMPANY } from "@/lib/company";

export const runtime = "nodejs";

type Quote = {
  company?: string;
  name?: string;
  phone?: string;
  email?: string;
  volume?: string;
  needs?: string[];
  message?: string;
  consent?: boolean;
  website?: string; // 스팸 방지용 숨은 칸 — 사람은 비워 둔다
};

const clean = (v: unknown, max = 200) => String(v ?? "").trim().slice(0, max);

/**
 * 견적 문의 서버 접수 — 회사 Zoho 메일(SMTP)로 담당자에게 바로 알림 메일을 보낸다.
 * 필요한 환경변수: ZOHO_SMTP_USER, ZOHO_SMTP_PASSWORD (선택: ZOHO_SMTP_HOST, ZOHO_SMTP_PORT, QUOTE_TO)
 * 설정이 없으면 503을 돌려주고, 화면은 메일 앱 방식으로 전환한다(접수 완료라고 표시하지 않음).
 */
export async function POST(req: Request) {
  let body: Quote;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  // 숨은 칸이 채워졌으면 봇 — 조용히 성공처럼 응답
  if (clean(body.website)) return Response.json({ ok: true });

  const q = {
    company: clean(body.company),
    name: clean(body.name),
    phone: clean(body.phone, 40),
    email: clean(body.email),
    volume: clean(body.volume),
    needs: Array.isArray(body.needs) ? body.needs.map((n) => clean(n, 60)).slice(0, 10) : [],
    message: clean(body.message, 1000),
  };
  const invalid =
    !q.company ||
    !q.name ||
    q.phone.replace(/\D/g, "").length < 9 ||
    (q.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email)) ||
    body.consent !== true;
  if (invalid) return Response.json({ ok: false, reason: "invalid" }, { status: 400 });

  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASSWORD;
  if (!user || !pass) return Response.json({ ok: false, reason: "not_configured" }, { status: 503 });

  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || "smtp.zoho.com",
    port: Number(process.env.ZOHO_SMTP_PORT || 465),
    secure: true,
    auth: { user, pass },
  });

  const text = [
    `회사명: ${q.company}`,
    `담당자: ${q.name}`,
    `연락처: ${q.phone}`,
    `이메일: ${q.email || "-"}`,
    `월 출고량: ${q.volume || "-"}`,
    `필요 서비스: ${q.needs.join(", ") || "-"}`,
    "개인정보 수집·이용 동의: 동의함",
    "",
    "[문의 내용]",
    q.message || "-",
    "",
    `접수 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
    "접수 경로: 홈페이지 견적 문의 폼",
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `로지트 홈페이지 <${user}>`,
      to: process.env.QUOTE_TO || COMPANY.email,
      replyTo: q.email || undefined,
      subject: `[홈페이지 견적 문의] ${q.company} · ${q.name}`,
      text,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }
}
