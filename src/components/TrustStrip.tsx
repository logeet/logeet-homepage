import { COMPANY } from "@/lib/company";

const ITEMS = [
  `업태 ${COMPANY.industry}`,
  `종목 ${COMPANY.businessType}`,
  `설립 ${COMPANY.founded}`,
  `사업자등록번호 ${COMPANY.bizNo}`,
  `${COMPANY.addressShort}`,
];

export function TrustStrip() {
  const line = ITEMS.join("   ·   ");
  return (
    <div className="overflow-hidden border-b border-ink/10 bg-paper-dim py-2.5">
      <div className="flex w-max whitespace-nowrap">
        <span className="ticker-track flex shrink-0 font-mono text-[11px] tracking-wide text-steel">
          <span className="px-4">{line}</span>
          <span className="px-4">{line}</span>
        </span>
      </div>
    </div>
  );
}
