import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { ServiceScene, type SceneId } from "./ServiceScene";

export function SectionTitle({
  eyebrow,
  title,
  desc,
  id,
  tone = "light",
  oneLine = false,
  split = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  id?: string;
  tone?: "light" | "dark";
  oneLine?: boolean; // 넓은 화면에서 설명을 한 줄로 (좁은 화면은 줄바꿈)
  split?: boolean; // 넓은 화면에서 제목은 왼쪽, 설명은 오른쪽 아래에 맞춤
}) {
  const dark = tone === "dark";
  const head = (
    <>
      <p className={`flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.14em] ${dark ? "text-sky-300" : "text-blue"}`}>
        <span aria-hidden="true" className={`h-px w-6 ${dark ? "bg-sky-300" : "bg-blue"}`} />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.3] tracking-[-0.02em] sm:text-4xl sm:leading-[1.25] lg:text-[2.6rem] lg:leading-[1.22]">
        {title}
      </h2>
    </>
  );
  const body = desc && (
    <p className={`text-base leading-[1.75] sm:text-lg ${dark ? "text-white/70" : "text-body"} ${oneLine ? "lg:whitespace-nowrap" : ""}`}>{desc}</p>
  );
  if (split) {
    return (
      <div className="reveal grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">{head}</div>
        {body && <div className="lg:col-span-5 lg:pb-1.5">{body}</div>}
      </div>
    );
  }
  return (
    <div className={`reveal max-w-3xl ${oneLine ? "lg:max-w-none" : ""}`}>
      {head}
      {body && <div className="mt-5">{body}</div>}
    </div>
  );
}

// 장점은 고객사 시스템(center.logeet.co.kr 및 고객사 전용 대시보드)에서 실제 제공 중인 기능만 적는다.
const SERVICES = [
  {
    id: "fulfillment",
    key: "입고부터 출고까지, 직접 운영",
    title: "풀필먼트",
    lead: "보관·재고·출고를 센터에서 직접 처리합니다.",
    alt: "LOGEET 풀필먼트센터에서 랙 보관, 지게차 이동, 컨베이어 검수·패킹이 이루어지는 모습을 그린 그림",
    steps: ["입고", "검수", "보관", "피킹", "패킹", "출고"],
    benefits: [
      "로케이션 단위 보관과 재고 관리",
      "적재율·재고·박스 출고 추이를 고객사 화면에서 확인",
      "시즌 반품 현황 관리",
    ],
  },
  {
    id: "transport",
    key: "노선별 운송비까지 투명하게",
    title: "임시차 · 지입차 · 간선운송",
    lead: "센터와 매장을 잇는 운송을 운영합니다.",
    alt: "LOGEET 물류센터 도크와 도로를 달리는 LOGEET 트럭을 그린 그림",
    steps: ["운송 계획", "차량 배정", "운송", "비용 집계"],
    benefits: [
      "노선·배송 코스별 운송 현황 관리",
      "임시차 누적 비용과 고정계약 구분 집계",
      "센터별 운송비·물량 비교",
    ],
  },
  {
    id: "parcel",
    key: "채널별 택배비를 따로 집계",
    title: "택배 배송",
    lead: "B2B·B2C 택배 발송을 대행합니다.",
    alt: "택배 분류 컨베이어와 B2C·B2B 분류함, LOGEET 박스와 택배 차량을 그린 그림",
    steps: ["출고", "택배 접수", "배송", "B2B·B2C 비용 집계"],
    benefits: ["B2B·B2C 택배 비용 분리 집계", "누적 택배 비용과 물량 추이 확인", "운송비와 합산한 월별 물류비 확인"],
  },
  {
    id: "system",
    key: "예산 대비 집행률을 한 화면에",
    title: "자체 관리 시스템",
    lead: "운영 현황과 비용을 고객사 전용 화면으로 제공합니다.",
    alt: "LOGEET 대형 대시보드 화면과 노트북으로 작업하는 담당자를 그린 그림",
    steps: ["데이터 연동", "대시보드 반영", "월별 리포트"],
    benefits: [
      "예산 대비 집행률과 운송비 합계",
      "기존 엑셀·구글 시트 데이터 업로드·동기화",
      "계정별 접근 권한 관리",
    ],
  },
];

type Service = (typeof SERVICES)[number];
const pad = (n: number) => String(n).padStart(2, "0");

function Article({ s, className, children }: { s: Service; className: string; children: React.ReactNode }) {
  return (
    <article id={s.id} aria-labelledby={`${s.id}-title`} className={`reveal group scroll-mt-24 ${className}`}>
      {children}
    </article>
  );
}

/** 서비스 그림 — 네 장 모두 같은 5:4 비율(장면이 꽉 차게), 프로세스 지도와 같은 아이소메트릭 장면이 움직인다 */
function Photo({ s, className = "" }: { s: Service; className?: string }) {
  return (
    <div className={`relative aspect-[5/4] overflow-hidden rounded-sm bg-[linear-gradient(180deg,#f8fafc,#e9eef6)] ring-1 ring-line ${className}`}>
      <ServiceScene id={s.id as SceneId} label={s.alt} />
    </div>
  );
}

function Head({ s, i }: { s: Service; i: number }) {
  return (
    <>
      <p className="text-[13px] font-bold tabular-nums tracking-[0.14em] text-sub">
        <span className="text-blue">{pad(i + 1)}</span> / {pad(SERVICES.length)}
      </p>
      <h3 id={`${s.id}-title`} className="mt-4 text-[1.6rem] font-bold leading-tight tracking-[-0.02em] sm:text-[1.875rem] lg:text-[2rem]">
        {s.title}
      </h3>
      <p className="mt-4 text-base leading-[1.75] text-body sm:text-[17px]">{s.lead}</p>
    </>
  );
}

