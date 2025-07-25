import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { OrderSchema } from "./schemas";

export async function POST(req: NextRequest) {
    const data = await req.json();

    const { success, data: parsedData, error } = OrderSchema.safeParse(data);

    if (!success) {
        return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    try {
        await prisma.order.create({
            data: {
                totalAmount: parsedData.totalAmount,
                items: JSON.stringify(parsedData.items),
                userId: parsedData.userId,
                fullName: parsedData.fullName,
                email: parsedData.email,
                phone: parsedData.phone,
                address: parsedData.address,
                comment: parsedData.comment,
            },
        });

        const cart = await prisma.cart.update({
            where: {
                userId: parsedData.userId,
            },
            data: {
                totalAmount: 0,
                cartItems: {
                    deleteMany: {},
                },
            },
            include: {
                cartItems: {
                    include: {
                        ingredients: true,
                        productItem: true,
                    },
                },
            },
        });

        return NextResponse.json({ message: "Заказ создан", cart });
    } catch (e) {
        return NextResponse.json(
            { message: "Internal sever error" },
            { status: 500 }
        );
    }
}
