import useFetch from "@/src/app/hooks/useFetch";
import Joi from "joi";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<User | null> {
        let errorMessage = ''
        try {
          if (!credentials) return null
          const { email, password } = credentials
          const userCredential = { email, password }
          const schemaEvaluation = Joi.object({
            email: Joi.string()
              .email()
              .required()
              .messages({ "any.required": "El correo es obligatorio" }),
            password: Joi.string().required().messages({
              "any.required": "La contraseña es obligatoria.",
            }),
          }).messages({
            "object.unknown": "Se ha enviado una propiedad no definida",
          });
          const { error } = schemaEvaluation.validate(userCredential);
          if (error) {
            errorMessage = error.message
            throw new Error(error.message)
          };
          const req = await fetch(process.env.HOST_SERVICE + '/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(userCredential)
          })
          const loginState = await req.json()
          if (loginState.statusCode != 200) {
            errorMessage = loginState.message
            throw new Error(loginState.message)
          };
          return loginState?.data as User;
        } catch (error) {
          console.log(error);
          let newError = error as { messages: string }
          throw new Error(errorMessage)
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    maxAge: parseInt(process.env.USERS_TIME_SESSION ?? "600"),
    strategy: "jwt",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session) {
        const oldProperties = token?.user ?? {};
        token.user = { ...oldProperties, ...session };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      if (session.expires) {
        const expiresUTC = new Date(session.expires);
        const expiresLocal = new Date(
          expiresUTC.getTime() - expiresUTC.getTimezoneOffset() * 60000
        );
        session.expires = expiresLocal.toISOString();
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
