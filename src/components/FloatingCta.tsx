"use client";

import { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";

/**
 * 오른쪽 아래 상담 버튼 — 첫 화면(헤더에 견적 문의 버튼이 있음)과 견적 폼이 보이는 동안엔
 * 내용을 가리지 않도록 숨김
 */
export function FloatingCta() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets = ["top", "quote"].map((id) => document.getElementById(id)).filter((el) => el !== null);
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(visible.size > 0);
      },
      { threshold: 0.05 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href="#quote"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`fixed bottom-4 right-4 z-40 flex size-14 flex-col items-center justify-center gap-0.5 rounded-lg bg-blue text-[11px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(11,23,48,0.6)] transition-[opacity,transform,background-color] duration-200 hover:bg-blue-strong sm:bottom-5 sm:right-5 sm:size-16 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : ""
      }`}
    >
      <MessageSquareText aria-hidden="true" className="size-5" />
      상담문의
    </a>
  );
}
