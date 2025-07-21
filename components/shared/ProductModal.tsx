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
import ProductItemCard from "./ProductItemCard";
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
  productData,
  ingredients,
  isOpen,
  items,
  setShowModal,
}: Props) {
  const sortedItems = sortItems();

  const router = useRouter();
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [currentItem, setCurrentItem] = useState<ProductItem>(sortedItems[0]);

  const scrollableArea = useRef<HTMLDivElement>(null);

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
    <Modal
      className={cn(
        "fixed inset-0 sm:static flex max-w-[1000px] p-0 overflow-hidden sm:h-[580px] rounded-none sm:rounded-3xl",
        className
      )}
      onClose={closeProductModal}
      isOpen={isOpen}
      setShowModal={setShowModal}
      closeButtonClass="flex justify-center right-6 bg-white items-center shadow-[0_0_8px_0_rgba(0,0,0,0.1)] h-10 w-10 rounded-full sm:shadow-none sm:w-fit sm:h-fit sm:right-4"
    >
      <ProductItemCard
        ingredients={ingredients}
        productData={productData}
        items={items}
      />
    </Modal>
  );
}
