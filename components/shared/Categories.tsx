import { cn } from "@/lib/utils";
import React from "react";
import CategoryItem from "./CategoryItem";
import { Prisma } from "@prisma/client";

interface Props {
    categories: Prisma.CategoryGetPayload<{
        include: {
            products: true
        }
    }>[]
    className?: string;
}

export default async function Categories({ categories, className }: Props) {
    return (
        <div
            className={cn(
                "categories-container flex gap-1 p-1 lg:p-2 rounded-xl lg:rounded-2xl bg-gray-50 w-fit h-fit lg:h-14 overflow-x-auto",
                className
            )}
        >
            {categories.map((cat) => {
                return (
                    <CategoryItem key={cat.id} id={cat.id} name={cat.name} disabled={cat.products.length === 0} />
                );
            })}
        </div>
    );
}
