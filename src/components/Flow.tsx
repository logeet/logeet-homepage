import { SectionTitle } from "./Services";
import { ProcessMap } from "./ProcessMap";

export function Flow() {
  return (
    <section id="flow" aria-labelledby="flow-title" className="border-y border-line bg-gray py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="flow-title"
          eyebrow="Process"
          title="입고부터 비용 리포트까지, 한 흐름으로 운영합니다"
          desc="맡기는 곳이 하나라 책임과 비용이 명확합니다."
          oneLine
        />

        {/* 센터 전체를 한 장의 지도로 — 구역을 누르면 단계 설명 (자동으로 순서대로 넘어감) */}
        <ProcessMap />
      </div>
    </section>
  );
}
