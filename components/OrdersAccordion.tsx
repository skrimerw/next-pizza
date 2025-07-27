'use client'

import { cn } from "@/lib/utils";
import { Order, OrderStatus } from "@prisma/client";
import React from "react";
import OrderCard, { OrderItem } from "./shared/OrderCard";
import moment from "moment";
import "moment/locale/ru";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface Props {
    orders: Order[];
}

export default function OrdersAccordion({ orders }: Props) {
    function getOrderDate(date: Date) {
        moment.locale("ru");
        const utcDate = moment.utc(date);
        const offset = -(new Date().getTimezoneOffset());

        const localDate = utcDate.utcOffset(offset);

        return localDate.format("D MMMM YYYY, в HH:mm");
    }

    function getStatusName(status: OrderStatus) {
        switch (status) {
            case OrderStatus.PENDING:
                return "В ожидании";
            case OrderStatus.CANCELLED:
                return "Отклонено";
            case OrderStatus.SUCCEEDED:
                return "Оплачено";
        }
    }

    return (
        <Accordion
            type="multiple"
            className="flex flex-col gap-6 max-w-[750px]"
        >
            {orders.map(({ id, createdAt, status, items, totalAmount }, i) => {
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
                                        status === OrderStatus.PENDING &&
                                            "bg-badge-warning-background text-badge-warning-foreground",
                                        status === OrderStatus.SUCCEEDED &&
                                            "bg-badge-success-background text-badge-success-foreground",
                                        status === OrderStatus.CANCELLED &&
                                            "bg-badge-danger-background text-badge-danger-foreground"
                                    )}
                                >
                                    {getStatusName(status)}
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
                                    return <OrderCard key={i} item={item} />;
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
            })}
        </Accordion>
    );
}
