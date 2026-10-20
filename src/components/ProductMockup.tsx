const BARS = [
  { month: "1월", plan: 30, actual: 22, over: false },
  { month: "2월", plan: 46, actual: 32, over: false },
  { month: "3월", plan: 40, actual: 58, over: true },
  { month: "4월", plan: 42, actual: 61, over: true },
  { month: "5월", plan: 44, actual: 38, over: false },
  { month: "6월", plan: 44, actual: 30, over: false },
];
// 물류비 대시보드 섹션(Dashboard.tsx BY_TYPE)과 같은 예시 값, 큰 순서
const BY_TYPE = [
  { k: "임시차", v: 9800 },
  { k: "택배(B2C)", v: 6900 },
  { k: "간선운송", v: 6200 },
  { k: "택배(B2B)", v: 2800 },
];

/** 실사진 대신 사용하는 비주얼 — 자체 개발 수배송관리 시스템(center.logeet.co.kr) 화면을 단순화한 목업입니다. */
export function ProductMockup() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white">
      <div className="flex items-center gap-2 border-b border-line bg-gray px-5 py-3">
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="ml-3 border border-line bg-white px-3.5 py-1 text-[11px] font-medium text-body">
          center.logeet.co.kr
        </span>
        <span className="ml-auto text-[12px] font-semibold text-sub">예시 데이터</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 p-4 sm:gap-3 sm:p-5">
        <MiniKpi label="이번달 계획" value="4,400만" />
        <MiniKpi label="이번달 실적" value="3,000만" tone="accent" />
        <MiniKpi label="집행률" value="68%" tone="ink" />
      </div>
      {/* 차트가 남는 높이를 채운다 — 막대는 빈 칸·막대를 flex 비율(100−값 : 값)로 나눠 그린다 */}
      <div className="flex flex-1 flex-col px-4 pb-5 sm:px-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-body">월별 계획 대비 실적</p>
          <p className="flex items-center gap-2.5 text-[11px] text-body">
            <Legend className="bg-slate-200">계획</Legend>
            <Legend className="bg-blue">실적</Legend>
            <Legend className="bg-orange">초과</Legend>
          </p>
        </div>
        <div className="flex min-h-[150px] flex-1 gap-2.5 sm:gap-3">
          {BARS.map((b) => (
            <div key={b.month} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full flex-1 justify-center gap-[3px]">
                {[
                  [b.plan, "bg-slate-200"],
                  [b.actual, b.over ? "bg-orange" : "bg-blue"],
                ].map(([v, c], j) => (
                  <div key={j} className="flex w-full flex-col">
                    <div aria-hidden="true" style={{ flex: 100 - (v as number) }} />
                    <div className={`rounded-t ${c}`} style={{ flex: v as number }} />
                  </div>
                ))}
              </div>
              <span className="text-[11px] font-medium text-sub">{b.month}</span>
            </div>
          ))}
        </div>
      </div>
      {/* 운송 유형별 비용 — 물류비 대시보드 섹션과 같은 예시 값 */}
      <div className="border-t border-line px-4 py-5 sm:px-5">
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <p className="text-[12px] font-semibold text-body">운송 유형별 비용</p>
          <p className="text-[11px] text-sub">상반기 누적 · 만원</p>
        </div>
        <ul className="space-y-3">
          {BY_TYPE.map((t) => (
            <li key={t.k} className="grid grid-cols-[5.5rem_1fr_4.5rem] items-center gap-3 text-[12px]">
              <span className="font-semibold text-charcoal">{t.k}</span>
              <span className="h-1.5 overflow-hidden rounded-full bg-gray">
                <span className="block h-full rounded-full bg-blue" style={{ width: `${(t.v / BY_TYPE[0].v) * 100}%` }} />
              </span>
              <span className="text-right tabular-nums text-ink">{t.v.toLocaleString("ko-KR")}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Legend({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1">
      <span className={`size-2 rounded-sm ${className}`} />
      {children}
    </span>
  );
}

function MiniKpi({
  label,
  value,
  tone = "steel",
}: {
  label: string;
  value: string;
  tone?: "steel" | "accent" | "ink";
}) {
  const color = tone === "accent" ? "text-blue" : tone === "ink" ? "text-ink" : "text-body";
  return (
    <div className="rounded-xl bg-gray px-3 py-2.5">
      <p className="text-[11px] font-medium text-sub">{label}</p>
      <p className={`mt-0.5 text-base font-bold ${color} sm:text-lg`}>{value}</p>
    </div>
  );
}
