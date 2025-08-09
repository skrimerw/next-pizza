import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const notification = await req.json();
    let newStatus: OrderStatus = "PENDING";

    switch (notification.event) {
        case "payment.succeeded":
            newStatus = "SUCCEEDED";
            break;
        case "payment.canceled":
            newStatus = "CANCELLED";
            break;
    }

    try {
        const order = await prisma.order.findFirst({
            where: {
                id: Number(notification.object.metadata.order_id),
            },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" });
        }

        await prisma.order.update({
            where: {
                id: Number(notification.object.metadata.orderId),
            },
            data: {
                status: newStatus,
            },
        });

        return NextResponse.json({});
    } catch (e) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
