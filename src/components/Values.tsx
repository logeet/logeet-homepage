import { SectionTitle } from "./Services";
import { VALUE_ILLUSTRATIONS } from "./ValueIllustrations";

// 로지트를 고르는 네 가지 이유 — 서로 겹치지 않게 (운영 · 화면 · 비용 · 마감)
const VALUES = [
  { title: "통합 운영", desc: "보관·운송·택배를 한 곳에서 운영해 책임이 하나로 모입니다." },
  { title: "운영 가시성", desc: "적재율·재고·출고를 고객사 전용 화면에서 바로 확인합니다." },
  { title: "비용 투명성", desc: "운송·택배·보관비를 항목별로 나눠 보여드립니다." },
  { title: "월간 보고 · 마감", desc: "매월 계획 대비 실적을 보고하고 비용을 확정합니다." },
];

export function Values() {
  return (
    <section id="why" aria-labelledby="values-title" className="scroll-mt-16 border-b border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle id="values-title" eyebrow="Why LOGEET" title="운영을 넘어, 비용까지 설명하는 물류" oneLine />

        {/* 운영 프로세스와 같은 아이소메트릭 그림 + 번호·항목·설명. 모바일은 그림 왼쪽 작게 + 글 오른쪽 */}
        <ol className="mt-12 grid gap-x-8 gap-y-8 sm:mt-14 sm:grid-cols-2 sm:gap-y-14 lg:mt-16 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Art = VALUE_ILLUSTRATIONS[i];
            return (
              <li key={v.title} className="reveal flex items-center gap-5 sm:block">
                <div className="w-32 shrink-0 rounded-sm bg-gray px-2 pt-2 pb-1 sm:w-auto sm:px-6 sm:pt-5 sm:pb-3">
                  <Art />
                </div>
                <div className="min-w-0">
                  <p className={`text-[12px] font-bold tabular-nums tracking-[0.12em] sm:mt-6 ${i === 0 ? "text-blue" : "text-sub"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight text-navy sm:mt-2 sm:text-xl">{v.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-body sm:mt-2 sm:text-[15px]">{v.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
