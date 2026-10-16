const BARS = [
  { month: "1월", plan: 30, actual: 22, over: false },
  { month: "2월", plan: 46, actual: 32, over: false },
  { month: "3월", plan: 40, actual: 58, over: true },
  { month: "4월", plan: 42, actual: 61, over: true },
  { month: "5월", plan: 44, actual: 38, over: false },
  { month: "6월", plan: 44, actual: 30, over: false },
];

/** 실사진 대신 사용하는 비주얼 — 자체 개발 수배송관리 시스템(center.logeet.co.kr) 화면을 단순화한 목업입니다. */
export function ProductMockup() {
  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="flex items-center gap-2 border-b border-line bg-gray px-5 py-3">
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="ml-3 border border-line bg-white px-3.5 py-1 text-[11px] font-medium text-body">
          center.logeet.co.kr
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 p-4 sm:gap-3 sm:p-5">
        <MiniKpi label="이번달 계획" value="4,400만" />
        <MiniKpi label="이번달 실적" value="3,000만" tone="accent" />
        <MiniKpi label="집행률" value="68%" tone="ink" />
      </div>
      <div className="px-4 pb-5 sm:px-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-body">월별 계획 대비 실적</p>
          <p className="flex items-center gap-2.5 text-[11px] text-body">
            <Legend className="bg-slate-200">계획</Legend>
            <Legend className="bg-blue">실적</Legend>
            <Legend className="bg-orange">초과</Legend>
          </p>
        </div>
        <div className="flex h-28 items-end gap-2.5 sm:gap-3">
          {BARS.map((b) => (
            <div key={b.month} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-24 w-full items-end justify-center gap-[3px]">
                <div
                  className="w-full rounded-t bg-slate-200"
                  style={{ height: `${b.plan}%` }}
                />
                <div
                  className={`w-full rounded-t ${b.over ? "bg-orange" : "bg-blue"}`}
                  style={{ height: `${b.actual}%` }}
                />
              </div>
              <span className="text-[11px] font-medium text-sub">{b.month}</span>
            </div>
          ))}
        </div>
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
