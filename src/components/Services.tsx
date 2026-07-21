import { Warehouse, Truck, PackageCheck, LayoutDashboard } from "lucide-react";
import { SectionTag } from "./SectionTag";

const SERVICES = [
  {
    code: "WMS",
    icon: Warehouse,
    title: "창고보관 · 입출고관리",
    desc: "입고, 검수, 로케이션 관리부터 피킹·패킹까지 상품 흐름을 직접 관리합니다.",
  },
  {
    code: "TMS",
    icon: Truck,
    title: "임시차 · 간선운송",
    desc: "매장·물류센터 간 간선운송과 임시차 배차를 노선별 단가까지 투명하게 운영합니다.",
  },
  {
    code: "LMD",
    icon: PackageCheck,
    title: "택배 라스트마일 대행",
    desc: "B2C·B2B 발송을 항목별로 분리 집계해 물량 변동과 비용 구조를 함께 보여드립니다.",
  },
  {
    code: "SYS",
    icon: LayoutDashboard,
    title: "자체 개발 관리 시스템",
    desc: "예산 대비 실적, 월별 리포트를 자체 개발한 대시보드로 실시간에 가깝게 확인합니다.",
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-xl">
        <SectionTag code="SERVICE">취급 업무</SectionTag>
        <h2 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
          보관부터 배송, 그리고 숫자로
          <br />
          남기는 것까지
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-ink/12 bg-ink/12 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <div key={s.code} className="group bg-paper p-7 transition-colors hover:bg-white sm:p-8">
            <div className="flex items-center justify-between">
              <s.icon className="size-6 text-route" strokeWidth={1.75} />
              <span className="font-mono text-[11px] tracking-[0.14em] text-steel-soft">
                {s.code}
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h3>
            <p className="mt-2.5 font-sans text-sm leading-relaxed text-steel">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
