import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const publicRoutes = ["/login"];
const privateRoutes = [''];

export const config = {
  matcher: [...publicRoutes, ...privateRoutes],
};

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth?.token;
    if (publicRoutes.includes(pathname) && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        if (publicRoutes.includes(pathname)) {
          return true;
        }
        if (privateRoutes.includes(pathname)) {
          return !!token;
        }
        return true;
      },
    },
    pages: {
    },
  }
);
