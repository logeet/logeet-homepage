/**
 * 기업 신뢰도 자료 — 실제로 확인된 자료만 입력하세요.
 * 배열이 비어 있는 항목은 홈페이지에 표시되지 않습니다(허위 기재 방지).
 *
 * 예시)
 *   facilities: [{ name: "기흥 물류센터", detail: "상온 보관 · 3,000㎡" }]
 *   certifications: [{ name: "ISO 9001", issuer: "인증기관명", year: "2026" }]
 *   clients: [{ name: "고객사명" }]  // 고객사 동의를 받은 경우에만
 *   metrics: [{ label: "월 출고 박스", value: "12만", asOf: "2026.09 기준" }]
 *   photos: [{ src: "/photos/site-1.jpg", caption: "기흥 센터 입고장" }]  // public/photos 에 실제 사진을 넣고 경로 입력
 */
export type Facility = { name: string; detail: string };
export type Certification = { name: string; issuer: string; year: string };
export type Client = { name: string };
export type Metric = { label: string; value: string; asOf: string };
export type SitePhoto = { src: string; caption: string };

export const TRUST: {
  facilities: Facility[];
  equipment: Facility[];
  certifications: Certification[];
  clients: Client[];
  metrics: Metric[];
  photos: SitePhoto[];
} = {
  facilities: [],
  equipment: [],
  certifications: [],
  clients: [],
  metrics: [],
  photos: [],
};
