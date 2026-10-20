import { COMPANY } from "@/lib/company";
import { Logo } from "./Logo";

const INFO: [string, string][] = [
  ["상호", COMPANY.name],
  ["대표", COMPANY.ceo],
  ["사업자등록번호", COMPANY.bizNo],
  ["TEL", COMPANY.phone],
  ["본사", COMPANY.address],
  ["물류센터", COMPANY.centerAddress],
  ["Email", COMPANY.email],
];

const LINKS = [
  { href: "#company", label: "회사 소개" },
  { href: "#services", label: "서비스" },
  { href: "#dashboard", label: "물류비 분석" },
  { href: "#os", label: "관리 시스템" },
  { href: "#quote", label: "견적 문의" },
];

export function Footer() {
  return (
    <footer className="on-dark border-t border-white/10 bg-navy-deep px-5 pt-16 pb-28 text-white sm:px-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <Logo className="text-white" />
          </div>

          <dl className="grid gap-x-8 gap-y-4 text-[13px] leading-relaxed sm:grid-cols-2 lg:col-span-6">
            {INFO.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[12px] font-semibold text-white/40">{k}</dt>
                <dd className="mt-0.5 text-white/75">{v}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="하단 메뉴" className="grid grid-cols-2 gap-x-6 text-sm font-medium text-white/75 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1 lg:content-start">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="inline-flex min-h-10 items-center transition-colors duration-200 hover:text-white">
                {l.label}
              </a>
            ))}
            <a
              href={COMPANY.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center transition-colors duration-200 hover:text-white"
            >
              고객사 로그인<span className="sr-only"> (새 창)</span>
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-4 pt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <p className="max-w-3xl text-[12px] leading-relaxed text-white/45">
            사이트의 사진과 영상은 이해를 돕기 위한 참고 이미지이며 실제 로지트 시설과 다를 수 있습니다. 대시보드와 시스템 화면의 수치는
            예시 데이터입니다.
          </p>
          <p className="shrink-0 text-[12px] text-white/45">&copy; {new Date().getFullYear()} {COMPANY.nameEn} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
