import { prisma } from "@/prisma/prisma-client";
import { ProductItem } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const crypto = require("crypto");

export async function GET(req: NextRequest) {
    const token = req.cookies.get("cart-token");

    if (token) {
        const cart = await prisma.cart.findFirst({
            where: {
                token: token.value,
            },
            include: {
                cartItems: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json(cart);
    } else {
        const token = crypto.randomBytes(32).toString("hex");

        const cart = await prisma.cart.create({
            data: {
                token,
            },
            include: {
                cartItems: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });

        const response = NextResponse.json(cart)
        
        response.cookies.set({
            name: "cart-token",
            value: token,
            httpOnly: true,
        });

        return response;
    }
}

type CartPostBody = {
    productItem: ProductItem;
    ingredients: Array<number>;
};

export async function POST(req: NextRequest) {
    const data: CartPostBody = await req.json();
    const token = req.cookies.get("cart-token");

    if (token) {
        const cart = await prisma.cart.findFirst({
            where: {
                token: token.value,
            },
            include: {
                cartItems: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });

        if (cart) {
            const cartItem = cart.cartItems.find((item) => {
                if (
                    item.productItemId !== data.productItem.id ||
                    item.ingredients.length !== data.ingredients.length
                ) {
                    return false;
                }

                let isIngredientsEqual = true;

                item.ingredients.forEach((ingredient) => {
                    if (!data.ingredients.includes(ingredient.id)) {
                        isIngredientsEqual = false;
                    }
                });

                return isIngredientsEqual;
            });

            if (!cartItem) {
                await prisma.cartItem.create({
                    data: {
                        productItemId: data.productItem.id,
                        cartId: cart.id,
                        quantity: 1,
                        ingredients: {
                            connect: data.ingredients.map((ingredient) => {
                                return {
                                    id: ingredient,
                                };
                            }),
                        },
                    },
                });
            } else {
                await prisma.cartItem.update({
                    where: {
                        id: cartItem.id,
                    },
                    data: {
                        quantity: cartItem.quantity + 1,
                    },
                });
            }
        }
    }

    return NextResponse.json(
        await prisma.cart.findFirst({
            where: {
                token: token?.value,
            },
            include: {
                cartItems: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        })
    );
}
