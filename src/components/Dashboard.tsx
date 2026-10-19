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

const C = { plan: "#cbd5e1", actual: "#1d4ed8", over: "#c2410c", b2c: "#1d4ed8", b2b: "#0d9488", grid: "#e5e7eb", axis: "#6b7280" };

function Panel({ title, note, children, className = "" }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 rounded border border-line bg-paper p-5 sm:p-6 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[15px] font-bold">{title}</h3>
        {note && <p className="text-[12px] text-sub">{note}</p>}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Legend({ items }: { items: [label: string, color: string, shape?: "box" | "line"][] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-body">
      {items.map(([label, color, shape]) => (
        <li key={label} className="flex items-center gap-1.5">
          <span className={shape === "line" ? "h-0.5 w-3.5" : "size-2.5 rounded-sm"} style={{ background: color }} />
          {label}
        </li>
      ))}
    </ul>
  );
}

/** 월별 계획 대비 실적 — 묶음 막대, 축 하나 */
function PlanActualChart() {
  const W = 560, H = 230, L = 44, R = 8, T = 18, B = 26, MAX = 5000;
  const gw = (W - L - R) / MONTHS.length;
  const y = (v: number) => T + (1 - v / MAX) * (H - T - B);
  const bw = 18;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="월별 계획 대비 실적 막대 그래프 (예시 데이터)">
      {[0, 2500, 5000].map((g) => (
        <g key={g}>
          <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} stroke={g === 0 ? "#9ca3af" : C.grid} />
          <text x={L - 8} y={y(g) + 4} textAnchor="end" fontSize="11" fill={C.axis}>
            {won(g)}
          </text>
        </g>
      ))}
      {MONTHS.map((d, i) => {
        const cx = L + gw * i + gw / 2;
        const over = d.actual > d.plan;
        return (
          <g key={d.m}>
            <rect className="grow-y" x={cx - bw - 1} y={y(d.plan)} width={bw} height={y(0) - y(d.plan)} rx="3" fill={C.plan}>
              <title>{`${d.m} 계획 ${won(d.plan)}만원`}</title>
            </rect>
            <rect className="grow-y" x={cx + 1} y={y(d.actual)} width={bw} height={y(0) - y(d.actual)} rx="3" fill={over ? C.over : C.actual}>
              <title>{`${d.m} 실적 ${won(d.actual)}만원${over ? " (계획 초과)" : ""}`}</title>
            </rect>
            {over && (
              <text x={cx + 1 + bw / 2} y={y(d.actual) - 5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#111827">
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
  const W = 320, H = 200, L = 40, R = 40, T = 14, B = 26, MAX = 1400;
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
          <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} stroke={g === 0 ? "#9ca3af" : C.grid} />
          <text x={L - 6} y={y(g) + 4} textAnchor="end" fontSize="11" fill={C.axis}>
            {won(g)}
          </text>
        </g>
      ))}
      {series.map(([key, label, color]) => {
        const pts = MONTHS.map((d, i) => `${x(i)},${y(d[key])}`).join(" ");
        const lastV = MONTHS[MONTHS.length - 1][key];
        return (
          <g key={key}>
            <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
            {MONTHS.map((d, i) => (
              <circle key={d.m} cx={x(i)} cy={y(d[key])} r="4" fill={color} stroke="#fff" strokeWidth="2">
                <title>{`${d.m} ${label} ${won(d[key])}만원`}</title>
              </circle>
            ))}
            <text x={x(MONTHS.length - 1) + 8} y={y(lastV) + 4} fontSize="11" fontWeight="700" fill="#111827">
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
    <section id="dashboard" aria-labelledby="dashboard-title" className="on-dark bg-navy py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="dashboard-title"
          tone="dark"
          eyebrow="Cost Visibility"
          title="정산서 한 장이 아닌, 항목별 숫자로 보고합니다"
          desc="고객사 전용 화면에서 예산 대비 집행률, 운송 유형별 비용, B2B·B2C 택배비를 매달 확인할 수 있습니다. 아래는 실제 화면 구성을 단순화한 데모입니다."
        />

        {/* SaaS 앱 창 */}
        <div className="reveal mt-12 overflow-hidden rounded-lg border border-white/10 bg-gray text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="hidden gap-1.5 sm:flex">
                <span className="size-2.5 rounded-full bg-slate-300" />
                <span className="size-2.5 rounded-full bg-slate-300" />
                <span className="size-2.5 rounded-full bg-slate-300" />
              </span>
              <p className="text-[15px] font-bold">LOGEET 운송 관리</p>
              <span className="hidden rounded border border-line px-2 py-0.5 text-[12px] font-medium text-body sm:inline">2026.01 – 06</span>
            </div>
            <span className="rounded border border-amber-300 bg-amber-50 px-2.5 py-1 text-[12px] font-bold text-amber-900">
              데모 화면 · 예시 데이터
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-[210px_1fr]">
            {/* 사이드바 — 실제 고객사 대시보드의 메뉴 구성 */}
            <nav aria-label="데모 화면 메뉴" className="hidden border-r border-line bg-paper p-4 lg:block">
              <p className="px-2 text-[12px] font-bold text-sub">메뉴</p>
              <ul className="mt-2 space-y-1 text-[14px]">
                {["운송 관리 현황", "임시차 현황", "택배 현황", "데이터 업로드"].map((m, i) => (
                  <li
                    key={m}
                    aria-current={i === 0 ? "page" : undefined}
                    className={`rounded px-2.5 py-2 ${i === 0 ? "bg-blue-soft font-bold text-blue" : "text-body"}`}
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0 p-3 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 px-1 pb-3">
                <p className="text-lg font-bold">운송 관리 현황</p>
                <p className="text-[13px] text-sub">단위 만원</p>
              </div>

              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line lg:grid-cols-4">
                {kpis.map((k, i) => (
                  <div key={k.label} className="bg-paper px-4 py-4 sm:px-5">
                    <dt className="text-[13px] text-sub">{k.label}</dt>
                    <dd className={`mt-1 text-2xl font-bold tabular-nums tracking-tight sm:text-[1.75rem] ${i === 2 ? "text-blue" : ""}`}>
                      {k.value}
                      <span className="ml-1 text-sm font-medium text-sub">{k.unit}</span>
                    </dd>
                    {i === 2 && (
                      <div className="mt-2 h-1.5 overflow-hidden rounded-sm bg-gray">
                        <div className="grow-x h-full bg-blue" style={{ width: `${Math.min(rate, 100)}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </dl>

              <div className="mt-3 grid gap-3 xl:grid-cols-3">
                <Panel title="월별 계획 대비 실적" className="xl:col-span-2">
                  <Legend items={[["계획", C.plan], ["실적", C.actual], ["계획 초과", C.over]]} />
                  <div className="-mx-1 mt-3 overflow-x-auto px-1">
                    <div className="min-w-[520px] sm:min-w-0">
                      <PlanActualChart />
                    </div>
                  </div>
                </Panel>

                <Panel title="운송 유형별 비용" note="상반기 누적">
                  <ul className="space-y-4">
                    {BY_TYPE.map((t) => (
                      <li key={t.k}>
                        <div className="flex items-baseline justify-between text-[14px]">
                          <span className="font-semibold">{t.k}</span>
                          <span className="tabular-nums text-body">
                            {won(t.v)}만원 · {Math.round((t.v / typeSum) * 100)}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-2 rounded-sm bg-gray">
                          <div className="grow-x h-full rounded-sm" style={{ width: `${(t.v / typeMax) * 100}%`, background: C.actual }} />
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
                        <th scope="col" className="px-1 py-2 text-left font-semibold">월</th>
                        <th scope="col" className="px-1 py-2 font-semibold">계획</th>
                        <th scope="col" className="px-1 py-2 font-semibold">실적</th>
                        <th scope="col" className="px-1 py-2 font-semibold">차이</th>
                        <th scope="col" className="px-1 py-2 font-semibold">집행률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MONTHS.map((d) => {
                        const diff = d.actual - d.plan;
                        return (
                          <tr key={d.m} className="border-b border-line last:border-0">
                            <th scope="row" className="px-1 py-2 text-left font-semibold">{d.m}</th>
                            <td className="px-1 py-2">{won(d.plan)}</td>
                            <td className="px-1 py-2">{won(d.actual)}</td>
                            <td className={`px-1 py-2 ${diff > 0 ? "font-bold text-orange" : "text-body"}`}>
                              {diff > 0 ? "▲" : "▼"} {won(Math.abs(diff))}
                            </td>
                            <td className="px-1 py-2">{((d.actual / d.plan) * 100).toFixed(1)}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-ink/20 font-bold">
                        <th scope="row" className="px-1 py-2 text-left">합계</th>
                        <td className="px-1 py-2">{won(planSum)}</td>
                        <td className="px-1 py-2">{won(actualSum)}</td>
                        <td className="px-1 py-2">▼ {won(planSum - actualSum)}</td>
                        <td className="px-1 py-2">{rate.toFixed(1)}%</td>
                      </tr>
                    </tfoot>
                  </table>
                </Panel>

                <Panel title="B2B · B2C 택배비 추이" className="hidden md:block">
                  <Legend items={[["B2C", C.b2c, "line"], ["B2B", C.b2b, "line"]]} />
                  <div className="mt-3">
                    <ParcelTrendChart />
                  </div>
                </Panel>
              </div>
              <p className="mt-3 px-1 text-[12px] text-sub md:hidden">월별 상세 표와 택배비 추이는 PC 화면에서 볼 수 있습니다.</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[13px] text-white/60">
          화면의 모든 수치는 예시 데이터이며 실제 고객사 실적이나 비용 절감 효과를 의미하지 않습니다.
        </p>
      </div>
    </section>
  );
}
