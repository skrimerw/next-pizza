"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
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
import { axiosInstance } from "@/lib/axiosInstance";
import { useAppContext } from "@/contexts/AppContextProvider";

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
    const [loading, setLoading] = useState(true);

    /* useEffect(() => {
        async function getData() {
            try {
                const { data } = await axiosInstance.get("/carts");

                setCart(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []); */

    function getCartLength() {
        let cartLength = 0;

        if (cart) {
            cart.cartItems.forEach((item) => {
                cartLength += item.quantity;
            });
        }

        return cartLength;
    }

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
                        "group w-[130px] h-[40px] py-3 px-0",
                        className
                    )}
                    disabled={!cart}
                >
                    {cart ? (
                        <>
                            <span>{countCartTotalPrice()} ₽</span>
                            <div className="h-full w-[1px] bg-white opacity-25"></div>
                            <div className="relative">
                                <span className="flex items-center transition-all gap-1 group-hover:opacity-0">
                                    <ShoppingCart />
                                    <span>{getCartLength()}</span>
                                </span>
                                <ArrowRight className="absolute left-[50%] top-[50%] -translate-y-[50%] opacity-0 transition-all -translate-x-[100%] group-hover:opacity-100 group-hover:-translate-x-[40%]" />
                            </div>
                        </>
                    ) : (
                        <LoaderCircle size={20} className="animate-spin" />
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent
                className={cn(
                    "border-0 p-0",
                    !cart || cart.cartItems.length === 0
                        ? "bg-white px-4"
                        : "bg-product-card-bar"
                )}
            >
                <SheetClose className="absolute -left-16 top-1/2 -translate-y-1/2 rounded-sm ring-offset-background transition-all duration-500 hover:rotate-180 focus:outline-none focus-visible:outline-none focus-visible:duration-0 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <X className="h-10 w-10 text-white" />
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
                                return (
                                    <CartItem key={item.id} cartItem={item} />
                                );
                            })}
                        </div>
                        <footer className="flex flex-col gap-3 p-6 bg-white shadow-[0px_4px_5px_5px_rgba(0,0,0,0.15)]">
                            <p className="flex gap-3 items-baseline w-full">
                                <span className="text-nowrap">Итого: </span>
                                <span className="w-full border-b-2 border-gray-300 border-dashed"></span>
                                <b className="text-nowrap text-lg">
                                    {countCartTotalPrice()} ₽
                                </b>
                            </p>
                            <p className="flex gap-3 items-baseline w-full">
                                <span className="text-nowrap">Налог 5%: </span>
                                <span className="w-full border-b-2 border-gray-300 border-dashed"></span>
                                <b className="text-nowrap text-lg">
                                    {(countCartTotalPrice() * 0.05).toFixed(2)}{" "}
                                    ₽
                                </b>
                            </p>
                            <Button className="mt-5 group text-base font-semibold h-12">
                                Оформить заказ
                                <ArrowRight className="transition-all group-hover:translate-x-1" />
                            </Button>
                        </footer>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center h-full">
                        <Image
                            src={"/img/empty-box.svg"}
                            alt=""
                            width={120}
                            height={120}
                        />
                        <Title
                            text="Корзина пустая"
                            className="font-semibold text-center"
                        />
                        <p className="text-center text-gray-400 mb-9">
                            Добавьте хотя бы один продукт, чтобы совершить заказ
                        </p>
                        <SheetClose asChild>
                            <Button
                                type="submit"
                                className="h-12 px-8 py-3 group"
                            >
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
