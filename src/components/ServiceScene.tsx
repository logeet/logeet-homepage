"use client";

import { BELT, BLUE, BOX, Box, C, Cube, FLOOR, GLASS, OX, OY, Rack, SHELF, Truck, WOOD, type Face } from "./ProcessIllustration";
import { Forklift, Laptop, ScanBeam, Worker, useReducedMotion, xy } from "./IsoActors";

/*
 * 서비스 그림 — 사진 대신 프로세스 지도와 같은 아이소메트릭 장면이 움직인다.
 * 네 장면 모두 LOGEET 이름이 보이게(벽 간판 · 트럭 옆면 · 박스 · 대형 화면).
 */
export type SceneId = "fulfillment" | "transport" | "parcel" | "system";

const WALL: Face = { top: "#e2e8f0", left: "#f8fafc", right: "#cbd5e1" };
const ROOF: Face = { top: "#cbd5e1", left: "#94a3b8", right: "#64748b" };
const ASPHALT: Face = { top: "#475569", left: "#334155", right: "#1e293b" };
const DOOR: Face = { top: "#94a3b8", left: "#64748b", right: "#475569" };
const LEAF: Face = { top: "#4ade80", left: "#22c55e", right: "#16a34a" };
const DISPLAY: Face = { top: "#1e293b", left: "#0b1730", right: "#0f172a" };
const BIN_BLUE: Face = { top: "#bfdbfe", left: "#3b82f6", right: "#1d4ed8" };
const BIN_TEAL: Face = { top: "#99f6e4", left: "#14b8a6", right: "#0d9488" };

export const SCENE_ASPECT = 1.25; // 서비스 그림 틀 5:4 — 아이소메트릭 장면이 꽉 차는 비율

/**
 * 장면이 틀을 꽉 채우도록 화면 범위를 잡는다. 좌우 끝의 빈 바닥 꼭짓점은 조금 잘라내고(trim),
 * 세로가 넘치면 위보다 아래를 더 자른다. (W, D)는 바닥 크기, top은 가장 높은 벽 높이(격자)
 */
function frame(W: number, D: number, top: number, trim = 0) {
  const [lx] = xy(0, D);
  const [rx] = xy(W, 0);
  const [, ty] = xy(0, 0, top);
  const [, by] = xy(W, D);
  const bh = by - ty + 16; // 바닥 두께 + 여백
  let w = (rx - lx) * (1 - trim * 2);
  let h = w / SCENE_ASPECT;
  if (h > bh) {
    h = bh;
    w = h * SCENE_ASPECT;
  }
  const x = (lx + rx) / 2 - w / 2;
  const y = ty - 8 + (bh - h) * 0.35; // 위(간판)는 덜, 아래(바닥 꼭짓점)는 더 자름
  return `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`;
}

/** 면 위에 글자 쓰기 — front: y가 일정한 앞면(왼쪽 아래를 봄), side: x가 일정한 옆면(오른쪽 아래를 봄). (x, y, z)는 글자 기준선 시작점 */
function IsoText({
  x,
  y,
  z,
  size,
  side = "front",
  fill = "#0b1730",
  weight = 900,
  spacing = 0,
  children,
}: {
  x: number;
  y: number;
  z: number;
  size: number;
  side?: "front" | "side";
  fill?: string;
  weight?: number;
  spacing?: number;
  children: React.ReactNode;
}) {
  const [ex, ey] = xy(x, y, z);
  const m = side === "front" ? `matrix(${C},0.5,0,1,${ex},${ey})` : `matrix(${C},-0.5,0,1,${ex},${ey})`;
  return (
    <text transform={m} fontSize={size} fontWeight={weight} fill={fill} letterSpacing={spacing}>
      {children}
    </text>
  );
}

/** 앞면(y 일정) 평면 — 안쪽 좌표는 가로·세로 모두 격자 1칸 = 12. (x, y, z)는 평면의 왼쪽 위 */
function IsoPlane({ x, y, z, children }: { x: number; y: number; z: number; children: React.ReactNode }) {
  const [ex, ey] = xy(x, y, z);
  return <g transform={`matrix(${C},0.5,0,1,${ex},${ey})`}>{children}</g>;
}

/** 경로를 따라 계속 움직이는 물건 — children은 격자 (0,0) 기준으로 그린다 */
function Mover({ pts, dur, begin, still, children }: { pts: [number, number, number][]; dur: string; begin: string; still: boolean; children: React.ReactNode }) {
  const s = pts.map((q) => xy(...q));
  const body = <g transform={`translate(${-OX},${-OY})`}>{children}</g>;
  if (still) return <g transform={`translate(${s[0][0]},${s[0][1]})`}>{body}</g>;
  return (
    <g>
      {body}
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={"M" + s.map(([a, b]) => `${a},${b}`).join(" L")} />
    </g>
  );
}

