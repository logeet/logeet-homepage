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
    story: "출고 전 바코드 검수를 도입한 뒤 오출고가 크게 줄었습니다. 시즌 반품도 검수부터 재입고까지 빠르게 처리돼서, 반품 재고가 바로 판매 가능한 재고로 돌아와요.",
    services: ["출고 검수", "반품 처리"],
  },
  {
    client: "생활용품 B사",
    industry: "이커머스 · B2C 중심",
    story: "보관·출고·택배비가 항목별로 정산돼서 숨은 비용이 없어요. 채널별 택배비가 나뉘어 보이니 물류비를 줄일 지점이 분명해졌습니다.",
    services: ["물류비 리포트", "택배 B2B·B2C"],
  },
  {
    client: "화장품 브랜드 C사",
    industry: "뷰티 · 매장 공급",
    story: "노선별 운송비를 확인하고 임시차를 고정계약으로 바꿔 운송비를 낮췄습니다. 신제품 출시로 물량이 몰려도 매장 공급이 밀리지 않아요.",
    services: ["간선운송", "운송비 관리"],
  },
];

export function Stories() {
  const sample = TRUST.cases.length === 0;
  // 운영 사이트에는 실제 사례가 있을 때만
  if (sample && process.env.NODE_ENV === "production") return null;
  const cases = sample ? SAMPLE : TRUST.cases;

  return (
    <section id="stories" aria-labelledby="stories-title" className="border-t border-line bg-paper py-24 sm:py-32">
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
              className="reveal flex flex-col items-center rounded-3xl bg-gray px-7 pt-9 pb-9 text-center sm:px-9"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {(() => {
                const Art = ARTS[i % ARTS.length];
                return <Art />;
              })()}
              <blockquote className="mt-7 flex-1 text-[15px] leading-[1.85] text-body">
                <span aria-hidden="true">“ </span>
                {c.story}
                <span aria-hidden="true"> ”</span>
              </blockquote>
              <p className="mt-7 text-[15px] font-bold tracking-tight text-navy">– {c.client} –</p>
              <p className="mt-1 text-[13px] font-medium text-sub">{c.industry}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
