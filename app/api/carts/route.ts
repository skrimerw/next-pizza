import { prisma } from "@/prisma/prisma-client";
import { ProductItem } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    const session = await auth();
    const token = req.cookies.get("cart-token");

    if (session?.user) {
        const cart = await prisma.cart.findFirst({
            where: {
                userId: Number(session.user.id),
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

        const response = NextResponse.json(cart);

        response.cookies.delete("cart-token");

        return response;
    }

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
            return NextResponse.json(cart);
        } else {
            const cart = await prisma.cart.create({
                data: {
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
        }
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

        const response = NextResponse.json(cart);

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
    const session = await auth();

    let whereObj;

    if (session?.user) {
        whereObj = {
            userId: session.user.id,
        };
    } else {
        whereObj = {
            token: token?.value,
        };
    }

    const cart = await prisma.cart.findFirst({
        where: whereObj,
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

    return NextResponse.json(
        await prisma.cart.findFirst({
            where: whereObj,
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