/** 위아래로 살짝 떠다님 / 덜컹거림 */
function Bob({ dy, dur, still, children }: { dy: number; dur: string; still: boolean; children: React.ReactNode }) {
  return (
    <g>
      {!still && <animateTransform attributeName="transform" type="translate" values={`0 0;0 ${-dy};0 0`} dur={dur} repeatCount="indefinite" />}
      {children}
    </g>
  );
}

function Tree({ x, y }: { x: number; y: number }) {
  return (
    <>
      <Cube x={x} y={y} w={0.4} d={0.4} h={1.1} c={WOOD} />
      <Cube x={x - 0.6} y={y - 0.6} z={1.1} w={1.6} d={1.6} h={1.8} c={LEAF} />
    </>
  );
}

/** 컨베이어 위 박스 (가운데 정렬) */
const BeltBox = ({ s = 1.2 }: { s?: number }) => <Cube x={-s / 2} y={-s / 2} w={s} d={s} h={s} c={BOX} />;

/* ───────────── 01 풀필먼트 — LOGEET 센터 벽 간판, 랙, 지게차, 컨베이어 검수·패킹 ───────────── */
function Fulfillment({ still }: { still: boolean }) {
  return (
    <>
      <Cube x={0} y={0} z={-0.6} w={24} d={16} h={0.6} c={FLOOR} />
      <Cube x={0} y={-0.5} w={24} d={0.5} h={9.4} c={WALL} />
      <Cube x={0} y={0} z={8.6} w={24} d={0.05} h={0.35} c={BLUE} />
      <IsoText x={1.4} y={0} z={6.5} size={22}>
        LOGEET
      </IsoText>
      <IsoText x={9.8} y={0} z={6.5} size={8.5} fill="#1d4ed8" weight={800} spacing={1.5}>
        FULFILLMENT CENTER
      </IsoText>

      {[1.5, 8.5, 15.5].map((x) => (
        <Rack key={`b${x}`} x={x} y={1.5} />
      ))}
      {[1.5, 8.5, 15.5].map((x) => (
        <Rack key={`f${x}`} x={x} y={5.3} />
      ))}
      {/* 재고 확인 담당 */}
      <Worker x={22.4} y={4.2} hold="tablet" still={still} />
      {/* 팔레트 */}
      <Cube x={0.4} y={8.4} w={2.6} d={2.6} h={0.35} c={WOOD} />
      <Box x={0.5} y={8.5} z={0.35} />
      <Box x={1.8} y={8.5} z={0.35} />
      <Box x={0.5} y={9.8} z={0.35} />
      {/* 앞 통로를 오가는 지게차와 피킹 작업자 */}
      <Forklift x={9} y={8.3} run={7} still={still} />
      <Worker x={4} y={10.4} hold="box" walk={[5, 0]} still={still} />

      {/* 컨베이어 — 박스가 흘러가며 스캔 게이트를 지남 */}
      <Cube x={2} y={12} w={16} d={1.6} h={1} c={BELT} />
      <Cube x={10} y={11.7} w={0.35} d={0.3} h={3} c={SHELF} />
      {[0, 1, 2, 3].map((k) => (
        <Mover key={k} pts={[[2.6, 12.8, 1], [17.4, 12.8, 1]]} dur="10s" begin={`${-k * 2.5}s`} still={still}>
          <BeltBox />
        </Mover>
      ))}
      <Cube x={10} y={13.6} w={0.35} d={0.3} h={3} c={SHELF} />
      <Cube x={10} y={11.7} z={3} w={0.35} d={2.2} h={0.35} c={GLASS} />
      {/* 패킹대 */}
      <Cube x={19} y={11.4} w={3.6} d={2.6} h={1.1} c={SHELF} />
      <Box x={19.5} y={11.8} z={1.1} s={1.1} />
      <Box x={21} y={11.9} z={1.1} s={1} />
      <Worker x={6} y={14.5} hold="scanner" still={still} />
      <ScanBeam from={[6.2, 14.95, 1.45]} to={[6.3, 13.6, 1.5]} still={still} />
      <Worker x={20.3} y={14.6} hold="box" still={still} />
    </>
  );
}

