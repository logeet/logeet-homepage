import Image from "next/image";
import { Warehouse, Truck, PackageCheck, LayoutDashboard, ArrowRight } from "lucide-react";
import { PHOTOS } from "@/lib/photos";

const SIDE = [
  {
    icon: Truck,
    title: "임시차 · 간선운송",
    desc: "매장·물류센터 간 운송을 노선별 단가까지 투명하게 운영합니다.",
    photo: PHOTOS.linehaul,
  },
  {
    icon: PackageCheck,
    title: "택배 라스트마일",
    desc: "B2C·B2B 발송을 나눠 집계해 물량과 비용을 함께 보여드립니다.",
    photo: PHOTOS.parcel,
  },
  {
    icon: LayoutDashboard,
    title: "자체 관리 시스템",
    desc: "예산 대비 실적과 월별 리포트를 고객사 전용 화면으로 확인합니다.",
    photo: PHOTOS.system,
  },
];

const TAGS = ["입고 · 검수", "로케이션 보관", "피킹 · 패킹", "재고 관리"];

export function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: React.ReactNode; desc?: string }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p className="text-[15px] font-bold text-blue">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">{title}</h2>
      {desc && <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">{desc}</p>}
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Our Services"
          title="사업소개"
          desc="보관부터 운송, 택배까지 로지트가 직접 운영해 물류를 한 곳으로 모읍니다."
        />

        <div className="on-dark mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <article className="reveal relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl bg-blue-strong p-8 text-white sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <Image src={PHOTOS.fulfillment} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,99,235,0.25),rgba(29,78,216,0.75)_45%,rgba(30,58,138,0.97))]" />
            <div className="relative">
            <Warehouse aria-hidden="true" className="size-9" strokeWidth={1.8} />
            <h3 className="mt-5 text-3xl font-bold">풀필먼트</h3>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/85">
              입고부터 보관, 피킹·패킹, 출고까지 상품 흐름 전체를 직접 관리합니다.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <li key={t} className="rounded-full bg-white/15 px-3 py-1 text-[13px] font-semibold backdrop-blur">
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="#quote"
              className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/50 px-5 text-sm font-bold transition-colors duration-200 hover:bg-white hover:text-blue-strong"
            >
              견적 문의
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            </div>
          </article>

          {SIDE.map((s, i) => (
            <article
              key={s.title}
              className={`group reveal relative flex min-h-64 flex-col justify-end overflow-hidden rounded-3xl bg-navy p-7 text-white ${i === SIDE.length - 1 ? "sm:col-span-2" : ""}`}
            >
              <Image src={s.photo} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,17,40,0.1),rgba(10,17,40,0.92)_75%)]" />
              <div className="relative">
                <s.icon aria-hidden="true" className="size-8" strokeWidth={1.8} />
                <h3 className="mt-4 text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/85">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
