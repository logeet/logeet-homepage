import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PHOTOS } from "@/lib/photos";
import { HeroVideo } from "./HeroVideo";

// Pexels 무료 라이선스 영상 6개를 5초씩 이어붙인 27초 몽타주 (720p, 상업 이용 가능·출처 표기 불필요)
// 순서: 4294436 팔레트랙 → 31751344 랙 통로 지게차 → 32386619 자동화 라인 → 10472351 트레이 분류
//       → 39053017 지게차 작업 → 6167566 컨베이어
const HERO_VIDEO = "/videos/hero-montage.mp4";

// 실제 제공 중인 서비스·기능만 (고객사 시스템 코드로 확인) — 지표형 라벨
const POINTS = [
  { k: "통합 운영", v: "보관 · 운송 · 택배" },
  { k: "비용 리포트", v: "예산 대비 집행률" },
  { k: "전용 시스템", v: "고객사 계정 제공" },
];

export function Hero() {
  return (
    <section id="top" className="on-dark relative -mt-16 overflow-hidden bg-navy text-white">
      <Image src={PHOTOS.hero} alt="" fill priority sizes="100vw" className="object-cover" />
      <HeroVideo src={HERO_VIDEO} />
      {/* 왼쪽(글자)은 진하게, 오른쪽(현장)은 옅게 — 글자와 영상이 경쟁하지 않도록 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,48,0.94)_0%,rgba(11,23,48,0.82)_45%,rgba(11,23,48,0.45)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center px-5 pt-32 pb-16 sm:px-8">
        <p className="rise-in flex items-center gap-3 text-sm font-semibold tracking-[0.12em] text-sky-300">
          <span aria-hidden="true" className="h-px w-8 bg-sky-300" />
          FULFILLMENT · LOGISTICS
        </p>
        <h1 className="rise-in mt-6 text-[2.35rem] font-bold leading-[1.18] tracking-[-0.02em] sm:text-6xl sm:leading-[1.12] lg:text-[4.6rem] lg:leading-[1.08] [animation-delay:60ms]">
          물류비가 보이는 풀필먼트,
          <br />
          <span className="text-white/95">로지트가 숫자로 증명합니다.</span>
        </h1>
        <p className="rise-in mt-7 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg lg:max-w-none lg:whitespace-nowrap [animation-delay:120ms]">
          보관부터 운송, 택배까지. 통합 물류 운영과 투명한 비용 분석으로 기업의 물류를 더 체계적으로 관리합니다.
        </p>
        <div className="rise-in mt-10 flex flex-wrap gap-3 [animation-delay:180ms]">
          <a
            href="#quote"
            className="group inline-flex min-h-13 items-center gap-2 rounded bg-blue px-7 text-[15px] font-bold transition-colors duration-200 hover:bg-blue-strong"
          >
            견적 문의하기
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="inline-flex min-h-13 items-center rounded border border-white/35 px-7 text-[15px] font-bold transition-colors duration-200 hover:border-white hover:bg-white/10"
          >
            서비스 알아보기
          </a>
        </div>
      </div>

      {/* 핵심 가치 — 지표형 라벨 (왼쪽 · 가운데 · 오른쪽 정렬) */}
      <div className="relative border-t border-white/15">
        <ul className="mx-auto grid max-w-7xl gap-y-4 px-5 py-6 sm:grid-cols-3 sm:px-8">
          {POINTS.map((p, i) => (
            <li key={p.k} className={`flex ${["", "sm:justify-center", "sm:justify-end"][i]}`}>
              <div className="flex items-baseline gap-3">
                <span className="text-[13px] font-bold tabular-nums text-sky-300">0{i + 1}</span>
                <div>
                  <p className="text-[15px] font-bold">{p.k}</p>
                  <p className="text-[13px] text-white/65">{p.v}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
