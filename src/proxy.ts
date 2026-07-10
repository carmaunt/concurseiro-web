import { NextResponse, type NextRequest } from "next/server";

const ACCESS_TOKEN_COOKIE = "access_token";

export function proxy(request: NextRequest) {
  // A presença do cookie evita renderizar a área privada para visitantes. A
  // validação definitiva continua sendo feita pela API em cada requisição.
  if (!request.cookies.has(ACCESS_TOKEN_COOKIE)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/questoes/:path*"],
};
