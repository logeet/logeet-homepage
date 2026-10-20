import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { COMPANY } from "@/lib/company";
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

const TITLE = "물류전문기업 로지트(LOGEET)";
const DESCRIPTION =
  "주식회사 로지트는 창고보관·풀필먼트, 임시차·지입차·간선운송, B2B·B2C 택배 배송대행을 한 곳에서 운영하고, 예산 대비 집행률과 항목별 물류비를 고객사 전용 시스템으로 보고합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["풀필먼트", "물류대행", "물류비 관리", "창고보관", "간선운송", "택배 배송대행", "통합 물류", "로지트", "LOGEET"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "로지트 LOGEET",
    title: TITLE,
    description: DESCRIPTION,
    // 파일명을 바꿔야 카톡·슬랙 등이 예전 미리보기를 다시 가져온다
    images: [{ url: "/og-v2.jpg", width: 1200, height: 630, alt: "로지트 — 물류의 흐름을 읽고, 데이터로 운영 효율을 높입니다" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-v2.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0b1730",
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
