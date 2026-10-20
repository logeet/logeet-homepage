import { PackageCheck, Warehouse, ScanBarcode, Truck, FileBarChart } from "lucide-react";
import { SectionTitle } from "./Services";
import { ProcessIllustration } from "./ProcessIllustration";

const STEPS = [
  { icon: PackageCheck, title: "입고 · 검수", desc: "하차한 상품의 수량과 상태를 확인하고 이상 건은 바로 공유합니다." },
  { icon: Warehouse, title: "보관 · 재고 관리", desc: "로케이션 단위로 보관하고 적재율과 재고를 관리합니다." },
  { icon: ScanBarcode, title: "주문 · 출고 처리", desc: "주문에 맞춰 피킹·검수·패킹 후 출고합니다." },
  { icon: Truck, title: "운송 · 배송", desc: "임시차·지입차·간선운송과 택배(B2B·B2C)로 전달합니다." },
  { icon: FileBarChart, title: "실적 · 비용 리포트", desc: "예산 대비 집행률과 항목별 비용을 매월 보고합니다." },
];

export function Flow() {
  return (
    <section id="flow" aria-labelledby="flow-title" className="border-y border-line bg-gray py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="flow-title"
          eyebrow="Process"
          title="입고부터 비용 리포트까지, 하나의 흐름으로 운영합니다"
          desc="창구가 하나이니 책임도 비용도 한 곳에서 설명됩니다."
          split
        />

        <div className="reveal mt-12 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
          <ProcessIllustration />
        </div>

        {/* 타임라인 — PC 가로 / 모바일 세로, 노드를 선으로 연결 */}
        <div className="relative mt-12">
          <span aria-hidden="true" className="absolute left-[21px] top-2 bottom-2 w-px bg-navy/15 lg:inset-x-[10%] lg:top-[21px] lg:bottom-auto lg:h-px lg:w-auto" />
          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="reveal relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              style={{ animationRange: `entry ${i * 6}% cover ${15 + i * 6}%` }}
            >
              <span
                className={`relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-2 ${
                  i === STEPS.length - 1 ? "border-blue bg-blue text-white" : "border-navy/15 bg-paper text-navy"
                }`}
              >
                <s.icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
              </span>
              <div className="lg:mt-5">
                <p className="text-[13px] font-bold tabular-nums text-blue">STEP {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-base font-bold">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body">{s.desc}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
