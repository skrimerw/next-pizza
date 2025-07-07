"use client";

import React from "react";
import { useAppContext } from "@/contexts/AppContextProvider";
import CheckoutCartItem from "./CheckoutCartItem";
import CheckoutCartSkeleton from "./CheckoutCartSkeleton";
import WhiteBlock from "./WhiteBlock";

export default function CheckoutCart() {
  const { cart } = useAppContext();

  return (
    <WhiteBlock title="1. Корзина">
      <div className="flex flex-col gap-8 mb-auto cart-scroll divide-solid divide-[#F6F6F6]">
        {cart ? (
          cart.cartItems.map((item) => {
            return <CheckoutCartItem key={item.id} cartItem={item} />;
          })
        ) : (
          <CheckoutCartSkeleton />
        )}
      </div>
    </WhiteBlock>
  );
}
