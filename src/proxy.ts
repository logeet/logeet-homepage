import { NextResponse, type NextRequest } from "next/server";
import { COMPANY } from "@/lib/company";

// 오픈 전에는 운영 사이트를 "준비 중" 화면으로 닫아 둔다. 오픈할 때 true로 바꾸고 배포.
const SITE_OPEN = false;

// 미리보기: ?preview=<PREVIEW_KEY> 로 한 번 들어오면 쿠키가 남아 30일간 전체 사이트가 보인다.
const COOKIE = "logeet_preview";

const CLOSED_HTML = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${COMPANY.name}</title>
<style>
  body{margin:0;min-height:100svh;display:grid;place-items:center;background:#0b1730;color:#fff;
    font-family:Pretendard,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;text-align:center;padding:24px;box-sizing:border-box}
  b{font-size:32px;letter-spacing:-.02em}p{margin:20px 0 0;font-size:17px;color:rgba(255,255,255,.75)}
  a{color:#7dd3fc;text-decoration:none}small{display:block;margin-top:28px;font-size:14px;color:rgba(255,255,255,.6);line-height:1.8}
</style></head>
<body><main><b>LOGEET</b><p>홈페이지를 준비하고 있습니다.</p>
<small>문의 <a href="tel:${COMPANY.phone}">${COMPANY.phone}</a><br><a href="mailto:${COMPANY.email}">${COMPANY.email}</a></small></main></body></html>`;

export function proxy(request: NextRequest) {
  // 로컬 개발·미리보기 배포는 그대로 열어 둔다 (미리보기 배포는 Vercel 로그인으로 보호됨)
  if (SITE_OPEN || process.env.VERCEL_ENV !== "production") return NextResponse.next();

  const key = process.env.PREVIEW_KEY;
  const given = request.nextUrl.searchParams.get("preview");
  if (key && given === key) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("preview");
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, key, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
    return res;
  }
  if (key && request.cookies.get(COOKIE)?.value === key) return NextResponse.next();

  return new NextResponse(CLOSED_HTML, {
    status: 503,
    headers: { "content-type": "text/html; charset=utf-8", "retry-after": "86400", "x-robots-tag": "noindex" },
  });
}

export const config = {
  matcher: "/((?!_next/static|_next/image|icon.svg).*)",
};
