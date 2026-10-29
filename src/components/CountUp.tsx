"use client";

import { useEffect, useState } from "react";

const NUM = /^([+-]?)([\d,]+(?:\.\d+)?)(.*)$/;

/**
 * "1,284" · "97.0" · "+4.9" 같은 숫자 문자열을 0부터 그 값까지 세어 올라가며 보여준다.
 * 자릿수(쉼표·소수점)와 부호는 원래 값 그대로. 화면 읽기 프로그램에는 최종 값만 읽힌다.
 * '움직임 줄이기' 설정이면 바로 최종 값.
 */
export function CountUp({ value, ms = 900 }: { value: string; ms?: number }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      // 첫 프레임 시각이 start보다 앞설 수 있어 0 아래로 내려가지 않게 자른다
      const p = dur ? Math.min(1, Math.max(0, (now - start) / dur)) : 1;
      setT(1 - (1 - p) ** 3);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);

  const m = value.match(NUM);
  if (!m) return <>{value}</>;
  const [, sign, num, rest] = m;
  const dec = num.includes(".") ? num.split(".")[1].length : 0;
  const shown = (Number(num.replace(/,/g, "")) * t).toLocaleString("ko-KR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  return (
    <>
      <span aria-hidden="true">
        {sign}
        {shown}
        {rest}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
