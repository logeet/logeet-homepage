import { CalendarDays, LayoutDashboard, Package, Truck, Upload } from "lucide-react";
import { SectionTitle } from "./Services";

/*
 * 물류비 대시보드 — 고객사 전용 운송 관리 화면(예산 대비 집행률, 임시차·택배 비용)을 단순화한 데모.
 * 아래 수치는 모두 예시 데이터(단위: 만원)이며 실제 고객사 실적이 아니다.
 */
const MONTHS = [
  { m: "1월", plan: 4200, actual: 3900, b2c: 1050, b2b: 430 },
  { m: "2월", plan: 4500, actual: 4300, b2c: 1120, b2b: 450 },
  { m: "3월", plan: 4300, actual: 4700, b2c: 1260, b2b: 520 },
  { m: "4월", plan: 4600, actual: 4400, b2c: 1180, b2b: 480 },
  { m: "5월", plan: 4400, actual: 4100, b2c: 1110, b2b: 450 },
  { m: "6월", plan: 4500, actual: 4300, b2c: 1180, b2b: 470 },
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

const C = { plan: "#d3d9e3", actual: "#1d4ed8", over: "#c2410c", b2c: "#1d4ed8", b2b: "#0d9488", grid: "#eceef2", base: "#9ca3af", axis: "#6b7280" };

// 실제 고객사 대시보드의 메뉴 구성
const MENU = [
  { label: "운송 관리 현황", icon: LayoutDashboard },
  { label: "임시차 현황", icon: Truck },
  { label: "택배 현황", icon: Package },
  { label: "데이터 업로드", icon: Upload },
];

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
            <rect className="grow-y" x={cx - bw - 1.5} y={y(d.plan)} width={bw} height={y(0) - y(d.plan)} rx="2" fill={C.plan}>
              <title>{`${d.m} 계획 ${won(d.plan)}만원`}</title>
            </rect>
            <rect className="grow-y" x={cx + 1.5} y={y(d.actual)} width={bw} height={y(0) - y(d.actual)} rx="2" fill={over ? C.over : C.actual}>
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

/** 월별 택배비 추이 — B2C·B2B 두 선, 끝에 직접 라벨 */
function ParcelTrendChart() {
  const W = 320, H = 280, L = 40, R = 40, T = 14, B = 26, MAX = 1400;
  const x = (i: number) => L + (i * (W - L - R)) / (MONTHS.length - 1);
  const y = (v: number) => T + (1 - v / MAX) * (H - T - B);
  const series: ["b2c" | "b2b", string, string][] = [
    ["b2c", "B2C", C.b2c],
    ["b2b", "B2B", C.b2b],
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="월별 택배비 추이 선 그래프 (예시 데이터)">
      {[0, 700, 1400].map((g) => (
        <g key={g}>
          <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} stroke={g === 0 ? C.base : C.grid} strokeDasharray={g === 0 ? undefined : "3 3"} />
          <text x={L - 8} y={y(g) + 4} textAnchor="end" fontSize="11" fill={C.axis}>
            {won(g)}
          </text>
        </g>
      ))}
      {series.map(([key, label, color]) => {
        const pts = MONTHS.map((d, i) => `${x(i)},${y(d[key])}`).join(" ");
        const lastV = MONTHS[MONTHS.length - 1][key];
        return (
          <g key={key}>
            <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            {MONTHS.map((d, i) => (
              <circle key={d.m} cx={x(i)} cy={y(d[key])} r="3.5" fill="#fff" stroke={color} strokeWidth="2">
                <title>{`${d.m} ${label} ${won(d[key])}만원`}</title>
              </circle>
            ))}
            <text x={x(MONTHS.length - 1) + 9} y={y(lastV) + 4} fontSize="11" fontWeight="700" fill={color}>
              {label}
            </text>
          </g>
        );
      })}
      {MONTHS.map((d, i) => (
        <text key={d.m} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill={C.axis}>
          {d.m}
        </text>
      ))}
    </svg>
  );
}

