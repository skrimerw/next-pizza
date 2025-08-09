import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { OrderSchema } from "./schemas";
import { getYooKassa } from "@/lib/YooKassa";

export async function POST(req: NextRequest) {
    const data = await req.json();

    const { success, data: parsedData, error } = OrderSchema.safeParse(data);

    if (!success) {
        return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    try {
        const order = await prisma.order.create({
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

        const YooKassa = getYooKassa();

        const payment = await YooKassa.createPayment(
            {
                amount: {
                    value: String(order.totalAmount),
                    currency: "RUB",
                },
                payment_method_data: {
                    type: "bank_card",
                },
                //capture: true,
                confirmation: {
                    type: "redirect",
                    return_url: process.env.APP_URL,
                },
                metadata: {
                    orderId: order.id,
                },
            },
            crypto.randomUUID()
        );

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: payment.id,
            },
        });

        return NextResponse.json({ message: "Заказ создан", cart, payment });
    } catch (e) {
        return NextResponse.json(
            { message: "Internal sever error" },
            { status: 500 }
        );
    }
}
