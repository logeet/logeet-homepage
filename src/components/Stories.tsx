import { TRUST, type Case } from "@/lib/trust";
import { SectionTitle } from "./Services";
import { STORY_ARTS } from "./StoryArt";

// 카드 순서대로 업종 상품 그림: 패션(옷) / 생활용품 / 화장품
const ARTS = STORY_ARTS;

/*
 * 고객 사례 — trust.ts 의 cases(실제 사례)만 운영 사이트에 나온다.
 * 실제 사례가 없을 때 로컬 개발 화면에서만 아래 예시로 배치를 미리 본다(운영 빌드에는 절대 안 나옴).
 */
const SAMPLE: Case[] = [
  {
    client: "패션 브랜드 A사",
    industry: "의류 · 매장 + 온라인",
    story: "출고 전 바코드 검수로 오출고가 크게 줄었습니다. 시즌 반품은 검수부터 재입고까지 빠르게 처리돼, 반품 재고가 바로 판매 가능한 재고로 돌아옵니다.",
    services: ["출고 검수", "반품 처리"],
  },
  {
    client: "생활용품 B사",
    industry: "이커머스 · B2C 중심",
    story: "보관·출고·택배비가 항목별로 정산돼 숨은 비용이 없습니다. 채널별 택배비가 나뉘어 보이니 물류비를 줄일 지점이 분명해졌습니다.",
    services: ["물류비 리포트", "택배 B2B·B2C"],
  },
  {
    client: "화장품 브랜드 C사",
    industry: "뷰티 · 매장 공급",
    story: "노선별 운송비를 확인하고 임시차를 고정계약으로 전환해 운송비를 낮췄습니다. 신제품 출시로 물량이 몰려도 매장 공급이 밀리지 않습니다.",
    services: ["간선운송", "운송비 관리"],
  },
];

export function Stories() {
  const sample = TRUST.cases.length === 0;
  // 운영 사이트에는 실제 사례가 있을 때만
  if (sample && process.env.NODE_ENV === "production") return null;
  const cases = sample ? SAMPLE : TRUST.cases;

  return (
    <section id="stories" aria-labelledby="stories-title" className="border-t border-line bg-gray py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="stories-title"
          eyebrow="Success Stories"
          title="로지트와 함께한 고객사들이 운영과 비용의 변화를 경험하고 있습니다"
          oneLine
        />

        <ul className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3">
          {cases.map((c, i) => (
            <li
              key={c.client}
              className="reveal flex flex-col rounded-xl border border-line bg-paper p-7 shadow-card transition-shadow duration-300 hover:shadow-panel sm:p-8"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {(() => {
                const Art = ARTS[i % ARTS.length];
                return (
                  <div className="-mx-2 -mt-2 mb-6 rounded-lg bg-gray px-10 pt-3 pb-1 sm:px-12">
                    <Art />
                  </div>
                );
              })()}
              <p className="text-lg font-bold tracking-tight text-navy">
                {c.client} <span className="text-[15px] font-semibold text-sub">({c.industry})</span>
              </p>
              <p className="mt-4 flex-1 text-[15px] leading-[1.8] text-body">{c.story}</p>
              <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                {c.services.map((s) => (
                  <li key={s} className="rounded-full bg-blue-soft px-3 py-1 text-[12px] font-bold text-blue">
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
