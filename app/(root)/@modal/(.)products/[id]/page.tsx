import { ProductModal } from "@/components/shared";
import React from "react";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <ProductModal>
            <h1>Product {id}</h1>
        </ProductModal>
    );
}
