"use client";

import React from "react";
import { useAppContext } from "@/contexts/AppContextProvider";
import CheckoutCartItem from "./CheckoutCartItem";
import CheckoutCartSkeleton from "./CheckoutCartSkeleton";
import WhiteBlock from "./WhiteBlock";
import { cn } from "@/lib/utils";

export default function CheckoutCart() {
    const { cart } = useAppContext();

    return (
        <WhiteBlock
            title="1. Корзина"
            className="[&_.white-block-content]:pt-0"
        >
            <div className="flex flex-col mb-auto cart-scroll divide-y divide-solid divide-[#F6F6F6]">
                {cart ? (
                    cart.cartItems.map((item, i) => {
                        return (
                            <CheckoutCartItem
                                key={item.id}
                                cartItem={item}
                                className={cn(
                                    "py-8",
                                    i === cart.cartItems.length - 1 && "pb-0"
                                )}
                            />
                        );
                    })
                ) : (
                    <CheckoutCartSkeleton />
                )}
            </div>
        </WhiteBlock>
    );
}
