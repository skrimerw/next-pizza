import { Container } from "@/components/shared";
import React from "react";

export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;

    return (
        <main>
            <Container>Product {id}</Container>
        </main>
    );
}
