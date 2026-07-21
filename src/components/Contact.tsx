import { Mail, Phone, ArrowRight } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { COMPANY } from "@/lib/company";

export function Contact() {
  return (
    <section id="contact" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Eyebrow tone="coral">문의하기</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.6rem]">
              물류비, 한번
              <br />
              같이 들여다볼까요.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-steel">
              현재 물류 구조와 월 발송량을 간단히 알려주시면, 담당자가 직접
              검토 후 연락드립니다.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("물류 대행 문의")}`}
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <Mail className="size-4" />
                {COMPANY.email}
              </a>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-paper-alt px-6 py-3.5 text-[15px] font-bold text-ink transition-transform hover:-translate-y-0.5"
              >
                <Phone className="size-4" />
                {COMPANY.phone}
              </a>
            </div>
          </div>

          <div className="rounded-[32px] bg-blue p-9 text-white shadow-[0_24px_60px_-24px_rgba(46,94,255,0.55)]">
            <p className="text-[13px] font-bold uppercase tracking-wide text-white/70">
              Customer Portal
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-snug">
              이미 로지트와
              <br />
              함께하고 계신가요?
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">
              수배송관리 시스템에 로그인하면 이번 달 임시차·택배 비용을
              바로 확인할 수 있습니다.
            </p>
            <a
              href={COMPANY.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[15px] font-bold text-blue transition-transform hover:-translate-y-0.5"
            >
              고객사 로그인
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
