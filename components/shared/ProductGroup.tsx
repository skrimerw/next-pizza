import { cn } from "@/lib/utils";
import React from "react";
import Title from "./Title";
import ProductCard from "./ProductCard";

interface Props {
    title: string;
    items: any[];
    categoryId: number;
    className?: string;
}

export default function ProductGroup({
    items,
    title,
    categoryId,
    className,
}: Props) {
    return (
        <div
            id={`product-group-${categoryId}`}
            data-product-group-id={categoryId}
            className={cn("product-group w-full", className)}
        >
            <Title text={title} size="lg" className="mb-4 font-bold" />
            <div className="grid grid-cols-3 gap-8">
                {items.map((item) => {
                    return (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            ingredients={item.ingredients}
                            price={item.price}
                        />
                    );
                })}
            </div>
        </div>
    );
}
