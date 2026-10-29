"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Truck, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { CostScreen } from "./CostScreen";
import { CountUp } from "./CountUp";

/** 창 위쪽에 돌아가며 뜨는 작업 소식 (예시) — 초록 불빛과 함께 '일하는 중' 느낌 */
function Ticker({ items }: { items: string[] }) {
  const [i, setI] = useState(0);
  const reduced = useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE).matches, () => false);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 2600);
    return () => clearInterval(t);
  }, [items.length, reduced]);
  return (
    <span aria-hidden="true" className="ml-4 hidden min-w-0 flex-1 items-center gap-2 text-[12px] font-semibold text-emerald-700 md:flex">
      <span className="relative flex size-2 shrink-0">
        {!reduced && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />}
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      <span key={i} className="rise-in truncate">
        {items[i]}
      </span>
    </span>
  );
}

/** 시스템 화면을 단순화한 창 틀 (주소창 + 작업 소식 + 본문) */
function Window({ children, feed }: { children: React.ReactNode; feed: string[] }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-white text-ink">
      <div className="flex items-center gap-2 border-b border-line bg-gray px-5 py-3">
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="ml-3 rounded border border-line bg-white px-3 py-1 text-[12px] font-medium text-body">
          center.logeet.co.kr
        </span>
        <Ticker items={feed} />
        <span className="ml-auto shrink-0 pl-3 text-[12px] font-semibold text-sub">예시 데이터</span>
      </div>
      {/* 본문은 남는 높이를 채운다 — 각 화면의 마지막 블록(flex-1)이 늘어나 아래 빈 공간이 생기지 않음 */}
      <div className="os-sweep flex flex-1 flex-col p-5 sm:p-7">{children}</div>
    </div>
  );
}

const fmt = (n: number) => n.toLocaleString("ko-KR");

