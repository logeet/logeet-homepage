import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PHOTOS } from "@/lib/photos";

const BARS = [38, 52, 46, 70, 58, 64];

export function Hero() {
  return (
    <section id="top" className="on-dark relative -mt-16 overflow-hidden bg-navy pt-16 text-white">
      {/* 배경: 창고 사진 + 남색 오버레이 + 블루 글로우 */}
      <Image src={PHOTOS.hero} alt="" fill priority sizes="100vw" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-navy/75" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.4),transparent_70%),linear-gradient(180deg,transparent_60%,rgba(10,17,40,0.9))]"
      />

      <div className="relative mx-auto flex min-h-[88svh] max-w-5xl flex-col items-center justify-center px-5 py-24 text-center">
        {/* 유리 패널 — 자체 시스템을 상징하는 비주얼 */}
        <div
          aria-hidden="true"
          className="float-y rise-in mb-10 w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-5 text-left shadow-[0_20px_60px_-20px_rgba(37,99,235,0.6)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between text-[12px] font-semibold text-white/70">
            <span>월별 계획 대비 실적</span>
            <span className="rounded-full bg-white/15 px-2 py-0.5">LOGEET 리포트</span>
          </div>
          <div className="mt-4 flex h-16 items-end gap-2">
            {BARS.map((h, i) => (
              <span
                key={i}
                className={`flex-1 rounded-t ${i === 3 ? "bg-orange" : "bg-blue"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <span className="rise-in inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-semibold backdrop-blur">
          <span className="size-1.5 rounded-full bg-orange" />
          LOGEET FULFILLMENT
        </span>
        <h1 className="rise-in mt-6 text-balance text-[2rem] font-bold leading-[1.3] tracking-tight sm:text-6xl sm:leading-[1.2] [animation-delay:80ms]">
          물류비가 보이는 풀필먼트,
          <br />
          로지트가 숫자로 증명합니다
        </h1>
        <p className="rise-in mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg [animation-delay:160ms]">
          창고보관 · 임시차 운송 · 택배 배송대행을 직접 운영하고{" "}
          <br className="hidden sm:block" />
          매달 계획 대비 실적을 리포트로 보여드립니다.
        </p>
        <div className="rise-in mt-10 flex flex-wrap justify-center gap-3 [animation-delay:240ms]">
          <a
            href="#services"
            className="inline-flex min-h-13 items-center gap-2 rounded-lg bg-blue px-7 text-base font-bold transition-colors duration-200 hover:bg-blue-strong"
          >
            더 알아보기
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
          <a
            href="#quote"
            className="inline-flex min-h-13 items-center rounded-lg border border-white/30 bg-white/5 px-7 text-base font-bold backdrop-blur transition-colors duration-200 hover:bg-white/15"
          >
            견적 문의하기
          </a>
        </div>
      </div>
    </section>
  );
}
