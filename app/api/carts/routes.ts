import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const carts = await prisma.cart.findMany({
        include: {
            cartItems: true,
        },
    });

    return NextResponse.json(carts);
}
