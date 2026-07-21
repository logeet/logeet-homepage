import { COMPANY } from "@/lib/company";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div>
            <Logo />
            <dl className="mt-4 space-y-1 font-mono text-[11px] leading-relaxed text-steel-soft">
              <div>
                <dt className="inline">상호 </dt>
                <dd className="inline text-steel">{COMPANY.name}</dd>
              </div>
              <div>
                <dt className="inline">대표 </dt>
                <dd className="inline text-steel">{COMPANY.ceo}</dd>
              </div>
              <div>
                <dt className="inline">사업자등록번호 </dt>
                <dd className="inline text-steel">{COMPANY.bizNo}</dd>
              </div>
              <div>
                <dt className="inline">주소 </dt>
                <dd className="inline text-steel">{COMPANY.address}</dd>
              </div>
              <div>
                <dt className="inline">TEL </dt>
                <dd className="inline text-steel">{COMPANY.phone}</dd>
              </div>
              <div>
                <dt className="inline">Email </dt>
                <dd className="inline text-steel">{COMPANY.email}</dd>
              </div>
            </dl>
          </div>

          <div className="font-mono text-[11px] text-steel-soft sm:text-right">
            <p>&copy; {new Date().getFullYear()} LOGEET Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
