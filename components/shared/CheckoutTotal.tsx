"use client";

import { useAppContext } from "@/contexts/AppContextProvider";
import React from "react";
import { Button } from "../ui/button";
import { Loader2, Package, Percent, Truck } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { DELIVERY_PRICE, totalCartPrice } from "@/lib/utils";
import { CartRelations } from "./Cart";

interface Props {
    loading: boolean;
}

export default function CheckoutTotal({ loading }: Props) {
    const { cart } = useAppContext();

    const totalAmount = totalCartPrice(cart as CartRelations);

    return (
        <div className="flex flex-col gap-3 bg-white text-lg">
            <h2 className="text-2xl">
                Итого:
                <br />
                {cart ? (
                    <b className="text-4xl font-extrabold h-12">
                        {totalAmount +
                            DELIVERY_PRICE +
                            Number((totalAmount * 0.05).toFixed(2))}{" "}
                        ₽
                    </b>
                ) : (
                    <Skeleton className="h-10 w-40" />
                )}
            </h2>
            <div className="flex flex-col gap-4 mb-9 mt-14">
                <div className="flex gap-3 items-baseline w-full">
                    <span className="text-nowrap">
                        <Package className="inline-block text-gray-300 mr-4" />
                        Стоимость товаров:{" "}
                    </span>
                    <span className="w-full border-b md:border-b-2 border-gray-300 border-dashed"></span>
                    <b className="text-nowrap text-lg">
                        {cart ? (
                            `${totalAmount} ₽`
                        ) : (
                            <Skeleton className="inline-block h-5 w-16" />
                        )}
                    </b>
                </div>
                <div className="flex gap-3 items-baseline w-full">
                    <span className="text-nowrap">
                        <Percent className="inline-block text-gray-300 mr-4" />
                        Налог 5%:{" "}
                    </span>
                    <span className="w-full border-b md:border-b-2 border-gray-300 border-dashed"></span>
                    <b className="text-nowrap text-lg">
                        {cart ? (
                            `${(totalAmount * 0.05).toFixed(2)} ₽`
                        ) : (
                            <Skeleton className="inline-block h-5 w-16" />
                        )}
                    </b>
                </div>
                <div className="flex gap-3 items-baseline w-full">
                    <span className="text-nowrap">
                        <Truck className="inline-block text-gray-300 mr-4" />
                        Доставка:{" "}
                    </span>
                    <span className="w-full border-b md:border-b-2 border-gray-300 border-dashed"></span>
                    <b className="text-nowrap text-lg">
                        {cart ? (
                            `${DELIVERY_PRICE} ₽`
                        ) : (
                            <Skeleton className="inline-block h-5 w-16" />
                        )}
                    </b>
                </div>
            </div>
            <Button
                disabled={loading}
                className="text-lg h-14 relative"
                type="submit"
            >
                {loading && (
                    <span className="absolute top-1/2 left-3 -translate-y-1/2">
                        <Loader2 className="opacity-0 animate-spin !w-5 !h-5 delay-500" />
                    </span>
                )}
                Перейти к оплате
            </Button>
        </div>
    );
}
