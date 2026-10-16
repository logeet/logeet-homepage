"use client";

import { useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { Logo } from "./Logo";

const NAV = [
  { href: "#services", label: "사업소개" },
  { href: "#flow", label: "운영 프로세스" },
  { href: "#data", label: "물류비 리포트" },
  { href: "#os", label: "로지트 시스템" },
  { href: "#company", label: "회사소개" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="on-dark sticky top-0 z-50 border-b border-white/10 bg-navy/85 text-white backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
      >
        본문 바로가기
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="LOGEET 홈으로 이동" className="flex min-h-11 items-center">
          <Logo className="text-white" />
        </a>

        <nav aria-label="주 메뉴" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] font-semibold text-white/80 transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={COMPANY.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="고객사 로그인 (새 창)"
            title="고객사 로그인"
            className="flex size-11 items-center justify-center rounded-lg text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
          >
            <LogIn aria-hidden="true" className="size-5" />
          </a>
          <a
            href="#quote"
            className="hidden min-h-10 items-center rounded-lg bg-blue px-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-strong sm:inline-flex"
          >
            견적 문의하기
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-lg lg:hidden"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="모바일 메뉴" className="flex flex-col border-t border-white/10 px-5 py-2 lg:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 text-base font-semibold"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="my-3 flex min-h-12 items-center justify-center rounded-lg bg-blue text-base font-bold"
          >
            견적 문의하기
          </a>
        </nav>
      )}
    </header>
  );
}
