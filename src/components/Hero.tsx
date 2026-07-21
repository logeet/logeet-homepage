import { ArrowRight } from "lucide-react";
import { Eyebrow } from "./Eyebrow";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper-alt pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div
        aria-hidden="true"
        className="blob-float pointer-events-none absolute left-1/2 top-[-10%] size-[560px] -translate-x-1/2 rounded-full bg-blue/15 blur-[100px] sm:size-[720px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-15%] right-[-5%] size-[380px] rounded-full bg-coral/10 blur-[90px]"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <div className="rise-in flex justify-center">
          <Eyebrow>물류비, 숫자로 보여드립니다</Eyebrow>
        </div>
        <h1 className="rise-in mt-6 text-[2.6rem] font-bold leading-[1.18] tracking-tight text-ink sm:text-6xl sm:leading-[1.12] [animation-delay:80ms]">
          복잡한 물류 대행,
          <br />
          <span className="text-blue">로지트</span>가 명확하게 정리합니다.
        </h1>
        <p className="rise-in mx-auto mt-6 max-w-xl text-base leading-relaxed text-steel sm:text-lg [animation-delay:160ms]">
          창고보관부터 임시차 운송, 택배 배송대행까지 직접 운영하고, 자체
          개발한 관리 시스템으로 매달 계획 대비 실적을 투명하게 보여드립니다.
        </p>
        <div className="rise-in mt-9 flex flex-wrap items-center justify-center gap-3 [animation-delay:240ms]">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-blue px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_24px_-8px_rgba(46,94,255,0.55)] transition-transform hover:-translate-y-0.5"
          >
            물류 진단 문의하기
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-bold text-ink shadow-[0_4px_16px_-4px_rgba(23,23,23,0.12)] transition-transform hover:-translate-y-0.5"
          >
            서비스 자세히보기
          </a>
        </div>
      </div>
    </section>
  );
}
