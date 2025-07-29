import {
    Categories,
    Container,
    Filters,
    FiltersSheet,
    ProductGroup,
    //SortPopup,
    ToolBar,
} from "@/components/shared";
import { QueryFilters } from "@/hooks/useFilters";
import { prisma } from "@/prisma/prisma-client";
import { DoughType } from "@prisma/client";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Next Pizza | Главная",
    description:
        "Доставка свежей пиццы и напитков на дом. Быстро и вкусно! Закажите онлайн с удобной доставкой в любое время.",
    openGraph: {
        type: "website",
        title: "Next Pizza | Главная",
        siteName: "Next Pizza",
        description:
            "Доставка свежей пиццы и напитков на дом. Быстро и вкусно! Закажите онлайн с удобной доставкой в любое время.",
        url: process.env.APP_URL,
    },
};

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<QueryFilters>;
}) {
    const DEFAULT_MIN_PRICE = 0;
    const DEFAULT_MAX_PRICE = 1000;
    const params = await searchParams;

    const pizzaTypes: DoughType[] = [];

    params.doughTypes?.split(",").forEach((doughType) => {
        if (doughType === "1") {
            pizzaTypes.push(DoughType.TRADITIONAL);
        } else if (doughType === "2") {
            pizzaTypes.push(DoughType.THIN);
        }
    });

    const sizes = params.sizes?.split(",").map(Number);
    const ingredientsIdArr = params.ingredients?.split(",").map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const productGroups = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: "asc",
                },
                where: {
                    ingredients: ingredientsIdArr
                        ? {
                              some: {
                                  id: {
                                      in: ingredientsIdArr,
                                  },
                              },
                          }
                        : undefined,
                    item: {
                        some: {
                            size: sizes
                                ? {
                                      in: sizes,
                                  }
                                : undefined,
                            pizzaType:
                                pizzaTypes.length > 0
                                    ? {
                                          in: pizzaTypes,
                                      }
                                    : undefined,
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                    },
                },
                include: {
                    ingredients: true,
                    item: {
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                    },
                },
            },
        },
    });

    return (
        <>
            <div className="h-[1px]"></div>
            <ToolBar className="overflow-hidden">
                <Categories categories={productGroups} />
                {/* <SortPopup className="mr-0 sm:ml-auto" /> */}
                <FiltersSheet />
            </ToolBar>
            <Container className="flex sm:gap-10 md:gap-8 lg:gap-12 mt-7">
                <Suspense
                    fallback={<div className="w-[250px] hidden sm:block"></div>}
                >
                    <Filters className="hidden sm:block" />
                </Suspense>
                <div className="flex flex-col gap-24 pb-20">
                    {productGroups.map(({ id, name, products }) => {
                        if (products.length > 0) {
                            return (
                                <ProductGroup
                                    key={id}
                                    categoryId={id}
                                    title={name}
                                    items={products}
                                    className="leading-[200%]"
                                />
                            );
                        }
                    })}
                </div>
            </Container>
        </>
    );
}
