/* 고객 후기 카드 상단 아바타 — 입체(3D 렌더 느낌) 인물 일러스트. 실제 인물 사진이 아닌 예시 그림 */
type Look = {
  id: string;
  label: string;
  shirt: [string, string]; // 밝은 쪽, 어두운 쪽
  hair: [string, string];
  skin?: [string, string];
};

function Avatar({ look, children }: { look: Look; children: React.ReactNode }) {
  const { id, label, shirt, hair } = look;
  const skin = look.skin ?? ["#ffe6cf", "#efb48a"];
  return (
    <svg viewBox="0 0 120 120" className="size-28 drop-shadow-[0_10px_14px_rgba(15,23,42,0.14)]" role="img" aria-label={label}>
      <defs>
        <radialGradient id={`${id}-bg`} cx="35%" cy="28%" r="85%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e6ebf3" />
        </radialGradient>
        <radialGradient id={`${id}-skin`} cx="38%" cy="32%" r="78%">
          <stop offset="0" stopColor={skin[0]} />
          <stop offset="1" stopColor={skin[1]} />
        </radialGradient>
        <linearGradient id={`${id}-shirt`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor={shirt[0]} />
          <stop offset="1" stopColor={shirt[1]} />
        </linearGradient>
        <linearGradient id={`${id}-hair`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor={hair[0]} />
          <stop offset="1" stopColor={hair[1]} />
        </linearGradient>
        <radialGradient id={`${id}-blush`}>
          <stop offset="0" stopColor="#ff8f8f" stopOpacity=".55" />
          <stop offset="1" stopColor="#ff8f8f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-vig`} cx="50%" cy="45%" r="55%">
          <stop offset=".72" stopColor="#0f172a" stopOpacity="0" />
          <stop offset="1" stopColor="#0f172a" stopOpacity=".14" />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx="60" cy="60" r="60" />
        </clipPath>
      </defs>
      <circle cx="60" cy="60" r="60" fill={`url(#${id}-bg)`} />
      <g clipPath={`url(#${id}-clip)`}>
<g transform="translate(-15 -20) scale(1.25)">
        {/* 어깨 + 몸통 */}
        <path d="M10 125c2-24 20-34 50-34s48 10 50 34z" fill={`url(#${id}-shirt)`} />
        <path d="M18 112c6-12 18-18 36-19-14 6-24 14-28 26z" fill="#fff" opacity=".16" />
        {children}
        </g>
        {/* 가장자리 음영 */}
        <circle cx="60" cy="60" r="60" fill={`url(#${id}-vig)`} />
      </g>
    </svg>
  );
}

/** 얼굴 공통부 — 목(턱 그림자) · 구체 같은 얼굴 · 귀 · 볼터치 · 눈 반사광 */
function Face({ id, eyes, mouth, cheeks = true }: { id: string; eyes: React.ReactNode; mouth: React.ReactNode; cheeks?: boolean }) {
  return (
    <>
      <rect x="51" y="76" width="18" height="20" rx="8" fill={`url(#${id}-skin)`} />
      <ellipse cx="60" cy="82" rx="12" ry="3.2" fill="#a8613a" opacity=".16" />
      <ellipse cx="40.5" cy="58" rx="4.2" ry="6" fill={`url(#${id}-skin)`} />
      <ellipse cx="79.5" cy="58" rx="4.2" ry="6" fill={`url(#${id}-skin)`} />
      <ellipse cx="60" cy="56" rx="20.5" ry="23" fill={`url(#${id}-skin)`} />
      <ellipse cx="52" cy="44" rx="8" ry="5" fill="#fff" opacity=".28" />
      {cheeks && (
        <>
          <circle cx="46" cy="65" r="6" fill={`url(#${id}-blush)`} />
          <circle cx="74" cy="65" r="6" fill={`url(#${id}-blush)`} />
        </>
      )}
      {eyes}
      {mouth}
    </>
  );
}

const Eye = ({ x }: { x: number }) => (
  <g>
    <ellipse cx={x} cy="58" rx="2.7" ry="3.2" fill="#2a1f1a" />
    <circle cx={x - 0.9} cy="56.6" r="1" fill="#fff" />
  </g>
);
const Smile = () => <path d="M52 69c4 5 12 5 16 0" stroke="#b5503c" strokeWidth="2.4" strokeLinecap="round" fill="none" />;

/** 남성 — 짧은 머리, 회색 티셔츠, 미소 */
function ManAvatar() {
  const look: Look = { id: "av-m", label: "고객사 담당자 아바타(남성)", shirt: ["#8a93a3", "#4b5563"], hair: ["#5a4033", "#2a1b15"] };
  return (
    <Avatar look={look}>
      <Face id="av-m" eyes={<><Eye x={52} /><Eye x={68} /></>} mouth={<Smile />} />
      <path d="M39 52c-3-22 8-34 21-34 14 0 25 11 21 34-2-9-7-16-13-18-9 4-19 3-29 18z" fill="url(#av-m-hair)" />
      <path d="M48 24c6-4 14-3 20 1-7-1-14 0-20-1z" fill="#fff" opacity=".28" />
      <path d="M46 40c3-1 6-1 9 0M65 40c3-1 6-1 9 0" stroke="#3a2a22" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </Avatar>
  );
}

/** 여성 — 단발, 웃는 눈, 분홍 상의 */
function BobAvatar() {
  const look: Look = { id: "av-b", label: "고객사 담당자 아바타(여성)", shirt: ["#ffc2c2", "#f07c85"], hair: ["#9a5f43", "#5a3322"] };
  return (
    <Avatar look={look}>
      <path d="M35 66c-8-34 4-52 25-52s33 18 25 52c-1 8-5 12-8 14V50H43v30c-3-2-7-6-8-14z" fill="url(#av-b-hair)" />
      <Face
        id="av-b"
        eyes={<path d="M45.5 58c2.2-3.4 6-3.4 8.2 0M66.3 58c2.2-3.4 6-3.4 8.2 0" stroke="#2a1f1a" strokeWidth="2.4" strokeLinecap="round" fill="none" />}
        mouth={<path d="M52 68c4 7 12 7 16 0z" fill="#b5503c" />}
      />
      <path d="M40 50c3-14 11-20 20-20s18 6 21 20c-7-6-13-9-21-9s-14 3-20 9z" fill="url(#av-b-hair)" />
      <path d="M50 28c6-3 14-2 19 2-7-1-13-1-19-2z" fill="#fff" opacity=".3" />
    </Avatar>
  );
}

/** 여성 — 긴 머리, 앞치마(브랜드 운영자) */
function LongAvatar() {
  const look: Look = { id: "av-l", label: "고객사 담당자 아바타(여성)", shirt: ["#f1f5f9", "#b8c2d0"], hair: ["#c2825a", "#7d4a2c"] };
  return (
    <Avatar look={look}>
      <path d="M44 94l-6 30h44l-6-30c-10 5-22 5-32 0z" fill="#9a7455" />
      <path d="M48 96l-2 28" stroke="#fff" strokeWidth="1" opacity=".25" />
      <path d="M33 92c-7-34-4-76 27-76s34 42 27 76c-5-7-7-14-8-24H41c-1 10-3 17-8 24z" fill="url(#av-l-hair)" />
      <Face id="av-l" eyes={<><Eye x={52} /><Eye x={68} /></>} mouth={<Smile />} />
      <path d="M40 52c2-15 11-21 20-21s18 6 20 21c-6-7-12-10-20-10s-14 3-20 10z" fill="url(#av-l-hair)" />
      <path d="M49 31c6-3 15-2 21 2-8-1-14-1-21-2z" fill="#fff" opacity=".3" />
    </Avatar>
  );
}

export const STORY_ARTS = [ManAvatar, BobAvatar, LongAvatar];
