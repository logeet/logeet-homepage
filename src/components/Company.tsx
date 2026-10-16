import Image from "next/image";
import { MapPin, Building2 } from "lucide-react";
import { PHOTOS } from "@/lib/photos";
import { COMPANY } from "@/lib/company";
import { SectionTitle } from "./Services";

const ROWS: [string, string][] = [
  ["상호", COMPANY.name],
  ["대표자", COMPANY.ceo],
  ["사업자등록번호", COMPANY.bizNo],
  ["업태 / 종목", `${COMPANY.industry} / ${COMPANY.businessType}`],
];

export function Company() {
  return (
    <section id="company" className="bg-gray py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="About LOGEET"
          title="회사소개"
          desc="화주사가 궁금해하는 숫자를 숨기지 않는 것을 원칙으로 합니다."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <div className="reveal rounded-3xl bg-paper p-8 shadow-[0_8px_30px_-16px_rgba(15,23,42,0.18)]">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-blue-soft text-blue">
                <Building2 aria-hidden="true" className="size-5" />
              </div>
              <h3 className="text-lg font-bold">기업 정보</h3>
            </div>
            <dl className="mt-6 divide-y divide-line">
              {ROWS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 text-[15px]">
                  <dt className="font-semibold text-sub">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal on-dark relative overflow-hidden rounded-3xl bg-[linear-gradient(150deg,#1e3a8a,#0a1128)] p-8 text-white">
            <Image src={PHOTOS.base} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(150deg,rgba(30,58,138,0.78),rgba(10,17,40,0.72))]" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[13px] font-bold">
                <span className="size-1.5 rounded-full bg-orange" />
                운영 거점
              </p>
              <h3 className="mt-5 text-3xl font-bold">경기 용인 기흥</h3>
              <p className="mt-3 flex items-start gap-2 text-[15px] leading-relaxed text-white/80">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {COMPANY.address}
              </p>
              <a
                href={`tel:${COMPANY.phone}`}
                className="mt-8 inline-flex min-h-11 items-center rounded-lg border border-white/30 px-5 text-[15px] font-bold transition-colors duration-200 hover:bg-white/10"
              >
                대표 문의 {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
