import { ArrowUpRight } from "lucide-react";
import { WaybillStub } from "./WaybillStub";
import { ProductMockup } from "./ProductMockup";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_auto] lg:items-start lg:gap-8">
          <div className="rise-in">
            <p className="font-mono text-xs tracking-[0.2em] text-amber">
              LOGISTICS, MEASURED
            </p>
            <h1 className="mt-5 font-display text-[2.4rem] font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              물류비, 보이지 않으면
              <br />
              관리할 수 없습니다.
            </h1>
            <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-paper/75 sm:text-lg">
              로지트는 창고보관부터 임시차 운송, 택배 배송대행까지 직접 운영하고,
              자체 개발한 관리 시스템으로 매달 얼마가 계획됐고 얼마가 나갔는지
              숫자로 보여드립니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-amber px-5 py-3 font-sans text-sm font-semibold text-amber-ink transition-transform hover:-translate-y-0.5"
              >
                물류 진단 문의하기
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 border border-paper/25 px-5 py-3 font-sans text-sm font-medium text-paper transition-colors hover:border-paper/60"
              >
                서비스 살펴보기
              </a>
            </div>
          </div>

          <div className="flex justify-start lg:justify-end">
            <WaybillStub />
          </div>
        </div>

        <div className="mt-14 rise-in [animation-delay:150ms] lg:mt-16">
          <ProductMockup />
          <p className="mt-3 font-mono text-[11px] text-paper/45">
            실제 화면을 단순화한 예시입니다 · 자체 개발 수배송관리 시스템
          </p>
        </div>
      </div>
    </section>
  );
}
