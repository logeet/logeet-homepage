"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BELT, BLUE, BOX, Box, Cube, FLOOR, GLASS, ORANGE, OX, OY, Rack, SCREEN, SHELF, Truck, WOOD, type Face } from "./ProcessIllustration";
import { Forklift, Laptop, ScanBeam, Worker, useReducedMotion, xy } from "./IsoActors";

/*
 * 운영 프로세스 — 센터 전체를 한 장의 아이소메트릭 지도로 보여주는 인터랙티브 화면.
 * 박스가 입고부터 리포트까지 길을 따라 움직이고, 구역을 누르면 오른쪽에 단계 설명과 지표가 뜬다.
 * 지표는 페이지의 다른 예시 데이터(LOGEET System 화면 · 물류비 리포트 탭)와 같은 값이다.
 */
const STEPS: { title: string; desc: string; metrics: [label: string, value: string, unit: string][] }[] = [
  { title: "입고 · 검수", desc: "수량과 상태를 확인하고, 이상 건은 즉시 공유합니다.", metrics: [["오늘 입고", "38", "팔레트"], ["검수 이상", "2", "건"]] },
  { title: "보관 · 재고 관리", desc: "로케이션 단위로 보관하고 적재율과 재고를 관리합니다.", metrics: [["적재율", "80", "%"], ["보관 SKU", "1,284", "개"]] },
  { title: "주문 · 출고 처리", desc: "주문에 맞춰 피킹·검수·패킹 후 출고합니다.", metrics: [["오늘 출고", "642", "박스"], ["최근 7일 최다", "702", "박스"]] },
  { title: "운송 · 배송", desc: "차량 운송과 택배로 전달합니다.", metrics: [["이번 달 운행", "99", "회"], ["택배 출고", "12,480", "박스"]] },
  { title: "실적 · 비용 리포트", desc: "예산 대비 집행률과 항목별 비용을 매월 보고합니다.", metrics: [["예산 집행률", "97.0", "%"], ["6월 전월 대비", "+4.9", "%"]] },
];

// 구역 배치(격자 좌표) — 윗줄 1→2→3, 꺾어서 아랫줄 4←5 로 이어지는 'ㄹ'자 동선
const ZONES = [
  { x: 0, y: 0 },
  { x: 14, y: -14 },
  { x: 28, y: -28 },
  { x: 42, y: -14 },
  { x: 28, y: 0 },
];
const z = (i: number) => ZONES[i];
const mid = (i: number) => ({ x: ZONES[i].x + 5, y: ZONES[i].y + 5 });
const ROAD: Face = { top: "#e2e8f0", left: "#cbd5e1", right: "#b8c2d1" };
const ACTIVE: Face = { top: "#dbe7ff", left: "#bfd2f7", right: "#a9c0ee" };

// 구역 사이 길 — 가운데에서 한 방향으로 갔다가 꺾는다. 3→4는 먼저 y로 꺾어야 길 모서리가 지도 밖으로 안 나감
const corner = (i: number) => {
  const a = mid(i);
  const b = mid(i + 1);
  return i === 2 ? { x: a.x, y: b.y } : { x: b.x, y: a.y };
};
const ROADS = ZONES.slice(0, -1).flatMap((_, i) => {
  const c = corner(i);
  return [mid(i), mid(i + 1)].map((q) => ({
    x: Math.min(q.x, c.x) - 1.5,
    y: Math.min(q.y, c.y) - 1.5,
    w: Math.abs(q.x - c.x) + 3,
    d: Math.abs(q.y - c.y) + 3,
  }));
});

// 박스가 다니는 길 — 길 한가운데를 따라 구역에 들어갔다 나온다
const ROUTE =
  "M" +
  ZONES.flatMap((_, i) => {
    const a = mid(i);
    if (i === ZONES.length - 1) return [xy(a.x, a.y, 0.1)];
    const c = corner(i);
    return [xy(a.x, a.y, 0.1), xy(c.x, c.y, 0.1)];
  })
    .map(([a, b]) => `${a},${b}`)
    .join(" L");

const AUTO_MS = 6000;

