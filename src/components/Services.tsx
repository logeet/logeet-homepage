import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PHOTOS } from "@/lib/photos";
import { COMPANY } from "@/lib/company";

export function SectionTitle({
  eyebrow,
  title,
  desc,
  id,
  tone = "light",
  oneLine = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  id?: string;
  tone?: "light" | "dark";
  oneLine?: boolean; // 넓은 화면에서 설명을 한 줄로 (좁은 화면은 줄바꿈)
}) {
  const dark = tone === "dark";
  return (
    <div className={`reveal max-w-3xl ${oneLine ? "lg:max-w-none" : ""}`}>
      <p className={`text-sm font-bold tracking-wide ${dark ? "text-sky-300" : "text-blue"}`}>{eyebrow}</p>
      <h2 id={id} className="mt-3 text-[1.75rem] font-bold leading-snug tracking-tight sm:text-4xl sm:leading-tight">
        {title}
      </h2>
      {desc && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-white/75" : "text-body"} ${oneLine ? "lg:whitespace-nowrap" : ""}`}>
          {desc}
        </p>
      )}
    </div>
  );
}

// 장점은 고객사 시스템(center.logeet.co.kr 및 고객사 전용 대시보드)에서 실제 제공 중인 기능만 적는다.
const SERVICES = [
  {
    id: "fulfillment",
    title: "풀필먼트",
    lead: "입고부터 출고까지 상품 흐름 전체를 직접 운영합니다.",
    photo: PHOTOS.fulfillment,
    alt: "랙에 박스가 적재된 물류센터 내부 (참고 이미지)",
    steps: ["입고", "검수", "보관", "피킹", "패킹", "출고"],
    benefits: [
      "로케이션 단위 보관과 재고 관리",
      "적재율·재고·박스 출고 추이를 고객사 화면에서 확인",
      "시즌 반품 현황 관리",
    ],
  },
  {
    id: "transport",
    title: "임시차 · 간선운송",
    lead: "매장과 물류센터를 잇는 운송을 운영하고 비용까지 관리합니다.",
    photo: PHOTOS.linehaul,
    alt: "도로를 달리는 트레일러 트럭 (참고 이미지)",
    steps: ["운송 계획", "차량 배정", "운송", "비용 집계"],
    benefits: [
      "노선·배송 코스별 운송 현황 관리",
      "임시차 누적 비용과 고정계약 구분 집계",
      "센터별 운송비·물량 비교",
    ],
  },
  {
    id: "parcel",
    title: "택배 배송",
    lead: "B2B·B2C 택배 발송을 대행하고 채널별로 비용을 나눠 봅니다.",
    photo: PHOTOS.parcel,
    alt: "테이프로 포장된 택배 박스 (참고 이미지)",
    steps: ["출고", "택배 접수", "배송", "B2B·B2C 비용 집계"],
    benefits: ["B2B·B2C 택배 비용 분리 집계", "누적 택배 비용과 물량 추이 확인", "운송비와 합산한 월별 물류비 확인"],
  },
  {
    id: "system",
    title: "자체 관리 시스템",
    lead: "운영 현황과 비용을 고객사 전용 화면으로 제공합니다.",
    photo: PHOTOS.system,
    alt: "물류센터 통로에서 작업 중인 직원들 (참고 이미지)",
    steps: ["데이터 연동", "대시보드 반영", "월별 리포트"],
    benefits: [
      "예산 대비 집행률과 운송비 합계",
      "기존 엑셀·구글 시트 데이터 업로드·동기화",
      "계정별 접근 권한 관리",
    ],
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-gray py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="services-title"
          eyebrow="Services"
          title="보관부터 운송, 택배까지 한 곳에서 운영합니다"
          desc="여러 업체에 나눠 맡기면 비용도 책임도 흩어집니다. 로지트는 물류 전 구간을 직접 운영하고 비용을 한 화면으로 정리합니다."
          oneLine
        />

        <div className="mt-14 space-y-6">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="reveal grid overflow-hidden rounded border border-line bg-paper lg:grid-cols-2"
            >
              <div className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] ${i % 2 ? "lg:order-2" : ""}`}>
                <Image src={s.photo} alt={s.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>

              <div className="flex flex-col p-6 sm:p-10">
                <p className="text-sm font-bold tabular-nums text-blue">{String(i + 1).padStart(2, "0")}</p>
                <h3 id={`${s.id}-title`} className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
                  {s.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-body">{s.lead}</p>

                <p className="mt-6 text-[13px] font-bold text-sub">운영 프로세스</p>
                <ol className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm font-medium text-charcoal">
                  {s.steps.map((st, j) => (
                    <li key={st} className="flex items-center gap-1.5">
                      <span className="rounded bg-gray px-2.5 py-1">{st}</span>
                      {j < s.steps.length - 1 && <span aria-hidden="true" className="text-sub">›</span>}
                    </li>
                  ))}
                </ol>

                <p className="mt-6 text-[13px] font-bold text-sub">주요 장점</p>
                <ul className="mt-2 space-y-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[15px] leading-relaxed">
                      <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-blue" strokeWidth={2.5} />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 pt-2 lg:mt-auto">
                  <a href="#quote" className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-bold text-blue hover:underline">
                    {s.title} 견적 문의
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                  {s.id === "system" && (
                    <a
                      href={COMPANY.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1 text-[15px] font-bold text-charcoal hover:underline"
                    >
                      고객사 시스템 바로가기
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                      <span className="sr-only">(새 창)</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-sub">서비스 이미지는 이해를 돕기 위한 참고 이미지이며 실제 로지트 시설과 다를 수 있습니다.</p>
      </div>
    </section>
  );
}
