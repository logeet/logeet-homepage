import type { NextConfig } from "next";
import path from "path";
import { COMPANY } from "./src/lib/company";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // /kakao → 카카오톡 상담. 임시(307) 이동이라 주소를 바꾸면 바로 반영된다.
  async redirects() {
    return COMPANY.kakaoChatUrl ? [{ source: "/kakao", destination: COMPANY.kakaoChatUrl, permanent: false }] : [];
  },
};

export default nextConfig;
