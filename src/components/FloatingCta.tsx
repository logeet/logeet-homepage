"use client";

import { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";

/** 오른쪽 아래 상담 버튼 — 견적 폼이 보이는 동안엔 폼을 가리지 않도록 숨김 */
export function FloatingCta() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const quote = document.getElementById("quote");
    if (!quote) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.05 });
    io.observe(quote);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href="#quote"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`fixed bottom-4 right-4 z-40 flex size-14 flex-col items-center justify-center gap-0.5 rounded-2xl bg-blue text-[11px] font-bold text-white shadow-[0_12px_30px_-8px_rgba(37,99,235,0.7)] transition-[opacity,transform,background-color] duration-200 hover:bg-blue-strong sm:bottom-5 sm:right-5 sm:size-16 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : ""
      }`}
    >
      <MessageSquareText aria-hidden="true" className="size-5" />
      상담문의
    </a>
  );
}
