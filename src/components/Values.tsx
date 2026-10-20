import { SectionTitle } from "./Services";
import { VALUE_ILLUSTRATIONS } from "./ValueIllustrations";

// 고객사 시스템에서 실제로 제공 중인 기능을 근거로 한 네 가지 가치
const VALUES = [
  { title: "비용 투명성", desc: "집행률과 항목별 비용을 숨김없이 보여드립니다." },
  { title: "운영 가시성", desc: "적재율·재고·출고 현황을 전용 화면에서 확인합니다." },
  { title: "통합 물류", desc: "보관부터 배송까지 한 흐름으로 연결합니다." },
  { title: "데이터 기반 관리", desc: "흩어진 운영 데이터를 대시보드와 리포트로 정리합니다." },
];

export function Values() {
  return (
    <section aria-labelledby="values-title" className="border-b border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle id="values-title" eyebrow="Why LOGEET" title="운영을 넘어, 비용까지 설명하는 물류" oneLine />

        {/* 운영 프로세스와 같은 아이소메트릭 그림 + 번호·항목·설명 */}
        <ol className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Art = VALUE_ILLUSTRATIONS[i];
            return (
              <li key={v.title} className="reveal">
                <div className="rounded-sm bg-gray px-6 pt-5 pb-3">
                  <Art />
                </div>
                <p className={`mt-6 text-[12px] font-bold tabular-nums tracking-[0.12em] ${i === 0 ? "text-blue" : "text-sub"}`}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-navy">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{v.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
