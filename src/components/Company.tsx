import Image from "next/image";
import { TRUST } from "@/lib/trust";
import { SectionTitle } from "./Services";
import { AREA_ILLUSTRATIONS, PRINCIPLE_ILLUSTRATIONS } from "./AboutIllustrations";

// 설명은 서비스 섹션(Services.tsx)의 각 서비스 소개 문구와 같다
const AREAS = [
  { name: "창고보관 · 풀필먼트", desc: "입고부터 출고까지 상품 흐름 전체를 직접 운영합니다." },
  { name: "임시차 · 지입차 · 간선운송", desc: "매장과 물류센터를 잇는 운송을 운영하고 비용까지 관리합니다." },
  { name: "택배 배송대행 (B2B · B2C)", desc: "B2B·B2C 택배 발송을 대행하고 채널별로 비용을 나눠 봅니다." },
  { name: "물류 관리 시스템 운영", desc: "운영 현황과 비용을 고객사 전용 화면으로 제공합니다." },
];

const PRINCIPLES = [
  { title: "통합 관리", desc: "보관, 운송, 택배를 로지트가 한 곳에서 관리합니다." },
  { title: "데이터 공유", desc: "운영 현황과 비용을 고객사 전용 화면으로 공유합니다." },
  { title: "정기 보고", desc: "매월 계획 대비 실적과 항목별 비용을 보고합니다." },
  { title: "월마감", desc: "매월 운영 실적과 비용을 확정해 마감합니다." },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** 블록마다 같은 틀 — 넓은 화면에서 왼쪽 3칸은 항목명, 오른쪽 9칸은 내용 */
function Block({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`reveal grid gap-6 lg:grid-cols-12 lg:gap-8 ${className}`}>
      <h3 className="text-lg font-bold tracking-tight text-navy lg:col-span-3">{title}</h3>
      <div className="lg:col-span-9">{children}</div>
    </div>
  );
}

/** trust.ts에 실제 자료가 있을 때만 그리는 목록 블록 */
function TrustBlock({ title, items }: { title: string; items: { main: string; sub?: string }[] }) {
  if (items.length === 0) return null;
  return (
    <div className="reveal border-t border-line-strong/70 pt-5">
      <h3 className="text-base font-bold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it.main} className="text-[15px]">
            <span className="font-semibold">{it.main}</span>
            {it.sub && <span className="ml-2 text-body">{it.sub}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Company() {
  const blocks = [
    { title: "운영 시설", items: TRUST.facilities.map((f) => ({ main: f.name, sub: f.detail })) },
    { title: "보유 장비", items: TRUST.equipment.map((f) => ({ main: f.name, sub: f.detail })) },
    { title: "인증", items: TRUST.certifications.map((c) => ({ main: c.name, sub: `${c.issuer} · ${c.year}` })) },
    { title: "고객사 · 파트너", items: TRUST.clients.map((c) => ({ main: c.name })) },
    { title: "운영 지표", items: TRUST.metrics.map((m) => ({ main: `${m.label} ${m.value}`, sub: m.asOf })) },
  ];
  const hasTrust = blocks.some((b) => b.items.length > 0);

  return (
    <section id="company" aria-labelledby="company-title" className="bg-paper">
      {/* 브랜드 소개 · 사업 영역 · 운영 방식 */}
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionTitle
          id="company-title"
          eyebrow="About LOGEET"
          title="물류의 전 과정을 로지트가 하나로 책임집니다"
          desc="보관·운송·택배를 한 곳에서 관리하고, 운영 데이터와 비용을 고객사와 투명하게 공유합니다."
          oneLine
        />

        {/* 실제 현장 사진 — trust.ts 의 photos 에 입력된 경우에만 표시 */}
        {TRUST.photos.length > 0 && (
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST.photos.map((ph) => (
              <li key={ph.src} className="reveal">
                <div className="relative aspect-[4/3] overflow-hidden rounded bg-paper">
                  <Image src={ph.src} alt={ph.caption} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                </div>
                <p className="mt-2 text-[14px] text-body">{ph.caption}</p>
              </li>
            ))}
          </ul>
        )}

        {/* 사업 영역 — 운영 방식과 같은 구성: 그림 / 번호 + 선 / 이름 */}
        <Block title="사업 영역" className="mt-16 border-t border-line pt-12 lg:mt-20">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {AREAS.map((a, i) => {
              const Art = AREA_ILLUSTRATIONS[i];
              return (
                <li key={a.name}>
                  <div className="mb-5 flex h-24 items-end justify-center sm:h-28">
                    <Art />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-bold tabular-nums text-blue">{pad(i + 1)}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-line-strong" />
                  </div>
                  <p className="mt-4 text-lg font-bold text-navy">
                    {/* 괄호 부분은 쪼개지지 않고 통째로 다음 줄로 */}
                    {a.name.split(/(\(.*\))/).map((part) =>
                      part.startsWith("(") ? (
                        <span key={part} className="whitespace-nowrap">
                          {part}
                        </span>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{a.desc}</p>
                </li>
              );
            })}
          </ul>
        </Block>

        {/* 운영 방식 — 그림 + 가로로 이어지는 4단계 (사업 영역과 같은 구성) */}
        <Block title="운영 방식" className="mt-14 border-t border-line pt-12">
          <ol className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {PRINCIPLES.map((p, i) => {
              const Art = PRINCIPLE_ILLUSTRATIONS[i];
              return (
                <li key={p.title}>
                  <div className="mb-5 flex h-24 items-end justify-center sm:h-28">
                    <Art />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-bold tabular-nums text-blue">{pad(i + 1)}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-line-strong" />
                  </div>
                  <p className="mt-4 text-lg font-bold text-navy">{p.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{p.desc}</p>
                </li>
              );
            })}
          </ol>
        </Block>

        {hasTrust && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((b) => (
              <TrustBlock key={b.title} title={b.title} items={b.items} />
            ))}
          </div>
        )}
      </div>
      {/* 기업 정보(상호·대표·사업자번호·업태·주소·연락처)는 푸터와 겹쳐 푸터 한 곳에만 둔다 */}
    </section>
  );
}
