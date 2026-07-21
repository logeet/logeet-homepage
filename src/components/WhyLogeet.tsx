import { Check } from "lucide-react";
import { SectionTag } from "./SectionTag";
import { ProductMockup } from "./ProductMockup";

const POINTS = [
  "월별 계획(예산) 대비 실적을 임시차·택배 각각 따로 비교합니다.",
  "노선별·항목별 단가를 모아, 튀는 청구 건을 바로 확인합니다.",
  "매달 쓰던 엑셀을 그대로 올리면 전체 데이터가 자동으로 반영됩니다.",
  "관리자와 실무자 계정을 나눠, 필요한 화면만 접근하게 합니다.",
];

export function WhyLogeet() {
  return (
    <section id="why" className="bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionTag code="WHY" tone="paper">왜 로지트인가</SectionTag>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            "지난달에 왜 이만큼
            <br />
            나갔는지" 답할 수 있어야 합니다.
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-paper/70">
            대부분의 물류 대행은 정산서 한 장으로 끝납니다. 로지트는 그 정산서
            안의 숫자를 매달 예산과 견주어 보여드리는 시스템을 직접 만들어
            운영합니다.
          </p>

          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-amber" strokeWidth={2.5} />
                <span className="font-sans text-sm leading-relaxed text-paper/85 sm:text-[15px]">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rise-in">
          <ProductMockup />
        </div>
      </div>
    </section>
  );
}
