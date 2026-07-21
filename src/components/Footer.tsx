import { COMPANY } from "@/lib/company";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink/6 bg-paper-alt px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div>
            <Logo />
            <dl className="mt-5 space-y-1 text-[13px] leading-relaxed text-steel">
              <div>
                <dt className="inline text-steel-soft">상호 </dt>
                <dd className="inline">{COMPANY.name}</dd>
              </div>
              <div>
                <dt className="inline text-steel-soft">대표 </dt>
                <dd className="inline">{COMPANY.ceo}</dd>
              </div>
              <div>
                <dt className="inline text-steel-soft">사업자등록번호 </dt>
                <dd className="inline">{COMPANY.bizNo}</dd>
              </div>
              <div>
                <dt className="inline text-steel-soft">주소 </dt>
                <dd className="inline">{COMPANY.address}</dd>
              </div>
              <div>
                <dt className="inline text-steel-soft">TEL </dt>
                <dd className="inline">{COMPANY.phone}</dd>
              </div>
              <div>
                <dt className="inline text-steel-soft">Email </dt>
                <dd className="inline">{COMPANY.email}</dd>
              </div>
            </dl>
          </div>

          <div className="text-[13px] text-steel-soft sm:text-right">
            <p>&copy; {new Date().getFullYear()} LOGEET Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
