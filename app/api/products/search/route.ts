import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchParams.get("query") || "",
                mode: "insensitive",
            },
        },
        take: 10,
    });

    return NextResponse.json(products);
}
