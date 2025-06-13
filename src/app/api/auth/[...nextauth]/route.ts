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
        try {
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
          const { error } = schemaEvaluation.validate(credentials);
          if (error) return null;
          const Fetch = useFetch();
          const loginState = await Fetch.post(
            process.env.HOST_SERVICE,
            credentials
          );
          if (loginState.statusCode != 200) return null;
          return loginState?.data;
        } catch (error) {
          return null;
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
        console.log(expiresLocal);

        session.expires = expiresLocal.toISOString();
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
