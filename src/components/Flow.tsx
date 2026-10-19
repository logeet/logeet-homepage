import { SectionTitle } from "./Services";
import { ProcessIllustration } from "./ProcessIllustration";

const STEPS = [
  { title: "입고", desc: "하차한 상품의 수량·상태를 검수하고 이상 건은 바로 공유" },
  { title: "보관", desc: "로케이션 단위로 보관하고 재고를 정확히 관리" },
  { title: "피킹", desc: "주문대로 상품을 골라 담기" },
  { title: "검수 · 패킹", desc: "스캔으로 한 번 더 확인하고 출고 기준대로 포장" },
  { title: "출고", desc: "임시차·간선운송·택배로 출고, 비용은 매월 리포트로 보고" },
];

export function Flow() {
  return (
    <section id="flow" className="bg-gray py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="LOGEET FLOW"
          title={
            <>
              입고부터 정산까지
              <br />
              <span className="text-blue">끊김 없는 한 흐름</span>
            </>
          }
          desc="여러 업체를 거치지 않으니, 책임도 비용도 한 곳에서 설명됩니다."
        />

        <div className="reveal mt-12 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
          <ProcessIllustration />
        </div>

        <ol className="mt-10 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-2 lg:grid-cols-5">
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
