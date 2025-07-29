import { Container, ProductItemCard } from "@/components/shared";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const metadata: Metadata = {
    title: "Next Pizza | Продукт",
};

export default async function ProductModal({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;

    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            item: true,
            ingredients: true,
            category: true,
        },
    });

    if (!product) return;

    const openGraph: OpenGraph = {
        type: "website",
        title: "Next Pizza | " + product.name,
        url: `${process.env.APP_URL}/products/${product.id}`,
        images: [
            {
                url: product.imageUrl,
                alt: product.name,
            },
        ],
        description: `${product.name} — доступно в Next Pizza. Свежие продукты, быстрая доставка, отличный вкус.`,
    };

    metadata.title = product.name;
    metadata.openGraph = openGraph;

    return (
        <>
            <Container className="p-0">
                <Breadcrumb>
                    <BreadcrumbList className="text-base mt-10 pl-6 sm:pl-0">
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="/"
                                className="text-black hover:underline"
                            >
                                Главная
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href={`/#product-group-${product.categoryId}`}
                                className="text-black hover:underline"
                            >
                                {product.category.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-black/50">
                                {product.name}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <ProductItemCard
                    ingredients={product.ingredients}
                    productData={{
                        id: product.id,
                        imageUrl: product.imageUrl,
                        name: product.name,
                    }}
                    items={product.item}
                    className="sm:max-h-[calc(100vh-200px)] overflow-hidden"
                    isOnPage={true}
                />
            </Container>
        </>
    );
}
