import type { NextConfig } from "next";
import path from "path";
import { COMPANY } from "./src/lib/company";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      // logeet.co.kr → www.logeet.co.kr (대표 주소 하나로)
      { source: "/:path*", has: [{ type: "host", value: "logeet.co.kr" }], destination: `${COMPANY.siteUrl}/:path*`, permanent: true },
      // /kakao → 카카오톡 상담. 임시(307) 이동이라 주소를 바꾸면 바로 반영된다.
      ...(COMPANY.kakaoChatUrl ? [{ source: "/kakao", destination: COMPANY.kakaoChatUrl, permanent: false }] : []),
    ];
  },
};

export default nextConfig;
