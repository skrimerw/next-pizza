import { cn } from "@/lib/utils";
import React from "react";
import Title from "./Title";
import ProductCard from "./ProductCard";

interface Props {
    title: string;
    items: any[]; // eslint-disable-line
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {items.map((item) => {
                    return (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            title={item.name}
                            imageUrl={item.imageUrl}
                            ingredients={item.ingredients}
                            productItems={item.item}
                        />
                    );
                })}
            </div>
        </div>
    );
}
