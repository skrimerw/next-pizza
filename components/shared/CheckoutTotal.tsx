"use client";

import { useAppContext } from "@/contexts/AppContextProvider";
import React from "react";
import { Button } from "../ui/button";
import { Package, Percent, Truck } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function CheckoutTotal() {
  const { cart } = useAppContext();
  const DELIVERY_PRICE = 120;

  function countCartTotalPrice() {
    let totalCartPrice = 0;

    if (cart) {
      cart.cartItems.forEach((item) => {
        let totalItemPrice = 0;
        totalItemPrice += item.productItem.price;

        item.ingredients.forEach((ingredient) => {
          totalItemPrice += ingredient.price;
        });

        totalItemPrice *= item.quantity;
        totalCartPrice += totalItemPrice;
      });
    }

    return totalCartPrice;
  }

  return (
    <div className="flex flex-col gap-3 bg-white text-lg">
      <h2 className="text-2xl">
        Итого:
        <br />
        {cart ? (
          <b className="text-4xl font-extrabold h-12">
            {countCartTotalPrice() +
              DELIVERY_PRICE +
              Number((countCartTotalPrice() * 0.05).toFixed(2))}{" "}
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
              `${countCartTotalPrice()} ₽`
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
              `${(countCartTotalPrice() * 0.05).toFixed(2)} ₽`
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
      <Button className="text-lg h-14">Перейти к оплате</Button>
    </div>
  );
}
