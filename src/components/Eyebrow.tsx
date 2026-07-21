export function Eyebrow({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "coral" | "light";
}) {
  const styles = {
    blue: "bg-blue-tint text-blue",
    coral: "bg-coral-tint text-coral",
    light: "bg-white/10 text-white",
  }[tone];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3.5 py-1.5 font-sans text-[13px] font-bold ${styles}`}
    >
      {children}
    </span>
  );
}
