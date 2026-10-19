import { COMPANY } from "@/lib/company";
import { TRUST } from "@/lib/trust";
import { SectionTitle } from "./Services";

const AREAS = ["창고보관 · 풀필먼트", "임시차 · 간선운송", "택배 배송대행 (B2B · B2C)", "물류 관리 시스템 운영"];

const PRINCIPLES = [
  { title: "직접 운영", desc: "보관, 운송, 택배를 로지트가 직접 관리합니다." },
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
    <a key="mail" href={`mailto:${COMPANY.email}`} className="-my-2.5 inline-block py-2.5 font-semibold text-blue hover:underline">
      {COMPANY.email}
    </a>,
  ],
];

/** trust.ts에 실제 자료가 있을 때만 그리는 목록 블록 */
function TrustBlock({ title, items }: { title: string; items: { main: string; sub?: string }[] }) {
  if (items.length === 0) return null;
  return (
    <div className="reveal rounded border border-line bg-paper p-6">
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
    <section id="company" aria-labelledby="company-title" className="bg-gray py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="company-title"
          eyebrow="About LOGEET"
          title="물류를 직접 운영하고, 숫자를 숨기지 않습니다"
          desc="로지트는 보관·운송·택배를 직접 운영하는 통합 물류 회사입니다. 운영 데이터를 고객사와 공유하고 비용을 항목별로 보고하는 것을 원칙으로 합니다."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-6">
            <div className="reveal rounded border border-line bg-paper p-6">
              <h3 className="text-base font-bold">사업 영역</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {AREAS.map((a) => (
                  <li key={a} className="rounded bg-gray px-3 py-2.5 text-[15px] font-medium">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal rounded border border-line bg-paper p-6">
              <h3 className="text-base font-bold">운영 방식</h3>
              <ol className="mt-4 space-y-4">
                {PRINCIPLES.map((p, i) => (
                  <li key={p.title} className="flex gap-3">
                    <span className="text-sm font-bold tabular-nums text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[15px] leading-relaxed">
                      <span className="font-bold">{p.title}</span>
                      <span className="ml-2 text-body">{p.desc}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="reveal rounded border border-line bg-paper p-6">
            <h3 className="text-base font-bold">기업 정보</h3>
            <dl className="mt-3 divide-y divide-line">
              {INFO.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5 text-[15px] sm:grid-cols-[8rem_1fr]">
                  <dt className="text-sub">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {hasTrust && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((b) => (
              <TrustBlock key={b.title} title={b.title} items={b.items} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
