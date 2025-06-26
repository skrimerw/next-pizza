import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma/prisma-client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          console.error("Error [LOGIN]");
          return null;
        }

        if (
          !bcrypt.compareSync(credentials?.password as string, user.password)
        ) {
          console.error("Error [LOGIN]");
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
