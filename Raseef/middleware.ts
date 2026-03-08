import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE_NAME } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const pathLocale = request.nextUrl.pathname.split("/").filter(Boolean)[0];
  const locale = isLocale(pathLocale) ? pathLocale : DEFAULT_LOCALE;

  const response = NextResponse.next();

  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
