import { Receipt, Activity, Network, BarChart3 } from "lucide-react";
import { SectionTitle } from "./Services";

// 고객사 시스템에서 실제로 제공 중인 기능을 근거로 한 네 가지 가치
const VALUES = [
  {
    icon: Receipt,
    title: "비용 투명성",
    desc: "예산 대비 집행률과 임시차·택배 비용을 항목별로 나눠 보여드립니다.",
  },
  {
    icon: Activity,
    title: "운영 가시성",
    desc: "적재율·재고·출고와 노선 현황을 고객사 전용 화면에서 확인합니다.",
  },
  {
    icon: Network,
    title: "통합 물류",
    desc: "보관, 운송, 택배를 한 회사가 연결해 운영합니다.",
  },
  {
    icon: BarChart3,
    title: "데이터 기반 관리",
    desc: "엑셀·구글 시트로 받은 운영 데이터를 대시보드와 리포트로 정리합니다.",
  },
];

export function Values() {
  return (
    <section aria-labelledby="values-title" className="border-b border-line bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="values-title"
          eyebrow="Why LOGEET"
          title="물류를 운영하는 것에서 끝나지 않고, 숫자로 설명합니다"
        />
        {/* 박스 대신 상단 굵은 선 + 번호로 나누는 편집형 4열 */}
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <li key={v.title} className={`reveal border-t-2 pt-6 ${i === 0 ? "border-blue" : "border-navy"}`}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold tabular-nums text-sub">{String(i + 1).padStart(2, "0")}</span>
                <v.icon aria-hidden="true" className="size-6 text-blue" strokeWidth={1.6} />
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{v.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
