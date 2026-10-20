"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { Logo } from "./Logo";

// 한 페이지 구성 — 모든 항목은 page.tsx 안의 실제 섹션 id로 연결된다.
const NAV = [
  { href: "#company", label: "회사 소개" },
  { href: "#fulfillment", label: "풀필먼트" },
  { href: "#transport", label: "운송 서비스" },
  { href: "#parcel", label: "택배 서비스" },
  { href: "#dashboard", label: "물류비 분석·시스템" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 첫 화면 위에서는 투명하게 영상과 이어지고, 스크롤하면 단색 네이비로 바뀐다.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const solid = scrolled || open;

  return (
    <header
      className={`on-dark sticky top-0 z-50 border-b text-white transition-colors duration-300 ${
        solid ? "border-white/10 bg-navy/[0.97] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]" : "border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
      >
        본문 바로가기
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" aria-label="LOGEET 홈으로 이동" className="flex min-h-11 items-center">
          <Logo className="text-white" />
        </a>

        <nav aria-label="주 메뉴" className="hidden items-center gap-9 xl:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 text-[15px] font-medium text-white/75 transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-200 hover:text-white hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={COMPANY.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-10 items-center gap-1 px-2 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white md:inline-flex"
          >
            고객사 로그인
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
            <span className="sr-only">(새 창)</span>
          </a>
          <span aria-hidden="true" className="mx-2 hidden h-4 w-px bg-white/20 md:block" />
          <a
            href="#quote"
            className="hidden min-h-10 items-center rounded-sm bg-blue px-5 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-strong sm:inline-flex"
          >
            견적 문의
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded xl:hidden"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="모바일 메뉴" className="flex flex-col border-t border-white/10 px-5 pb-4 xl:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-white/10 text-base font-medium"
            >
              {item.label}
            </a>
          ))}
          <a
            href={COMPANY.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center gap-1 border-b border-white/10 text-base font-medium text-white/80"
          >
            고객사 로그인
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">(새 창)</span>
          </a>
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="mt-4 flex min-h-12 items-center justify-center rounded bg-blue text-base font-bold"
          >
            견적 문의하기
          </a>
        </nav>
      )}
    </header>
  );
}
