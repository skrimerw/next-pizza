"use client";

import { cn, totalCartPrice } from "@/lib/utils";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  ShoppingCart,
  X,
} from "lucide-react";
import Title from "./Title";
import CartItem from "./CartItem";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { useAppContext } from "@/contexts/AppContextProvider";
import Link from "next/link";

interface Props {
  className?: string;
}

export type CartRelations = Prisma.CartGetPayload<{
  include: {
    cartItems: {
      include: {
        ingredients: true;
        productItem: {
          include: {
            product: true;
          };
        };
      };
    };
  };
}>;

export default function Cart({ className }: Props) {
  const { cart } = useAppContext();

  const totalAmount = totalCartPrice(cart as CartRelations)

  function getCartLength() {
    let cartLength = 0;

    if (cart) {
      cart.cartItems.forEach((item) => {
        cartLength += item.quantity;
      });
    }

    return cartLength;
  }

  function getCartHeaderString() {
    let productString = "";
    const cartLength = getCartLength();

    if ([2, 3, 4].includes(cartLength % 10)) {
      productString = "товара";
    } else if (
      [5, 6, 7, 8, 9, 0].includes(cartLength % 10) ||
      (cartLength % 100 >= 10 && cartLength <= 20)
    ) {
      productString = "товаров";
    } else {
      productString = "товар";
    }

    return `${cartLength} ${productString}`;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={cn(
            "group h-10 py-2 bg-white sm:bg-primary shadow-[0_0_5px_0_rgba(0,0,0,0.15)] sm:shadow-none md:py-3 px-0 hover:bg-gray-50 sm:hover:bg-primary/90",
            !cart && "hidden sm:flex",
            className
          )}
          disabled={!cart}
        >
          {cart ? (
            <>
              <span className="hidden sm:inline">
                {totalAmount} ₽
              </span>
              <div className="hidden sm:block h-full w-[1px] bg-white opacity-25"></div>
              <div className="relative">
                <span className="flex items-center justify-center transition-all gap-1 sm:group-hover:opacity-0">
                  <ShoppingCart className="!size-5 sm:!size-4 text-primary sm:text-white" />
                  <span className="flex items-center justify-center lead rounded-full bg-primary absolute sm:static sm:inline -top-5 -right-4 w-6 h-6 sm:h-fit sm:w-fit">
                    {getCartLength()}
                  </span>
                </span>
                <ArrowRight className="absolute left-[50%] top-[50%] -translate-y-[50%] opacity-0 transition-all -translate-x-[100%] sm:group-hover:opacity-100 sm:group-hover:-translate-x-[40%]" />
              </div>
            </>
          ) : (
            <LoaderCircle className="animate-spin" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        className={cn(
          "p-0 w-full",
          !cart || cart.cartItems.length === 0
            ? "bg-white px-4"
            : "bg-product-card-bar"
        )}
      >
        <SheetClose className="absolute right-2 top-2 sm:right-auto sm:-left-16 sm:top-1/2 sm:-translate-y-1/2 rounded-sm ring-offset-background transition-all duration-500 sm:hover:rotate-180 focus:outline-none focus-visible:outline-none focus-visible:duration-0 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="sm:h-10 sm:w-10 text-black/60 sm:text-white" />
          <span className="sr-only">Close</span>
        </SheetClose>
        <SheetTitle />
        {cart && cart.cartItems.length > 0 ? (
          <div className="flex flex-col justify-between h-svh">
            <SheetHeader className="p-5">
              <h2 className="text-xl font-normal">
                В корзине <b>{getCartHeaderString()}</b>
              </h2>
            </SheetHeader>
            <div className="flex flex-col gap-3 mb-auto cart-scroll pb-[10px]">
              {cart.cartItems.map((item) => {
                return <CartItem key={item.id} cartItem={item} />;
              })}
            </div>
            <footer className="flex flex-col gap-3 p-6 bg-white shadow-[0px_4px_5px_5px_rgba(0,0,0,0.15)]">
              <p className="flex gap-3 items-baseline w-full">
                <span className="text-nowrap">Итого: </span>
                <span className="w-full border-b md:border-b-2 border-gray-300 border-dashed"></span>
                <b className="text-nowrap text-lg">{totalAmount} ₽</b>
              </p>
              <p className="flex gap-3 items-baseline w-full">
                <span className="text-nowrap">Налог 5%: </span>
                <span className="w-full border-b md:border-b-2 border-gray-300 border-dashed"></span>
                <b className="text-nowrap text-lg">
                  {(totalAmount * 0.05).toFixed(2)} ₽
                </b>
              </p>
              <SheetClose asChild>
                <Button
                  asChild
                  className="mt-5 group text-base font-semibold h-12"
                >
                  <Link href="/checkout">
                    Оформить заказ
                    <ArrowRight className="transition-all group-hover:translate-x-1" />
                  </Link>
                </Button>
              </SheetClose>
            </footer>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <Image src={"/img/empty-box.svg"} alt="" width={120} height={120} />
            <Title
              text="Корзина пустая"
              className="font-semibold text-center"
            />
            <p className="text-center text-gray-400 mb-9">
              Добавьте хотя бы один продукт, чтобы совершить заказ
            </p>
            <SheetClose asChild>
              <Button type="submit" className="h-12 px-8 py-3 group">
                <ArrowLeft className="transition-all group-hover:-translate-x-1" />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