/* ───────────── 02 임시차 · 지입차 · 간선운송 — LOGEET 물류센터, 도로를 달리는 LOGEET 트럭 ───────────── */
function Transport({ still }: { still: boolean }) {
  const [l1, l1y] = xy(0, 10.25);
  const [l2, l2y] = xy(26, 10.25);
  return (
    <>
      <Cube x={0} y={0} z={-0.6} w={26} d={7} h={0.6} c={FLOOR} />
      <Cube x={0} y={7} z={-0.6} w={26} d={6.5} h={0.6} c={ASPHALT} />
      <Cube x={0} y={13.5} z={-0.6} w={26} d={3.5} h={0.6} c={FLOOR} />
      {/* 차선 — 뒤로 흘러가 트럭이 달리는 것처럼 */}
      <line x1={l1} y1={l1y} x2={l2} y2={l2y} stroke="#f8fafc" strokeWidth={2} strokeDasharray="10 9" opacity={0.85}>
        {!still && <animate attributeName="stroke-dashoffset" values="0;19" dur="0.7s" repeatCount="indefinite" />}
      </line>

      {/* LOGEET 물류센터 */}
      <Cube x={1} y={0.5} w={13} d={4.6} h={7.5} c={WALL} />
      <Cube x={1} y={0.5} z={7.5} w={13} d={4.6} h={0.3} c={ROOF} />
      {[0, 1, 2].map((i) => (
        <Cube key={i} x={1.8 + i * 4} y={5.1} w={3} d={0.05} h={3.2} c={DOOR} />
      ))}
      <Cube x={1} y={5.1} z={4.2} w={13} d={0.05} h={0.35} c={BLUE} />
      <IsoText x={1.6} y={5.15} z={5.25} size={18}>
        LOGEET
      </IsoText>
      <IsoText x={8.6} y={5.15} z={5.25} size={8} fill="#1d4ed8" weight={800} spacing={1}>
        TRANSPORT
      </IsoText>

      {/* 도크에 대기 중인 LOGEET 트럭 */}
      <Truck x={15} y={1} />
      <IsoText x={15.7} y={4.02} z={2.45} size={11.5}>
        LOGEET
      </IsoText>
      {/* 도크 앞 상차 지게차 · 배차 담당 */}
      <Forklift x={9.5} y={5.4} run={3} still={still} />
      <Worker x={15.8} y={5.6} hold="tablet" still={still} />

      {/* 도로를 달리는 LOGEET 트럭 */}
      <Bob dy={0.8} dur="0.35s" still={still}>
        <Truck x={8} y={9.4} />
        <IsoText x={8.7} y={12.42} z={2.45} size={11.5}>
          LOGEET
        </IsoText>
      </Bob>
      <Tree x={3} y={15.6} />
      <Tree x={12.5} y={15.6} />
      <Tree x={22} y={15.6} />
    </>
  );
}

