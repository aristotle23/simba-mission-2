import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { StaticImageData } from "next/image";

import { verifyPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
          include: {
            event_types: {
              select: {
                id: true,
              },
            },
          },
        });

        if (!user) return null;

        const isCorrectPassword = await verifyPassword(credentials.password, user.password as string);
        if (isCorrectPassword) {
          const { event_types, ...userInfo } = user;
          const { id } = event_types[0];
          return {
            eventId: id,
            ...userInfo,
          };
        }

        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available

      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.defaultEventId = user.eventId;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.username = token.username;
        session.defaultEventId = token.defaultEventId;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
  pages: {
    signIn: "/auth/login",
  },
});
