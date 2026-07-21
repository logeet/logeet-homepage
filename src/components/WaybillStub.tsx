import { Barcode } from "./Barcode";
import { COMPANY } from "@/lib/company";

/** 히어로 우측 상단에 붙는 시그니처 요소 — 실제 운송장 라벨처럼 사업자 정보를 표시합니다. */
export function WaybillStub() {
  return (
    <div className="waybill-edge w-full max-w-[280px] rotate-[1.2deg] border border-ink/15 bg-paper p-4 font-mono text-ink shadow-[6px_6px_0_0_var(--ink)] sm:max-w-[300px]">
      <div className="flex items-center justify-between border-b border-dashed border-ink/25 pb-2">
        <span className="text-[11px] font-medium tracking-[0.2em] text-steel">WAYBILL</span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-route">
          <span className="live-dot inline-block size-1.5 rounded-full bg-route" />
          가동중
        </span>
      </div>
      <dl className="mt-2.5 space-y-1.5 text-[11px] leading-tight">
        <Row label="발송" value={COMPANY.name} />
        <Row label="등록번호" value={COMPANY.bizNo} />
        <Row label="설립" value={COMPANY.founded} />
        <Row label="구분" value={COMPANY.businessType} />
      </dl>
      <Barcode className="mt-3 h-6 w-full text-ink/70" />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="shrink-0 text-steel-soft">{label}</dt>
      <dd className="truncate text-right text-ink">{value}</dd>
    </div>
  );
}
