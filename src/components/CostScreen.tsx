import { CountUp } from "./CountUp";

/*
 * 물류비 리포트 화면 — 고객사 전용 운송 관리 화면(예산 대비 집행률, 임시차·택배 비용)을 단순화한 데모.
 * LOGEET System 섹션의 '물류비 리포트' 탭에 들어간다.
 * 아래 수치는 모두 예시 데이터(단위: 만원)이며 실제 고객사 실적이 아니다.
 */
const MONTHS = [
  { m: "1월", plan: 4200, actual: 3900 },
  { m: "2월", plan: 4500, actual: 4300 },
  { m: "3월", plan: 4300, actual: 4700 },
  { m: "4월", plan: 4600, actual: 4400 },
  { m: "5월", plan: 4400, actual: 4100 },
  { m: "6월", plan: 4500, actual: 4300 },
];
const BY_TYPE = [
  { k: "임시차", v: 9800 },
  { k: "택배(B2C)", v: 6900 },
  { k: "간선운송", v: 6200 },
  { k: "택배(B2B)", v: 2800 },
];

const won = (n: number) => n.toLocaleString("ko-KR");
const planSum = MONTHS.reduce((s, d) => s + d.plan, 0);
const actualSum = MONTHS.reduce((s, d) => s + d.actual, 0);
const rate = (actualSum / planSum) * 100;
const last = MONTHS[MONTHS.length - 1];
const prev = MONTHS[MONTHS.length - 2];
const mom = ((last.actual - prev.actual) / prev.actual) * 100;

const C = { plan: "#d3d9e3", actual: "#1d4ed8", over: "#c2410c", grid: "#eceef2", base: "#9ca3af", axis: "#6b7280" };

function Panel({ title, note, children, className = "" }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 rounded-md border border-line bg-paper shadow-card ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5">
        <h3 className="text-[14px] font-bold text-ink">{title}</h3>
        {note && <p className="text-[12px] font-medium text-sub">{note}</p>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Legend({ items }: { items: [label: string, color: string, shape?: "box" | "line"][] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-medium text-body">
      {items.map(([label, color, shape]) => (
        <li key={label} className="flex items-center gap-1.5">
          <span className={shape === "line" ? "h-0.5 w-3.5 rounded-full" : "size-2.5 rounded-[2px]"} style={{ background: color }} />
          {label}
        </li>
      ))}
    </ul>
  );
}

/** 월별 계획 대비 실적 — 묶음 막대, 축 하나 */
function PlanActualChart() {
  const W = 560, H = 236, L = 46, R = 8, T = 20, B = 28, MAX = 5000;
  const gw = (W - L - R) / MONTHS.length;
  const y = (v: number) => T + (1 - v / MAX) * (H - T - B);
  const bw = 16;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="월별 계획 대비 실적 막대 그래프 (예시 데이터)">
      {[0, 1250, 2500, 3750, 5000].map((g) => (
        <g key={g}>
          <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} stroke={g === 0 ? C.base : C.grid} strokeDasharray={g === 0 ? undefined : "3 3"} />
          {g % 2500 === 0 && (
            <text x={L - 10} y={y(g) + 4} textAnchor="end" fontSize="11" fill={C.axis} style={{ fontVariantNumeric: "tabular-nums" }}>
              {won(g)}
            </text>
          )}
        </g>
      ))}
      {MONTHS.map((d, i) => {
        const cx = L + gw * i + gw / 2;
        const over = d.actual > d.plan;
        return (
          <g key={d.m}>
            <rect className="os-grow-y" style={{ animationDelay: `${i * 90}ms` }} x={cx - bw - 1.5} y={y(d.plan)} width={bw} height={y(0) - y(d.plan)} rx="2" fill={C.plan}>
              <title>{`${d.m} 계획 ${won(d.plan)}만원`}</title>
            </rect>
            <rect className="os-grow-y" style={{ animationDelay: `${i * 90 + 45}ms` }} x={cx + 1.5} y={y(d.actual)} width={bw} height={y(0) - y(d.actual)} rx="2" fill={over ? C.over : C.actual}>
              <title>{`${d.m} 실적 ${won(d.actual)}만원${over ? " (계획 초과)" : ""}`}</title>
            </rect>
            {over && (
              <text x={cx + 1.5 + bw / 2} y={y(d.actual) - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.over}>
                ▲{Math.round(((d.actual - d.plan) / d.plan) * 100)}%
              </text>
            )}
            <text x={cx} y={H - 8} textAnchor="middle" fontSize="11" fill={C.axis}>
              {d.m}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function CostScreen() {
  const typeMax = Math.max(...BY_TYPE.map((t) => t.v));
  const typeSum = BY_TYPE.reduce((s, t) => s + t.v, 0);
  const kpis = [
    { label: "상반기 계획", value: won(planSum), unit: "만원" },
    { label: "상반기 실적", value: won(actualSum), unit: "만원" },
    { label: "예산 집행률", value: rate.toFixed(1), unit: "%" },
    { label: `${last.m} 전월 대비`, value: `${mom >= 0 ? "+" : ""}${mom.toFixed(1)}`, unit: "%" },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
        <p className="flex items-center gap-2.5 text-[17px] font-bold text-blue">
          <span aria-hidden="true" className="h-5 w-1 rounded-full bg-blue" />
          물류비 리포트
        </p>
        <p className="rounded border border-line bg-gray px-2 py-0.5 text-[12px] font-medium tabular-nums text-sub">2026.01 – 06 · 단위 만원</p>
      </div>
      {/* 핵심 지표 — 집행률만 블루로 강조 */}
      <dl className="grid grid-cols-2 overflow-hidden rounded-md border border-line bg-paper shadow-card lg:grid-cols-4">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className={`px-4 py-4 sm:px-5 sm:py-5 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${
              i === 2 ? "lg:border-l" : ""
            }`}
          >
            <dt className="text-[12px] font-semibold text-sub">{k.label}</dt>
            <dd className={`mt-2 text-[1.6rem] font-bold leading-none tabular-nums tracking-tight sm:text-[2rem] ${i === 2 ? "text-blue" : "text-ink"}`}>
              <CountUp value={k.value} />
              <span className="ml-1 text-[13px] font-semibold tracking-normal text-sub">{k.unit}</span>
            </dd>
            {i === 2 && (
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-gray">
                <div className="os-grow-x h-full rounded-full bg-blue" style={{ width: `${Math.min(rate, 100)}%` }} />
              </div>
            )}
          </div>
        ))}
      </dl>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Panel title="월별 계획 대비 실적" className="xl:col-span-2">
          <Legend items={[["계획", C.plan], ["실적", C.actual], ["계획 초과", C.over]]} />
          <div className="-mx-1 mt-4 overflow-x-auto px-1">
            <div className="min-w-[520px] sm:min-w-0">
              <PlanActualChart />
            </div>
          </div>
        </Panel>

        <Panel title="운송 유형별 비용" note="상반기 누적">
          <ul className="space-y-5">
            {BY_TYPE.map((t) => (
              <li key={t.k}>
                <div className="flex items-baseline justify-between gap-3 text-[14px]">
                  <span className="font-semibold text-charcoal">{t.k}</span>
                  <span className="tabular-nums">
                    <span className="font-bold text-ink">{won(t.v)}만원</span>
                    <span className="ml-2 inline-block w-9 text-right text-[12px] font-medium text-sub">
                      {Math.round((t.v / typeSum) * 100)}%
                    </span>
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray">
                  <div className="os-grow-x h-full rounded-full" style={{ width: `${(t.v / typeMax) * 100}%`, background: C.actual }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
