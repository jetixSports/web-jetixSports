// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      role?: string | null;
      tokenSession?: string | null;
    };
  }
}
