/**
 * 로지트 로고 마크 — 명함 원본의 아이소메트릭 박스 + 미소 모티프를 재해석.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 90" fill="none" className={className} aria-hidden="true">
      {/* 왼쪽 면 — 해칭선 (열린 박스 느낌) */}
      <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="34.2" x2="50" y2="53.2" />
        <line x1="12" y1="41.4" x2="50" y2="60.4" />
        <line x1="12" y1="48.6" x2="50" y2="67.6" />
        <line x1="12" y1="55.8" x2="50" y2="74.8" />
      </g>

      {/* 박스 외곽선 */}
      <path
        d="M50 8 L88 27 L50 46 L12 27 Z M88 27 L88 63 L50 82 L50 46 M12 27 L12 63 L50 82"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 미소 */}
      <circle cx="62.5" cy="41.5" r="2.6" fill="currentColor" />
      <circle cx="75.5" cy="41.5" r="2.6" fill="currentColor" />
      <path
        d="M61 49 Q69 57.5 78 49"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  wordmark = true,
}: {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className={markClassName ?? "h-8 w-auto text-ink"} />
      {wordmark && (
        <span className="flex items-baseline gap-1.5">
          <span className="font-sans text-xl font-bold tracking-tight text-ink">LOGEET</span>
          <span className="font-sans text-[11px] font-medium tracking-[0.3em] text-steel-soft">
            로지트
          </span>
        </span>
      )}
    </span>
  );
}
