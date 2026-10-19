/**
 * 운영 프로세스 아이소메트릭 일러스트 (직접 그린 SVG).
 * 5개 구역이 왼쪽→오른쪽으로 흐른다: 입고 → 보관 → 피킹 → 검수·패킹 → 출고.
 * 좌표는 바닥 격자 단위(x, y)와 높이(z). 뒤쪽(x+y 작은 것)부터 그려야 겹침이 맞다.
 */

const U = 12; // 격자 1칸 = 12px
const C = Math.cos(Math.PI / 6);
const OX = 120;
const OY = 150;
const GAP = 14; // 구역 간 간격(격자)

type Face = { top: string; left: string; right: string };

const BOX: Face = { top: "#efcf9f", left: "#dcae70", right: "#c99556" };
const BLUE: Face = { top: "#60a5fa", left: "#1d4ed8", right: "#1d4ed8" };
const FLOOR: Face = { top: "#ffffff", left: "#e6ebf3", right: "#d8dfea" };
const BELT: Face = { top: "#475569", left: "#1d4ed8", right: "#1d4ed8" };
const WOOD: Face = { top: "#d6b07a", left: "#b98d55", right: "#a57a45" };
const ORANGE: Face = { top: "#fb923c", left: "#ea580c", right: "#c2410c" };
const GLASS: Face = { top: "#dbeafe", left: "#bfdbfe", right: "#93c5fd" };
const TRAILER: Face = { top: "#ffffff", left: "#e2e8f0", right: "#cbd5e1" };
const CHASSIS: Face = { top: "#94a3b8", left: "#64748b", right: "#475569" };
const SCREEN: Face = { top: "#e2e8f0", left: "#f8fafc", right: "#94a3b8" };
const TIRE: Face = { top: "#475569", left: "#1e293b", right: "#0f172a" };
const SHELF: Face = { top: "#e2e8f0", left: "#cbd5e1", right: "#94a3b8" };

const p = (x: number, y: number, z: number) =>
  `${(OX + (x - y) * C * U).toFixed(1)},${(OY + (x + y) * 0.5 * U - z * U).toFixed(1)}`;

/** 직육면체: (x,y,z)에서 w(x방향)·d(y방향)·h(높이) */
function Cube({ x, y, z = 0, w, d, h, c }: { x: number; y: number; z?: number; w: number; d: number; h: number; c: Face }) {
  return (
    <g strokeWidth={0.6} stroke="rgba(15,23,42,0.08)" strokeLinejoin="round">
      <polygon fill={c.left} points={[p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)].join(" ")} />
      <polygon fill={c.right} points={[p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)].join(" ")} />
      <polygon fill={c.top} points={[p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)].join(" ")} />
    </g>
  );
}

const Box = ({ x, y, z = 0, s = 1.3 }: { x: number; y: number; z?: number; s?: number }) => (
  <Cube x={x} y={y} z={z} w={s} d={s} h={s} c={BOX} />
);

