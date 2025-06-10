import {
    Categories,
    Container,
    Filters,
    FiltersSheet,
    ProductGroup,
    SortPopup,
    ToolBar,
} from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";

export default async function Home() {
    const productGroups = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    ingredients: true,
                    item: true,
                },
            },
        },
    });

    return (
        <>
            <div className="h-[1px]"></div>
            <ToolBar className="overflow-hidden">
                <Categories />
                <SortPopup className="mr-0 sm:ml-auto" />
                <FiltersSheet />
            </ToolBar>
            <Container className="flex sm:gap-10 md:gap-8 lg:gap-12 mt-7">
                <Suspense fallback={<div className="w-[250px] hidden sm:block"></div>}>
                    <Filters className="hidden sm:block" />
                </Suspense>
                <div className="flex flex-col gap-24 pb-20">
                    {productGroups.map(({ id, name, products }) => {
                        return (
                            <ProductGroup
                                key={id}
                                categoryId={id}
                                title={name}
                                items={products}
                                className="leading-[200%]"
                            />
                        );
                    })}
                </div>
            </Container>
        </>
    );
}
