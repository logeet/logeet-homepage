import { Warehouse, Truck, PackageCheck, LayoutDashboard } from "lucide-react";
import { Eyebrow } from "./Eyebrow";

const SERVICES = [
  {
    icon: Warehouse,
    tone: "blue" as const,
    title: "창고보관 · 입출고관리",
    desc: "입고, 검수, 로케이션 관리부터 피킹·패킹까지 상품 흐름을 직접 관리합니다.",
  },
  {
    icon: Truck,
    tone: "coral" as const,
    title: "임시차 · 간선운송",
    desc: "매장·물류센터 간 간선운송과 임시차 배차를 노선별 단가까지 투명하게 운영합니다.",
  },
  {
    icon: PackageCheck,
    tone: "blue" as const,
    title: "택배 라스트마일 대행",
    desc: "B2C·B2B 발송을 항목별로 분리 집계해 물량 변동과 비용 구조를 함께 보여드립니다.",
  },
  {
    icon: LayoutDashboard,
    tone: "coral" as const,
    title: "자체 개발 관리 시스템",
    desc: "예산 대비 실적, 월별 리포트를 자체 개발한 대시보드로 실시간에 가깝게 확인합니다.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-paper-alt py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>취급 업무</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.6rem]">
            보관부터 배송까지, 한 번에
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-[28px] bg-white p-8 shadow-[0_16px_40px_-24px_rgba(23,23,23,0.18)] transition-transform hover:-translate-y-1"
            >
              <div
                className={`flex size-12 items-center justify-center rounded-2xl ${
                  s.tone === "blue" ? "bg-blue-tint text-blue" : "bg-coral-tint text-coral"
                }`}
              >
                <s.icon className="size-6" strokeWidth={2} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-steel">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