/** 팔레트랙 한 대: 기둥 4개 + 선반 3단 + 박스 */
function Rack({ x, y }: { x: number; y: number }) {
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

function Truck({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
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

const ZONES = ["입고 · 검수", "보관 · 재고", "주문 · 출고 처리", "운송 · 배송", "실적 · 비용 리포트"];

export function ProcessIllustration() {
  const z = (i: number) => ({ x: i * GAP, y: -i * GAP });
  const center = (i: number) => p(z(i).x + 5, z(i).y + 5, 0).split(",").map(Number);

  return (
    <svg viewBox="0 70 1400 255" className="h-auto w-full min-w-[760px] sm:min-w-0" role="img" aria-label="입고·검수, 보관·재고 관리, 주문·출고 처리, 운송·배송, 실적·비용 리포트로 이어지는 물류 운영 흐름">
      {/* 바닥 판 */}
      {ZONES.map((_, i) => (
        <Cube key={i} x={z(i).x} y={z(i).y} z={-0.6} w={10} d={10} h={0.6} c={FLOOR} />
      ))}

      {/* 흐름 화살표 (바닥 위 점선) */}
      {ZONES.slice(0, -1).map((_, i) => {
        const [x1, y1] = center(i);
        const [x2, y2] = center(i + 1);
        return (
          <g key={i} stroke="#1d4ed8" strokeWidth={3} fill="none" strokeLinecap="round">
            <line x1={x1 + 120} y1={y1} x2={x2 - 120} y2={y2} strokeDasharray="2 9" />
            <polyline points={`${x2 - 128},${y2 - 6} ${x2 - 120},${y2} ${x2 - 128},${y2 + 6}`} />
          </g>
        );
      })}

      {/* 1 입고: 트럭 + 하차된 박스 */}
      <g>
        <Truck x={z(0).x + 0.5} y={z(0).y + 0.8} />
        <Box x={z(0).x + 1.5} y={z(0).y + 6} />
        <Box x={z(0).x + 3.1} y={z(0).y + 6} />
        <Box x={z(0).x + 1.5} y={z(0).y + 6} z={1.3} />
        <Box x={z(0).x + 2.3} y={z(0).y + 7.6} />
        <Cube x={z(0).x + 6} y={z(0).y + 6.5} w={2.2} d={1.4} h={1.2} c={ORANGE} />
        <Cube x={z(0).x + 6.2} y={z(0).y + 6.7} z={1.2} w={1} d={1} h={1.2} c={ORANGE} />
      </g>

      {/* 2 보관: 팔레트랙 두 줄 */}
      <g>
        <Rack x={z(1).x + 2} y={z(1).y + 1.5} />
        <Rack x={z(1).x + 2} y={z(1).y + 6} />
      </g>

      {/* 3 주문·출고 처리: 컨베이어 + 스캔 게이트 + 패킹대 */}
      <g>
        <Cube x={z(2).x + 6} y={z(2).y + 1} w={3} d={2} h={1.1} c={SHELF} />
        <Box x={z(2).x + 6.6} y={z(2).y + 1.3} z={1.1} s={1.1} />
        <Cube x={z(2).x + 0.5} y={z(2).y + 4.5} w={9} d={1.8} h={1} c={BELT} />
        <Box x={z(2).x + 1.2} y={z(2).y + 4.75} z={1} />
        <Box x={z(2).x + 6.8} y={z(2).y + 4.75} z={1} />
        <Cube x={z(2).x + 4} y={z(2).y + 4.2} w={0.4} d={0.3} h={3.6} c={SHELF} />
        <Box x={z(2).x + 3.6} y={z(2).y + 4.75} z={1} />
        <Cube x={z(2).x + 4} y={z(2).y + 6.5} w={0.4} d={0.3} h={3.6} c={SHELF} />
        <Cube x={z(2).x + 4} y={z(2).y + 4.2} z={3.6} w={0.4} d={2.6} h={0.4} c={GLASS} />
      </g>

      {/* 4 운송·배송: 팔레트 위 박스 + 출고 트럭 */}
      <g>
        <Cube x={z(3).x + 1} y={z(3).y + 1} w={2.8} d={2.8} h={0.35} c={WOOD} />
        <Box x={z(3).x + 1.1} y={z(3).y + 1.1} z={0.35} />
        <Box x={z(3).x + 2.5} y={z(3).y + 1.1} z={0.35} />
        <Box x={z(3).x + 1.1} y={z(3).y + 2.5} z={0.35} />
        <Box x={z(3).x + 2.5} y={z(3).y + 2.5} z={0.35} />
        <Box x={z(3).x + 1.8} y={z(3).y + 1.8} z={1.65} />
        <Truck x={z(3).x + 1.2} y={z(3).y + 5.8} flip />
      </g>

      {/* 5 실적·비용 리포트: 책상 + 리포트 화면(막대) + 서류 */}
      <g>
        <Cube x={z(4).x + 1.5} y={z(4).y + 2.5} w={6.5} d={3} h={1.7} c={SHELF} />
        <Cube x={z(4).x + 4.3} y={z(4).y + 3.3} z={1.7} w={0.8} d={0.5} h={0.7} c={SHELF} />
        <Cube x={z(4).x + 2.2} y={z(4).y + 3.6} z={2.4} w={5} d={0.25} h={3} c={SCREEN} />
        {[0.9, 1.6, 1.25, 2.1, 1.5].map((h, i) => (
          <Cube
            key={i}
            x={z(4).x + 2.75 + i * 0.85}
            y={z(4).y + 3.86}
            z={2.75}
            w={0.5}
            d={0.04}
            h={h}
            c={i === 3 ? ORANGE : BLUE}
          />
        ))}
        <Cube x={z(4).x + 6.2} y={z(4).y + 6.6} w={1.8} d={1.3} h={0.25} c={SCREEN} />
        <Cube x={z(4).x + 6.3} y={z(4).y + 6.7} z={0.25} w={1.6} d={1.1} h={0.2} c={SCREEN} />
      </g>

      {/* 단계 라벨 */}
      <g>
        {ZONES.map((label, i) => {
          const [cx] = center(i);
          const y = OY + 10 * U + 28;
          const w = label.replace(/ /g, "").length * 15 + 56;
          return (
            <g key={label} transform={`translate(${cx},${y})`}>
              <rect x={-w / 2} y={-17} width={w} height={34} rx={17} fill="#ffffff" stroke="#e5eaf3" />
              <circle cx={-w / 2 + 18} cy={0} r={11} fill="#1d4ed8" />
              <text x={-w / 2 + 18} y={4.5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff">
                {i + 1}
              </text>
              <text x={-w / 2 + 36} y={5.5} fontSize={15} fontWeight={700} fill="#111827">
                {label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
