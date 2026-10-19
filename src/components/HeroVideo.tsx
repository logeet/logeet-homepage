"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * 히어로 배경 영상 — 사진(poster) 위에 재생되면 페이드인.
 * 모바일·데이터 절약·모션 축소 환경에선 src를 붙이지 않아 영상을 아예 받지 않는다.
 */
export function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const ok =
      matchMedia("(min-width: 640px)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !saveData;
    if (!ok) return;
    v.src = src;
    v.play().catch(() => {}); // 자동재생이 막히면 사진이 그대로 보임
  }, [src]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
      />
      {playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? "배경 영상 재생" : "배경 영상 일시정지"}
          className="absolute bottom-5 left-5 z-10 flex size-11 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur transition-colors duration-200 hover:bg-black/50"
        >
          {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
        </button>
      )}
    </>
  );
}
