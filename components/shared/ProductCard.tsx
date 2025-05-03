import { cn } from "@/lib/utils";
import React from "react";
import Title from "./Title";
import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ProductImage from "./ProductImage";

interface Props {
    id: number;
    title: string;
    imageUrl: string;
    ingredients: string;
    price: number;
    className?: string;
}

export default function ProductCard({
    id,
    imageUrl,
    ingredients,
    price,
    title,
    className,
}: Props) {
    return (
        <div className={cn("flex flex-col gap-3", className)}>
            <Link
                href={`/product/${id}`}
                className="flex items-center justify-center rounded-lg p-0 group w-[250px] h-[225px]"
            >
                <div className="relative w-full">
                    <img
                        src="/img/product-img-placeholder.svg"
                        className="relative top-0 w-full mt-2 ml-2 transition-all duration-200 ease-out group-hover:top-1"
                    />
                    <div className="bg-white absolute top-0 w-full mt-2 ml-2 transition-all duration-200 ease-out group-hover:top-1">
                        <img alt="title" src={imageUrl} />
                    </div>
                </div>
            </Link>
            <div>
                <Title text={title} size="sm" />
                <p className="text-sm text-gray-400 mt-1">{ingredients}</p>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-xl">
                        от <b>{price} ₽</b>
                    </span>
                    <Button variant="secondary">
                        <Plus />
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    );
}