/* ───────────── 03 택배 배송 — 분류 컨베이어, B2C/B2B 분류함, LOGEET 박스와 택배 차량 ───────────── */
function Parcel({ still }: { still: boolean }) {
  const big = (x: number, y: number, z = 0) => (
    <>
      <Cube x={x} y={y} z={z} w={2.4} d={2.4} h={2.2} c={BOX} />
      <Cube x={x} y={y + 2.4} z={z + 1.05} w={2.4} d={0.03} h={0.3} c={BLUE} />
      <IsoText x={x + 0.25} y={y + 2.42} z={z + 0.55} size={6.5}>
        LOGEET
      </IsoText>
    </>
  );
  return (
    <>
      <Cube x={0} y={0} z={-0.6} w={24} d={16} h={0.6} c={FLOOR} />
      <Cube x={0} y={-0.5} w={24} d={0.5} h={7.6} c={WALL} />
      <Cube x={0} y={0} z={6.9} w={24} d={0.05} h={0.35} c={BLUE} />
      <IsoText x={9.4} y={0} z={4.7} size={18}>
        LOGEET
      </IsoText>
      <IsoText x={15.8} y={0} z={4.7} size={8} fill="#1d4ed8" weight={800} spacing={1}>
        PARCEL CENTER
      </IsoText>
      {/* 뒤쪽 출고 대기 팔레트 */}
      {[1.5, 5.5].map((x) => (
        <g key={x}>
          <Cube x={x} y={1.2} w={3} d={3} h={0.35} c={WOOD} />
          <Box x={x + 0.1} y={1.3} z={0.35} />
          <Box x={x + 1.5} y={1.3} z={0.35} />
          <Box x={x + 0.1} y={2.7} z={0.35} />
          <Box x={x + 1.5} y={2.7} z={0.35} />
          <Box x={x + 0.8} y={2} z={1.65} />
        </g>
      ))}
      {/* LOGEET 박스 더미 — 뒤쪽 오른편 출고 대기 */}
      {big(20.5, 0.6)}
      {big(17.8, 1.2)}
      {big(20.5, 3.1)}
      {big(20.6, 1.9, 2.2)}
      {/* 분류 컨베이어 + 스캔 게이트 */}
      <Cube x={1} y={5.5} w={18} d={1.8} h={1} c={BELT} />
      <Cube x={9} y={5.2} w={0.35} d={0.3} h={3.2} c={SHELF} />
      {[0, 1, 2, 3, 4].map((k) => (
        <Mover key={k} pts={[[1.6, 6.4, 1], [18.4, 6.4, 1]]} dur="11s" begin={`${-k * 2.2}s`} still={still}>
          <BeltBox s={1.3} />
          <Cube x={-0.65} y={0.64} z={0.5} w={1.3} d={0.03} h={0.22} c={BLUE} />
        </Mover>
      ))}
      <Cube x={9} y={7.3} w={0.35} d={0.3} h={3.2} c={SHELF} />
      <Cube x={9} y={5.2} z={3.2} w={0.35} d={2.4} h={0.35} c={GLASS} />
      <ScanBeam from={[9.17, 6.4, 3.15]} to={[9.17, 6.4, 1.35]} still={still} />
      {/* B2C / B2B 분류함 */}
      <Cube x={2} y={9} w={3.4} d={2} h={1.7} c={BIN_BLUE} />
      <IsoText x={2.7} y={11.02} z={0.55} size={8} fill="#ffffff" weight={800}>
        B2C
      </IsoText>
      <Box x={2.4} y={9.3} z={1.7} s={1} />
      <Cube x={6.2} y={9} w={3.4} d={2} h={1.7} c={BIN_TEAL} />
      <IsoText x={6.9} y={11.02} z={0.55} size={8} fill="#ffffff" weight={800}>
        B2B
      </IsoText>
      <Box x={7.8} y={9.3} z={1.7} s={1} />
      <Worker x={12.6} y={8.4} hold="scanner" still={still} />
      <ScanBeam from={[12.8, 8.85, 1.45]} to={[12.9, 7.3, 1.5]} still={still} />

      {/* 택배 차량 + 상차 작업자 */}
      <Truck x={14.5} y={11.2} flip />
      <IsoText x={17.3} y={14.22} z={2.45} size={11.5}>
        LOGEET
      </IsoText>
      <Worker x={13.6} y={15} hold="box" walk={[3.2, 0]} still={still} />
    </>
  );
}

