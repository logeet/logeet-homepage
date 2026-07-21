// 순수 장식용 바코드 — 실제 스캔 가능한 데이터는 아닙니다.
const WIDTHS = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 1, 3, 2, 1, 4, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 4, 1, 1];

export function Barcode({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 28"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {(() => {
        let x = 0;
        return WIDTHS.map((w, i) => {
          const rect = (
            <rect key={i} x={x} y={0} width={w} height={28} fill="currentColor" />
          );
          x += w + 1;
          return rect;
        });
      })()}
    </svg>
  );
}
