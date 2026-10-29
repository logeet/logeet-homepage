"use client";

import { useEffect, useRef, useState } from "react";
import { Boxes, BellRing, ArrowLeftRight, Maximize2, MousePointerClick } from "lucide-react";
import { SectionTitle } from "./Services";

// 3D 재고 관제 — public/demo/inventory-3d.html (three.js, 예시 데이터)을 그대로 띄운다
const SRC = "/demo/inventory-3d.html";

const FEATURES = [
  { icon: Boxes, title: "로케이션 단위 3D 재고", desc: "팔레트랙·DPS 위치별 수량이 3D 화면에 그대로 보입니다." },
  { icon: BellRing, title: "안전재고 미달 즉시 표시", desc: "부족한 위치가 빨간 표시로 떠, 보충 시점을 놓치지 않습니다." },
  { icon: ArrowLeftRight, title: "피킹부터 상차까지 한 흐름", desc: "DPS·DAS·PAS·Sorter를 거쳐 매장별로 상차되는 과정이 한 화면에 보입니다." },
];

export function Inventory3D() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // 3D 화면은 누른 뒤에만 조작 — 그 전엔 페이지 스크롤이 3D에 붙잡히지 않게
  const [active, setActive] = useState(false);

  // 화면 밖이면 3D를 멈추고(배터리·성능), 다시 보이면 이어서 움직임. 벗어나면 조작 모드도 끝
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      frameRef.current?.contentWindow?.postMessage(e.isIntersecting ? "resume" : "pause", "*");
      if (!e.isIntersecting) setActive(false);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="inventory" aria-labelledby="inventory-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="inventory-title"
          eyebrow="LOGEET 3D Inventory"
          title="입고부터 상차까지, 센터 전체를 3D로 실시간 관제합니다"
          desc="로케이션별 재고와 안전재고 미달 위치, 피킹·분류·상차 진행 상황을 한 화면에서 확인하고 바로 대응합니다."
          oneLine
        />

        {/* 움직이는 3D 화면 */}
        <div ref={boxRef} className="reveal relative mt-12 aspect-[4/5] overflow-hidden rounded-xl bg-[#dfe7f1] shadow-panel ring-1 ring-line sm:aspect-[16/10] lg:mt-14 lg:aspect-auto lg:h-[640px]">
          <iframe
            ref={frameRef}
            src={SRC}
            title="LOGEET 3D 재고 관제 예시 화면 — 재고보관, DPS 피킹, DAS·PAS 분배, Sorter 매장별 분류, 출하·상차 흐름"
            loading="lazy"
            className={`size-full border-0 ${active ? "" : "pointer-events-none"}`}
          />
          {/* 누르기 전엔 3D 위를 덮어 페이지 스크롤을 지킴 */}
          {!active && (
            <button type="button" onClick={() => setActive(true)} className="absolute inset-0" aria-label="3D 재고 화면 조작하기" />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2 sm:bottom-4">
            {!active && (
              <span className="inline-flex items-center gap-2 rounded-full bg-navy/85 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg backdrop-blur">
                <MousePointerClick aria-hidden="true" className="size-4" />
                <span className="sm:hidden">눌러서 조작</span>
                <span className="hidden sm:inline">눌러서 돌려보기 · 확대하기</span>
              </span>
            )}
            <a
              href={SRC}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2.5 text-[13px] font-bold text-navy shadow-lg ring-1 ring-line transition-colors duration-200 hover:bg-white"
            >
              <Maximize2 aria-hidden="true" className="size-3.5" />
              크게 보기
              <span className="sr-only">(새 창)</span>
            </a>
          </div>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3 lg:mt-10 lg:gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="reveal flex gap-4 rounded-xl border border-line bg-paper p-5 shadow-card">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-soft text-blue">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="text-[16px] font-bold text-navy">{title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-body">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[13px] text-sub">실제 센터 운영 방식을 바탕으로 만든 예시 화면이며, 수치는 예시 데이터입니다.</p>
      </div>
    </section>
  );
}
