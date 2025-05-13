"use client";

import React, { useRef, useState } from "react";
import Modal from "./Modal";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
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

export default function ProductModal({
  className,
  productData: { imageUrl, name },
  ingredients,
  isOpen,
  setShowModal,
}: Props) {
  const router = useRouter();
  const [checkedIngredients, setCheckecdIngredients] = useState<number[]>([]);
  const scrollableArea = useRef<HTMLDivElement>(null);

  function onIngredientsChanged(value: number) {
    if (checkedIngredients.includes(value)) {
      setCheckecdIngredients((prev) => prev.filter((item) => item !== value));
    } else {
      setCheckecdIngredients((prev) => [...prev, value]);
    }
  }

  return (
    <Modal
      className={cn(
        "max-w-[1000px] p-0 overflow-hidden h-[580px] rounded-3xl",
        className
      )}
      onClose={() => {
        if (scrollableArea.current) {
          scrollableArea.current.scrollTo({
            top: 0,
          });
        }
        setCheckecdIngredients([]);

        router.back();
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
          <div ref={scrollableArea} className="product-card-scroll px-8">
            <Title text={name} size="md" />
            <div className="pb-5">
              <Title
                text="Добавить по вкусу"
                size="xs"
                className="font-semibold text-lg mb-4"
              />
              <div className="grid grid-cols-3 gap-3">
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
          </div>
          <div className="px-8">
            <Button className="mt-6 h-12 min-w-full mx-auto">
              Добавить в корзину за {"700"} ₽
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
