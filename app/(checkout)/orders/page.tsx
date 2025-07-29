import { auth } from "@/auth";
import { Container, Title } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import React from "react";
import Image from "next/image";
import OrdersAccordion from "@/components/OrdersAccordion";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next Pizza | Мои заказы"
}

export default async function OrdersPage() {
    const session = await auth();
    const orders = await prisma.order.findMany({
        where: {
            userId: session?.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <Container className="pb-20">
            <Title
                text="Мои заказы"
                size="xl"
                className="font-extrabold my-6 sm:my-12 text-[26px] sm:text-4xl"
            />
            {orders.length > 0 ? (
                <OrdersAccordion orders={orders} />
            ) : (
                <div className="flex flex-col justify-center items-center h-full mt-40">
                    <Image
                        src={"/img/empty-box.svg"}
                        alt=""
                        width={120}
                        height={120}
                    />
                    <Title
                        text="У вас нет заказов"
                        className="font-semibold text-center"
                    />
                    <p className="text-center text-gray-400 mb-9">
                        Добавьте хотя бы один продукт в корзину, чтобы совершить
                        заказ
                    </p>
                </div>
            )}
        </Container>
    );
}
