import { BLUE, Box, Cube, FLOOR, GLASS, Rack, SCREEN, SHELF, TRAILER, Truck, WOOD, type Face } from "./ProcessIllustration";

/**
 * Why LOGEET 네 가지 가치 그림 — 운영 프로세스 그림과 같은 아이소메트릭 부품·색을 쓴다.
 * 각 그림은 10×10 바닥 판 하나 위에 그린다. 뒤쪽(x+y 작은 것)부터 그려야 겹침이 맞다.
 */
const LIGHT: Face = { top: "#dbeafe", left: "#93c5fd", right: "#60a5fa" };
const SERVER: Face = { top: "#cbd5e1", left: "#334155", right: "#1e293b" };
const INK: Face = { top: "#94a3b8", left: "#94a3b8", right: "#94a3b8" };

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox="6 78 228 210" className="h-auto w-full" role="img" aria-label={label}>
      <Cube x={0} y={0} z={-0.6} w={10} d={10} h={0.6} c={FLOOR} />
      {children}
    </svg>
  );
}

/** 비용 투명성 — 항목별 비용 막대 + 명세서 */
function Cost() {
  const bars = [2.2, 3.4, 2.8, 4.4];
  return (
    <Frame label="항목별로 나뉜 비용 막대와 명세서 그림">
      {bars.map((h, i) => (
        <Cube key={i} x={1.2 + i * 2.1} y={2.6} w={1.4} d={1.4} h={h} c={i === bars.length - 1 ? BLUE : LIGHT} />
      ))}
      <Cube x={1.6} y={5.8} w={5.6} d={3} h={0.14} c={SCREEN} />
      {[0, 1, 2, 3].map((r) => (
        <Cube key={r} x={2.1} y={6.3 + r * 0.6} z={0.14} w={r === 3 ? 2.4 : 4.4} d={0.14} h={0.02} c={r === 3 ? BLUE : INK} />
      ))}
    </Frame>
  );
}

/** 운영 가시성 — 팔레트랙 + 적재 현황 모니터 */
function Visibility() {
  const cells = [1, 2, 1, 0, 2, 1, 1, 2]; // 0 빈 칸, 1 적재, 2 일부
  const color = [SHELF, BLUE, LIGHT];
  return (
    <Frame label="팔레트랙과 적재 현황을 보여주는 모니터 그림">
      <Rack x={2} y={0.8} />
      <Cube x={4.6} y={6.4} w={0.8} d={0.6} h={1.5} c={SHELF} />
      <Cube x={2.2} y={6.6} z={1.5} w={5.6} d={0.25} h={3.2} c={SCREEN} />
      {cells.map((c, i) => (
        <Cube key={i} x={2.6 + (i % 4) * 1.25} y={6.85} z={3.05 - Math.floor(i / 4) * 1.35} w={1} d={0.04} h={1.05} c={color[c]} />
      ))}
    </Frame>
  );
}

/** 통합 물류 — 창고 · 팔레트 · 트럭을 한 판 위에 */
function Integrated() {
  return (
    <Frame label="창고, 팔레트, 트럭이 한 곳에 연결된 그림">
      {/* 뒤: 트럭 / 앞 왼쪽: 낮은 창고 / 앞 오른쪽: 팔레트 */}
      <Truck x={0.9} y={0.6} />
      <Cube x={0.8} y={5.2} w={4.2} d={3.2} h={1.9} c={TRAILER} />
      <Cube x={0.6} y={5} z={1.9} w={4.6} d={3.6} h={0.3} c={BLUE} />
      <Cube x={1.9} y={8.4} w={1.6} d={0.02} h={1.3} c={SHELF} />
      <Cube x={6.4} y={5.6} w={2.6} d={2.6} h={0.3} c={WOOD} />
      <Box x={6.5} y={5.7} z={0.3} />
      <Box x={7.6} y={5.7} z={0.3} />
      <Box x={6.5} y={6.8} z={0.3} />
      <Box x={7.6} y={6.8} z={0.3} />
      <Box x={7.05} y={6.25} z={1.6} />
    </Frame>
  );
}

/** 데이터 기반 관리 — 서버 · 대시보드 화면 · 시트 데이터 */
function Data() {
  return (
    <Frame label="서버와 시트 데이터, 대시보드 화면 그림">
      {[0, 1.5, 3].map((z) => (
        <g key={z}>
          <Cube x={1} y={1} z={z} w={2.6} d={2.6} h={1.35} c={SERVER} />
          <Cube x={1.3} y={3.6} z={z + 0.55} w={1.4} d={0.03} h={0.18} c={BLUE} />
        </g>
      ))}
      <Cube x={5.6} y={1.6} w={0.6} d={0.5} h={1} c={SHELF} />
      <Cube x={4.4} y={1.9} z={1} w={4.6} d={0.25} h={3} c={SCREEN} />
      {[1, 1.7, 1.3, 2.2].map((h, i) => (
        <Cube key={i} x={4.9 + i * 1.05} y={2.15} z={1.35} w={0.6} d={0.04} h={h} c={i === 3 ? BLUE : LIGHT} />
      ))}
      <Cube x={4.4} y={5.6} w={4.8} d={3.4} h={0.12} c={SCREEN} />
      {Array.from({ length: 12 }, (_, i) => (
        <Cube
          key={i}
          x={4.75 + (i % 4) * 1.1}
          y={5.95 + Math.floor(i / 4) * 0.95}
          z={0.12}
          w={0.95}
          d={0.75}
          h={0.04}
          c={i < 4 ? BLUE : i % 3 === 0 ? LIGHT : GLASS}
        />
      ))}
    </Frame>
  );
}

export const VALUE_ILLUSTRATIONS = [Cost, Visibility, Integrated, Data];