/** 화면 상단 지표 한 줄 (3칸) */
function Kpis({ items }: { items: [label: string, value: string, unit: string, accent?: boolean][] }) {
  return (
    <dl className="grid grid-cols-3 divide-x divide-line rounded-md border border-line">
      {items.map(([l, v, u, a], k) => (
        <div key={l} className="os-pop px-3 py-3 sm:px-4" style={{ animationDelay: `${k * 90}ms` }}>
          <dt className="text-[11px] font-semibold text-sub sm:text-[12px]">{l}</dt>
          <dd className={`mt-1.5 text-lg font-bold leading-none tabular-nums sm:text-xl ${a ? "text-blue" : "text-ink"}`}>
            <CountUp value={v} />
            <span className="ml-0.5 text-[11px] font-medium text-sub">{u}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function PanelTitle({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <p className="text-[13px] font-semibold text-charcoal">{children}</p>
      {note && <p className="text-[11px] text-sub">{note}</p>}
    </div>
  );
}

/**
 * 막대 차트 공통 — 빈 칸(spacer)과 막대를 flex 비율로 나눠, 차트 영역이 늘어난 만큼 막대도 같은 비율로 커진다.
 * spacer : 막대 = (최댓값×1.2 − 값) : 값 → 가장 큰 막대 위에도 숫자 들어갈 여유가 남는다.
 */
function GrowBar({ value, max, children }: { value: number; max: number; children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden="true" style={{ flex: max * 1.2 - value }} />
      {children}
    </>
  );
}

function MiniBars({ data, labels, highlight }: { data: number[]; labels: string[]; highlight?: number }) {
  const max = Math.max(...data);
  return (
    <div className="mt-3 flex min-h-[130px] flex-1 gap-2">
      {data.map((v, i) => (
        <div key={labels[i]} className="flex flex-1 flex-col items-center">
          <GrowBar value={v} max={max}>
            <span className="os-pop mb-1 text-[10px] tabular-nums text-sub" style={{ animationDelay: `${300 + i * 70}ms` }}>
              {fmt(v)}
            </span>
            <div
              className={`os-grow-y w-full rounded-t-sm ${i === highlight ? "os-live bg-linear-to-t from-blue to-sky-400 shadow-[0_0_18px_rgba(29,78,216,0.55)]" : "bg-blue/25"}`}
              style={{ flex: v, animationDelay: `${i * 70}ms` }}
            />
          </GrowBar>
          <span className="mt-1.5 text-[11px] text-sub">{labels[i]}</span>
        </div>
      ))}
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
// 지금 팔레트가 들어오고 있는 빈 칸들과 각자 시작 시각
const STORING: Record<number, string> = { 6: "1.2s", 13: "2.6s", 26: "3.8s" };

const ZONES: [string, number][] = [
  ["A구역", 86],
  ["B구역", 74],
  ["C구역", 81],
];
const OUTBOUND = [520, 610, 580, 702, 655, 430, 642]; // 최근 7일 박스 출고 (마지막 = 오늘)
const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

function StorageView() {
  const cells = RACK.flat();
  const rate = Math.round((cells.reduce((s, c) => s + c, 0) / (cells.length * 2)) * 100);
  return (
    <Window feed={["A구역 입고 38팔레트 적치 완료", "B-03 로케이션 재고 실사 완료", "C구역 피킹 지시 24건 전달", "오늘 출고 642박스 처리 중"]}>
      <Kpis
        items={[
          ["적재율", `${rate}`, "%", true],
          ["보관 SKU", "1,284", "개"],
          ["오늘 출고", fmt(OUTBOUND[OUTBOUND.length - 1]), "박스"],
        ]}
      />
      <div className="mt-6 grid gap-6 sm:grid-cols-[1.5fr_1fr]">
        <div>
          <PanelTitle>랙 적재 현황</PanelTitle>
          <div className="relative mt-3 grid grid-cols-8 gap-1 overflow-hidden">
            <span aria-hidden="true" className="os-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4" />
            {cells.map((c, i) => (
              <span
                key={i}
                className={`os-pop h-6 rounded-[2px] sm:h-8 ${CELL[c]}`}
                style={{ animationDelay: `${i * 18}ms` }}
              >
                {STORING[i] && <span className="os-store block size-full rounded-[2px]" style={{ animationDelay: STORING[i] }} />}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-[11px] text-body">
            {["적재", "일부", "빈 칸"].map((l, i) => (
              <span key={l} className="flex items-center gap-1.5">
                <span className={`size-2 rounded-[2px] ${CELL[2 - i]}`} />
                {l}
              </span>
            ))}
          </div>
        </div>
        <div>
          <PanelTitle>구역별 적재율</PanelTitle>
          <ul className="mt-3 space-y-3.5">
            {ZONES.map(([z, v]) => (
              <li key={z}>
                <div className="flex justify-between text-[12px]">
                  <span className="font-semibold text-charcoal">{z}</span>
                  <span className="tabular-nums text-body">{v}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray">
                  <div className="os-grow-x h-full rounded-full bg-blue" style={{ width: `${v}%`, animationDelay: "200ms" }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 flex flex-1 flex-col border-t border-line pt-5">
        <PanelTitle note="최근 7일 · 박스">일별 박스 출고</PanelTitle>
        <MiniBars data={OUTBOUND} labels={DAYS} highlight={OUTBOUND.length - 1} />
      </div>
    </Window>
  );
}

const ROUTES = [
  { name: "노선 A", type: "임시차", cost: 3120, trips: 42 },
  { name: "노선 B", type: "고정계약", cost: 2860, trips: 30 },
  { name: "노선 C", type: "임시차", cost: 1940, trips: 27 },
];
const WEEKS = [1180, 1320, 1240, 1320]; // 이번 달 주차별 임시차 비용 — 합계 = 노선 A + C

function RouteView() {
  const temp = ROUTES.filter((r) => r.type === "임시차").reduce((s, r) => s + r.cost, 0);
  const fixed = ROUTES.filter((r) => r.type === "고정계약").reduce((s, r) => s + r.cost, 0);
  const total = temp + fixed;
  return (
    <Window feed={["노선 A 3호차 출발", "노선 C 임시차 배차 확정", "노선 B 도착 확인", "주차별 운송비 집계 반영"]}>
      <Kpis
        items={[
          ["임시차 누적", fmt(temp), "만원", true],
          ["고정계약", fmt(fixed), "만원"],
          ["운행", fmt(ROUTES.reduce((s, r) => s + r.trips, 0)), "회"],
        ]}
      />
      <div className="mt-6">
        <PanelTitle note="이번 달 누적">노선별 운송 비용</PanelTitle>
        <ul className="mt-2 divide-y divide-line">
          {ROUTES.map((r) => (
            <li key={r.name} className="flex items-center gap-3 py-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-blue-soft text-blue">
                <Truck aria-hidden="true" className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[14px] font-semibold">
                    {r.name} <span className="ml-1 text-[11px] font-medium text-sub">{r.type} · {r.trips}회</span>
                  </p>
                  <p className="shrink-0 text-[14px] font-bold tabular-nums">
                    <CountUp value={fmt(r.cost)} />
                    <span className="ml-0.5 text-[11px] font-medium text-sub">만원</span>
                  </p>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-gray">
                  <div
                    className={`os-grow-x h-full rounded-full ${r.type === "임시차" ? "bg-blue" : "bg-slate-400"}`}
                    style={{ width: `${(r.cost / total) * 100}%`, animationDelay: "200ms" }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex flex-1 flex-col border-t border-line pt-5">
        <PanelTitle note="이번 달 · 만원">주차별 임시차 비용</PanelTitle>
        <MiniBars data={WEEKS} labels={["1주", "2주", "3주", "4주"]} highlight={WEEKS.length - 1} />
      </div>
    </Window>
  );
}

const PARCEL = { b2c: 7740, b2b: 4740 };
const PARCEL_COST = { b2c: 1180, b2b: 470 }; // 물류비 리포트 탭 6월 B2C·B2B 택배비와 같은 예시 값
// 최근 6개월 채널별 출고 (마지막 = 이번 달)
const PARCEL_TREND = {
  m: ["1월", "2월", "3월", "4월", "5월", "6월"],
  b2c: [6900, 7100, 7600, 7300, 7500, PARCEL.b2c],
  b2b: [4300, 4450, 4600, 4500, 4620, PARCEL.b2b],
};

function ParcelView() {
  const total = PARCEL.b2c + PARCEL.b2b;
  const b2c = PARCEL.b2c / total;
  const R = 52;
  const L = 2 * Math.PI * R;
  const sums = PARCEL_TREND.m.map((_, i) => PARCEL_TREND.b2c[i] + PARCEL_TREND.b2b[i]);
  const prev = sums[sums.length - 2];
  const mom = ((total - prev) / prev) * 100;
  const max = Math.max(...sums);
  return (
    <Window feed={["B2C 택배 120박스 접수", "B2B 출고 42박스 집하 완료", "운송장 386건 발행", "채널별 택배비 집계 반영"]}>
      <PanelTitle note="박스">이번 달 택배 출고</PanelTitle>
      <div className="mt-4 flex items-center gap-6 sm:gap-8">
        <svg viewBox="0 0 140 140" className="size-28 shrink-0 -rotate-90 sm:size-32" aria-hidden="true">
          <circle
            cx="70"
            cy="70"
            r="66"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="2"
            strokeDasharray="3 7"
            className="animate-[spin_14s_linear_infinite]"
            style={{ transformOrigin: "70px 70px" }}
          />
          <circle cx="70" cy="70" r={R} fill="none" stroke="#0d9488" strokeWidth="18" />
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="18"
            strokeDasharray={`${b2c * L - 3} ${L}`}
            className="os-draw"
            style={{ "--len": `${b2c * L}` } as React.CSSProperties}
          />
        </svg>
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <p className="text-[12px] text-sub">총 출고</p>
              <p className="text-2xl font-bold tabular-nums">
                <CountUp value={fmt(total)} />
                <span className="ml-1 text-sm font-medium text-sub">박스</span>
              </p>
            </div>
            <p className="text-right">
              <span className="block text-[11px] text-sub">전월 대비</span>
              <span className="text-[15px] font-bold tabular-nums text-blue">
                {mom >= 0 ? "+" : ""}
                {mom.toFixed(1)}%
              </span>
            </p>
          </div>
          <ul className="mt-3 space-y-2 text-[14px]">
            {[
              ["B2C", PARCEL.b2c, "bg-blue"],
              ["B2B", PARCEL.b2b, "bg-teal-600"],
            ].map(([k, v, c]) => (
              <li key={k} className="flex items-center gap-2">
                <span className={`size-2.5 rounded-sm ${c}`} />
                <span className="font-semibold">{k}</span>
                <span className="ml-auto tabular-nums text-body">
                  {fmt(v as number)} · {Math.round(((v as number) / total) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 flex flex-1 flex-col border-t border-line pt-5">
        <PanelTitle note="최근 6개월 · 박스">채널별 출고 추이</PanelTitle>
        <div className="mt-3 flex min-h-[130px] flex-1 gap-3">
          {PARCEL_TREND.m.map((m, i) => (
            <div key={m} className="flex flex-1 flex-col items-center">
              <GrowBar value={sums[i]} max={max}>
                <span className="os-pop mb-1 text-[10px] tabular-nums text-sub" style={{ animationDelay: `${300 + i * 70}ms` }}>
                  {fmt(sums[i])}
                </span>
                <div
                  className={`os-grow-y flex w-full flex-col overflow-hidden rounded-t-sm ${i === sums.length - 1 ? "os-live" : ""}`}
                  style={{ flex: sums[i], animationDelay: `${i * 70}ms` }}
                >
                  <div className="bg-blue" style={{ flex: PARCEL_TREND.b2c[i] }} />
                  <div className="bg-teal-600" style={{ flex: PARCEL_TREND.b2b[i] }} />
                </div>
              </GrowBar>
              <span className="mt-1.5 text-[11px] text-sub">{m}</span>
            </div>
          ))}
        </div>
      </div>
      {/* 채널별 택배 비용 — 물류비 리포트 탭 6월 예시 값과 같음 */}
      <div className="mt-6 border-t border-line pt-5">
        <PanelTitle note="이번 달 · 만원">채널별 택배 비용</PanelTitle>
        <dl className="mt-3 grid grid-cols-2 gap-3">
          {[
            ["B2C 택배비", PARCEL_COST.b2c, "bg-blue"],
            ["B2B 택배비", PARCEL_COST.b2b, "bg-teal-600"],
          ].map(([k, v, c]) => (
            <div key={k as string} className="rounded-md border border-line px-4 py-3">
              <dt className="flex items-center gap-1.5 text-[12px] font-semibold text-sub">
                <span className={`size-2 rounded-[2px] ${c}`} />
                {k}
              </dt>
              <dd className="mt-1.5 text-lg font-bold tabular-nums">
                <CountUp value={fmt(v as number)} />
                <span className="ml-0.5 text-[11px] font-medium text-sub">만원</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Window>
  );
}

/** 물류비 리포트 — 예산 대비 실적 · 운송 유형별 비용 · 월별 상세 · 택배비 추이 */
function CostView() {
  return (
    <Window feed={["6월 운송비 마감 반영", "임시차 비용 3건 정산 반영", "예산 집행률 갱신", "운송 유형별 비용 집계 완료"]}>
      <CostScreen />
    </Window>
  );
}

/** 강조할 수치는 { b } 로 — 실제 시스템의 분석 인사이트처럼 굵게 따옴표 표시 */
type Part = string | { b: string };

function InsightView() {
  const total = PARCEL.b2c + PARCEL.b2b;
  const sums = PARCEL_TREND.m.map((_, i) => PARCEL_TREND.b2c[i] + PARCEL_TREND.b2b[i]);
  const mom = ((total - sums[sums.length - 2]) / sums[sums.length - 2]) * 100;
  const temp = ROUTES.filter((r) => r.type === "임시차");
  const tempSum = temp.reduce((s, r) => s + r.cost, 0);
  const top = temp.reduce((a, r) => (r.cost > a.cost ? r : a));
  const [zone, zoneRate] = ZONES.reduce((a, z) => (z[1] > a[1] ? z : a));
  // 3월 계획 4,300 · 실적 4,700 — 물류비 리포트 탭의 예시 값
  const marchOver = Math.round(((4700 - 4300) / 4300) * 100);
  // 센터 운영 현황 탭의 최근 7일 출고(OUTBOUND)에서 계산
  const peak = Math.max(...OUTBOUND);
  const peakDay = DAYS[OUTBOUND.indexOf(peak)];
  const weekdayAvg = OUTBOUND.slice(0, 5).reduce((s, v) => s + v, 0) / 5;
  const satGap = Math.round((1 - OUTBOUND[5] / weekdayAvg) * 100);

  const items: { tag: string; parts: Part[] }[] = [
    {
      tag: "물동량",
      parts: ["이번 달 택배 출고는 ", { b: `${fmt(total)} 박스` }, `(B2C ${fmt(PARCEL.b2c)} · B2B ${fmt(PARCEL.b2b)})로 전월 대비 `, { b: `${mom >= 0 ? "+" : ""}${mom.toFixed(1)}%` }, " 늘었습니다."],
    },
    { tag: "적재율", parts: [{ b: zone }, " 적재율이 ", { b: `${zoneRate}%` }, "로 85% 이상입니다. 추가 입고 시 공간 확보가 필요합니다."] },
    { tag: "운송비", parts: ["임시차 비용의 ", { b: `${Math.round((top.cost / tempSum) * 100)}%` }, "가 ", { b: top.name }, "에 집중되어 있습니다."] },
    { tag: "예산", parts: [{ b: "3월" }, " 운송비 실적이 계획 대비 ", { b: `${marchOver}%` }, " 초과했습니다."] },
    { tag: "출고", parts: ["최근 7일 중 ", { b: `${peakDay}요일` }, " 박스 출고가 ", { b: `${fmt(peak)} 박스` }, "로 가장 많았습니다."] },
    { tag: "출고", parts: [{ b: "토요일" }, " 출고는 평일 평균보다 ", { b: `${satGap}%` }, " 적습니다. 주말 인력 배치를 조정할 수 있습니다."] },
  ];

  return (
    <Window feed={["새 인사이트 2건 생성", "물동량 변화 감지", "적재율 85% 초과 구역 알림", "주간 요약 완료"]}>
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2.5 text-[17px] font-bold text-blue">
          <span aria-hidden="true" className="h-5 w-1 rounded-full bg-blue" />
          분석 인사이트
        </p>
        <span className="rounded border border-line bg-gray px-2 py-0.5 text-[11px] font-semibold text-sub">최근 보고일 기준 자동 요약</span>
      </div>
      {/* 문장 행들이 남는 높이를 고르게 나눠 가짐 */}
      <ul className="mt-5 flex flex-1 flex-col divide-y divide-line border-y border-line">
        {items.map((it, n) => (
          <li key={n} className="rise-in flex flex-1 items-center gap-3 py-3.5" style={{ animationDelay: `${150 + n * 220}ms` }}>
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-blue" />
            <p className="flex-1 text-[14px] leading-relaxed text-charcoal">
              {it.parts.map((p, i) =>
                typeof p === "string" ? (
                  p
                ) : (
                  <b key={i} className="font-bold text-ink">
                    &quot;{p.b}&quot;
                  </b>
                ),
              )}
            </p>
            <span className="shrink-0 rounded bg-blue-soft px-2 py-0.5 text-[11px] font-bold text-blue">{it.tag}</span>
          </li>
        ))}
      </ul>
      {/* 인사이트의 근거가 된 지표 */}
      <div className="mt-5">
        <PanelTitle>근거 지표</PanelTitle>
        <div className="mt-3">
          <Kpis
            items={[
              ["택배 출고", fmt(total), "박스", true],
              [`${zone} 적재율`, `${zoneRate}`, "%"],
              [`${top.name} 임시차`, fmt(top.cost), "만원"],
            ]}
          />
        </div>
      </div>
    </Window>
  );
}

const TABS = [
  { key: "운영 현황", title: "센터 운영 현황", desc: "적재율·재고·출고 추이를 봅니다.", View: StorageView },
  { key: "운송", title: "임시차 · 운송 비용", desc: "노선별 비용을 임시차·고정계약으로 나눠 봅니다.", View: RouteView },
  { key: "택배", title: "택배 B2B · B2C", desc: "채널별 물량과 비용을 봅니다.", View: ParcelView },
  { key: "리포트", title: "물류비 리포트", desc: "예산 대비 집행률과 항목별 비용을 봅니다.", View: CostView },
  { key: "인사이트", title: "분석 인사이트", desc: "주요 변화를 문장으로 요약해 알려줍니다.", View: InsightView },
];

// 고객사 시스템 코드로 확인한 '제공 중' 기능. 개발 예정 기능은 status: "planned"로 추가하면 따로 표시된다.
const FEATURES: { name: string; status: "live" | "planned" }[] = [
  { name: "센터 운영 현황 (적재율 · 재고 · 박스 출고)", status: "live" },
  { name: "센터별 운송비 · 물량, 노선 · 배송 코스 현황", status: "live" },
  { name: "예산 대비 집행률, 임시차 · 택배(B2B · B2C) 누적 비용", status: "live" },
  { name: "시즌 반품 현황 관리", status: "live" },
  { name: "엑셀 · 구글 시트 데이터 업로드 · 동기화", status: "live" },
  { name: "계정별 접근 권한 관리", status: "live" },
  { name: "분석 인사이트 (물동량 · 적재율 · 비용 변화 자동 요약)", status: "live" }, // 고객사 시스템 화면으로 확인
];

const AUTO_MS = 6000; // 자동 넘김 간격

// '움직임 줄이기' 설정 — 서버에선 false로 두고 브라우저에서 실제 값을 읽는다(하이드레이션 안전)
const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const m = window.matchMedia(REDUCE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

export function OsTabs() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // 탭을 직접 누르면 false — 자동 넘김 끝
  const [inView, setInView] = useState(false); // 섹션이 화면에 보일 때만 넘김
  const reduced = useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE).matches, () => false);
  const sectionRef = useRef<HTMLElement>(null);
  const tab = TABS[active];
  const running = auto && inView && !reduced;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // 섹션이 화면 가운데 띠(위아래 30% 제외)에 걸치면 '보임' — 섹션이 화면보다 길어도(모바일) 동작
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "-30% 0px -30% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 탭이 바뀔 때마다 타이머를 새로 걸어 진행 표시와 맞춘다
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % TABS.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [running, active]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section ref={sectionRef} id="os" aria-labelledby="os-title" className="on-dark border-t border-white/5 bg-navy-deep py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* 제품 소개 머리말 */}
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.14em] text-sky-300">
              <span aria-hidden="true" className="h-px w-6 bg-sky-300" />
              LOGEET System
            </p>
            <h2 id="os-title" className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.3] tracking-[-0.02em] sm:text-4xl sm:leading-[1.25] lg:text-[2.6rem] lg:leading-[1.22]">
              직접 개발한 시스템으로 운영과 비용을 한눈에 봅니다
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-white/70 sm:text-lg">
              고객사는 전용 계정으로 직접 확인합니다.
            </p>
          </div>
          <a
            href={COMPANY.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-13 shrink-0 items-center gap-2 self-start rounded-sm bg-white px-6 text-[15px] font-bold text-navy transition-colors duration-200 hover:bg-sky-100 lg:self-auto"
          >
            고객사 시스템 바로가기
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">(새 창)</span>
          </a>
        </div>

        {/* 쇼케이스 — 왼쪽 기능 목록, 오른쪽 큰 화면 */}
        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-[300px_1fr] lg:gap-12">
          {/* 활성: 흰 카드 / 비활성: 테두리만 */}
          <div role="group" aria-label="시스템 화면 선택" className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 lg:content-start">
            {TABS.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={on}
                  aria-controls="os-panel"
                  onClick={() => pick(i)}
                  className={`group relative overflow-hidden rounded-md border px-5 py-4 text-left transition-colors duration-200 ${
                    on ? "border-white bg-white text-navy shadow-[0_0_44px_-10px_rgba(59,130,246,0.75)]" : "border-white/10 hover:border-white/25 hover:bg-white/[0.03]"
                  }`}
                >
                  <span className={`text-[12px] font-bold tabular-nums tracking-[0.12em] ${on ? "text-blue" : "text-sky-300/70"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`mt-1 block text-[17px] font-bold ${on ? "text-navy" : "text-white/80"}`}>{t.title}</span>
                  <span className={`mt-1 block text-[14px] leading-relaxed ${on ? "text-body" : "text-white/50"}`}>{t.desc}</span>
                  {/* 자동 넘김 진행 표시 — 다음 탭으로 넘어갈 때까지 차오름 */}
                  {on && running && (
                    <span
                      key={active}
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-blue"
                      style={{ animation: `tab-progress ${AUTO_MS}ms linear both` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* 제품 화면 — 얇은 바깥 틀 안에 크게 */}
          {/* 자동으로 넘어가는 동안엔 화면 읽기 프로그램이 매번 읽지 않도록 */}
          <div id="os-panel" aria-live={running ? "off" : "polite"} className="flex min-w-0 flex-col">
            <div className="flex-1 rounded-xl bg-white/[0.04] p-1.5 shadow-[0_0_90px_-24px_rgba(59,130,246,0.55)] ring-1 ring-sky-300/20 sm:p-2.5 lg:min-h-[660px]">
              <div key={tab.key} className="rise-in h-full overflow-hidden rounded-lg bg-white shadow-product">
                <tab.View />
              </div>
            </div>
            <p className="mt-4 text-[12px] text-white/50">실제 시스템 화면 구성을 단순화한 예시이며, 수치는 예시 데이터입니다.</p>
          </div>
        </div>

        {/* 실제 제공 기능 */}
        <div className="reveal mt-16 border-t border-white/10 pt-10">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/50">현재 제공 중인 기능</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.filter((f) => f.status === "live").map((f) => (
              <li key={f.name} className="flex gap-2.5 text-[15px] leading-relaxed text-white/90">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sky-300" />
                {f.name}
              </li>
            ))}
          </ul>
          {FEATURES.some((f) => f.status === "planned") && (
            <>
              <h3 className="mt-8 text-[13px] font-bold text-white/60">개발 예정</h3>
              <ul className="mt-3 grid gap-2 text-[15px] text-white/60 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.filter((f) => f.status === "planned").map((f) => (
                  <li key={f.name}>{f.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
