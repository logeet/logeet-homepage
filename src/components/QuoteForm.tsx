"use client";

import { useState } from "react";
import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { COMPANY } from "@/lib/company";

const VOLUMES = ["월 1천 건 미만", "월 1천 ~ 5천 건", "월 5천 ~ 2만 건", "월 2만 건 이상", "잘 모르겠음"];
const NEEDS = ["창고보관 · 입출고", "피킹 · 패킹", "임시차 · 간선운송", "택배 라스트마일", "관리 시스템"];

const field =
  "mt-2 block w-full rounded-lg border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-sub focus:border-blue";
const labelCls = "text-sm font-bold text-ink";

// ponytail: 서버 없이 메일 앱으로 넘김. 자동 접수가 필요하면 Route Handler + 메일 API(Resend 등)로 교체
function toMailto(f: FormData) {
  const line = (k: string) => String(f.get(k) ?? "").trim() || "-";
  const body = [
    `회사명: ${line("company")}`,
    `담당자: ${line("name")}`,
    `연락처: ${line("phone")}`,
    `이메일: ${line("email")}`,
    `월 출고량: ${line("volume")}`,
    `필요 서비스: ${f.getAll("needs").join(", ") || "-"}`,
    "",
    "[문의 내용]",
    line("message"),
  ].join("\n");
  const subject = `[견적 문의] ${line("company")}`;
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function QuoteForm() {
  const [sent, setSent] = useState(false);

  return (
    <section id="quote" className="on-dark relative overflow-hidden bg-[linear-gradient(135deg,#1d4ed8,#2563eb_45%,#0a1128)] py-24 text-white sm:py-32">
      <Image src={PHOTOS.cta} alt="" fill sizes="100vw" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,rgba(29,78,216,0.88),rgba(37,99,235,0.68)_45%,rgba(10,17,40,0.9))]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div className="reveal">
          <p className="text-[15px] font-bold text-sky-200">Free Consulting</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl sm:leading-tight">
            지금 바로
            <br />
            로지트와 함께하세요
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">
            지금 물류 구조와 월 출고량을 알려주시면 담당자가 직접 검토하고
            연락드립니다.
          </p>
          <ul className="mt-10 space-y-3 text-lg font-bold">
            <li>
              <a href={`tel:${COMPANY.phone}`} className="inline-flex min-h-11 items-center gap-3 hover:text-sky-200">
                <Phone aria-hidden="true" className="size-5 text-sky-200" />
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="inline-flex min-h-11 items-center gap-3 hover:text-sky-200">
                <Mail aria-hidden="true" className="size-5 text-sky-200" />
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = toMailto(new FormData(e.currentTarget));
            setSent(true);
          }}
          className="reveal rounded-3xl bg-paper p-6 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelCls}>
              회사명 <span className="text-orange">*</span>
              <input name="company" required autoComplete="organization" className={field} />
            </label>
            <label className={labelCls}>
              담당자명 <span className="text-orange">*</span>
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label className={labelCls}>
              연락처 <span className="text-orange">*</span>
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                placeholder="010-0000-0000"
                className={field}
              />
            </label>
            <label className={labelCls}>
              이메일
              <input name="email" type="email" autoComplete="email" className={field} />
            </label>
            <label className={`${labelCls} sm:col-span-2`}>
              월 출고량
              <select name="volume" defaultValue="" className={field}>
                <option value="" disabled>
                  선택해 주세요
                </option>
                {VOLUMES.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="mt-6">
            <legend className={labelCls}>필요한 서비스 (복수 선택)</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {NEEDS.map((n) => (
                <label
                  key={n}
                  className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-[15px] font-semibold transition-colors duration-200 has-[:checked]:border-blue has-[:checked]:bg-blue-soft has-[:checked]:text-blue-strong"
                >
                  <input type="checkbox" name="needs" value={n} className="size-4 accent-blue-600" />
                  {n}
                </label>
              ))}
            </div>
          </fieldset>

          <label className={`${labelCls} mt-6 block`}>
            문의 내용
            <textarea
              name="message"
              rows={4}
              maxLength={1000}
              placeholder="현재 이용 중인 물류 방식, 품목, 궁금한 점을 적어주세요."
              className={`${field} resize-y`}
            />
          </label>

          <button
            type="submit"
            className="group mt-8 flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-blue text-lg font-bold text-white transition-colors duration-200 hover:bg-blue-strong"
          >
            무료 견적 신청
            <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <p role="status" className="mt-4 text-sm leading-relaxed text-sub">
            {sent
              ? `메일 앱이 열렸습니다. 메일 앱에서 발송을 눌러야 접수됩니다. 열리지 않았다면 ${COMPANY.email} 로 보내주세요.`
              : "보내기를 누르면 입력하신 내용이 담긴 메일 앱이 열립니다."}
          </p>
        </form>
      </div>
    </section>
  );
}