/** 각 구역의 사물과 작업자 — 앞(아래)에 있는 것을 나중에 그려야 겹침이 맞다 */
function ZoneArt({ i, still }: { i: number; still: boolean }) {
  const { x, y } = z(i);
  if (i === 0)
    return (
      <>
        <Truck x={x + 0.5} y={y + 0.8} />
        {/* 트럭에서 박스를 내리는 작업자 */}
        <Worker x={x + 3.4} y={y + 4.3} hold="box" walk={[0, 1.1]} still={still} />
        <Box x={x + 1.5} y={y + 6} />
        <Box x={x + 3.1} y={y + 6} />
        <Box x={x + 1.5} y={y + 6} z={1.3} />
        <Box x={x + 2.3} y={y + 7.4} />
        <Cube x={x + 6} y={y + 6.3} w={2.2} d={1.4} h={1.2} c={ORANGE} />
        <Cube x={x + 6.2} y={y + 6.5} z={1.2} w={1} d={1} h={1.2} c={ORANGE} />
        {/* 수량·상태를 확인하는 검수 담당 */}
        <Worker x={x + 8.6} y={y + 4.7} hold="tablet" still={still} />
        {/* 입고 팔레트를 옮기는 지게차 — 앞쪽 통로를 오감 */}
        <Forklift x={x + 4.9} y={y + 8.55} run={2.4} still={still} />
      </>
    );
  if (i === 1)
    return (
      <>
        <Rack x={x + 2} y={y + 1} />
        {/* 랙 옆을 오가며 적재하는 작업자 */}
        <Worker x={x + 8.7} y={y + 3.2} hold="box" walk={[0, 2.6]} still={still} />
        <Rack x={x + 2} y={y + 5} />
        {/* 랙 앞에서 재고를 확인하는 담당 */}
        <Worker x={x + 0.7} y={y + 8.3} hold="tablet" still={still} />
        {/* 랙에 팔레트를 올리는 지게차 */}
        <Forklift x={x + 4.6} y={y + 8.55} run={2.6} delay="-4s" still={still} />
      </>
    );
  if (i === 2)
    return (
      <>
        <Cube x={x + 6} y={y + 1} w={3} d={2} h={1.1} c={SHELF} />
        <Box x={x + 6.6} y={y + 1.3} z={1.1} s={1.1} />
        {/* 패킹대에서 포장하는 작업자 */}
        <Worker x={x + 7.2} y={y + 3.2} hold="box" still={still} />
        <Cube x={x + 0.5} y={y + 4.5} w={9} d={1.8} h={1} c={BELT} />
        <Box x={x + 1.2} y={y + 4.75} z={1} />
        <Box x={x + 6.8} y={y + 4.75} z={1} />
        <Cube x={x + 4} y={y + 4.2} w={0.4} d={0.3} h={3.6} c={SHELF} />
        <Box x={x + 3.6} y={y + 4.75} z={1} />
        <Cube x={x + 4} y={y + 6.5} w={0.4} d={0.3} h={3.6} c={SHELF} />
        <Cube x={x + 4} y={y + 4.2} z={3.6} w={0.4} d={2.6} h={0.4} c={GLASS} />
        {/* 컨베이어 위 박스를 바코드 스캐너로 읽는 출고 검수 */}
        <Worker x={x + 1.4} y={y + 8.3} hold="scanner" still={still} />
        <ScanBeam from={[x + 1.6, y + 8.75, 1.45]} to={[x + 1.85, y + 6.05, 1.75]} still={still} />
      </>
    );
  if (i === 3)
    return (
      <>
        <Cube x={x + 1} y={y + 1} w={2.8} d={2.8} h={0.35} c={WOOD} />
        <Box x={x + 1.1} y={y + 1.1} z={0.35} />
        <Box x={x + 2.5} y={y + 1.1} z={0.35} />
        <Box x={x + 1.1} y={y + 2.5} z={0.35} />
        <Box x={x + 2.5} y={y + 2.5} z={0.35} />
        <Box x={x + 1.8} y={y + 1.8} z={1.65} />
        <Truck x={x + 1.2} y={y + 4.2} flip />
        {/* 트럭 앞을 오가며 상차하는 지게차 */}
        <Forklift x={x + 4.6} y={y + 8.55} run={2.6} delay="-2s" still={still} />
        {/* 출발 전 배송 목록을 확인하는 기사 */}
        <Worker x={x + 0.4} y={y + 8.3} hold="tablet" still={still} />
      </>
    );
  return (
    <>
      <Cube x={x + 1.5} y={y + 2.5} w={6.5} d={3} h={1.7} c={SHELF} />
      <Cube x={x + 4.3} y={y + 3.3} z={1.7} w={0.8} d={0.5} h={0.7} c={SHELF} />
      <Cube x={x + 2.2} y={y + 3.6} z={2.4} w={5} d={0.25} h={3} c={SCREEN} />
      {[0.9, 1.6, 1.25, 2.1, 1.5].map((h, k) => (
        <Cube key={k} x={x + 2.75 + k * 0.85} y={y + 3.86} z={2.75} w={0.5} d={0.04} h={h} c={k === 3 ? ORANGE : BLUE} />
      ))}
      {/* 책상 위 노트북으로 실적을 정리하는 담당자 */}
      <Laptop x={x + 2.5} y={y + 4.7} z={1.7} />
      <Worker x={x + 2.65} y={y + 5.95} office still={still} />
      {/* 옆 테이블에서 노트북으로 비용 리포트를 만드는 담당자 */}
      <Cube x={x + 5.6} y={y + 6.3} w={2.4} d={1.2} h={1.1} c={SHELF} />
      <Laptop x={x + 6.3} y={y + 6.4} z={1.1} />
      <Worker x={x + 6.45} y={y + 7.8} office still={still} />
    </>
  );
}

