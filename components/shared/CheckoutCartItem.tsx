"use client";

import { DoughType, Ingredient, Prisma, type CartItem } from "@prisma/client";
import { Minus, Plus, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { axiosInstance } from "@/lib/axiosInstance";
import { useAppContext } from "@/contexts/AppContextProvider";

interface Props {
  cartItem: Prisma.CartItemGetPayload<{
    include: {
      productItem: {
        include: {
          product: true;
        };
      };
      ingredients: true;
    };
  }>;
  className?: string;
}

export default function CheckoutCartItem({ cartItem, className }: Props) {
  const { cart, setCart } = useAppContext();

  function countCartItemTotalPrice() {
    let totalCartPrice = 0;

    let totalItemPrice = 0;
    totalItemPrice += cartItem.productItem.price;

    cartItem.ingredients.forEach((ingredient) => {
      totalItemPrice += ingredient.price;
    });

    totalItemPrice *= cartItem.quantity;
    totalCartPrice += totalItemPrice;

    return totalCartPrice;
  }

  async function deleteCartItem() {
    try {
      await axiosInstance.delete("/cart-items", {
        params: {
          id: cartItem.id,
        },
      });

      const newCart = { ...cart };

      if (newCart?.cartItems) {
        newCart.cartItems = newCart.cartItems.filter(
          (item) => item.id !== cartItem.id
        );

        setCart(newCart as never);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function incrementCartItem() {
    try {
      await axiosInstance.put("/cart-items/increment-decrement", {
        id: cartItem.id,
        quantity: ++cartItem.quantity,
      });

      const newCart = { ...cart };

      setCart(newCart as never);
    } catch (e) {
      console.error(e);
    }
  }

  async function decrementCartItem() {
    try {
      await axiosInstance.put("/cart-items/increment-decrement", {
        id: cartItem.id,
        quantity: --cartItem.quantity,
      });

      const newCart = { ...cart };

      setCart(newCart as never);
    } catch (e) {
      console.error(e);
    }
  }

  function getIngredientsStr(ingredients: Ingredient[]) {
    let ingredientsStr = "";

    ingredients.forEach((ingredient, i) => {
      let ingredientName = ingredient.name;

      if (i !== 0) {
        ingredientName =
          ingredient.name.charAt(0).toLowerCase() + ingredient.name.slice(1);
      }

      ingredientsStr += ingredientName;

      if (i !== ingredients.length - 1) ingredientsStr += ", ";
    });

    return ingredientsStr;
  }

  return (
    <div className={cn("bg-white", className)}>
      <div className="flex gap-2 items-center justify-between w-full">
        <div className="w-[65px] flex-none">
          <img
            src={cartItem.productItem.product.imageUrl}
            alt="Картинка продукта"
          />
        </div>
        <div className="pb-1 mr-2">
          <h3 className="font-bold">{cartItem.productItem.product.name}</h3>
          {cartItem.productItem.pizzaType && (
            <p className="text-sm text-[#A1A1A1]">
              {cartItem.productItem.size === 20
                ? "Маленькая"
                : cartItem.productItem.size === 30
                ? "Средняя"
                : "Большая"}{" "}
              {cartItem.productItem.size} см,{" "}
              {cartItem.productItem.pizzaType === DoughType.THIN
                ? "тонкое"
                : "традиционное"}{" "}
              тесто
            </p>
          )}
          {cartItem.ingredients.length > 0 && (
            <p className="text-sm text-[#A1A1A1]">
              + {getIngredientsStr(cartItem.ingredients)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-8 ml-auto">
          <b className="mx-auto text-nowrap">{countCartItemTotalPrice()} ₽</b>
          <div className="flex gap-2 items-center">
            <Button
              onClick={
                cartItem.quantity === 1 ? deleteCartItem : decrementCartItem
              }
              variant="outline"
              className="p-0 h-[30px] w-[30px] rounded-lg"
            >
              <Minus />
            </Button>
            <b>{cartItem.quantity}</b>
            <Button
              onClick={incrementCartItem}
              variant="outline"
              className="p-0 h-[30px] w-[30px] rounded-lg"
              disabled={cartItem.quantity >= 100}
            >
              <Plus />
            </Button>
          </div>
        </div>
        <button
          onClick={deleteCartItem}
          className="w-6 h-6 flex flex-none items-center justify-center group"
        >
          <X
            size={18}
            className=" text-gray-400 cursor-pointer group-hover:text-gray-500"
          />
        </button>
      </div>
      <div className="flex items-center justify-between"></div>
    </div>
  );
}
