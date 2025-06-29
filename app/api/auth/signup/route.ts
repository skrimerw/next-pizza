import { SignupSchema } from "@/components/shared/auth/schemas";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";

export async function POST(req: NextRequest) {
    const data: z.infer<typeof SignupSchema> = await req.json();

    const result = SignupSchema.safeParse(data);

    if (result.success) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: data.email,
                },
            });

            if (user) {
                throw new Error("Такой пользователь уже существует");
            } else {
                const token = req.cookies.get("cart-token")

                await prisma.user.create({
                    data: {
                        ...data,
                        password: bcrypt.hashSync(data.password, 10),
                        cart: {
                            connect: {token:token?.value}
                        }
                    },
                });

                await signIn("credentials", data);
            }
        } catch (e) {
            throw e;
        }
    } else {
        NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({});
}