export function ProcessMap() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // 직접 고르면 자동 넘김 끝
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const running = auto && inView && !reduced;
  const step = STEPS[active];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "-30% 0px -30% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [running, active]);

  // 좁은 화면에서 지도가 옆으로 길면, 선택된 구역이 가운데 오도록 지도만 가로로 밀어 준다
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = mapRef.current;
    if (!box || box.scrollWidth <= box.clientWidth) return;
    const [cx] = xy(mid(active).x, mid(active).y);
    box.scrollTo({ left: (cx / 830) * box.scrollWidth - box.clientWidth / 2, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  const pick = (i: number) => {
    setAuto(false);
    setActive((i + STEPS.length) % STEPS.length);
  };

  return (
    <div ref={ref} className="reveal mt-12 overflow-hidden rounded-xl border border-line bg-paper shadow-panel">
      {/* 상단 상태 표시줄 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
        <p className="flex items-center gap-2.5 text-[14px]">
          <span className="font-extrabold tracking-tight text-navy">LOGEET</span>
          <span aria-hidden="true" className="h-3.5 w-px bg-line-strong" />
          <span className="font-semibold text-charcoal">센터 운영 흐름</span>
        </p>
        <p className="flex items-center gap-3 text-[12px] font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span aria-hidden="true" className="relative flex size-2">
              {!reduced && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />}
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            운영 중
          </span>
          <span className="text-sub">예시 데이터</span>
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_300px]">
        {/* 지도 — 좁은 화면은 옆으로 밀어서 봄 */}
        <div ref={mapRef} className="overflow-x-auto bg-[linear-gradient(180deg,#f8fafc,#eef2f8)]">
          <svg viewBox="0 50 830 400" className="h-auto w-full min-w-[560px] lg:min-w-0" role="group" aria-label="물류 운영 흐름 지도 — 구역을 누르면 단계 설명이 나옵니다">
            {/* 구역을 잇는 길 */}
            {ROADS.map((r, k) => (
              <Cube key={k} x={r.x} y={r.y} z={-0.6} w={r.w} d={r.d} h={0.6} c={ROAD} />
            ))}

            {/* 구역 바닥 — 누르면 선택 (키보드로도 이동·선택) */}
            {STEPS.map((s, i) => {
              const { x, y } = z(i);
              const on = i === active;
              const top = [xy(x, y), xy(x + 10, y), xy(x + 10, y + 10), xy(x, y + 10)].map((q) => q.join(",")).join(" ");
              return (
                <g
                  key={s.title}
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-label={`${i + 1}단계 ${s.title}`}
                  onClick={() => pick(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      pick(i);
                    }
                  }}
                  className="cursor-pointer outline-none [&:focus-visible_.zone-ring]:stroke-[5]"
                >
                  <Cube x={x} y={y} z={-0.6} w={10} d={10} h={0.6} c={on ? ACTIVE : FLOOR} />
                  <polygon
                    points={top}
                    fill="none"
                    stroke="#1d4ed8"
                    strokeWidth={on ? 2.5 : 0}
                    className={`zone-ring ${on && !reduced ? "animate-pulse" : ""}`}
                  />
                </g>
              );
            })}

            {/* 길을 따라 움직이는 박스 — 구역 사물보다 먼저 그려 랙·트럭 안으로 들어가는 것처럼 보임 */}
            {!reduced &&
              [0, 1, 2, 3, 4].map((k) => (
                <g key={k} className="pointer-events-none">
                  <g transform={`translate(${-OX},${-OY})`}>
                    <Cube x={-0.55} y={-0.55} w={1.1} d={1.1} h={1.1} c={BOX} />
                  </g>
                  <animateMotion dur="20s" repeatCount="indefinite" begin={`${-k * 4}s`} path={ROUTE} />
                </g>
              ))}

            {/* 구역 사물 */}
            {STEPS.map((s, i) => (
              <g key={s.title} onClick={() => pick(i)} className="cursor-pointer">
                <ZoneArt i={i} still={reduced} />
              </g>
            ))}

            {/* 단계 핀 — 번호 + 이름, 선택된 구역은 파랗게 떠오름 */}
            {STEPS.map((s, i) => {
              const m = mid(i);
              const [cx, cy] = xy(m.x, m.y, 8.5);
              const on = i === active;
              const w = s.title.replace(/ /g, "").length * 13 + 52;
              return (
                <g key={s.title} transform={`translate(${cx},${cy})`} className="pointer-events-none">
                  <g>
                    {on && !reduced && (
                      <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="1.6s" repeatCount="indefinite" />
                    )}
                    <path d="M-6 13 L0 21 L6 13 Z" fill={on ? "#1d4ed8" : "#ffffff"} />
                    <rect
                      x={-w / 2}
                      y={-14}
                      width={w}
                      height={28}
                      rx={14}
                      fill={on ? "#1d4ed8" : "#ffffff"}
                      stroke={on ? "#1d4ed8" : "#d5deeb"}
                      style={{ filter: "drop-shadow(0 6px 10px rgba(11,23,48,0.15))" }}
                    />
                    <circle cx={-w / 2 + 15} cy={0} r={9.5} fill={on ? "#ffffff" : "#1d4ed8"} />
                    <text x={-w / 2 + 15} y={4} textAnchor="middle" fontSize={11} fontWeight={800} fill={on ? "#1d4ed8" : "#ffffff"}>
                      {i + 1}
                    </text>
                    <text x={-w / 2 + 31} y={4.5} fontSize={13} fontWeight={700} fill={on ? "#ffffff" : "#1e293b"}>
                      {s.title}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 선택된 단계 설명 */}
        <div aria-live={running ? "off" : "polite"} className="flex flex-col border-t border-line p-6 lg:border-t-0 lg:border-l">
          <div key={active} className="rise-in flex-1">
            <p className="text-[12px] font-bold tabular-nums tracking-[0.12em] text-blue">STEP {String(active + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-navy">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-body">{step.desc}</p>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {step.metrics.map(([l, v, u]) => (
                <div key={l} className="rounded-md border border-line bg-gray px-3.5 py-3">
                  <dt className="text-[12px] font-semibold text-sub">{l}</dt>
                  <dd className="mt-1 text-xl font-bold tabular-nums text-ink">
                    {v}
                    <span className="ml-0.5 text-[12px] font-medium text-sub">{u}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 단계 이동 — 진행 막대는 자동 넘김 중에만 차오름 */}
          <div className="mt-6">
            <div className="flex gap-1.5" aria-hidden="true">
              {STEPS.map((s, i) => (
                <span key={s.title} className="relative h-1 flex-1 overflow-hidden rounded-full bg-line">
                  {i < active && <span className="absolute inset-0 bg-blue" />}
                  {i === active &&
                    (running ? (
                      <span key={active} className="absolute inset-0 origin-left bg-blue" style={{ animation: `tab-progress ${AUTO_MS}ms linear both` }} />
                    ) : (
                      <span className="absolute inset-0 bg-blue" />
                    ))}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => pick(active - 1)}
                className="flex size-11 items-center justify-center rounded-md border border-line text-charcoal transition-colors duration-200 hover:border-blue hover:text-blue"
                aria-label="이전 단계"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <span className="text-[13px] font-semibold tabular-nums text-sub">
                {active + 1} / {STEPS.length}
              </span>
              <button
                type="button"
                onClick={() => pick(active + 1)}
                className="flex size-11 items-center justify-center rounded-md border border-line text-charcoal transition-colors duration-200 hover:border-blue hover:text-blue"
                aria-label="다음 단계"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
