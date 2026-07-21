import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { SectionTag } from "./SectionTag";
import { COMPANY } from "@/lib/company";

export function Contact() {
  return (
    <section id="contact" className="border-t border-ink/10 bg-paper-dim py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTag code="CONTACT">문의하기</SectionTag>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
              물류비, 한번
              <br />
              같이 들여다볼까요.
            </h2>
            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-steel">
              현재 물류 구조와 월 발송량을 간단히 알려주시면, 담당자가 직접
              검토 후 연락드립니다.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("물류 대행 문의")}`}
                className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-sans text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
              >
                <Mail className="size-4" />
                {COMPANY.email}
              </a>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-2 border border-ink/20 px-5 py-3 font-sans text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                <Phone className="size-4" />
                {COMPANY.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between border border-ink/15 bg-ink p-7 text-paper sm:p-9">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-amber">CUSTOMER PORTAL</p>
              <h3 className="mt-3 font-display text-2xl font-black leading-snug">
                이미 로지트와
                <br />
                함께하고 계신가요?
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-paper/70">
                수배송관리 시스템에 로그인하면 이번 달 임시차·택배 비용을
                바로 확인할 수 있습니다.
              </p>
            </div>
            <a
              href={COMPANY.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-1.5 self-start bg-amber px-5 py-3 font-sans text-sm font-semibold text-amber-ink"
            >
              고객사 로그인
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
