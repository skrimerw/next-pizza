import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function markSubstr(
    str: string,
    substr: string,
    specialSymbol: string = "\n"
) {
    const regex = new RegExp(substr, "i");
    let htmlStr = "";

    const actualSubstr = str.slice(
        str.toLowerCase().indexOf(substr.toLowerCase()),
        str.toLowerCase().indexOf(substr.toLowerCase()) + substr.length
    );
    str = str.replace(regex, specialSymbol);

    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === specialSymbol) {
            htmlStr += `<b>${actualSubstr}</b>`;

            continue;
        }

        htmlStr += str.charAt(i);
    }

    return htmlStr;
}

export const DELIVERY_PRICE = 120;

export type CartRelations = Prisma.CartGetPayload<{
        include: {
            cartItems: {
                include: {
                    ingredients: true;
                    productItem: true;
                };
            };
        };
    }>

export function totalCartPrice(
    cart: CartRelations
) {
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


