import { Target, SplitSquareHorizontal, FileSpreadsheet } from "lucide-react";
import { SectionTitle } from "./Services";
import { ProductMockup } from "./ProductMockup";

const POINTS = [
  { icon: Target, title: "계획 대비 실적", desc: "예산을 먼저 세우고, 매달 얼마나 썼는지 집행률로 보여드립니다." },
  { icon: SplitSquareHorizontal, title: "항목별 분리 집계", desc: "임시차·간선운송·택배(B2C/B2B)를 나눠 어디서 늘었는지 바로 보입니다." },
  { icon: FileSpreadsheet, title: "쓰던 엑셀 그대로", desc: "기존 양식을 올리면 대시보드에 자동으로 반영됩니다." },
];

export function DataProof() {
  return (
    <section id="data" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Cost Visibility"
          title={
            <>
              물류비는
              <br />
              <span className="text-blue">데이터로 설명되어야 합니다</span>
            </>
          }
          desc="정산서 한 장으로 끝내지 않습니다. 그 안의 숫자를 매달 예산과 견주어 보여드립니다."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <figure className="reveal">
            <div className="overflow-hidden rounded-2xl border border-line shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)]">
              <ProductMockup />
            </div>
            <figcaption className="mt-3 text-center text-[13px] text-sub">
              고객사 대시보드 화면을 단순화한 예시입니다
            </figcaption>
          </figure>

          <ul className="space-y-4">
            {POINTS.map((p) => (
              <li
                key={p.title}
                className="reveal flex gap-5 rounded-2xl border border-line bg-paper p-6 transition-colors duration-200 hover:border-blue/40 hover:bg-blue-soft"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue text-white">
                  <p.icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
