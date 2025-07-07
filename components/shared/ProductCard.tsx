"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Ingredient, ProductItem } from "@prisma/client";
import ProductModal from "./ProductModal";

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
    const [showModal, setShowModal] = useState<boolean>(false);

    function getIngredientsStr() {
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

    function handleClick() {
        setShowModal(true);
        history.pushState({}, "", `/products/${id}`);
    }

    useEffect(() => {
        window.addEventListener("popstate", () => {
            const path = location.pathname;

            if (/^\/products\/[0-9]{1,}$/gm.test(path)) {
                if (id === Number(path.split("/").at(-1))) {
                    setShowModal(true);
                }
            } else {
                setShowModal(false);
            }
        });
    }, [showModal]);

    return (
        <>
            <div
                className={cn("flex sm:flex-col gap-3", className)}
                onClick={handleClick}
            >
                <div className="flex flex-none items-center justify-center rounded-lg sm:px-8 md:px-0 group sm:aspect-[5/3]">
                    <div className="aspect-square relative h-full w-[85px] xs:w-[115px] sm:w-full">
                        <img
                            src="/img/product-img-placeholder.svg"
                            className="relative top-0 w-full mt-2 ml-2 transition-all duration-200 ease-out sm:group-hover:top-1"
                        />
                        <div className="bg-white absolute top-0 w-full mt-2 ml-2 transition-all duration-200 ease-out sm:group-hover:top-1">
                            <img className="w-full h-full" alt="title" src={imageUrl} />
                        </div>
                    </div>
                </div>
                <div className="h-full flex flex-col w-full">
                    <Title text={title} size="sm" className="mt-1" />
                    {ingredients.length > 0 && (
                        <p className="text-sm text-gray-400 mt-1">
                            {getIngredientsStr()}
                        </p>
                    )}
                    <div className="flex justify-between items-center mt-auto pt-5">
                        <span className="text-lg text-nowrap sm:text-xl">
                            от <b>{sortPorductItems()[0].price} ₽</b>
                        </span>
                        <Button variant="secondary" className="font-semibold">
                            <Plus />
                            Добавить
                        </Button>
                    </div>
                </div>
            </div>
            <ProductModal
                productData={{
                    id,
                    imageUrl,
                    name: title,
                }}
                ingredients={ingredients}
                items={productItems}
                isOpen={showModal}
                setShowModal={setShowModal}
            />
        </>
    );
}
