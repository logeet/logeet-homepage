import { Eyebrow } from "./Eyebrow";
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
    <section id="company" className="bg-paper-alt py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>회사소개</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.6rem]">
              2025년,
              <br />
              새로 시작한 물류 회사입니다.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-steel">
              로지트는 경기 용인 기흥에 자리 잡은 지 얼마 안 된 회사입니다. 그만큼
              서비스 하나하나에 직접 관여하고, 화주사가 궁금해하는 숫자를
              숨기지 않는 걸 원칙으로 삼고 있습니다.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-2 shadow-[0_16px_40px_-24px_rgba(23,23,23,0.18)]">
            <dl className="divide-y divide-ink/6">
              {ROWS.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[7rem_1fr] gap-4 px-6 py-4 sm:grid-cols-[8.5rem_1fr]"
                >
                  <dt className="text-sm font-semibold text-steel-soft">{label}</dt>
                  <dd className="text-sm text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
