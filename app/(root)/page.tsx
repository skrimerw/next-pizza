import {
  Categories,
  Container,
  Filters,
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
      <ToolBar>
        <Categories />
        <SortPopup className="ml-auto" />
      </ToolBar>
      <Container className="flex gap-12 mt-7">
        <Suspense>
          <Filters />
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
