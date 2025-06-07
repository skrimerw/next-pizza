import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const data = await req.json();

    if (data.quantity > 100) return NextResponse.json({});

    await prisma.cartItem.update({
        where: {
            id: data.id,
        },
        data: {
            quantity: data.quantity,
        },
    });

    return NextResponse.json({})
}
