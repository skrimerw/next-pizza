"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useAppContext } from "../../contexts/AppContextProvider";

interface Props {
  id: number;
  disabled?: boolean;
  name: string;
}

export default function CategoryItem({ id, name, disabled = false }: Props) {
  const { activeCat, setActiveCat } = useAppContext();

  function onCategoryClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) {
    e.preventDefault();
    setActiveCat(id);

    window.location.hash = `product-group-${id}`;

    scrollTo({
      top:
        (document.querySelector<HTMLDivElement>(`#product-group-${id}`)
          ?.offsetTop as number) - 140,
    });
  }

  return (
    <div
      className={cn(
        `flex items-center py-1 lg:py-2 px-4 lg:px-6 text-base rounded-xl lg:rounded-2xl cursor-pointer transition-all font-medium`,
        id === activeCat ? "bg-white text-[#FE5F00] shadow-md" : "",
        disabled && "pointer-events-none opacity-40 hover:cursor-pointer"
      )}
      onClick={(e) => {
        if (!disabled) {
          onCategoryClick(e, id);
        }
      }}
    >
      {name}
    </div>
  );
}
