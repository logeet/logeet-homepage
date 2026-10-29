import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PHOTOS } from "@/lib/photos";
import { HeroVideo } from "./HeroVideo";

// Pexels 무료 라이선스 영상 6개를 5초씩 이어붙인 27초 몽타주 (720p, 상업 이용 가능·출처 표기 불필요)
// 순서: 4294436 팔레트랙 → 4477603 랙 통로 지게차(드론) → 32386619 자동화 라인 → 10472351 트레이 분류
//       → 31751344 빈 랙 통로(25.6~30초, 상표 나오기 전) → 6167566 컨베이어
// 상표(지게차 제조사 등)·알아볼 수 있는 얼굴이 나오는 구간은 제외함
const HERO_VIDEO = "/videos/hero-v2.mp4";

// 회사를 보여주는 사실만 — 장점(통합 운영·가시성·비용·보고)은 Why LOGEET에서 말하므로 겹치지 않게
const POINTS = [
  { k: "직영 물류센터", v: "경기 용인 기흥 · 보관부터 출고까지 직접 운영" },
  { k: "자체 개발 시스템", v: "고객사 전용 화면 · 엑셀·구글 시트 연동" },
  { k: "B2B · B2C 통합 출고", v: "매장 출고와 온라인 택배를 한 센터에서" },
];

export function Hero() {
  return (
    <section id="top" className="on-dark relative -mt-16 overflow-hidden bg-navy text-white">
      <Image src={PHOTOS.hero} alt="" fill priority sizes="100vw" className="object-cover" />
      <HeroVideo src={HERO_VIDEO} />
      {/* 왼쪽(글자)은 진하게, 오른쪽(현장)은 옅게 — 글자와 영상이 경쟁하지 않도록 */}
      {/* 왼쪽(글자) 쪽을 진하게, 위(헤더)·아래(지표 띠)도 살짝 눌러 글자 대비 확보 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,48,0.95)_0%,rgba(11,23,48,0.86)_38%,rgba(11,23,48,0.5)_72%,rgba(11,23,48,0.38)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-navy/70 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-navy via-navy/70 to-transparent" />

      <div className="relative mx-auto flex min-h-[max(640px,calc(100svh-6.5rem))] max-w-7xl flex-col justify-center px-5 pt-32 pb-16 sm:px-8 lg:pb-20">
        <p className="rise-in flex items-center gap-3 text-[13px] font-bold tracking-[0.2em] text-sky-300">
          <span aria-hidden="true" className="h-px w-10 bg-sky-300/80" />
          FULFILLMENT · LOGISTICS
        </p>
        <h1 className="rise-in mt-7 text-balance text-[2.35rem] font-bold leading-[1.2] tracking-[-0.025em] sm:text-6xl sm:leading-[1.12] lg:text-[4.5rem] lg:leading-[1.1] [animation-delay:60ms]">
          {/* 두 문장을 각각 블록으로 — 좁은 화면에서도 문장마다 줄이 고르게 나뉨 */}
          <span className="block">로지트는 물류의 흐름을 읽고,</span>
          <span className="block text-white/90">데이터로 운영 효율을 높입니다.</span>
        </h1>
        <p className="rise-in mt-8 max-w-2xl text-base leading-[1.75] text-white/70 sm:text-lg lg:mt-9 lg:max-w-none lg:whitespace-nowrap lg:text-[19px] [animation-delay:120ms]">
          고객사의 비즈니스 특성에 맞춘 물류 운영 설계부터 실행까지, 안정적이고 유연한 물류 서비스를 제공합니다.
        </p>
        <div className="rise-in mt-10 flex flex-col gap-3 sm:flex-row lg:mt-12 [animation-delay:180ms]">
          <a
            href="#quote"
            className="group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-sm bg-blue px-8 text-base font-bold shadow-[0_12px_32px_-12px_rgba(29,78,216,0.8)] transition-colors duration-200 hover:bg-blue-strong"
          >
            견적 문의하기
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="inline-flex min-h-14 items-center justify-center rounded-sm border border-white/30 px-8 text-base font-bold text-white/90 transition-colors duration-200 hover:border-white/70 hover:bg-white/[0.06] hover:text-white"
          >
            서비스 알아보기
          </a>
        </div>
      </div>

      {/* 핵심 가치 — 지표형 라벨 (왼쪽 · 가운데 · 오른쪽 정렬) */}
      <div className="relative border-t border-white/12 bg-navy/40">
        <ul className="mx-auto grid max-w-7xl gap-y-5 px-5 py-7 sm:grid-cols-3 sm:px-8">
          {POINTS.map((p, i) => (
            <li key={p.k} className={`flex ${["", "sm:justify-center", "sm:justify-end"][i]}`}>
              <div className="flex items-start gap-4">
                <span className="pt-0.5 text-[12px] font-bold tabular-nums tracking-[0.12em] text-sky-300">0{i + 1}</span>
                <div>
                  <p className="text-base font-bold">{p.k}</p>
                  <p className="mt-0.5 text-[13px] text-white/60">{p.v}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
