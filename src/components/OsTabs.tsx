"use client";

import { useState } from "react";
import { ArrowUpRight, Truck } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { ProductMockup } from "./ProductMockup";

/** 시스템 화면을 단순화한 창 틀 (주소창 + 본문) */
function Window({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-ink">
      <div className="flex items-center gap-2 border-b border-line bg-gray px-5 py-3">
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="ml-3 rounded-md border border-line bg-white px-3 py-1 text-[11px] font-medium text-body">
          center.logeet.co.kr
        </span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

// 예시 데이터 — 2: 적재, 1: 일부, 0: 빈 칸
const RACK = [
  [2, 2, 2, 1, 2, 2, 0, 2],
  [2, 1, 2, 2, 2, 0, 2, 2],
  [2, 2, 0, 2, 1, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 0, 2],
];
const CELL = ["bg-slate-200", "bg-blue/40", "bg-blue"];

function StorageView() {
  const cells = RACK.flat();
  const rate = Math.round((cells.reduce((s, c) => s + c, 0) / (cells.length * 2)) * 100);
  return (
    <Window>
      <div className="flex items-end justify-between">
        <p className="text-sm font-semibold text-body">A동 랙 적재 현황</p>
        <p className="text-right">
          <span className="block text-[11px] text-sub">적재율</span>
          <span className="text-2xl font-bold tabular-nums">{rate}%</span>
        </p>
      </div>
      <div className="mt-4 grid grid-cols-8 gap-1.5">
        {cells.map((c, i) => (
          <span key={i} className={`h-7 rounded ${CELL[c]}`} />
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-[12px] text-body">
        {["적재", "일부", "빈 칸"].map((l, i) => (
          <span key={l} className="flex items-center gap-1.5">
            <span className={`size-2.5 rounded-sm ${CELL[2 - i]}`} />
            {l}
          </span>
        ))}
      </div>
    </Window>
  );
}

const ROUTES = [
  { from: "기흥 센터", to: "매장 A", type: "임시차", price: 420000 },
  { from: "기흥 센터", to: "물류센터 B", type: "간선", price: 680000 },
  { from: "기흥 센터", to: "매장 C", type: "임시차", price: 180000 },
];

function RouteView() {
  return (
    <Window>
      <p className="text-sm font-semibold text-body">노선별 운송 단가</p>
      <ul className="mt-4 divide-y divide-line">
        {ROUTES.map((r) => (
          <li key={r.to} className="flex items-center gap-3 py-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-soft text-blue">
              <Truck aria-hidden="true" className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold leading-snug">
                {r.from} <span className="text-sub">→</span> {r.to}
              </p>
              <p className="text-[12px] text-sub">{r.type}</p>
            </div>
            <p className="shrink-0 text-right text-[15px] font-bold tabular-nums">
              {r.price.toLocaleString("ko-KR")}
              <span className="ml-0.5 text-[12px] font-medium text-sub">원/회</span>
            </p>
          </li>
        ))}
      </ul>
    </Window>
  );
}

const PARCEL = { b2c: 7740, b2b: 4740 };

function ParcelView() {
  const total = PARCEL.b2c + PARCEL.b2b;
  const b2c = PARCEL.b2c / total;
  const R = 52;
  const L = 2 * Math.PI * R;
  return (
    <Window>
      <p className="text-sm font-semibold text-body">이번 달 택배 출고</p>
      <div className="mt-4 flex items-center gap-6 sm:gap-8">
        <svg viewBox="0 0 140 140" className="size-32 shrink-0 -rotate-90 sm:size-36" aria-hidden="true">
          <circle cx="70" cy="70" r={R} fill="none" stroke="#f97316" strokeWidth="18" />
          <circle cx="70" cy="70" r={R} fill="none" stroke="#2563eb" strokeWidth="18" strokeDasharray={`${b2c * L - 3} ${L}`} />
        </svg>
        <div className="flex-1">
          <p className="text-[12px] text-sub">총 출고</p>
          <p className="text-2xl font-bold tabular-nums">
            {total.toLocaleString("ko-KR")}
            <span className="ml-1 text-sm font-medium text-sub">박스</span>
          </p>
          <ul className="mt-4 space-y-2 text-[14px]">
            {[
              ["B2C", PARCEL.b2c, "bg-blue"],
              ["B2B", PARCEL.b2b, "bg-orange"],
            ].map(([k, v, c]) => (
              <li key={k} className="flex items-center gap-2">
                <span className={`size-2.5 rounded-sm ${c}`} />
                <span className="font-semibold">{k}</span>
                <span className="ml-auto tabular-nums text-body">
                  {(v as number).toLocaleString("ko-KR")} · {Math.round(((v as number) / total) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Window>
  );
}

const TABS = [
  { key: "보관", title: "창고 · 재고 관리", desc: "랙 단위 적재 현황과 재고를 한 화면에서 봅니다.", View: StorageView },
  { key: "운송", title: "임시차 · 간선운송 관리", desc: "노선별 단가를 기록해 운송비가 어디서 생기는지 보입니다.", View: RouteView },
  { key: "택배", title: "택배 라스트마일 관리", desc: "B2C·B2B 발송을 나눠 물량과 비중을 함께 봅니다.", View: ParcelView },
  { key: "리포트", title: "물류비 리포트", desc: "계획 대비 실적과 집행률을 매달 정리합니다.", View: ProductMockup },
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

          <div id="os-panel" aria-live="polite" className="mt-6 lg:min-h-[460px]">
            <h3 className="text-xl font-bold sm:text-2xl">{tab.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-white/75">{tab.desc}</p>
            <div key={tab.key} className="rise-in mt-5 overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <tab.View />
            </div>
            <p className="mt-3 text-[12px] text-white/50">시스템 화면을 단순화한 예시입니다</p>
          </div>
        </div>
      </div>
    </section>
  );
}
