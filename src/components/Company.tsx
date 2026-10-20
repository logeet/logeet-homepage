import Image from "next/image";
import { COMPANY } from "@/lib/company";
import { TRUST } from "@/lib/trust";
import { SectionTitle } from "./Services";

const AREAS = ["창고보관 · 풀필먼트", "임시차 · 지입차 · 간선운송", "택배 배송대행 (B2B · B2C)", "물류 관리 시스템 운영"];

const PRINCIPLES = [
  { title: "단일 창구", desc: "보관, 운송, 택배를 로지트가 한 창구에서 관리합니다." },
  { title: "데이터 공유", desc: "운영 현황과 비용을 고객사 전용 화면으로 공유합니다." },
  { title: "정기 보고", desc: "매월 계획 대비 실적과 항목별 비용을 보고합니다." },
];

const INFO: [string, React.ReactNode][] = [
  ["상호", COMPANY.name],
  ["대표자", COMPANY.ceo],
  ["사업자등록번호", COMPANY.bizNo],
  ["업태 / 종목", `${COMPANY.industry} / ${COMPANY.businessType}`],
  ["본사 소재지", COMPANY.address],
  [
    "대표 전화",
    <a key="tel" href={`tel:${COMPANY.phone}`} className="-my-2.5 inline-block py-2.5 font-semibold text-blue hover:underline">
      {COMPANY.phone}
    </a>,
  ],
  [
    "이메일",
    <a key="mail" href={`mailto:${COMPANY.email}`} className="-my-2.5 inline-block py-2.5 font-semibold break-all text-blue hover:underline">
      {COMPANY.email}
    </a>,
  ],
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
          title="물류를 한 창구에서 책임지고, 숫자를 숨기지 않습니다"
          desc="로지트는 보관·운송·택배를 한 창구에서 관리하는 통합 물류 회사입니다. 운영 데이터를 고객사와 공유하고 비용을 항목별로 보고하는 것을 원칙으로 합니다."
          split
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

        {/* 사업 영역 — 2×2, 얇은 선으로만 구분 */}
        <Block title="사업 영역" className="mt-16 border-t border-line pt-12 lg:mt-20">
          <ul className="grid border-t border-line-strong/70 sm:grid-cols-2 sm:gap-x-10">
            {AREAS.map((a, i) => (
              <li key={a} className="flex items-baseline gap-4 border-b border-line py-5">
                <span className="text-[13px] font-bold tabular-nums text-sub">{pad(i + 1)}</span>
                <span className="text-[17px] font-semibold text-navy">{a}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* 운영 방식 — 가로로 이어지는 3단계 */}
        <Block title="운영 방식" className="mt-14 border-t border-line pt-12">
          <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title}>
                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-bold tabular-nums text-blue">{pad(i + 1)}</span>
                  {i < PRINCIPLES.length - 1 && <span aria-hidden="true" className="hidden h-px flex-1 bg-line-strong sm:block" />}
                </div>
                <p className="mt-4 text-lg font-bold text-navy">{p.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{p.desc}</p>
              </li>
            ))}
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

      {/* 기업 정보 — 옅은 회색 띠로 분리, 카드·그림자 없이 정보 표만 */}
      <div className="border-t border-line bg-gray">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Block title="기업 정보">
            <dl className="border-t border-line-strong/70">
              {INFO.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-line py-4 text-[15px] sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-medium text-sub">{k}</dt>
                  <dd className="min-w-0 text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Block>
        </div>
      </div>
    </section>
  );
}
