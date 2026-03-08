import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";

function getPathSegments(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}

export function stripLocalePrefix(pathname: string): string {
  const segments = getPathSegments(pathname);
  const [first, ...rest] = segments;

  if (isLocale(first)) {
    return `/${rest.join("/")}`.replace(/\/$/, "") || "/";
  }

  return pathname || "/";
}

export function getLocalizedPathname(pathname: string, locale: Locale): string {
  const basePath = stripLocalePrefix(pathname);

  if (locale === DEFAULT_LOCALE) {
    return basePath;
  }

  if (basePath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${basePath}`;
}
