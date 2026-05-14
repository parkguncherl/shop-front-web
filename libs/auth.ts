import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_SHOP_API_ENDPOINT ?? 'http://localhost:8080/shop-ap';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (data?.body?.accessToken) {
            return {
              id: data.body.userId,
              email: data.body.email,
              name: data.body.name,
              token: {
                accessToken: data.body.accessToken, // ← token 객체로 변경
                refreshToken: data.body.refreshToken,
              },
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.token as any;
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 },
  secret: process.env.NEXTAUTH_SECRET,
};
