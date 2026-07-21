const BARS = [
  { month: "1월", plan: 30, actual: 22, over: false },
  { month: "2월", plan: 46, actual: 32, over: false },
  { month: "3월", plan: 40, actual: 58, over: true },
  { month: "4월", plan: 42, actual: 61, over: true },
  { month: "5월", plan: 44, actual: 38, over: false },
  { month: "6월", plan: 44, actual: 30, over: false },
];

/** 실사진 대신 사용하는 히어로 비주얼 — 실제 자체 개발 물류관리 시스템(ship.logeet.co.kr) 화면을 단순화한 목업입니다. */
export function ProductMockup() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-ink/12 bg-white shadow-[0_24px_60px_-24px_rgba(20,23,28,0.35)]">
      <div className="flex items-center gap-2 border-b border-ink/10 bg-paper-dim px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="ml-3 rounded bg-white px-3 py-1 font-mono text-[11px] text-steel">
          ship.logeet.co.kr
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 border-b border-ink/10 p-3 sm:gap-3 sm:p-4">
        <MiniKpi label="이번달 계획" value="4,400만" />
        <MiniKpi label="이번달 실적" value="3,000만" tone="route" />
        <MiniKpi label="집행률" value="68%" tone="ink" />
      </div>
      <div className="p-3 sm:p-4">
        <p className="mb-3 font-mono text-[11px] tracking-wide text-steel-soft">
          월별 계획 대비 실적
        </p>
        <div className="flex h-28 items-end gap-2.5 sm:gap-3">
          {BARS.map((b) => (
            <div key={b.month} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-24 w-full items-end justify-center gap-[3px]">
                <div
                  className="w-full rounded-t-[2px] bg-ink/12"
                  style={{ height: `${b.plan}%` }}
                />
                <div
                  className={`w-full rounded-t-[2px] ${b.over ? "bg-[#d0483f]" : "bg-route"}`}
                  style={{ height: `${b.actual}%` }}
                />
              </div>
              <span className="font-mono text-[9px] text-steel-soft">{b.month}</span>
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
  tone?: "steel" | "route" | "ink";
}) {
  const color = tone === "route" ? "text-route" : tone === "ink" ? "text-ink" : "text-steel";
  return (
    <div className="rounded border border-ink/8 bg-paper px-2.5 py-2 sm:px-3">
      <p className="font-mono text-[9px] tracking-wide text-steel-soft sm:text-[10px]">{label}</p>
      <p className={`mt-0.5 font-mono text-sm font-semibold ${color} sm:text-base`}>{value}</p>
    </div>
  );
}
