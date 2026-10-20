"use client";

import { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { COMPANY } from "@/lib/company";

/** 카카오톡 말풍선 모양 */
export function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 3.2C6.5 3.2 2 6.7 2 11c0 2.8 1.9 5.2 4.7 6.6l-1 3.6c-.1.3.3.6.6.4l4.3-2.8c.5.1 .9.1 1.4.1 5.5 0 10-3.5 10-7.9S17.5 3.2 12 3.2Z"
      />
    </svg>
  );
}

/**
 * 오른쪽 아래 상담 버튼 — 첫 화면(헤더에 견적 문의 버튼이 있음)과 견적 폼이 보이는 동안엔
 * 내용을 가리지 않도록 숨김. 카카오톡 채널 주소가 있으면 '카톡 상담'(새 창), 없으면 견적 문의로 이동.
 */
export function FloatingCta() {
  const [hidden, setHidden] = useState(true);
  const kakao = COMPANY.kakaoChatUrl;

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
      href={kakao || "#quote"}
      {...(kakao ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`fixed bottom-4 right-4 z-40 flex size-14 flex-col items-center justify-center gap-0.5 rounded-lg text-[11px] font-bold shadow-[0_10px_24px_-10px_rgba(11,23,48,0.6)] transition-[opacity,transform,background-color] duration-200 sm:bottom-5 sm:right-5 sm:size-16 ${
        kakao ? "bg-[#FEE500] text-[#191919] hover:bg-[#F5DC00]" : "bg-blue text-white hover:bg-blue-strong"
      } ${hidden ? "pointer-events-none translate-y-4 opacity-0" : ""}`}
    >
      {kakao ? <KakaoIcon className="size-5" /> : <MessageSquareText aria-hidden="true" className="size-5" />}
      {kakao ? "카톡 상담" : "상담문의"}
      {kakao && <span className="sr-only">(카카오톡 새 창)</span>}
    </a>
  );
}
