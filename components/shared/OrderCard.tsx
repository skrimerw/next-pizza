import { cn } from "@/lib/utils";
import { DoughType, Ingredient, Prisma } from "@prisma/client";
import React from "react";

export type OrderItem = {
    productItem: Prisma.ProductItemGetPayload<{
        include: {
            product: true
        }
    }>;
    quantity: number;
    ingredients: Ingredient[];
};

interface Props {
    item: OrderItem;
    className?: string;
}

export default async function OrderCard({
    item: { productItem, ingredients, quantity },
    className,
}: Props) {
    

    function getIngredientsStr(ingredients: Ingredient[]) {
        let ingredientsStr = "";

        ingredients.forEach((ingredient, i) => {
            let ingredientName = ingredient.name;

            if (i !== 0) {
                ingredientName =
                    ingredient.name.charAt(0).toLowerCase() +
                    ingredient.name.slice(1);
            }

            ingredientsStr += ingredientName;

            if (i !== ingredients.length - 1) ingredientsStr += ", ";
        });

        return ingredientsStr;
    }

    function countCartItemTotalPrice() {
        let totalCartPrice = 0;

        let totalItemPrice = 0;
        totalItemPrice += productItem.price;

        ingredients.forEach((ingredient) => {
            totalItemPrice += ingredient.price;
        });

        totalItemPrice *= quantity;
        totalCartPrice += totalItemPrice;

        return totalCartPrice;
    }

    return (
        <div className={cn("flex items-center py-3 sm:py-5 px-5 sm:px-9", className)}>
            <div className="flex-none">
                <img
                    className="w-[65px] h-[65px] mr-2 sm:mr-5"
                    src={productItem?.product.imageUrl}
                    alt={productItem?.product.name}
                />
            </div>
            <div className="mr-2 sm:mr-5">
                <h3 className="text-base font-bold">
                    {productItem?.product.name}
                </h3>
                {productItem?.pizzaType && (
                    <p className="text-sm text-[#A1A1A1]">
                        {productItem.size === 20
                            ? "Маленькая"
                            : productItem.size === 30
                            ? "Средняя"
                            : "Большая"}{" "}
                        {productItem.size} см,{" "}
                        {productItem.pizzaType === DoughType.THIN
                            ? "тонкое"
                            : "традиционное"}{" "}
                        тесто
                    </p>
                )}
                {ingredients.length > 0 && (
                    <p className="text-sm text-[#A1A1A1]">
                        + {getIngredientsStr(ingredients)}
                    </p>
                )}
            </div>
            <div className="flex flex-col items-end ml-auto">
                <span className="text-base font-bold text-nowrap">
                    {countCartItemTotalPrice()} ₽
                </span>
                <span className="text-gray-400">
                    {quantity} шт.
                </span>
            </div>
        </div>
    );
}
