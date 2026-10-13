import { PackageOpen, Boxes, ScanLine, Send, FileBarChart } from "lucide-react";
import { SectionTitle } from "./Services";

const STEPS = [
  { icon: PackageOpen, title: "입고 · 검수", desc: "수량·상태 확인 후 이상 건 즉시 공유" },
  { icon: Boxes, title: "보관 · 재고", desc: "로케이션 단위 보관과 재고 정합성 관리" },
  { icon: ScanLine, title: "피킹 · 패킹", desc: "주문대로 골라 담고 출고 기준대로 포장" },
  { icon: Send, title: "출고 · 배송", desc: "임시차·간선운송과 택배로 전달" },
  { icon: FileBarChart, title: "정산 · 리포트", desc: "계획 대비 실적을 항목별로 매월 보고" },
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

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => {
            const last = i === STEPS.length - 1;
            return (
              <li
                key={s.title}
                className={`reveal relative rounded-2xl p-6 ${
                  last ? "bg-blue text-white shadow-[0_20px_40px_-20px_rgba(37,99,235,0.7)]" : "bg-paper shadow-[0_8px_30px_-16px_rgba(15,23,42,0.18)]"
                }`}
              >
                <span className={`text-[13px] font-bold ${last ? "text-white/85" : "text-blue"}`}>STEP {i + 1}</span>
                <div
                  className={`mt-4 flex size-12 items-center justify-center rounded-xl ${
                    last ? "bg-white/15" : "bg-blue-soft text-blue"
                  }`}
                >
                  <s.icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className={`mt-1.5 text-[15px] leading-relaxed ${last ? "text-white/85" : "text-body"}`}>{s.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
