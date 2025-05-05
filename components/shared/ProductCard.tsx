import { cn } from "@/lib/utils";
import React from "react";
import Title from "./Title";
import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Ingredient, ProductItem } from "@prisma/client";

interface Props {
    id: number;
    title: string;
    imageUrl: string;
    ingredients: Ingredient[];
    productItems: ProductItem[];
    className?: string;
}

export default function ProductCard({
    id,
    imageUrl,
    ingredients,
    productItems,
    title,
    className,
}: Props) {
    function getIngredientsStr() {
        let ingredientsStr = "";

        ingredients.forEach((ingredient, i) => {
            if (i !== 0) {
                ingredient.name =
                    ingredient.name.charAt(0).toLowerCase() +
                    ingredient.name.slice(1);
            }

            ingredientsStr += ingredient.name;

            if (i !== ingredients.length - 1) ingredientsStr += ", ";
        });

        return ingredientsStr;
    }

    function compareFunction(a: ProductItem, b: ProductItem) {
        if (a.price < b.price) {
            return -1;
        } else if (a.price > b.price) {
            return 1;
        }
        return 0;
    }
    function sortPorductItems(): ProductItem[] {
        return productItems.sort(compareFunction);
    }

    return (
        <div className={cn("flex flex-col gap-3", className)}>
            <Link
                href={`/products/${id}`}
                className="flex items-center justify-center rounded-lg p-0 group w-[250px] h-[225px]"
            >
                <div className="relative w-full">
                    <img
                        src="/img/product-img-placeholder.svg"
                        className="relative top-0 w-full mt-2 ml-2 transition-all duration-200 ease-out group-hover:top-1"
                    />
                    <div className="bg-white absolute top-0 w-full mt-2 ml-2 transition-all duration-200 ease-out group-hover:top-1">
                        <img alt="title" src={imageUrl} />
                    </div>
                </div>
            </Link>
            <div className="h-full flex flex-col justify-between">
                <Title text={title} size="sm" className="mt-1" />
                {ingredients.length > 0 && (
                    <p className="text-sm text-gray-400 mt-1">
                        {getIngredientsStr()}
                    </p>
                )}
                <div className="flex justify-between items-center mt-5">
                    <span className="text-xl">
                        от <b>{sortPorductItems()[0].price} ₽</b>
                    </span>
                    <Button variant="secondary">
                        <Plus />
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    );
}
