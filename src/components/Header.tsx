"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { Logo } from "./Logo";

const NAV = [
  { href: "#services", label: "서비스" },
  { href: "#why", label: "왜 로지트인가" },
  { href: "#company", label: "회사소개" },
  { href: "#contact", label: "문의하기" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="LOGEET 홈으로 이동">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans text-sm font-medium text-steel transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={COMPANY.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 border border-ink/20 px-4 py-2 font-sans text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            고객사 로그인
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center md:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-paper px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2.5 font-sans text-sm font-medium text-ink hover:bg-ink/5"
              >
                {item.label}
              </a>
            ))}
            <a
              href={COMPANY.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-between rounded border border-ink/20 px-3 py-2.5 font-sans text-sm font-medium text-ink"
            >
              고객사 로그인
              <ArrowUpRight className="size-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
