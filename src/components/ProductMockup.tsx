const BARS = [
  { month: "1월", plan: 30, actual: 22, over: false },
  { month: "2월", plan: 46, actual: 32, over: false },
  { month: "3월", plan: 40, actual: 58, over: true },
  { month: "4월", plan: 42, actual: 61, over: true },
  { month: "5월", plan: 44, actual: 38, over: false },
  { month: "6월", plan: 44, actual: 30, over: false },
];

/** 실사진 대신 사용하는 비주얼 — 자체 개발 수배송관리 시스템(ship.logeet.co.kr) 화면을 단순화한 목업입니다. */
export function ProductMockup() {
  return (
    <div className="w-full overflow-hidden rounded-[28px] border border-ink/5 bg-white shadow-[0_30px_60px_-20px_rgba(23,23,23,0.18)]">
      <div className="flex items-center gap-2 border-b border-ink/6 bg-paper-alt px-5 py-3">
        <span className="size-2.5 rounded-full bg-ink/12" />
        <span className="size-2.5 rounded-full bg-ink/12" />
        <span className="size-2.5 rounded-full bg-ink/12" />
        <span className="ml-3 rounded-full bg-white px-3.5 py-1 text-[11px] font-medium text-steel">
          ship.logeet.co.kr
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 p-4 sm:gap-3 sm:p-5">
        <MiniKpi label="이번달 계획" value="4,400만" />
        <MiniKpi label="이번달 실적" value="3,000만" tone="blue" />
        <MiniKpi label="집행률" value="68%" tone="ink" />
      </div>
      <div className="px-4 pb-5 sm:px-5">
        <p className="mb-3 text-[12px] font-semibold text-steel">월별 계획 대비 실적</p>
        <div className="flex h-28 items-end gap-2.5 sm:gap-3">
          {BARS.map((b) => (
            <div key={b.month} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-24 w-full items-end justify-center gap-[3px]">
                <div
                  className="w-full rounded-t-md bg-ink/8"
                  style={{ height: `${b.plan}%` }}
                />
                <div
                  className={`w-full rounded-t-md ${b.over ? "bg-coral" : "bg-blue"}`}
                  style={{ height: `${b.actual}%` }}
                />
              </div>
              <span className="text-[10px] font-medium text-steel-soft">{b.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniKpi({
  label,
  value,
  tone = "steel",
}: {
  label: string;
  value: string;
  tone?: "steel" | "blue" | "ink";
}) {
  const color = tone === "blue" ? "text-blue" : tone === "ink" ? "text-ink" : "text-steel";
  return (
    <div className="rounded-2xl bg-paper-alt px-3 py-2.5">
      <p className="text-[10px] font-medium text-steel-soft">{label}</p>
      <p className={`mt-0.5 text-base font-bold ${color} sm:text-lg`}>{value}</p>
    </div>
  );
}
