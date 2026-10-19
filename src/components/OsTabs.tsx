"use client";

import { useState } from "react";
import { ArrowUpRight, Truck, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { ProductMockup } from "./ProductMockup";

/** 시스템 화면을 단순화한 창 틀 (주소창 + 본문) */
function Window({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded bg-white text-ink">
      <div className="flex items-center gap-2 border-b border-line bg-gray px-5 py-3">
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="ml-3 rounded border border-line bg-white px-3 py-1 text-[12px] font-medium text-body">
          center.logeet.co.kr
        </span>
        <span className="ml-auto text-[12px] font-semibold text-sub">예시 데이터</span>
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
        <p className="text-sm font-semibold text-body">센터 랙 적재 현황</p>
        <p className="text-right">
          <span className="block text-[12px] text-sub">적재율</span>
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
  { name: "노선 A", type: "임시차", cost: 3120 },
  { name: "노선 B", type: "고정계약", cost: 2860 },
  { name: "노선 C", type: "임시차", cost: 1940 },
];

function RouteView() {
  return (
    <Window>
      <p className="text-sm font-semibold text-body">노선별 임시차 누적 비용</p>
      <ul className="mt-4 divide-y divide-line">
        {ROUTES.map((r) => (
          <li key={r.name} className="flex items-center gap-3 py-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-soft text-blue">
              <Truck aria-hidden="true" className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold leading-snug">{r.name}</p>
              <p className="text-[12px] text-sub">{r.type}</p>
            </div>
            <p className="shrink-0 text-right text-[15px] font-bold tabular-nums">
              {r.cost.toLocaleString("ko-KR")}
              <span className="ml-0.5 text-[12px] font-medium text-sub">만원</span>
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
          <circle cx="70" cy="70" r={R} fill="none" stroke="#0d9488" strokeWidth="18" />
          <circle cx="70" cy="70" r={R} fill="none" stroke="#1d4ed8" strokeWidth="18" strokeDasharray={`${b2c * L - 3} ${L}`} />
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
              ["B2B", PARCEL.b2b, "bg-teal-600"],
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
  { key: "운영 현황", title: "센터 운영 현황", desc: "적재율과 재고, 박스 출고 추이를 한 화면에서 봅니다.", View: StorageView },
  { key: "운송", title: "임시차 · 운송 비용", desc: "노선별 임시차 비용을 고정계약과 구분해 누적합니다.", View: RouteView },
  { key: "택배", title: "택배 B2B · B2C", desc: "택배 출고를 채널별로 나눠 물량과 비중을 봅니다.", View: ParcelView },
  { key: "리포트", title: "예산 대비 실적", desc: "계획 대비 실적과 집행률을 매달 정리합니다.", View: ProductMockup },
];

// 고객사 시스템 코드로 확인한 '제공 중' 기능. 개발 예정 기능은 status: "planned"로 추가하면 따로 표시된다.
const FEATURES: { name: string; status: "live" | "planned" }[] = [
  { name: "센터 운영 현황 (적재율 · 재고 · 박스 출고)", status: "live" },
  { name: "센터별 운송비 · 물량, 노선 · 배송 코스 현황", status: "live" },
  { name: "예산 대비 집행률, 임시차 · 택배(B2B · B2C) 누적 비용", status: "live" },
  { name: "시즌 반품 현황 관리", status: "live" },
  { name: "엑셀 · 구글 시트 데이터 업로드 · 동기화", status: "live" },
  { name: "계정별 접근 권한 관리", status: "live" },
];

export function OsTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="os" aria-labelledby="os-title" className="on-dark bg-navy py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="reveal">
          <p className="text-sm font-bold tracking-wide text-sky-300">System</p>
          <h2 id="os-title" className="mt-3 text-[1.75rem] font-bold leading-snug tracking-tight sm:text-4xl sm:leading-tight">
            직접 개발한 관리 시스템으로
            <br />
            운영과 비용을 함께 봅니다
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
            고객사는 전용 계정으로 접속해 물류 운영 현황과 비용을 직접 확인합니다.
          </p>

          <h3 className="mt-8 text-[13px] font-bold text-white/60">현재 제공 중인 기능</h3>
          <ul className="mt-3 space-y-2.5">
            {FEATURES.filter((f) => f.status === "live").map((f) => (
              <li key={f.name} className="flex gap-2.5 text-[15px] leading-relaxed text-white/90">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sky-300" />
                {f.name}
              </li>
            ))}
          </ul>
          {FEATURES.some((f) => f.status === "planned") && (
            <>
              <h3 className="mt-6 text-[13px] font-bold text-white/60">개발 예정</h3>
              <ul className="mt-3 space-y-2 text-[15px] text-white/60">
                {FEATURES.filter((f) => f.status === "planned").map((f) => (
                  <li key={f.name}>{f.name}</li>
                ))}
              </ul>
            </>
          )}

          <a
            href={COMPANY.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded border border-white/40 px-6 font-bold transition-colors duration-200 hover:bg-white/10"
          >
            고객사 시스템 바로가기
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">(새 창)</span>
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
                className={`min-h-11 rounded px-4 text-[15px] font-bold transition-colors duration-200 ${
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
            <div key={tab.key} className="rise-in mt-5 overflow-hidden rounded">
              <tab.View />
            </div>
            <p className="mt-3 text-[12px] text-white/55">실제 시스템 화면 구성을 단순화한 예시이며, 수치는 예시 데이터입니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