/* ───────────── 04 자체 관리 시스템 — LOGEET 대형 화면(막대가 움직임), 데이터가 화면으로 흘러감 ───────────── */
function System({ still }: { still: boolean }) {
  const bars = [30, 42, 36, 50, 44, 28, 46];
  const sources: [number, number, number][] = [
    [16.6, 8.6, 2.6],
    [19.6, 10.6, 2.6],
    [16.1, 12.6, 2.6],
  ];
  const [dx, dy] = xy(13, 0.15, 2.2); // 화면 아래쪽 가운데
  return (
    <>
      <Cube x={0} y={0} z={-0.6} w={22} d={15} h={0.6} c={FLOOR} />
      <Cube x={0} y={-0.5} w={22} d={0.5} h={11} c={WALL} />
      <IsoText x={2.1} y={0} z={9.8} size={9} weight={800} spacing={1.5}>
        LOGEET SYSTEM
      </IsoText>
      {/* 대형 대시보드 화면 */}
      <Cube x={2} y={0} z={2} w={18} d={0.12} h={7.2} c={DISPLAY} />
      <IsoPlane x={2.4} y={0.13} z={8.8}>
        <text x={6} y={11} fontSize={9} fontWeight={900} fill="#ffffff">
          LOGEET
        </text>
        <text x={46} y={11} fontSize={6} fontWeight={600} fill="#93c5fd">
          운영 · 비용 대시보드
        </text>
        <circle cx={190} cy={8} r={2.2} fill="#22c55e">
          {!still && <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" />}
        </circle>
        {[
          ["적재율", "80%"],
          ["오늘 출고", "642"],
          ["집행률", "97.0%"],
        ].map(([l, v], i) => (
          <g key={l} transform={`translate(${6 + i * 44},17)`}>
            <rect width={40} height={17} rx={2} fill="#13244a" />
            <text x={4} y={6.5} fontSize={4.5} fill="#93c5fd">
              {l}
            </text>
            <text x={4} y={14} fontSize={7.5} fontWeight={800} fill="#ffffff">
              {v}
            </text>
          </g>
        ))}
        {bars.map((h, i) => (
          <rect key={i} x={8 + i * 17} width={11} rx={1} fill={i === bars.length - 1 ? "#60a5fa" : "#1d4ed8"} y={74 - h * 0.7} height={h * 0.7}>
            {!still && (
              <>
                <animate attributeName="height" values={`${h * 0.7};${h * 0.45};${h * 0.8};${h * 0.7}`} dur={`${2.6 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="y" values={`${74 - h * 0.7};${74 - h * 0.45};${74 - h * 0.8};${74 - h * 0.7}`} dur={`${2.6 + i * 0.3}s`} repeatCount="indefinite" />
              </>
            )}
          </rect>
        ))}
        <polyline
          points="140,66 152,58 164,61 176,48 188,52 200,40"
          fill="none"
          stroke="#38bdf8"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="90"
          strokeDashoffset={still ? 0 : undefined}
        >
          {!still && <animate attributeName="stroke-dashoffset" values="90;0;0" keyTimes="0;0.6;1" dur="3.5s" repeatCount="indefinite" />}
        </polyline>
        <rect x={138} y={17} width={64} height={17} rx={2} fill="#13244a" />
        <text x={142} y={28} fontSize={5.5} fill="#bfdbfe">
          전월 대비 +4.9%
        </text>
      </IsoPlane>

      {/* 현장 데이터가 화면으로 모임 (흐르는 점선) */}
      {sources.map((q, i) => {
        const [sx, sy] = xy(...q);
        return (
          <path key={i} d={`M${sx},${sy} Q${(sx + dx) / 2},${Math.min(sy, dy) - 30} ${dx},${dy}`} fill="none" stroke="#3b82f6" strokeWidth={1.6} strokeDasharray="4 6" opacity={0.8}>
            {!still && <animate attributeName="stroke-dashoffset" values="20;0" dur="0.8s" repeatCount="indefinite" />}
          </path>
        );
      })}

      {/* 책상 — 노트북으로 작업하는 담당자 */}
      <Cube x={3} y={7.4} w={9} d={2.4} h={1.6} c={SHELF} />
      <Laptop x={4.4} y={8.2} z={1.6} />
      <Laptop x={8.4} y={8.2} z={1.6} />
      <Worker x={4.6} y={10.4} office still={still} />
      <Worker x={8.6} y={10.4} office still={still} />

      {/* 데이터를 보내는 현장 — 랙 · 팔레트 · 택배 상자 (떠 있는 받침) */}
      <Bob dy={3} dur="2.4s" still={still}>
        <Cube x={15.5} y={7.5} w={2.2} d={2.2} h={0.25} c={GLASS} />
        <Box x={16} y={8} z={0.25} />
        <Box x={16.1} y={8.1} z={1.55} s={1} />
      </Bob>
      <Bob dy={3} dur="2.8s" still={still}>
        <Cube x={18.5} y={9.5} w={2.2} d={2.2} h={0.25} c={GLASS} />
        <Cube x={18.8} y={9.8} z={0.25} w={1.6} d={1.6} h={0.25} c={WOOD} />
        <Box x={19} y={10} z={0.5} s={1.2} />
      </Bob>
      <Bob dy={3} dur="2.2s" still={still}>
        <Cube x={15} y={11.5} w={2.2} d={2.2} h={0.25} c={GLASS} />
        <Cube x={15.4} y={11.9} z={0.25} w={1.4} d={1.4} h={1.3} c={BOX} />
        <Cube x={15.4} y={13.3} z={0.8} w={1.4} d={0.03} h={0.2} c={BLUE} />
      </Bob>
    </>
  );
}

const SCENES: Record<SceneId, { view: string; Draw: (p: { still: boolean }) => React.ReactNode }> = {
  fulfillment: { view: frame(24, 16, 9.4), Draw: Fulfillment },
  transport: { view: frame(26, 17, 7.8), Draw: Transport },
  parcel: { view: frame(24, 16, 7.6), Draw: Parcel },
  system: { view: frame(22, 15, 11), Draw: System },
};

export function ServiceScene({ id, label }: { id: SceneId; label: string }) {
  const still = useReducedMotion();
  const { view, Draw } = SCENES[id];
  return (
    <svg viewBox={view} className="absolute inset-0 size-full" role="img" aria-label={label}>
      <Draw still={still} />
    </svg>
  );
}
