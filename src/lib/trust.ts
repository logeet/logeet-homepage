/**
 * 고객 사례 — 실제로 확인된 사례만 입력하세요. 비어 있으면 운영 사이트에 고객 사례 섹션이 나오지 않습니다(허위 기재 방지).
 *
 * 예시)
 *   cases: [{ client: "패션 브랜드 A사", industry: "의류 · B2B/B2C", story: "실제 고객사 후기", services: ["풀필먼트"] }]  // 실명은 고객사 동의가 있을 때만
 */
export type Case = { client: string; industry: string; story: string; services: string[] };

export const TRUST: { cases: Case[] } = {
  cases: [],
};
