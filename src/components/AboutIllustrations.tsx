import { BLUE, BOX, Box, Cube, Rack, SCREEN, SHELF, TRAILER, Truck, type Face } from "./ProcessIllustration";

/**
 * ABOUT LOGEET 그림 — 바닥 판 없이 물건 하나만 그린 작은 아이소메트릭 그림.
 * (Why LOGEET의 '판 위 장면'과 구분되도록) 부품·색은 운영 프로세스 그림과 같다.
 * viewBox는 물체 크기에 맞춘 정사각형(가운데·바닥 맞춤) — 작은 물체도 비슷한 면적으로 보이게 한다.
 */
const LIGHT: Face = { top: "#dbeafe", left: "#93c5fd", right: "#60a5fa" };
const INK: Face = { top: "#94a3b8", left: "#94a3b8", right: "#94a3b8" };
const PAPER: Face = { top: "#ffffff", left: "#e2e8f0", right: "#cbd5e1" };

function Mini({ box, label, children }: { box: string; label: string; children: React.ReactNode }) {
  return (
    <svg viewBox={box} className="h-full w-auto max-w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** 막대 4개가 있는 화면 앞면 (y = 화면 앞면 위치) */
function Bars({ x, y, z, gap = 1.05, hs = [1, 1.7, 1.3, 2.2] }: { x: number; y: number; z: number; gap?: number; hs?: number[] }) {
  return (
    <>
      {hs.map((h, i) => (
        <Cube key={i} x={x + i * gap} y={y} z={z} w={0.6} d={0.04} h={h} c={i === hs.length - 1 ? BLUE : LIGHT} />
      ))}
    </>
  );
}

/* ── 사업 영역 ── */

const Storage = () => (
  <Mini box="53.5 84 135 135" label="박스가 적재된 팔레트랙 그림">
    <Rack x={0.5} y={2.5} />
  </Mini>
);

const Transport = () => (
  <Mini box="60 98 132 132" label="화물 탑차 그림">
    <Truck x={0} y={2} />
  </Mini>
);

function Parcel() {
  const tape = (x: number, y: number, z: number, w: number, d: number) => (
    <Cube x={x} y={y + d / 2 - 0.15} z={z} w={w} d={0.3} h={0.03} c={BLUE} />
  );
  return (
    <Mini box="84.5 122 89 89" label="테이프로 포장된 택배 상자 그림">
      <Cube x={1} y={1} w={2.4} d={2.4} h={1.6} c={BOX} />
      {tape(1, 1, 1.6, 2.4, 2.4)}
      <Cube x={3.8} y={1.4} w={1.8} d={1.8} h={1.2} c={BOX} />
      {tape(3.8, 1.4, 1.2, 1.8, 1.8)}
      <Cube x={1.4} y={1.4} z={1.6} w={1.6} d={1.6} h={1.1} c={BOX} />
      {tape(1.4, 1.4, 2.7, 1.6, 1.6)}
      <Box x={2.8} y={3.9} s={1.4} />
      {tape(2.8, 3.9, 1.4, 1.4, 1.4)}
    </Mini>
  );
}

const System = () => (
  <Mini box="77.5 109 96 96" label="대시보드가 표시된 모니터 그림">
    <Cube x={2.2} y={2} w={2.6} d={1.6} h={0.15} c={SHELF} />
    <Cube x={3.1} y={2.3} z={0.15} w={0.8} d={0.5} h={1.2} c={SHELF} />
    <Cube x={1} y={2.9} z={1.2} w={5} d={0.25} h={3.2} c={SCREEN} />
    <Bars x={1.6} y={3.15} z={1.6} />
  </Mini>
);

/* ── 운영 방식 ── */

const Hub = () => (
  <Mini box="69.5 115 115 115" label="창고 건물 그림">
    <Cube x={1} y={1} w={5} d={3.6} h={2.4} c={TRAILER} />
    <Cube x={0.8} y={0.8} z={2.4} w={5.4} d={4} h={0.35} c={BLUE} />
    <Cube x={2.6} y={4.6} w={1.8} d={0.02} h={1.6} c={SHELF} />
    <Box x={6.6} y={3.4} />
  </Mini>
);

const Share = () => (
  <Mini box="65.5 113 108 108" label="대시보드 화면이 열린 노트북 그림">
    <Cube x={1} y={1.8} z={0.25} w={5} d={0.2} h={3.2} c={SCREEN} />
    <Bars x={1.6} y={2} z={0.7} />
    <Cube x={1} y={2} w={5} d={3.2} h={0.25} c={SHELF} />
    <Cube x={1.4} y={2.4} z={0.25} w={4.2} d={1.8} h={0.03} c={PAPER} />
  </Mini>
);

const Report = () => (
  <Mini box="73 95 116 116" label="리포트 서류와 달력 그림">
    {[0, 0.2, 0.4].map((z) => (
      <Cube key={z} x={1} y={2} z={z} w={3.6} d={2.8} h={0.18} c={PAPER} />
    ))}
    {[0, 1, 2].map((r) => (
      <Cube key={r} x={1.4} y={2.5 + r * 0.6} z={0.58} w={r === 2 ? 1.6 : 2.8} d={0.14} h={0.02} c={r === 2 ? BLUE : INK} />
    ))}
    <Cube x={5.2} y={1.6} w={2.2} d={0.5} h={3.6} c={TRAILER} />
    <Cube x={5.2} y={2.1} z={3} w={2.2} d={0.02} h={0.6} c={BLUE} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <Cube key={i} x={5.45 + (i % 3) * 0.6} y={2.1} z={0.5 + Math.floor(i / 3) * 0.9} w={0.4} d={0.02} h={0.55} c={i === 4 ? BLUE : LIGHT} />
    ))}
  </Mini>
);

const BINDER: Face = { top: "#475569", left: "#1e3a8a", right: "#172554" };

/** 월마감 — 바인더 두 권 + 마감 도장이 찍힌 서류 */
const Close = () => (
  <Mini box="82 123 89 107" label="바인더와 마감 도장이 찍힌 서류 그림">
    {[1, 2.3].map((x) => (
      <g key={x}>
        <Cube x={x} y={1.5} w={1.1} d={2.8} h={3.2} c={BINDER} />
        <Cube x={x + 0.2} y={4.3} z={1.8} w={0.7} d={0.02} h={0.6} c={PAPER} />
      </g>
    ))}
    <Cube x={4} y={2.5} w={3} d={3.4} h={0.15} c={PAPER} />
    {[0, 1, 2].map((r) => (
      <Cube key={r} x={4.4} y={2.9 + r * 0.55} z={0.15} w={r === 2 ? 1.2 : 2.2} d={0.12} h={0.02} c={INK} />
    ))}
    <Cube x={5.6} y={4.6} z={0.15} w={0.9} d={0.9} h={0.25} c={BLUE} />
  </Mini>
);

export const AREA_ILLUSTRATIONS = [Storage, Transport, Parcel, System];
export const PRINCIPLE_ILLUSTRATIONS = [Hub, Share, Report, Close];
