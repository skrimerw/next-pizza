"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Props {
    width?: number | "100%" | "auto";
    height?: number | "100%" | "auto";
    imageUrl: string;
    className?: string;
}

export default function ProductImage({
    imageUrl,
    className,
    width = "100%",
    height = "100%",
}: Props) {
    return (
        <div className="relative w-full" style={{ width }}>
            <img
                src="/img/product-img-placeholder.svg"
                className="relative top-0 w-full mt-2 ml-2 transition-all duration-200 ease-out group-hover:top-1"
            />
            <div
                className={cn(
                    "bg-white absolute top-0 w-full mt-2 ml-2 transition-all duration-200 ease-out group-hover:top-1",
                    className
                )}
            >
                <img alt="title" src={imageUrl} />
            </div>
        </div>
    );
}
