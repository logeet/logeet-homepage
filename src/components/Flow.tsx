import { SectionTitle } from "./Services";
import { ProcessIllustration } from "./ProcessIllustration";

const STEPS = [
  { title: "입고 · 검수", desc: "하차한 상품의 수량과 상태를 확인하고 이상 건은 바로 공유합니다." },
  { title: "보관 · 재고 관리", desc: "로케이션 단위로 보관하고 적재율과 재고를 관리합니다." },
  { title: "주문 · 출고 처리", desc: "주문에 맞춰 피킹·검수·패킹 후 출고합니다." },
  { title: "운송 · 배송", desc: "임시차·지입차·간선운송과 택배(B2B·B2C)로 전달합니다." },
  { title: "실적 · 비용 리포트", desc: "예산 대비 집행률과 항목별 비용을 매월 보고합니다." },
];

export function Flow() {
  return (
    <section id="flow" aria-labelledby="flow-title" className="border-y border-line bg-gray py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="flow-title"
          eyebrow="Process"
          title="입고부터 비용 리포트까지, 하나의 흐름으로 운영합니다"
          desc="맡기는 곳이 하나이니 책임도 비용도 한 곳에서 설명됩니다."
          split
        />

        <div className="reveal mt-12 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
          <ProcessIllustration />
        </div>

        {/* 타임라인 — 아이콘 없이 선 위의 점으로 단계 연결 (PC 가로 / 모바일 세로), 마지막(결과)만 블루 */}
        <div className="relative mt-14">
          <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-navy/20 lg:inset-x-0 lg:top-[5px] lg:bottom-auto lg:h-px lg:w-auto" />
          <ol className="relative grid gap-9 lg:grid-cols-5 lg:gap-8">
            {STEPS.map((s, i) => {
              const last = i === STEPS.length - 1;
              return (
                <li key={s.title} className="reveal relative flex gap-6 lg:block">
                  <span
                    aria-hidden="true"
                    className={`relative z-10 mt-1 block size-[11px] shrink-0 rounded-full border-2 lg:mt-0 ${
                      last ? "border-blue bg-blue" : "border-navy/40 bg-gray"
                    }`}
                  />
                  <div className="lg:mt-6">
                    <p className={`text-[12px] font-bold tabular-nums tracking-[0.12em] ${last ? "text-blue" : "text-sub"}`}>
                      STEP {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-[17px] font-bold text-navy">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
