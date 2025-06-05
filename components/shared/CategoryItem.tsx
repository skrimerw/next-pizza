"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useAppContext } from "../../contexts/AppContextProvider";

interface Props {
  id: number;
  name: string;
}

export default function CategoryItem({ id, name }: Props) {
  const { activeCat, setActiveCat } = useAppContext();

  function onCategoryClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) {
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
        `py-2 px-6 rounded-2xl cursor-pointer `,
        id === activeCat ? "bg-white text-[#FE5F00] shadow-md" : ""
      )}
      onClick={(e) => {
        onCategoryClick(e, id);
      }}
    >
      {name}
    </div>
  );
}
