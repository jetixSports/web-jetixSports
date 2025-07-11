import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/sign-up"];
const privateRoutes = [
  "/dashboard",
  "/Profile",
  "/admin/*",
  "Torneos/[id]/inscription",
];

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
        const isPrivateRoute = privateRoutes.some((route) => {
          if (route.endsWith("/*")) {
            const baseRoute = route.replace("/*", "");
            return pathname.startsWith(baseRoute);
          } else if (route.includes("[id]")) {
            // Patrón para /Torneos/[id]/inscription
            const routeParts = route.split("/");
            const pathParts = pathname.split("/").splice(1);
            if (routeParts.length !== pathParts.length) return false;
            return routeParts.every((part, i) => {
              return part.startsWith("[") || part === pathParts[i];
            });
          }
          return pathname === route;
        });

        if (isPrivateRoute) {
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);
