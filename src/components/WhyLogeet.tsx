import { ClipboardCheck, PlugZap, FileBarChart } from "lucide-react";
import { Eyebrow } from "./Eyebrow";

const FEATURES = [
  {
    icon: ClipboardCheck,
    tone: "blue" as const,
    title: "사전 진단",
    desc: "현재 물류 구조와 발송량을 먼저 살펴보고, 맞는 규모의 계획을 잡습니다.",
  },
  {
    icon: PlugZap,
    tone: "coral" as const,
    title: "자체 시스템 연동",
    desc: "쓰던 엑셀을 그대로 올리면 대시보드에 자동으로 반영됩니다.",
  },
  {
    icon: FileBarChart,
    tone: "blue" as const,
    title: "월별 리포트",
    desc: "계획 대비 실적을 임시차·택배로 나눠 매달 정리해 드립니다.",
  },
];

export function WhyLogeet() {
  return (
    <section id="why" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow tone="coral">왜 로지트인가</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.6rem]">
            "지난달에 왜 이만큼
            <br />
            나갔는지" 답할 수 있어야 합니다.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-[28px] bg-paper-alt p-8 text-center transition-transform hover:-translate-y-1"
            >
              <div
                className={`mx-auto flex size-14 items-center justify-center rounded-2xl ${
                  f.tone === "blue" ? "bg-blue-tint text-blue" : "bg-coral-tint text-coral"
                }`}
              >
                <f.icon className="size-7" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
