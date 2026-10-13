export function Logo({ className }: { className?: string }) {
  return (
    <span className={`font-sans text-2xl font-bold tracking-tight ${className ?? "text-ink"}`}>LOGEET</span>
  );
}
