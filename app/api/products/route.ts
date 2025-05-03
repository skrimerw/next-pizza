import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const product = await prisma.product.findMany({
        include: {
            item: true,
            ingredients: true,
            category: true,
        },
    });

    return NextResponse.json(product);
}
