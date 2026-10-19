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

const LINKS = [
  { href: "#company", label: "회사 소개" },
  { href: "#services", label: "서비스" },
  { href: "#dashboard", label: "물류비 분석" },
  { href: "#os", label: "관리 시스템" },
  { href: "#quote", label: "견적 문의" },
];

export function Footer() {
  return (
    <footer className="on-dark bg-navy px-5 pt-14 pb-28 text-white sm:px-8 sm:pb-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 lg:flex-row lg:items-center">
          <Logo className="text-white" />
          <nav aria-label="하단 메뉴" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/80">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="inline-flex min-h-11 items-center hover:text-white">
                {l.label}
              </a>
            ))}
            <a
              href={COMPANY.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center hover:text-white"
            >
              고객사 로그인<span className="sr-only"> (새 창)</span>
            </a>
          </nav>
        </div>

        <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-1.5 text-[13px] leading-relaxed text-white/70">
          {INFO.map(([k, v]) => (
            <div key={k}>
              <dt className="inline text-white/50">{k} </dt>
              <dd className="inline">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[12px] leading-relaxed text-white/50">
          사이트의 사진과 영상은 이해를 돕기 위한 참고 이미지이며 실제 로지트 시설과 다를 수 있습니다. 대시보드와 시스템 화면의 수치는
          예시 데이터입니다.
        </p>
        <p className="mt-6 text-[13px] text-white/50">&copy; {new Date().getFullYear()} {COMPANY.nameEn} All rights reserved.</p>
      </div>
    </footer>
  );
}
