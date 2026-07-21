/**
 * 로지트 로고 마크.
 * L자(거점)에서 목적지 점까지 이어지는 배송 경로선으로 구성.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M15 11 L15 34 L34 34"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 27 L38 11"
        stroke="var(--route)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="39.5" cy="9.5" r="4.5" fill="var(--amber)" />
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
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <LogoMark className={markClassName ?? "size-7 text-ink"} />
      {wordmark && (
        <span className="font-display text-xl font-black tracking-tight text-ink">LOGEET</span>
      )}
    </span>
  );
}
