"use client";

import React, { useRef, useState } from "react";
import Modal from "./Modal";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
    DoughType,
    Ingredient as IngredientModel,
    Product,
    ProductItem,
} from "@prisma/client";
import Title from "./Title";
import Ingredient from "./Ingredient";
import { Button } from "../ui/button";
interface Props {
    productData: Pick<Product, "id" | "imageUrl" | "name">;
    ingredients: IngredientModel[];
    items: ProductItem[];
    isOpen: boolean;
    setShowModal: (value: React.SetStateAction<boolean>) => void;
    className?: string;
}

const pizzaSizes = [
    {
        size: 20,
        alias: "Маленькая",
    },
    {
        size: 30,
        alias: "Средняя",
    },
    {
        size: 40,
        alias: "Большая",
    },
];

const doughTypes = [
    {
        name: DoughType.TRADITIONAL,
        alias: "Традиционное",
    },
    {
        name: DoughType.THIN,
        alias: "Тонкое",
    },
];

export default function ProductModal({
    className,
    productData: { imageUrl, name },
    ingredients,
    isOpen,
    items,
    setShowModal,
}: Props) {
    const router = useRouter();
    const [checkedIngredients, setCheckecdIngredients] = useState<number[]>([]);
    const [currentItem, setCurrentItem] = useState<ProductItem>(sortItems()[0]);
    const [sizesOffset, setSizesOffset] = useState(
        getSizesSliderOffset(currentItem.size || 0)
    );
    const scrollableArea = useRef<HTMLDivElement>(null);

    function onIngredientsChanged(value: number) {
        if (checkedIngredients.includes(value)) {
            setCheckecdIngredients((prev) =>
                prev.filter((item) => item !== value)
            );
        } else {
            setCheckecdIngredients((prev) => [...prev, value]);
        }
    }

    function compareFunction(a: ProductItem, b: ProductItem) {
        if (a.pizzaType === null || b.pizzaType === null) return 0;

        if (a.pizzaType > b.pizzaType) {
            return -1;
        } else if (a.price < b.price) {
            return 1;
        }
        return 0;
    }

    function sortItems(): ProductItem[] {
        let itemsSorted: ProductItem[] = items.sort(
            (a: ProductItem, b: ProductItem) => {
                if (a.size === null || b.size === null) return 0;

                return a.size - b.size;
            }
        );

        return itemsSorted.sort(compareFunction);
    }

    function getSizesSliderOffset(size: number) {
        return (
            (pizzaSizes.findIndex((pizzaSize) => pizzaSize.size === size) /
                pizzaSizes.length) *
            100
        );
    }

    function getDoughSliderOffset(pizzaType: DoughType) {
        return (
            (doughTypes.findIndex((type) => type.name === pizzaType) /
                doughTypes.length) *
            100
        );
    }

    function ingredientsPrice() {
        let total = 0;

        checkedIngredients.forEach((ingredient) => {
            const price = ingredients.find(
                (ingr) => ingr.id === ingredient
            )?.price;

            if (price) total += price;
        });

        return total;
    }

    return (
        <Modal
            className={cn(
                "max-w-[1000px] p-0 overflow-hidden h-[580px] rounded-3xl",
                className
            )}
            onClose={() => {
                const timeout = setTimeout(() => {
                    if (scrollableArea.current) {
                        scrollableArea.current.scrollTo({
                            top: 0,
                        });
                    }
                }, 300);

                setCheckecdIngredients([]);

                router.back();

                return () => {
                    clearTimeout(timeout);
                };
            }}
            isOpen={isOpen}
            setShowModal={setShowModal}
        >
            <div className="flex h-full">
                <div className="relative basis-1/2 p-6">
                    <div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full w-full">
                        <img src="/img/big-circle.svg" alt="" />
                    </div>
                    <div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full w-full">
                        <img src="/img/small-circle.svg" alt="" />
                    </div>
                    <img
                        src={imageUrl}
                        alt={name}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[6px] ml-[6px] w-2/3"
                    />
                </div>
                <div className="flex flex-col basis-1/2 bg-product-card py-8">
                    <div
                        ref={scrollableArea}
                        className="product-card-scroll px-8 h-full"
                    >
                        <Title text={name} size="md" />
                        <p className="text-sm text-[#777777] mt-2">
                            Диаметр {currentItem.size} см,{" "}
                            {currentItem.pizzaType === DoughType.TRADITIONAL
                                ? "Традиционное"
                                : "Тонкое"}{" "}
                            тесто
                        </p>
                        <div className="flex flex-col gap-2 my-7">
                            <div className="relative flex justify-between items-center rounded-full bg-product-card-bar h-8 overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full rounded-full  w-1/3 p-[2px] transition-all"
                                    style={{
                                        left: `${getSizesSliderOffset(
                                            currentItem.size || 0
                                        )}%`,
                                    }}
                                >
                                    <span className="bg-white h-full w-full block rounded-full shadow-md"></span>
                                </div>
                                {pizzaSizes.map(({ alias, size }, i) => {
                                    return (
                                        <span
                                            key={i}
                                            className={cn(
                                                "relative z-10 text-center w-full text-sm cursor-pointer transition-all",
                                                (items.filter(
                                                    (item) => item.size === size
                                                ).length === 0 ||
                                                    items
                                                        .filter(
                                                            (item) =>
                                                                item.size ===
                                                                size
                                                        )
                                                        .filter(
                                                            (item) =>
                                                                item.pizzaType ===
                                                                currentItem?.pizzaType
                                                        ).length === 0) &&
                                                    "pointer-events-none text-[#abadba]"
                                            )}
                                            onClick={() => {
                                                setCurrentItem(
                                                    (prev) =>
                                                        sortItems().find(
                                                            (item) =>
                                                                item.pizzaType ===
                                                                    currentItem.pizzaType &&
                                                                item.size ===
                                                                    size
                                                        ) ||
                                                        sortItems().find(
                                                            (item) =>
                                                                item.size ===
                                                                size
                                                        ) ||
                                                        prev
                                                );
                                                setSizesOffset(
                                                    getSizesSliderOffset(size)
                                                );
                                            }}
                                        >
                                            {alias}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className="relative flex justify-between items-center rounded-full bg-product-card-bar h-8 overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full rounded-full  w-1/2 p-[2px] transition-all"
                                    style={{
                                        left: `${getDoughSliderOffset(
                                            currentItem.pizzaType ||
                                                DoughType.TRADITIONAL
                                        )}%`,
                                    }}
                                >
                                    <span className="bg-white h-full w-full block rounded-full shadow-md"></span>
                                </div>
                                {doughTypes.map(({ alias, name }, i) => {
                                    return (
                                        <span
                                            key={i}
                                            className={cn(
                                                "relative z-10 text-center w-full text-sm cursor-pointer transition-all",
                                                items.filter(
                                                    (item) =>
                                                        item.pizzaType === name
                                                ).length === 0 &&
                                                    "pointer-events-none text-[#abadba]"
                                            )}
                                            onClick={() => {
                                                setCurrentItem(
                                                    (prev) =>
                                                        sortItems().find(
                                                            (item) =>
                                                                item.pizzaType ===
                                                                    name &&
                                                                item.size ===
                                                                    currentItem.size
                                                        ) ||
                                                        sortItems().find(
                                                            (item) =>
                                                                item.pizzaType ===
                                                                name
                                                        ) ||
                                                        prev
                                                );
                                                setSizesOffset(
                                                    getSizesSliderOffset(
                                                        currentItem.size || 0
                                                    )
                                                );
                                            }}
                                        >
                                            {alias}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                        {ingredients.length > 0 && (
                            <div className="pb-5">
                                <Title
                                    text="Добавить по вкусу"
                                    size="xs"
                                    className="font-semibold text-lg mb-4"
                                />
                                <div className="grid grid-cols-3 gap-3">
                                    {ingredients.map(
                                        ({ id, imageUrl, name, price }) => {
                                            return (
                                                <Ingredient
                                                    key={id}
                                                    imageUrl={imageUrl}
                                                    name={name}
                                                    price={price}
                                                    checked={checkedIngredients.includes(
                                                        id
                                                    )}
                                                    onClick={() => {
                                                        onIngredientsChanged(
                                                            id
                                                        );
                                                    }}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="px-8">
                        <Button className="mt-6 h-12 min-w-full mx-auto">
                            Добавить в корзину за{" "}
                            {currentItem.price + ingredientsPrice()} ₽
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
