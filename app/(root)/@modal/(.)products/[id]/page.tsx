import { ProductModal } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import React from "react";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            item: true,
            ingredients: true,
        },
    });

    if (product) {
        return (
            <ProductModal
                productData={{
                    id: product.id,
                    imageUrl: product.imageUrl,
                    name: product.name,
                }}
                ingredients={product.ingredients}
                items={product.item}
            />
        );
    }
}
