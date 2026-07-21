export function SectionTag({
  code,
  children,
  tone = "ink",
}: {
  code: string;
  children: React.ReactNode;
  tone?: "ink" | "paper";
}) {
  const border = tone === "ink" ? "border-ink/25 text-ink" : "border-paper/30 text-paper";
  return (
    <span
      className={`inline-flex items-center gap-2 border ${border} px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.14em]`}
    >
      <span className="opacity-60">{code}</span>
      <span className="h-3 w-px bg-current opacity-30" />
      {children}
    </span>
  );
}
