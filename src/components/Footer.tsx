import { COMPANY } from "@/lib/company";
import { Logo } from "./Logo";

const INFO: [string, string][] = [
  ["상호", COMPANY.name],
  ["대표", COMPANY.ceo],
  ["사업자등록번호", COMPANY.bizNo],
  ["주소", COMPANY.address],
  ["TEL", COMPANY.phone],
  ["Email", COMPANY.email],
];

export function Footer() {
  return (
    <footer className="border-t-2 border-white/15 bg-navy px-5 pt-14 pb-28 text-white sm:pb-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-[clamp(3rem,12vw,9rem)] font-bold leading-none tracking-tighter text-white/10" aria-hidden="true">
          LOGEET
        </p>
        <div className="mt-10 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Logo className="text-white" />
            <dl className="mt-6 grid gap-x-8 gap-y-1.5 text-[13px] leading-relaxed text-white/70 sm:grid-cols-2">
              {INFO.map(([k, v]) => (
                <div key={k}>
                  <dt className="inline text-white/50">{k} </dt>
                  <dd className="inline">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="text-[13px] text-white/50">&copy; {new Date().getFullYear()} LOGEET Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
