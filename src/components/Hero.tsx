import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PHOTOS } from "@/lib/photos";
import { HeroVideo } from "./HeroVideo";

// Pexels 무료 라이선스 영상 6개를 5초씩 이어붙인 27초 몽타주 (720p, 상업 이용 가능·출처 표기 불필요)
// 순서: 4294436 팔레트랙 → 31751344 랙 통로 지게차 → 32386619 자동화 라인 → 10472351 트레이 분류
//       → 39053017 지게차 작업 → 6167566 컨베이어
const HERO_VIDEO = "/videos/hero-montage.mp4";

// 실제 제공 중인 서비스·기능만 (고객사 시스템 코드로 확인)
const POINTS = ["보관 · 운송 · 택배 통합 운영", "예산 대비 집행률 · 비용 리포트", "고객사 전용 관리 시스템"];

export function Hero() {
  return (
    <section id="top" className="on-dark relative -mt-16 overflow-hidden bg-navy pt-16 text-white">
      <Image src={PHOTOS.hero} alt="" fill priority sizes="100vw" className="object-cover" />
      <HeroVideo src={HERO_VIDEO} />
      <div aria-hidden="true" className="absolute inset-0 bg-navy/75" />

      <div className="relative mx-auto flex min-h-[82svh] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8">
        <p className="rise-in text-sm font-semibold tracking-wide text-white/70">풀필먼트 · 통합 물류 대행</p>
        <h1 className="rise-in mt-5 max-w-4xl text-[2.1rem] font-bold leading-[1.3] tracking-tight sm:text-5xl sm:leading-[1.25] lg:text-6xl lg:leading-[1.2] [animation-delay:60ms]">
          물류비가 보이는 풀필먼트,
          <br />
          로지트가 숫자로 증명합니다.
        </h1>
        <p className="rise-in mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:max-w-none lg:whitespace-nowrap [animation-delay:120ms]">
          보관부터 운송, 택배까지. 통합 물류 운영과 투명한 비용 분석으로 기업의 물류를 더 체계적으로 관리합니다.
        </p>
        <div className="rise-in mt-10 flex flex-wrap gap-3 [animation-delay:180ms]">
          <a
            href="#quote"
            className="inline-flex min-h-12 items-center gap-2 rounded bg-blue px-6 text-[15px] font-bold transition-colors duration-200 hover:bg-blue-strong"
          >
            견적 문의하기
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
          <a
            href="#services"
            className="inline-flex min-h-12 items-center rounded border border-white/40 px-6 text-[15px] font-bold transition-colors duration-200 hover:bg-white/10"
          >
            서비스 알아보기
          </a>
        </div>
      </div>

      {/* 핵심 차별점 — 히어로 하단 띠 */}
      <div className="relative border-t border-white/15">
        <ul className="mx-auto grid max-w-7xl gap-x-8 gap-y-3 px-5 py-5 text-sm font-medium text-white/85 sm:grid-cols-3 sm:px-8">
          {POINTS.map((p, i) => (
            <li key={p} className={`flex items-center gap-2.5 ${["", "sm:justify-center", "sm:justify-end"][i]}`}>
              <span aria-hidden="true" className="size-1.5 shrink-0 bg-blue" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
