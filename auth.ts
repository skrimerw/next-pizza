import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma/prisma-client";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { randomBytes } from "crypto";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            email: string;
            fullName: string;
            role: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: number;
        email: string;
        fullName: string;
        role: string;
    }
}

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
                    !bcrypt.compareSync(
                        credentials?.password as string,
                        user.password
                    )
                ) {
                    console.error("Error [LOGIN]");
                    return null;
                }

                return {
                    email: user.email,
                    fullName: user.fullName,
                };
            },
        }),
        GitHub,
        Google,
    ],
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === "credentials") {
                    return true;
                }

                if (!user.email) {
                    return false;
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            {
                                provider: account?.provider,
                                providerId: account?.providerAccountId,
                            },
                            { email: user.email },
                        ],
                    },
                });

                if (findUser) {
                    await prisma.user.update({
                        where: {
                            id: findUser.id,
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    });

                    return true;
                }

                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: user.name || "User #" + user.id,
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                        password: bcrypt.hashSync(
                            randomBytes(16).toString("hex"),
                            10
                        ),
                    },
                });

                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        async jwt({ token }) {
            if (!token.email) {
                return token;
            }

            const user = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            });

            if (user) {
                token.id = user.id;
                token.fullName = user.fullName;
                token.role = user.role;
            }

            return token;
        },
        session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id as never,
                fullName: token.fullName,
                email: token.email,
                role: token.role,
            };

            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
});
