import { SectionTag } from "./SectionTag";
import { COMPANY } from "@/lib/company";

const ROWS: [string, string][] = [
  ["상호", COMPANY.name],
  ["대표자", COMPANY.ceo],
  ["설립일", COMPANY.founded],
  ["사업자등록번호", COMPANY.bizNo],
  ["업태 / 종목", `${COMPANY.industry} / ${COMPANY.businessType}`],
  ["소재지", COMPANY.address],
];

export function CompanyInfo() {
  return (
    <section id="company" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionTag code="COMPANY">회사소개</SectionTag>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
            2025년,
            <br />
            새로 시작한 물류 회사입니다.
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-steel">
            로지트는 경기 용인 기흥에 자리 잡은 지 얼마 안 된 회사입니다. 그만큼
            서비스 하나하나에 직접 관여하고, 화주사가 궁금해하는 숫자를
            숨기지 않는 걸 원칙으로 삼고 있습니다.
          </p>
        </div>

        <div className="waybill-edge self-start border border-ink/15 bg-white p-1 shadow-[0_1px_0_0_var(--line)]">
          <dl className="divide-y divide-ink/8">
            {ROWS.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3.5 sm:grid-cols-[9rem_1fr]"
              >
                <dt className="font-mono text-[11px] tracking-wide text-steel-soft">{label}</dt>
                <dd className="font-sans text-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
