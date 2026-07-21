import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  variable: "--font-pretendard",
  display: "swap",
  src: [
    { path: "../fonts/pretendard/Pretendard-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/pretendard/Pretendard-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/pretendard/Pretendard-Bold.otf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "로지트 | 물류비가 보이는 풀필먼트",
  description:
    "주식회사 로지트 — 창고보관, 임시차·간선운송, 택배 라스트마일 배송대행과 자체 개발 물류관리 시스템으로 물류비를 숫자로 보여드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