export function Dashboard() {
  const typeMax = Math.max(...BY_TYPE.map((t) => t.v));
  const typeSum = BY_TYPE.reduce((s, t) => s + t.v, 0);
  const kpis = [
    { label: "상반기 계획", value: won(planSum), unit: "만원" },
    { label: "상반기 실적", value: won(actualSum), unit: "만원" },
    { label: "예산 집행률", value: rate.toFixed(1), unit: "%" },
    { label: `${last.m} 전월 대비`, value: `${mom >= 0 ? "+" : ""}${mom.toFixed(1)}`, unit: "%" },
  ];

  return (
    <section id="dashboard" aria-labelledby="dashboard-title" className="on-dark bg-navy py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="dashboard-title"
          tone="dark"
          eyebrow="Cost Visibility"
          title="정산서가 아닌, 항목별 숫자로 보고합니다"
          desc="예산 대비 집행률부터 운송 유형별 비용, B2B·B2C 택배비까지 매달 한 화면에서 확인합니다."
          oneLine
        />

        {/* 업무용 앱 창 */}
        <div className="reveal mt-14 overflow-hidden rounded-lg bg-gray text-ink shadow-product lg:mt-16">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <p className="flex items-center gap-2.5 text-[15px]">
                <span className="font-extrabold tracking-tight text-navy">LOGEET</span>
                <span aria-hidden="true" className="h-3.5 w-px bg-line-strong" />
                <span className="font-semibold text-charcoal">운송 관리</span>
              </p>
              <span className="hidden items-center gap-1.5 rounded border border-line bg-gray px-2.5 py-1 text-[12px] font-medium tabular-nums text-body sm:inline-flex">
                <CalendarDays aria-hidden="true" className="size-3.5 text-sub" />
                2026.01 – 06
              </span>
            </div>
            <span className="rounded border border-amber-300 bg-amber-50 px-2.5 py-1 text-[12px] font-bold text-amber-900">
              데모 화면 · 예시 데이터
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-[220px_1fr]">
            {/* 사이드바 */}
            <nav aria-label="데모 화면 메뉴" className="hidden border-r border-line bg-paper px-3 py-5 lg:block">
              <p className="px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-sub">메뉴</p>
              <ul className="mt-3 space-y-0.5 text-[14px]">
                {MENU.map((m, i) => (
                  <li
                    key={m.label}
                    aria-current={i === 0 ? "page" : undefined}
                    className={`relative flex items-center gap-2.5 rounded px-3 py-2.5 ${
                      i === 0 ? "bg-blue-soft font-bold text-blue" : "font-medium text-body"
                    }`}
                  >
                    {i === 0 && <span aria-hidden="true" className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-blue" />}
                    <m.icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
                    {m.label}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0 p-3 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-4">
                <p className="text-lg font-bold tracking-tight">운송 관리 현황</p>
                <p className="rounded border border-line bg-paper px-2 py-0.5 text-[12px] font-medium text-sub">단위 만원</p>
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
                      {k.value}
                      <span className="ml-1 text-[13px] font-semibold tracking-normal text-sub">{k.unit}</span>
                    </dd>
                    {i === 2 && (
                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-gray">
                        <div className="grow-x h-full rounded-full bg-blue" style={{ width: `${Math.min(rate, 100)}%` }} />
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
                          <div className="grow-x h-full rounded-full" style={{ width: `${(t.v / typeMax) * 100}%`, background: C.actual }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </Panel>

                <Panel title="월별 비용 상세" className="hidden md:block xl:col-span-2">
                  <table className="w-full text-right text-[14px] tabular-nums">
                    <caption className="sr-only">월별 계획, 실적, 차이, 집행률 (예시 데이터, 단위 만원)</caption>
                    <thead>
                      <tr className="border-b border-line text-[12px] text-sub">
                        <th scope="col" className="px-3 pb-2.5 text-left font-semibold">월</th>
                        <th scope="col" className="px-3 pb-2.5 font-semibold">계획</th>
                        <th scope="col" className="px-3 pb-2.5 font-semibold">실적</th>
                        <th scope="col" className="px-3 pb-2.5 font-semibold">차이</th>
                        <th scope="col" className="px-3 pb-2.5 font-semibold">집행률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MONTHS.map((d) => {
                        const diff = d.actual - d.plan;
                        return (
                          <tr key={d.m} className="border-b border-line/80 transition-colors duration-150 hover:bg-gray/70">
                            <th scope="row" className="px-3 py-2.5 text-left font-semibold text-charcoal">{d.m}</th>
                            <td className="px-3 py-2.5 text-body">{won(d.plan)}</td>
                            <td className="px-3 py-2.5 font-semibold text-ink">{won(d.actual)}</td>
                            <td className={`px-3 py-2.5 ${diff > 0 ? "font-bold text-orange" : "text-sub"}`}>
                              {diff > 0 ? "▲" : "▼"} {won(Math.abs(diff))}
                            </td>
                            <td className="px-3 py-2.5 text-body">{((d.actual / d.plan) * 100).toFixed(1)}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-ink/15 font-bold">
                        <th scope="row" className="px-3 py-3 text-left">합계</th>
                        <td className="px-3 py-3">{won(planSum)}</td>
                        <td className="px-3 py-3">{won(actualSum)}</td>
                        <td className="px-3 py-3">▼ {won(planSum - actualSum)}</td>
                        <td className="px-3 py-3 text-blue">{rate.toFixed(1)}%</td>
                      </tr>
                    </tfoot>
                  </table>
                </Panel>

                <Panel title="B2B · B2C 택배비 추이" className="hidden md:block">
                  <Legend items={[["B2C", C.b2c, "line"], ["B2B", C.b2b, "line"]]} />
                  <div className="mt-4">
                    <ParcelTrendChart />
                  </div>
                </Panel>
              </div>
              <p className="mt-3 px-1 text-[12px] text-sub md:hidden">월별 상세 표와 택배비 추이는 PC 화면에서 볼 수 있습니다.</p>
            </div>
          </div>
        </div>
        <p className="mt-5 text-[13px] text-white/55">
          화면의 모든 수치는 예시 데이터이며 실제 고객사 실적이나 비용 절감 효과를 의미하지 않습니다.
        </p>
      </div>
    </section>
  );
}
