import { cn } from "@/lib/utils";
import { prisma } from "@/prisma/prisma-client";
import React from "react";
import CategoryItem from "./CategoryItem";

interface Props {
  className?: string;
}

export default async function Categories({ className }: Props) {
  const categories = await prisma.category.findMany();

  return (
    <div
      className={cn(
        "flex gap-1 p-2 rounded-2xl bg-gray-50 w-fit h-14",
        className
      )}
    >
      {categories.map((cat, i) => {
        return <CategoryItem key={cat.id} id={cat.id} name={cat.name} />;
      })}
    </div>
  );
}
