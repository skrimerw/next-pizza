"use client";

import React, { useRef, useState } from "react";
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
import { axiosInstance } from "@/lib/axiosInstance";
import { LoaderCircle } from "lucide-react";
import { useAppContext } from "@/contexts/AppContextProvider";
import { failToast, successToast } from "./toast";
interface Props {
  productData: Pick<Product, "id" | "imageUrl" | "name">;
  ingredients: IngredientModel[];
  items: ProductItem[];
  className?: string;
  isOnPage?: boolean;
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

export default function ProductItemCard({
  productData: { imageUrl, name },
  ingredients,
  items,
  isOnPage = false,
  className,
}: Props) {
  const sortedItems = sortItems();

  const router = useRouter();
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [currentItem, setCurrentItem] = useState<ProductItem>(sortedItems[0]);
  const [adding, setAdding] = useState(false);
  const { setCart } = useAppContext();

  const hasSettings = currentItem.size && true;

  const scrollableArea = useRef<HTMLDivElement>(null);

  function getIngredientsStr() {
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

  function onIngredientsChanged(value: number) {
    if (checkedIngredients.includes(value)) {
      setCheckedIngredients((prev) => prev.filter((item) => item !== value));
    } else {
      setCheckedIngredients((prev) => [...prev, value]);
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
    const itemsSorted: ProductItem[] = items.sort(
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
      const price = ingredients.find((ingr) => ingr.id === ingredient)?.price;

      if (price) total += price;
    });

    return total;
  }

  async function addProductToCart() {
    setAdding(true);

    try {
      const { data } = await axiosInstance.post("/carts", {
        productItem: currentItem,
        ingredients: checkedIngredients,
      });

      setCart(data);
      closeProductModal();
      successToast("Товар добавлен в корзину");
    } catch (e) {
      console.error(e);
      failToast("Ошибка. Проверьте соединение");
    } finally {
      setAdding(false);
    }
  }

  function closeProductModal() {
    const timeout = setTimeout(() => {
      if (scrollableArea.current) {
        scrollableArea.current.scrollTo({
          top: 0,
        });
      }
    }, 300);

    setCheckedIngredients([]);

    router.back();

    setCurrentItem(sortedItems[0]);

    return () => {
      clearTimeout(timeout);
    };
  }

  return (
    <div
      className={cn(
        "flex flex-col overflow-x-hidden overflow-y-auto sm:flex-row h-full ",
        className
      )}
    >
      <div className="relative mx-auto max-w-lg grid basis-1/2 py-4 md:py-6 px-2 md:px-4">
        {hasSettings && (
          <>
            <div className="col-start-1 col-end-1 row-start-1 row-end-2 self-center justify-self-center aspect-square rounded-full w-full p-5">
              <img src="/img/big-circle.svg" />
            </div>
            <div className="col-start-1 col-end-1 row-start-1 row-end-2 self-center justify-self-center aspect-square rounded-full w-3/4">
              <img src="/img/big-circle.svg" />
            </div>
          </>
        )}
        <img
          src={imageUrl}
          alt={name}
          className={cn(
            "col-start-1 col-end-1 row-start-1 row-end-2 self-center justify-self-center aspect-square translate-x-[2.3%] translate-y-[2.3%] transition-all",
            currentItem.size === 20
              ? "w-[calc(60%+5.5%)]"
              : currentItem.size === 30
              ? "w-[calc(75%+8%)]"
              : "w-[calc(100%+8%)]"
          )}
        />
      </div>
      <div className={cn("flex flex-col basis-1/2 bg-product-card py-4 pb-8 sm:py-6 md:py-8", isOnPage && "bg-transparent")}>
        <div
          ref={scrollableArea}
          className="sm:product-card-scroll px-6 sm:px-8 md:px-10 h-full"
        >
          <Title text={name} size="md" />
          {hasSettings && (
            <p className="text-sm text-[#777777] mt-2">
              Диаметр {currentItem.size} см,{" "}
              {currentItem.pizzaType === DoughType.TRADITIONAL
                ? "Традиционное "
                : "Тонкое "}
              тесто
            </p>
          )}
          <p className="leading-5 mt-3">{getIngredientsStr()}</p>
          {hasSettings && (
            <div className="flex flex-col gap-2 my-7">
              <div className="relative flex justify-between items-center rounded-full bg-product-card-bar h-8 overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full rounded-full w-1/3 p-[2px] transition-all"
                  style={{
                    left: `${getSizesSliderOffset(currentItem.size || 0)}%`,
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
                        (items.filter((item) => item.size === size).length ===
                          0 ||
                          items
                            .filter((item) => item.size === size)
                            .filter(
                              (item) =>
                                item.pizzaType === currentItem?.pizzaType
                            ).length === 0) &&
                          "pointer-events-none text-[#abadba]"
                      )}
                      onClick={() => {
                        setCurrentItem(
                          (prev) =>
                            sortedItems.find(
                              (item) =>
                                item.pizzaType === currentItem.pizzaType &&
                                item.size === size
                            ) ||
                            sortedItems.find((item) => item.size === size) ||
                            prev
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
                  className="absolute top-0 left-0 h-full rounded-full w-1/2 p-[2px] transition-all"
                  style={{
                    left: `${getDoughSliderOffset(
                      currentItem.pizzaType || DoughType.TRADITIONAL
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
                        items.filter((item) => item.pizzaType === name)
                          .length === 0 && "pointer-events-none text-[#abadba]"
                      )}
                      onClick={() => {
                        setCurrentItem(
                          (prev) =>
                            sortedItems.find(
                              (item) =>
                                item.pizzaType === name &&
                                item.size === currentItem.size
                            ) ||
                            sortedItems.find(
                              (item) => item.pizzaType === name
                            ) ||
                            prev
                        );
                      }}
                    >
                      {alias}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {ingredients.length > 0 && (
            <div className="pb-5">
              <Title
                text="Добавить по вкусу"
                size="xs"
                className="font-semibold text-lg mb-4"
              />
              <div className="grid grid-cols-3 gap-2 xs:gap-3">
                {ingredients.map(({ id, imageUrl, name, price }) => {
                  return (
                    <Ingredient
                      key={id}
                      imageUrl={imageUrl}
                      name={name}
                      price={price}
                      checked={checkedIngredients.includes(id)}
                      onClick={() => {
                        onIngredientsChanged(id);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="px-6 sm:px-8">
          <Button
            onClick={addProductToCart}
            className="block relative mt-6 h-12 min-w-full mx-auto font-semibold"
            disabled={adding}
          >
            {adding && (
              <span className="block absolute top-1/2 left-4 -translate-y-1/2 size-5">
                <LoaderCircle className="animate-spin !w-full !h-full" />
              </span>
            )}
            {`Добавить в корзину за ${
              currentItem.price + ingredientsPrice()
            } ₽`}
          </Button>
        </div>
      </div>
    </div>
  );
}
