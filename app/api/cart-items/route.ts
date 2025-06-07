import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')

    if (id) {
        await prisma.cartItem.delete({
            where: {
                id: Number(id)
            }
        })
    }

    return NextResponse.json({})
}