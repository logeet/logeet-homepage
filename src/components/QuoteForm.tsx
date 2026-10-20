"use client";

import { useRef, useState } from "react";
import { ArrowRight, ChevronDown, Copy, Mail, Phone } from "lucide-react";
import { COMPANY } from "@/lib/company";

const VOLUMES = ["월 1천 건 미만", "월 1천 ~ 5천 건", "월 5천 ~ 2만 건", "월 2만 건 이상", "잘 모르겠음"];
const NEEDS = ["풀필먼트 (보관 · 입출고)", "임시차 · 지입차 · 간선운송", "택배 (B2B · B2C)", "관리 시스템 · 물류비 리포트"];

type Field = "company" | "name" | "phone" | "email" | "consent";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error" | "opening" | "opened" | "copied" | "copy-failed";

// 입력 칸 공통 — 높이 48px, 같은 테두리·포커스 링
const field =
  "mt-2 block w-full rounded-sm border border-line-strong bg-white px-4 text-[15px] font-normal text-ink placeholder:text-sub/80 transition-[border-color,box-shadow] duration-150 hover:border-sub/60 focus:border-blue focus:ring-4 focus:ring-blue/15 focus:outline-none aria-[invalid=true]:border-orange";
const input = `${field} h-12`;
const labelCls = "text-[14px] font-semibold text-charcoal";
const optional = "font-medium text-sub";

/*
 * 접수 순서: /api/quote(회사 Zoho 메일로 담당자 알림) → 서버 메일 설정이 없으면(503)
 * 방문자의 메일 앱으로 넘긴다. 서버가 성공을 돌려줄 때만 '접수 완료'라고 안내한다.
 */