/** 서비스마다 다른 핵심 문구 */
function Key({ s }: { s: Service }) {
  return <p className="border-l-2 border-blue pl-4 text-lg font-bold leading-snug text-navy sm:text-xl">{s.key}</p>;
}

/** 운영 프로세스 — 단계 수만큼 나눈 진행 막대. 마지막 단계(결과)만 블루 */
function Steps({ s }: { s: Service }) {
  return (
    <ol aria-label={`${s.title} 운영 프로세스`} className="grid gap-x-1.5" style={{ gridTemplateColumns: `repeat(${s.steps.length}, minmax(0, 1fr))` }}>
      {s.steps.map((st, j) => {
        const last = j === s.steps.length - 1;
        return (
          <li key={st} className={`border-t-2 pt-3 ${last ? "border-blue" : "border-navy/20"}`}>
            <span className="block text-[11px] font-bold tabular-nums text-sub">{pad(j + 1)}</span>
            <span className={`mt-1 block text-[13px] font-semibold leading-snug sm:text-[14px] ${last ? "text-blue" : "text-charcoal"}`}>{st}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Benefits({ s }: { s: Service }) {
  return (
    <ul className="space-y-3">
      {s.benefits.map((b) => (
        <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-charcoal">
          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-blue" strokeWidth={2.5} />
          {b}
        </li>
      ))}
    </ul>
  );
}

function Cta({ s, className = "" }: { s: Service; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      <a
        href="#quote"
        className="group/cta inline-flex min-h-12 items-center gap-2 rounded-sm bg-navy px-6 text-[15px] font-bold text-white transition-colors duration-200 hover:bg-blue"
      >
        {s.title} 견적 문의
        <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
      </a>
      {s.id === "system" && (
        <a
          href={COMPANY.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-1 text-[15px] font-bold text-charcoal transition-colors duration-200 hover:text-blue"
        >
          고객사 시스템 바로가기
          <ArrowUpRight aria-hidden="true" className="size-4" />
          <span className="sr-only">(새 창)</span>
        </a>
      )}
    </div>
  );
}

export function Services() {
  const [a, b, c, d] = SERVICES;
  return (
    <section id="services" aria-labelledby="services-title" className="bg-paper pt-20 pb-24 sm:pt-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="services-title"
          eyebrow="Services"
          title="보관부터 배송까지, 한 곳에서 운영합니다"
          desc="여러 업체에 나눠 맡기면 비용도 책임도 흩어집니다. 로지트는 전 구간을 하나로 관리합니다."
          oneLine
        />

        {/* 네 서비스가 같은 카드로 반복되지 않도록 배치를 서로 다르게 */}
        <div className="mt-16 divide-y divide-line lg:mt-20">
          {/* 01 — 큰 사진 왼쪽, 가로 진행 막대 */}
          <Article s={a} className="grid items-center gap-10 pb-20 lg:grid-cols-12 lg:gap-16 lg:pb-28">
            <Photo s={a} className="lg:col-span-7" />
            <div className="lg:col-span-5">
              <Head s={a} i={0} />
              <div className="mt-7">
                <Key s={a} />
              </div>
              <div className="mt-9">
                <Steps s={a} />
              </div>
              <div className="mt-9 border-t border-line pt-7">
                <Benefits s={a} />
              </div>
              <Cta s={a} className="mt-9" />
            </div>
          </Article>

          {/* 02 — 01과 같은 구성·같은 사진 크기, 좌우만 반대 */}
          <Article s={b} className="grid items-center gap-10 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
            <Photo s={b} className="lg:order-2 lg:col-span-7" />
            <div className="lg:order-1 lg:col-span-5">
              <Head s={b} i={1} />
              <div className="mt-7">
                <Key s={b} />
              </div>
              <div className="mt-9">
                <Steps s={b} />
              </div>
              <div className="mt-9 border-t border-line pt-7">
                <Benefits s={b} />
              </div>
              <Cta s={b} className="mt-9" />
            </div>
          </Article>

          {/* 03 — 01과 같은 구성·같은 사진 크기 */}
          <Article s={c} className="grid items-center gap-10 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
            <Photo s={c} className="lg:col-span-7" />
            <div className="lg:col-span-5">
              <Head s={c} i={2} />
              <div className="mt-7">
                <Key s={c} />
              </div>
              <div className="mt-9">
                <Steps s={c} />
              </div>
              <div className="mt-9 border-t border-line pt-7">
                <Benefits s={c} />
              </div>
              <Cta s={c} className="mt-9" />
            </div>
          </Article>

          {/* 04 — 01과 같은 구성·같은 사진 크기, 좌우만 반대 */}
          <Article s={d} className="grid items-center gap-10 pt-20 lg:grid-cols-12 lg:gap-16 lg:pt-28">
            <Photo s={d} className="lg:order-2 lg:col-span-7" />
            <div className="lg:order-1 lg:col-span-5">
              <Head s={d} i={3} />
              <div className="mt-7">
                <Key s={d} />
              </div>
              <div className="mt-9">
                <Steps s={d} />
              </div>
              <div className="mt-9 border-t border-line pt-7">
                <Benefits s={d} />
              </div>
              <Cta s={d} className="mt-9" />
            </div>
          </Article>
        </div>
        <p className="mt-12 text-[13px] text-sub">서비스 그림은 이해를 돕기 위한 예시이며 실제 로지트 시설과 다를 수 있습니다.</p>
      </div>
    </section>
  );
}
