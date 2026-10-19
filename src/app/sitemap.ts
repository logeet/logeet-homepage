import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";

// 한 페이지 사이트 — 페이지가 늘어나면 여기에 추가한다.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: COMPANY.siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
