import { auth } from "@/auth";
import { Container, Title } from "@/components/shared";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { prisma } from "@/prisma/prisma-client";
import React from "react";
import moment from "moment";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import OrderCard, { OrderItem } from "@/components/shared/OrderCard";
import Image from "next/image";

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

    function getOrderDate(date: Date) {
        moment.locale("ru");

        moment(date).format("d MMMM YYYY, в HH:mm");

        return moment(date).format("d MMMM YYYY, в HH:mm");
    }

    return (
        <Container>
            <Title
                text="Мои заказы"
                size="xl"
                className="font-extrabold my-6 sm:my-12 text-[26px] sm:text-4xl"
            />
            {orders.length > 0 ? (
                <Accordion
                    type="multiple"
                    className="flex flex-col gap-6 max-w-[750px]"
                >
                    {orders.map(
                        ({ id, createdAt, status, items, totalAmount }, i) => {
                            return (
                                <AccordionItem
                                    key={id}
                                    value={`order-${id}`}
                                    className="bg-white border-none rounded-3xl"
                                >
                                    <AccordionTrigger className="py-5 px-7 sm:px-9 sm:py-7 hover:no-underline text-base">
                                        <div className="flex items-center w-full">
                                            <div className="flex flex-col sm:flex-row sm:items-center">
                                                <h2 className="text-2xl font-bold mr-5">
                                                    Заказ #{orders.length - i}
                                                </h2>
                                                <span className="text-[#AEAEAE]">
                                                    {getOrderDate(createdAt)}
                                                </span>
                                            </div>
                                            <span
                                                className={cn(
                                                    "flex items-center ml-auto rounded-full h-9 px-4 font-semibold text-sm mr-3 sm:mr-4",
                                                    status ===
                                                        OrderStatus.PENDING &&
                                                        "bg-badge-warning-background text-badge-warning-foreground",
                                                    status ===
                                                        OrderStatus.SUCCEEDED &&
                                                        "bg-badge-success-background text-badge-success-foreground",
                                                    status ===
                                                        OrderStatus.CANCELLED &&
                                                        "bg-badge-danger-background text-badge-danger-foreground"
                                                )}
                                            >
                                                {status}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0">
                                        <div className="divide-y divide-solid divide-gray-100 border-t border-gray-100">
                                            {(
                                                JSON.parse(
                                                    items?.toString() || ""
                                                ) as OrderItem[]
                                            ).map((item, i) => {
                                                return (
                                                    <OrderCard
                                                        key={i}
                                                        item={item}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <footer className="border-t border-gray-100 pt-5 px-7 sm:px-9 pb-5 sm:pb-7">
                                            <p className="text-xl">
                                                Итого:{" "}
                                                <span className="font-extrabold">
                                                    {totalAmount} ₽
                                                </span>
                                            </p>
                                        </footer>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        }
                    )}
                </Accordion>
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
