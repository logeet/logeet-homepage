import { BOX, Box, Cube, FLOOR, GLASS, SHELF, type Face } from "./ProcessIllustration";

/* 고객 사례 카드 그림 — 업종별 실제 상품이 보이게 (의류 / 생활용품 / 화장품) */
const f = (top: string, left: string, right: string): Face => ({ top, left, right });
const NAVY = f("#3b4a6b", "#24355c", "#1b2847");
const CHARCOAL = f("#5b5f67", "#3b3e46", "#2c2f35");
const BEIGE = f("#d6c6a8", "#bba788", "#a3906f");
const WINE = f("#8a4757", "#5e2b38", "#4a1f2b");
const SKY = f("#bfdbfe", "#60a5fa", "#3b82f6");
const MINT = f("#a7f3d0", "#34d399", "#10b981");
const WHITE = f("#ffffff", "#e2e8f0", "#cbd5e1");
const PINK = f("#fbcfe8", "#f472b6", "#db2777");
const ROSE = f("#fecdd3", "#fb7185", "#e11d48");
const GOLD = f("#fde68a", "#f59e0b", "#d97706");

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox="22 66 220 196" className="mx-auto h-44 w-full" role="img" aria-label={label}>
      <Cube x={0} y={0} z={-0.4} w={10} d={8} h={0.4} c={FLOOR} />
      {children}
    </svg>
  );
}

/** 패션 — 행거에 걸린 옷 + 개어 담은 의류 박스 */
function Fashion() {
  const COLORS = [NAVY, CHARCOAL, BEIGE, WINE, NAVY, BEIGE, CHARCOAL, WINE];
  return (
    <Frame label="행거에 걸린 옷과 개어 담은 의류 박스 그림">
      <Cube x={0.8} y={1.2} w={0.2} d={0.2} h={4.6} c={SHELF} />
      <Cube x={8.4} y={1.2} w={0.2} d={0.2} h={4.6} c={SHELF} />
      <Cube x={0.8} y={1.2} z={4.4} w={7.8} d={0.2} h={0.2} c={SHELF} />
      {COLORS.map((c, k) => (
        <Cube key={k} x={1.3 + k * 0.88} y={0.85} z={1.5} w={0.55} d={0.95} h={2.8} c={c} />
      ))}
      <Cube x={2} y={4.8} w={3} d={2.4} h={1.4} c={BOX} />
      <Cube x={2.2} y={5} z={1.4} w={2.6} d={2} h={0.28} c={NAVY} />
      <Cube x={2.2} y={5} z={1.68} w={2.6} d={2} h={0.28} c={BEIGE} />
      <Cube x={2.2} y={5} z={1.96} w={2.6} d={2} h={0.28} c={WINE} />
      <Box x={6.3} y={5.2} s={1.8} />
    </Frame>
  );
}

/** 생활용품 — 세제 용기·휴지·택배 박스 */
function Household() {
  return (
    <Frame label="세제 용기와 휴지, 택배 박스 그림">
      <Cube x={0.8} y={0.8} w={8.6} d={2.2} h={0.25} c={SHELF} />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <Cube x={1.1 + k * 1.15} y={1.1} z={0.25} w={0.9} d={1.4} h={2.1} c={k % 2 ? MINT : SKY} />
          <Cube x={1.35 + k * 1.15} y={1.4} z={2.35} w={0.4} d={0.5} h={0.35} c={WHITE} />
        </g>
      ))}
      <Cube x={5.9} y={1} z={0.25} w={3.2} d={1.8} h={1.2} c={WHITE} />
      <Cube x={5.9} y={1} z={1.45} w={3.2} d={1.8} h={1.2} c={WHITE} />
      <Cube x={5.9} y={2.78} z={0.8} w={3.2} d={0.04} h={0.3} c={SKY} />
      <Cube x={5.9} y={2.78} z={2} w={3.2} d={0.04} h={0.3} c={SKY} />
      <Box x={1.4} y={4.6} s={2} />
      <Box x={4} y={4.9} s={1.6} />
      <Box x={6.4} y={4.7} s={1.9} />
    </Frame>
  );
}

/** 화장품 — 립스틱·향수·크림 용기 + 출고 박스 */
function Cosmetics() {
  return (
    <Frame label="립스틱과 향수, 크림 용기와 출고 박스 그림">
      <Cube x={0.8} y={1} w={6} d={3} h={0.3} c={WHITE} />
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k}>
          <Cube x={1.2 + k * 0.6} y={1.4} z={0.3} w={0.36} d={0.36} h={1.2} c={GOLD} />
          <Cube x={1.24 + k * 0.6} y={1.44} z={1.5} w={0.28} d={0.28} h={0.5} c={k % 2 ? ROSE : PINK} />
        </g>
      ))}
      <Cube x={4.6} y={1.3} z={0.3} w={1.3} d={1.3} h={1.6} c={GLASS} />
      <Cube x={4.95} y={1.65} z={1.9} w={0.6} d={0.6} h={0.5} c={GOLD} />
      <Cube x={1.3} y={2.9} z={0.3} w={1.2} d={0.9} h={0.7} c={PINK} />
      <Cube x={1.3} y={2.9} z={1} w={1.2} d={0.9} h={0.2} c={WHITE} />
      <Cube x={2.9} y={2.9} z={0.3} w={1.2} d={0.9} h={0.7} c={WHITE} />
      <Cube x={2.9} y={2.9} z={1} w={1.2} d={0.9} h={0.2} c={ROSE} />
      <Box x={6.8} y={4.6} s={2.2} />
      <Box x={3.4} y={5.4} s={1.5} />
    </Frame>
  );
}

export const STORY_ARTS = [Fashion, Household, Cosmetics];
