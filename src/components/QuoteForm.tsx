"use client";

import { useRef, useState } from "react";
import { ArrowRight, Copy, Mail, Phone } from "lucide-react";
import { COMPANY } from "@/lib/company";

const VOLUMES = ["월 1천 건 미만", "월 1천 ~ 5천 건", "월 5천 ~ 2만 건", "월 2만 건 이상", "잘 모르겠음"];
const NEEDS = ["풀필먼트 (보관 · 입출고)", "임시차 · 간선운송", "택배 (B2B · B2C)", "관리 시스템 · 물류비 리포트"];

type Field = "company" | "name" | "phone" | "email" | "consent";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "opening" | "opened" | "copied" | "copy-failed";

const input =
  "mt-2 block w-full rounded border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-sub focus:border-blue aria-[invalid=true]:border-orange";
const labelCls = "text-sm font-bold text-ink";

/*
 * ponytail: 서버 없이 방문자의 메일 앱으로 넘기는 방식. 자동 접수가 필요하면
 * Route Handler + 메일 발송 API(Resend 등, API 키 필요)로 교체한다.
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const errs = validate(f);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      setStatus("idle");
      return;
    }
    setStatus("opening");
    window.location.href = compose(f).href;
    setTimeout(() => setStatus("opened"), 900);
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
    opening: "메일 앱을 여는 중입니다…",
    opened: `메일 작성 창이 열렸다면 메일 앱에서 ‘보내기’를 눌러야 접수됩니다. 창이 열리지 않았다면 ‘문의 내용 복사’ 후 ${COMPANY.email} 로 보내 주세요.`,
    copied: `문의 내용을 복사했습니다. ${COMPANY.email} 로 붙여 넣어 보내 주세요.`,
    "copy-failed": `복사하지 못했습니다. ${COMPANY.email} 로 직접 연락 주시거나 ${COMPANY.phone} 로 전화 주세요.`,
  };

  return (
    <section id="quote" aria-labelledby="quote-title">
      {/* 견적 문의 CTA 띠 */}
      <div className="on-dark bg-navy py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-wide text-sky-300">Contact</p>
            <h2 id="quote-title" className="mt-3 text-balance text-[1.75rem] font-bold leading-snug tracking-tight sm:text-4xl sm:leading-tight">
              귀사의 물류 운영, 더 체계적으로 관리할 수 있습니다.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
              필요한 물류 서비스와 운영 조건을 알려주시면 검토 후 안내해 드립니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <a
              href="#quote-form"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-blue px-6 text-[15px] font-bold transition-colors duration-200 hover:bg-blue-strong"
            >
              견적 문의하기
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-[15px] font-semibold text-white/85">
              <a href={`tel:${COMPANY.phone}`} className="inline-flex min-h-11 items-center gap-2 hover:text-white">
                <Phone aria-hidden="true" className="size-4" />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="inline-flex min-h-11 items-center gap-2 hover:text-white">
                <Mail aria-hidden="true" className="size-4" />
                {COMPANY.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 견적 문의 폼 */}
      <div id="quote-form" className="scroll-mt-20 bg-gray py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h3 className="text-xl font-bold sm:text-2xl">견적 문의</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-body">
            <span className="text-orange">*</span> 표시는 필수 항목입니다. ‘메일로 견적 문의 보내기’를 누르면 입력하신 내용이
            담긴 메일 작성 창이 열리며, 메일 앱에서 보내기를 눌러야 접수됩니다.
          </p>

          <form ref={formRef} noValidate onSubmit={onSubmit} className="mt-8 rounded border border-line bg-paper p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
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
                이메일 <span className="font-medium text-sub">(선택)</span>
                <input name="email" type="email" autoComplete="email" className={input} {...invalid("email")} />
                <Err id="email-error" msg={errors.email} />
              </label>
              <label className={`${labelCls} sm:col-span-2`}>
                월 출고량 <span className="font-medium text-sub">(선택)</span>
                <select name="volume" defaultValue="" className={input}>
                  <option value="">선택해 주세요</option>
                  {VOLUMES.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="mt-6">
              <legend className={labelCls}>
                필요한 서비스 <span className="font-medium text-sub">(선택 · 복수 선택)</span>
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {NEEDS.map((n) => (
                  <label
                    key={n}
                    className="flex min-h-12 cursor-pointer items-center gap-3 rounded border border-line px-4 text-[15px] font-medium transition-colors duration-200 has-[:checked]:border-blue has-[:checked]:bg-blue-soft"
                  >
                    <input type="checkbox" name="needs" value={n} className="size-4 accent-blue-700" />
                    {n}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className={`${labelCls} mt-6 block`}>
              문의 내용 <span className="font-medium text-sub">(선택)</span>
              <textarea
                name="message"
                rows={4}
                maxLength={1000}
                placeholder="현재 물류 운영 방식, 품목, 궁금한 점을 적어주세요."
                className={`${input} resize-y`}
              />
            </label>

            <div className="mt-6 rounded border border-line bg-gray p-4">
              <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] font-semibold">
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
              <details className="mt-2 pl-7 text-[13px] leading-relaxed text-body">
                <summary className="cursor-pointer font-semibold text-charcoal">내용 보기</summary>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  <li>수집 항목: 회사명, 담당자명, 연락처, 이메일(선택)</li>
                  <li>이용 목적: 견적 문의 확인 및 회신</li>
                  <li>보유 기간: 문의 처리 완료 후 지체 없이 파기</li>
                  <li>동의를 거부할 수 있으며, 이 경우 폼 대신 전화나 이메일로 문의하실 수 있습니다.</li>
                </ul>
              </details>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={status === "opening"}
                className="flex min-h-13 flex-1 items-center justify-center gap-2 rounded bg-blue px-6 text-base font-bold text-white transition-colors duration-200 hover:bg-blue-strong disabled:opacity-60"
              >
                <Mail aria-hidden="true" className="size-5" />
                메일로 견적 문의 보내기
              </button>
              <button
                type="button"
                onClick={onCopy}
                className="flex min-h-13 items-center justify-center gap-2 rounded border border-line bg-paper px-5 text-[15px] font-semibold text-charcoal transition-colors duration-200 hover:bg-gray"
              >
                <Copy aria-hidden="true" className="size-4" />
                문의 내용 복사
              </button>
            </div>
            <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm leading-relaxed text-charcoal">
              {status === "copied" || status === "copy-failed"
                ? message[status]
                : Object.keys(errors).length > 0
                  ? "입력 내용을 확인해 주세요."
                  : message[status]}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
