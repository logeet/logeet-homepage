export const COMPANY = {
  name: "주식회사 로지트",
  nameEn: "LOGEET Inc.",
  ceo: "김성환",
  bizNo: "649-81-03913",
  industry: "운수 및 창고업",
  businessType: "물류창고업 및 운수업",
  address: "경기도 용인시 기흥구 서천로201번길 31",
  centerAddress: "경기도 용인시 기흥구 공세로 242", // 물류센터
  addressShort: "경기 용인시 기흥구 서천로201번길 31",
  phone: "010-5563-3440",
  email: "shkim@logeet.co.kr",
  // 카카오톡 상담 주소(현재 오픈채팅). 비어 있으면 카톡 상담 버튼이 나오지 않는다.
  // 홈페이지/kakao 로 들어와도 여기로 넘어간다(next.config.ts) — 명함·문자 안내용 짧은 주소.
  kakaoChatUrl: "https://open.kakao.com/o/sX0QihTi",
  portalUrl: "https://center.logeet.co.kr/login",
  siteUrl: "https://logeet-homepage.vercel.app", // 정식 도메인이 생기면 여기만 바꾸면 메타데이터·사이트맵이 따라간다
} as const;
