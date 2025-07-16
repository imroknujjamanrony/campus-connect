const { getToken } = require("next-auth/jwt");
const { NextResponse } = require("next/server");

export const middleware = async (req) => {
  const token = await getToken({ req });
  const isAuth = Boolean(token);

  const { pathname } = req.nextUrl;
  const protectedRoute = ["/profile", "/my-college"];

  if (pathname.startsWith("/profile") && !isAuth) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/my-college") && !isAuth) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};
