import { stripBase } from "@/utils/withBase";

export function getCurrentLocale(url: URL): string {
  const path = stripBase(url.pathname);
  if (path === "/en" || path.startsWith("/en/")) return "en";
  return "zh";
}