function compose(f: FormData) {
  const line = (k: string) => String(f.get(k) ?? "").trim() || "-";
  const body = [
    `회사명: ${line("company")}`,
    `담당자: ${line("name")}`,
    `연락처: ${line("phone")}`,
    `이메일: ${line("email")}`,
    `월 출고량: ${line("volume")}`,
    `필요 서비스: ${f.getAll("needs").join(", ") || "-"}`,
    `개인정보 수집·이용 동의: ${f.get("consent") ? "동의함" : "-"}`,
    "",
    "[문의 내용]",
    line("message"),
  ].join("\n");
  const subject = `[견적 문의] ${line("company")}`;
  return { subject, body, href: `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}

function validate(f: FormData): Errors {
  const v = (k: string) => String(f.get(k) ?? "").trim();
  const e: Errors = {};
  if (!v("company")) e.company = "회사명을 입력해 주세요.";
  if (!v("name")) e.name = "담당자명을 입력해 주세요.";
  if (!v("phone")) e.phone = "연락처를 입력해 주세요.";
  else if (v("phone").replace(/\D/g, "").length < 9) e.phone = "연락처를 숫자 9자리 이상으로 입력해 주세요.";
  if (v("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = "이메일 형식을 확인해 주세요.";
  if (!f.get("consent")) e.consent = "개인정보 수집·이용에 동의해 주세요.";
  return e;
}

function Err({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] font-semibold text-orange">
      {msg}
    </p>
  );
}

export function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const invalid = (k: Field) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-error` } : {});

  const openMail = (f: FormData) => {
    setStatus("opening");
    window.location.href = compose(f).href;
    setTimeout(() => setStatus("opened"), 900);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const errs = validate(f);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      setStatus("idle");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(f),
          needs: f.getAll("needs"),
          consent: Boolean(f.get("consent")),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reason?: string };
      if (res.ok && data.ok) {
        setStatus("sent");
        form.reset();
      } else if (data.reason === "not_configured") {
        openMail(f); // 서버 메일 미설정 — 메일 앱 방식으로 전환
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const onCopy = async () => {
    if (!formRef.current) return;
    const { subject, body } = compose(new FormData(formRef.current));
    try {
      await navigator.clipboard.writeText(`받는 사람: ${COMPANY.email}\n제목: ${subject}\n\n${body}`);
      setStatus("copied");
    } catch {
      setStatus("copy-failed");
    }
  };

  const message: Record<Status, string> = {
    idle: "",
    sending: "보내는 중입니다…",
    sent: "견적 문의가 접수되었습니다. 담당자가 확인 후 연락드립니다.",
    error: `전송하지 못했습니다. 잠시 후 다시 시도하시거나 ${COMPANY.phone} 또는 ${COMPANY.email} 로 연락 주세요. ‘문의 내용 복사’로 내용을 옮길 수 있습니다.`,
    opening: "메일 앱을 여는 중입니다…",
    opened: `메일 작성 창이 열렸다면 메일 앱에서 ‘보내기’를 눌러야 접수됩니다. 창이 열리지 않았다면 ‘문의 내용 복사’ 후 ${COMPANY.email} 로 보내 주세요.`,
    copied: `문의 내용을 복사했습니다. ${COMPANY.email} 로 붙여 넣어 보내 주세요.`,
    "copy-failed": `복사하지 못했습니다. ${COMPANY.email} 로 직접 연락 주시거나 ${COMPANY.phone} 로 전화 주세요.`,
  };

  return (
    <section id="quote" aria-labelledby="quote-title" className="on-dark relative bg-navy py-24 text-white sm:py-32">
      {/* 페이지의 마무리 — 왼쪽 안내·연락처, 오른쪽 폼 카드 */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.14em] text-sky-300">
              <span aria-hidden="true" className="h-px w-6 bg-sky-300" />
              Contact
            </p>
            <h2
              id="quote-title"
              className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.3] tracking-[-0.02em] sm:text-4xl sm:leading-[1.25] lg:text-[2.6rem] lg:leading-[1.22]"
            >
              귀사의 물류 운영, 더 체계적으로 관리할 수 있습니다.
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-white/70 sm:text-lg">
              필요한 물류 서비스와 운영 조건을 알려주시면 검토 후 안내해 드립니다.
            </p>
            <a
              href="#quote-form"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-white/30 px-6 text-[15px] font-bold transition-colors duration-200 hover:border-white/70 hover:bg-white/[0.06]"
            >
              견적 문의하기
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
              <li>
                <a href={`tel:${COMPANY.phone}`} className="flex min-h-14 items-center gap-3 text-[15px] font-semibold text-white/85 hover:text-white">
                  <Phone aria-hidden="true" className="size-4 text-sky-300" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex min-h-14 items-center gap-3 text-[15px] font-semibold text-white/85 hover:text-white">
                  <Mail aria-hidden="true" className="size-4 text-sky-300" />
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 견적 문의 폼 — 흰 카드 (포커스 표시는 밝은 배경용 블루) */}
        <div id="quote-form" className="on-light scroll-mt-24 lg:col-span-7">
          <div className="rounded-lg bg-paper p-6 text-ink shadow-[0_40px_80px_-32px_rgba(0,0,0,0.6)] sm:p-10">
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl">견적 문의</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-body">
              <span className="text-orange">*</span> 표시는 필수 항목입니다. 보내기를 누르면 담당자에게 바로 전달되며, 온라인 접수가
              어려운 경우에는 입력하신 내용이 담긴 메일 작성 창이 열립니다.
            </p>

            <form ref={formRef} noValidate onSubmit={onSubmit} className="relative mt-8 border-t border-line pt-8">
              {/* 스팸 방지용 숨은 칸 — 사람에게는 보이지 않음 */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <input name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                <label className={labelCls}>
                  회사명 <span className="text-orange">*</span>
                  <input name="company" autoComplete="organization" className={input} {...invalid("company")} />
                  <Err id="company-error" msg={errors.company} />
                </label>
                <label className={labelCls}>
                  담당자명 <span className="text-orange">*</span>
                  <input name="name" autoComplete="name" className={input} {...invalid("name")} />
                  <Err id="name-error" msg={errors.name} />
                </label>
                <label className={labelCls}>
                  연락처 <span className="text-orange">*</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="010-0000-0000"
                    className={input}
                    {...invalid("phone")}
                  />
                  <Err id="phone-error" msg={errors.phone} />
                </label>
                <label className={labelCls}>
                  이메일 <span className={optional}>(선택)</span>
                  <input name="email" type="email" autoComplete="email" className={input} {...invalid("email")} />
                  <Err id="email-error" msg={errors.email} />
                </label>
                <label className={`${labelCls} sm:col-span-2`}>
                  월 출고량 <span className={optional}>(선택)</span>
                  <span className="relative block">
                    <select name="volume" defaultValue="" className={`${input} cursor-pointer appearance-none pr-11`}>
                      <option value="">선택해 주세요</option>
                      {VOLUMES.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-sub" />
                  </span>
                </label>
              </div>

              <fieldset className="mt-7">
                <legend className={labelCls}>
                  필요한 서비스 <span className={optional}>(선택 · 복수 선택)</span>
                </legend>
                <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                  {NEEDS.map((n) => (
                    <label
                      key={n}
                      className="flex h-12 cursor-pointer items-center gap-3 rounded-sm border border-line-strong px-4 text-[15px] font-medium text-charcoal transition-colors duration-150 hover:border-sub/60 has-[:checked]:border-blue has-[:checked]:bg-blue-soft has-[:checked]:text-navy"
                    >
                      <input type="checkbox" name="needs" value={n} className="size-4 accent-blue-700" />
                      {n}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className={`${labelCls} mt-7 block`}>
                문의 내용 <span className={optional}>(선택)</span>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={1000}
                  placeholder="현재 물류 운영 방식, 품목, 궁금한 점을 적어주세요."
                  className={`${field} min-h-32 resize-y py-3 leading-relaxed`}
                />
              </label>

              <div className="mt-7 rounded-sm border border-line bg-gray px-4 py-3">
                <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] font-semibold text-ink">
                  <input
                    type="checkbox"
                    name="consent"
                    value="yes"
                    className="size-4 shrink-0 accent-blue-700"
                    {...invalid("consent")}
                  />
                  <span>
                    개인정보 수집 및 이용에 동의합니다. <span className="text-orange">*</span>
                  </span>
                </label>
                <Err id="consent-error" msg={errors.consent} />
                <details className="group pl-7 text-[13px] leading-relaxed text-body">
                  <summary className="inline-flex min-h-8 cursor-pointer list-none items-center gap-1 font-semibold text-charcoal underline-offset-2 hover:underline [&::-webkit-details-marker]:hidden">
                    내용 보기
                    <ChevronDown aria-hidden="true" className="size-3.5 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <dl className="mt-2 mb-1 grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1.5 border-t border-line pt-3">
                    <dt className="font-semibold text-charcoal">수집 항목</dt>
                    <dd>회사명, 담당자명, 연락처, 이메일(선택)</dd>
                    <dt className="font-semibold text-charcoal">이용 목적</dt>
                    <dd>견적 문의 확인 및 회신</dd>
                    <dt className="font-semibold text-charcoal">보유 기간</dt>
                    <dd>문의 처리 완료 후 지체 없이 파기</dd>
                  </dl>
                  <p className="mb-1 text-sub">동의를 거부할 수 있으며, 이 경우 폼 대신 전화나 이메일로 문의하실 수 있습니다.</p>
                </details>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "opening"}
                  className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-sm bg-blue px-6 text-base font-bold text-white transition-colors duration-200 hover:bg-blue-strong disabled:opacity-60"
                >
                  <Mail aria-hidden="true" className="size-5" />
                  {status === "sending" ? "보내는 중…" : "견적 문의 보내기"}
                </button>
                <button
                  type="button"
                  onClick={onCopy}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-sm border border-line-strong bg-paper px-5 text-[15px] font-semibold text-charcoal transition-colors duration-200 hover:border-sub/60 hover:bg-gray"
                >
                  <Copy aria-hidden="true" className="size-4" />
                  문의 내용 복사
                </button>
              </div>
              <p
                role="status"
                aria-live="polite"
                className={`mt-4 min-h-6 text-sm leading-relaxed ${
                  status === "sent" ? "font-bold text-blue" : status === "error" ? "font-semibold text-orange" : "text-charcoal"
                }`}
              >
                {status === "copied" || status === "copy-failed"
                  ? message[status]
                  : Object.keys(errors).length > 0
                    ? "입력 내용을 확인해 주세요."
                    : message[status]}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
