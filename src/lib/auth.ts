import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith("https://");
const hostName = new URL(process.env.NEXTAUTH_URL || "http://localhost:3000").hostname;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName === "localhost" ? undefined : "." + hostName,
      },
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
};
