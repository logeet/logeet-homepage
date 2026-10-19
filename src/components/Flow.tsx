import { SectionTitle } from "./Services";
import { ProcessIllustration } from "./ProcessIllustration";

const STEPS = [
  { title: "입고 · 검수", desc: "하차한 상품의 수량과 상태를 확인하고 이상 건은 바로 공유합니다." },
  { title: "보관 · 재고 관리", desc: "로케이션 단위로 보관하고 적재율과 재고를 관리합니다." },
  { title: "주문 · 출고 처리", desc: "주문에 맞춰 피킹·검수·패킹 후 출고합니다." },
  { title: "운송 · 배송", desc: "임시차·간선운송과 택배(B2B·B2C)로 전달합니다." },
  { title: "실적 · 비용 리포트", desc: "예산 대비 집행률과 항목별 비용을 매월 보고합니다." },
];

export function Flow() {
  return (
    <section id="flow" aria-labelledby="flow-title" className="border-y border-line bg-gray py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="flow-title"
          eyebrow="Process"
          title="입고부터 비용 리포트까지, 하나의 흐름으로 운영합니다"
          desc="여러 업체를 거치지 않으니 책임도 비용도 한 곳에서 설명됩니다."
        />

        <div className="reveal mt-12 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
          <ProcessIllustration />
        </div>

        <ol className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.title} className="reveal flex gap-3 lg:block">
              <span className="text-sm font-bold tabular-nums text-blue">{String(i + 1).padStart(2, "0")}</span>
              <div className="lg:mt-2">
                <h3 className="text-base font-bold">{s.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-body">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
