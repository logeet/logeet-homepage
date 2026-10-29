/**
 * 아이소메트릭 그림 부품 (직접 그린 SVG) — 프로세스 지도·가치·회사 소개 그림이 함께 쓴다.
 * 좌표는 바닥 격자 단위(x, y)와 높이(z). 뒤쪽(x+y 작은 것)부터 그려야 겹침이 맞다.
 */

export const U = 12; // 격자 1칸 = 12px
export const C = Math.cos(Math.PI / 6); // 아이소메트릭 기울기
export const OX = 120;
export const OY = 150;

export type Face = { top: string; left: string; right: string };

// 그림 부품 색 — Why LOGEET 그림(ValueIllustrations)도 같은 색을 쓴다
export const BOX: Face = { top: "#efcf9f", left: "#dcae70", right: "#c99556" };
export const BLUE: Face = { top: "#60a5fa", left: "#1d4ed8", right: "#1d4ed8" };
export const FLOOR: Face = { top: "#ffffff", left: "#e6ebf3", right: "#d8dfea" };
export const BELT: Face = { top: "#475569", left: "#1d4ed8", right: "#1d4ed8" };
export const WOOD: Face = { top: "#d6b07a", left: "#b98d55", right: "#a57a45" };
export const ORANGE: Face = { top: "#fb923c", left: "#ea580c", right: "#c2410c" };
export const GLASS: Face = { top: "#dbeafe", left: "#bfdbfe", right: "#93c5fd" };
export const TRAILER: Face = { top: "#ffffff", left: "#e2e8f0", right: "#cbd5e1" };
const CHASSIS: Face = { top: "#94a3b8", left: "#64748b", right: "#475569" };
export const SCREEN: Face = { top: "#e2e8f0", left: "#f8fafc", right: "#94a3b8" };
const TIRE: Face = { top: "#475569", left: "#1e293b", right: "#0f172a" };
export const SHELF: Face = { top: "#e2e8f0", left: "#cbd5e1", right: "#94a3b8" };

/** 격자 좌표 → 화면 좌표. 원점(0,0,0)은 화면 (OX, OY) */
export const p = (x: number, y: number, z: number) =>
  `${(OX + (x - y) * C * U).toFixed(1)},${(OY + (x + y) * 0.5 * U - z * U).toFixed(1)}`;

/** 직육면체: (x,y,z)에서 w(x방향)·d(y방향)·h(높이) */
export function Cube({ x, y, z = 0, w, d, h, c }: { x: number; y: number; z?: number; w: number; d: number; h: number; c: Face }) {
  return (
    <g strokeWidth={0.6} stroke="rgba(15,23,42,0.08)" strokeLinejoin="round">
      <polygon fill={c.left} points={[p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)].join(" ")} />
      <polygon fill={c.right} points={[p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)].join(" ")} />
      <polygon fill={c.top} points={[p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)].join(" ")} />
    </g>
  );
}

export const Box = ({ x, y, z = 0, s = 1.3 }: { x: number; y: number; z?: number; s?: number }) => (
  <Cube x={x} y={y} z={z} w={s} d={s} h={s} c={BOX} />
);

/** 팔레트랙 한 대: 기둥 4개 + 선반 3단 + 박스 */
export function Rack({ x, y }: { x: number; y: number }) {
  const shelves = [0.2, 2.2, 4.2];
  return (
    <g>
      <Cube x={x} y={y} w={0.25} d={0.25} h={6} c={BLUE} />
      <Cube x={x} y={y + 1.6} w={0.25} d={0.25} h={6} c={BLUE} />
      {shelves.map((z) => (
        <g key={z}>
          <Cube x={x} y={y} z={z} w={6} d={1.85} h={0.2} c={BLUE} />
          <Box x={x + 0.5} y={y + 0.3} z={z + 0.2} />
          <Box x={x + 2.3} y={y + 0.3} z={z + 0.2} />
          {z !== 2.2 && <Box x={x + 4.1} y={y + 0.3} z={z + 0.2} />}
        </g>
      ))}
      <Cube x={x + 5.75} y={y} w={0.25} d={0.25} h={6} c={BLUE} />
      <Cube x={x + 5.75} y={y + 1.6} w={0.25} d={0.25} h={6} c={BLUE} />
    </g>
  );
}

export function Truck({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  // flip=false: 화물칸이 왼쪽(x 작은 쪽), 운전석이 오른쪽
  const cabX = flip ? x : x + 6;
  const boxX = flip ? x + 2.2 : x;
  const wheels = flip ? [x + 0.6, x + 3.4, x + 6.6] : [x + 0.8, x + 3.6, x + 6.8];
  return (
    <g>
      {wheels.map((wx) => (
        <Cube key={wx} x={wx} y={y + 2.6} w={0.9} d={0.5} h={0.6} c={TIRE} />
      ))}
      <Cube x={x} y={y} z={0.3} w={8.2} d={3} h={0.25} c={CHASSIS} />
      <Cube x={boxX} y={y} z={0.55} w={6} d={3} h={3} c={TRAILER} />
      <Cube x={boxX + 0.3} y={y + 3} z={1.9} w={5.4} d={0.02} h={0.35} c={BLUE} />
      <Cube x={cabX} y={y + 0.2} z={0.55} w={2.2} d={2.6} h={2.2} c={TRAILER} />
      <Cube x={cabX + (flip ? 0 : 1.6)} y={y + 0.3} z={1.6} w={0.6} d={2.4} h={0.9} c={GLASS} />
    </g>
  );
}
