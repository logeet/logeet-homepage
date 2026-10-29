/*
 * 아이소메트릭 장면의 움직이는 등장인물·장비 — 작업자, 지게차, 바코드 스캐너 레이저, 노트북.
 * 프로세스 지도(ProcessMap)와 서비스 그림(ServiceScene)이 함께 쓴다. still이면 움직임 없이 멈춘 그림.
 */
import { useSyncExternalStore } from "react";
import { Box, Cube, SCREEN, WOOD, p, type Face } from "./ProcessIllustration";

/** 격자 좌표 → 화면 [x, y] */
export const xy = (x: number, y: number, h = 0) => p(x, y, h).split(",").map(Number) as [number, number];

export const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const m = window.matchMedia(REDUCE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
/** '움직임 줄이기' 설정 여부 — 서버에선 false */
export const useReducedMotion = () => useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE).matches, () => false);

// 작업자 색 — 현장은 주황 안전조끼 + 노란 안전모, 사무실은 흰 셔츠
const PANTS: Face = { top: "#334155", left: "#1e293b", right: "#0f172a" };
const SKIN: Face = { top: "#f6d5b0", left: "#e9bc8e", right: "#d9a676" };
const HAT: Face = { top: "#fde047", left: "#facc15", right: "#eab308" };
const HAIR: Face = { top: "#334155", left: "#1e293b", right: "#1e293b" };
const VEST: Face = { top: "#fdba74", left: "#f97316", right: "#ea580c" };
const SHIRT: Face = { top: "#f8fafc", left: "#e2e8f0", right: "#cbd5e1" };

/**
 * 작업자 한 명 — (x, y)는 발 위치. hold: 박스를 들거나 태블릿을 봄.
 * walk: 격자 기준 [dx, dy]만큼 오갔다가 돌아옴(걸을 때 살짝 들썩임). still이면 멈춘 그림.
 */
export function Worker({
  x,
  y,
  office = false,
  hold,
  walk,
  still,
}: {
  x: number;
  y: number;
  office?: boolean;
  hold?: "box" | "tablet" | "scanner";
  walk?: [number, number];
  still: boolean;
}) {
  const body = (
    <>
      <Cube x={x} y={y} w={0.7} d={0.45} h={0.95} c={PANTS} />
      <Cube x={x - 0.05} y={y - 0.04} z={0.95} w={0.8} d={0.53} h={0.9} c={office ? SHIRT : VEST} />
      <Cube x={x + 0.1} y={y} z={1.85} w={0.5} d={0.45} h={0.5} c={SKIN} />
      {office ? (
        <Cube x={x + 0.08} y={y - 0.02} z={2.35} w={0.54} d={0.49} h={0.14} c={HAIR} />
      ) : (
        <Cube x={x} y={y - 0.06} z={2.35} w={0.7} d={0.57} h={0.2} c={HAT} />
      )}
      {hold === "box" && <Box x={x + 0.05} y={y + 0.5} z={1.05} s={0.7} />}
      {hold === "tablet" && <Cube x={x + 0.12} y={y + 0.5} z={1.25} w={0.46} d={0.06} h={0.38} c={SCREEN} />}
      {hold === "scanner" && <Cube x={x + 0.2} y={y + 0.45} z={1.3} w={0.24} d={0.4} h={0.22} c={FORK_DARK} />}
    </>
  );
  if (still || !walk) return body;
  const [ox, oy] = xy(0, 0);
  const [mx, my] = xy(walk[0], walk[1]);
  return (
    <g>
      <animateTransform attributeName="transform" type="translate" values={`0 0;${mx - ox} ${my - oy};0 0`} dur="7s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="0.55s" repeatCount="indefinite" />
        {body}
      </g>
    </g>
  );
}

const FORK_BODY: Face = { top: "#fde047", left: "#facc15", right: "#eab308" };
const FORK_DARK: Face = { top: "#475569", left: "#334155", right: "#1e293b" };
const LAPTOP: Face = { top: "#cbd5e1", left: "#94a3b8", right: "#64748b" };
const LAPTOP_SCREEN: Face = { top: "#334155", left: "#1e40af", right: "#0f172a" };

