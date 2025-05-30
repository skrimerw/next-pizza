import {
  Categories,
  Container,
  Filters,
  ProductGroup,
  SortPopup,
  ToolBar,
} from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
//import { QueryFilters } from "@/hooks/useFilters";

export default async function Home(/* {
    searchParams,
}: {
    searchParams: Promise<QueryFilters>;
} */) {
  /*  const { doughTypes, ingredients, priceFrom, priceTo, sizes } =
        await searchParams; */

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
        <Filters />
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
