"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/lib/company";

const TABS = [
  {
    key: "보관",
    title: "창고 · 재고 관리",
    desc: "입고부터 로케이션, 재고 정합성까지 한 화면에서 추적합니다.",
    tags: ["#입고검수", "#로케이션관리", "#재고정합성", "#피킹패킹"],
  },
  {
    key: "운송",
    title: "임시차 · 간선운송 관리",
    desc: "노선별 배차와 단가를 기록해 운송비가 어디서 생기는지 보여드립니다.",
    tags: ["#노선별단가", "#임시차배차", "#간선운송", "#월별집계"],
  },
  {
    key: "택배",
    title: "택배 라스트마일 관리",
    desc: "B2C·B2B 발송을 나눠 집계해 물량 변화와 비용을 함께 봅니다.",
    tags: ["#B2C", "#B2B", "#박스단위집계", "#물량추이"],
  },
  {
    key: "리포트",
    title: "물류비 리포트 대시보드",
    desc: "예산 대비 실적과 집행률을 매달 자동으로 정리해 드립니다.",
    tags: ["#계획대비실적", "#집행률", "#엑셀업로드", "#고객사전용"],
  },
];

export function OsTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="os" className="on-dark relative overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(50%_60%_at_100%_0%,rgba(37,99,235,0.35),transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="reveal">
          <p className="text-[15px] font-bold text-sky-300">LOGEET SYSTEM</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">
            보관부터 리포트까지,
            <br />
            하나의 시스템으로 연결합니다
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
            로지트가 직접 개발한 수배송관리 시스템에서 물류 전 과정과 비용을 함께 확인하세요.
          </p>
          <a
            href={COMPANY.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 px-6 font-bold transition-colors duration-200 hover:bg-white/10"
          >
            고객사 시스템 바로가기
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="reveal">
          <div role="group" aria-label="시스템 영역 선택" className="flex flex-wrap gap-2">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                type="button"
                aria-pressed={i === active}
                aria-controls="os-panel"
                onClick={() => setActive(i)}
                className={`min-h-11 rounded-full px-5 text-[15px] font-bold transition-colors duration-200 ${
                  i === active ? "bg-blue text-white" : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {t.key}
              </button>
            ))}
          </div>

          <div
            id="os-panel"
            aria-live="polite"
            className="mt-6 rounded-3xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10"
          >
            <p className="text-sm font-bold text-sky-300">{String(active + 1).padStart(2, "0")} / {String(TABS.length).padStart(2, "0")}</p>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{tab.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-white/80">{tab.desc}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {tab.tags.map((t) => (
                <li key={t} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