/** 바코드 스캐너의 빨간 레이저 — 깜빡이며 박스를 읽는다 */
export function ScanBeam({ from, to, still }: { from: [number, number, number]; to: [number, number, number]; still: boolean }) {
  const [x1, y1] = xy(...from);
  const [x2, y2] = xy(...to);
  return (
    <g opacity={still ? 0.9 : undefined}>
      {!still && <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.08;0.35;0.45;1" dur="1.4s" repeatCount="indefinite" />}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ef4444" strokeWidth={1.6} strokeLinecap="round" />
      <circle cx={x2} cy={y2} r={2.6} fill="#ef4444" />
    </g>
  );
}

/** 노트북 — (x, y, z)에 놓인 본체 + 뒤쪽 화면(앞면이 보이는 파란 화면) */
export function Laptop({ x, y, z: h }: { x: number; y: number; z: number }) {
  return (
    <>
      <Cube x={x} y={y} z={h + 0.06} w={1} d={0.06} h={0.62} c={LAPTOP_SCREEN} />
      <Cube x={x} y={y} z={h} w={1} d={0.7} h={0.06} c={LAPTOP} />
    </>
  );
}

/**
 * 지게차 — (x, y)는 차체 앞쪽(마스트) 모서리, 포크는 -x 방향으로 나와 팔레트를 든다.
 * 앞으로 갔다가(+x로 run만큼) 멈춰 포크를 올렸다 내리고 돌아온다. still이면 멈춘 그림.
 */
export function Forklift({ x, y, run, delay = "0s", still }: { x: number; y: number; run: number; delay?: string; still: boolean }) {
  const load = (
    <>
      <Cube x={x - 0.95} y={y + 0.25} z={0.22} w={1.3} d={0.14} h={0.08} c={FORK_DARK} />
      <Cube x={x - 0.95} y={y + 0.9} z={0.22} w={1.3} d={0.14} h={0.08} c={FORK_DARK} />
      <Cube x={x - 1.05} y={y + 0.1} z={0.3} w={1.35} d={1.1} h={0.15} c={WOOD} />
      <Box x={x - 0.9} y={y + 0.15} z={0.45} s={1} />
    </>
  );
  const truck = (
    <>
      {/* 화물(포크·팔레트) — 멈춰 있을 때 위로 들어 올림 */}
      <g>
        {!still && (
          <animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -14;0 -14;0 0;0 0" keyTimes="0;0.4;0.5;0.6;0.7;1" dur="9s" begin={delay} repeatCount="indefinite" />
        )}
        {load}
      </g>
      <Cube x={x + 0.35} y={y + 0.15} w={0.15} d={0.15} h={2.5} c={FORK_DARK} />
      <Cube x={x + 0.35} y={y + 1.0} w={0.15} d={0.15} h={2.5} c={FORK_DARK} />
      <Cube x={x + 0.7} y={y + 1.05} w={0.5} d={0.25} h={0.45} c={FORK_DARK} />
      <Cube x={x + 1.9} y={y + 1.05} w={0.5} d={0.25} h={0.45} c={FORK_DARK} />
      <Cube x={x + 0.5} y={y} z={0.3} w={1.9} d={1.3} h={0.75} c={FORK_BODY} />
      <Cube x={x + 2.2} y={y} z={0.3} w={0.45} d={1.3} h={1} c={FORK_DARK} />
      <Cube x={x + 2} y={y + 0.05} z={1.05} w={0.1} d={0.1} h={1.5} c={FORK_DARK} />
      {/* 운전자 */}
      <Cube x={x + 1.3} y={y + 0.4} z={1.05} w={0.6} d={0.5} h={0.65} c={VEST} />
      <Cube x={x + 1.37} y={y + 0.43} z={1.7} w={0.45} d={0.42} h={0.42} c={SKIN} />
      <Cube x={x + 1.3} y={y + 0.38} z={2.12} w={0.58} d={0.52} h={0.16} c={HAT} />
      <Cube x={x + 0.75} y={y + 1.1} z={1.05} w={0.1} d={0.1} h={1.5} c={FORK_DARK} />
      <Cube x={x + 2} y={y + 1.1} z={1.05} w={0.1} d={0.1} h={1.5} c={FORK_DARK} />
      <Cube x={x + 0.7} y={y} z={2.55} w={1.45} d={1.25} h={0.12} c={FORK_DARK} />
    </>
  );
  if (still) return truck;
  const [ox, oy] = xy(0, 0);
  const [mx, my] = xy(run, 0);
  const d = `${mx - ox} ${my - oy}`;
  return (
    <g>
      <animateTransform attributeName="transform" type="translate" values={`0 0;${d};${d};${d};0 0;0 0`} keyTimes="0;0.25;0.4;0.7;0.95;1" dur="9s" begin={delay} repeatCount="indefinite" />
      {truck}
    </g>
  );
}
