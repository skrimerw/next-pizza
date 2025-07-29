import { prisma } from "@/prisma/prisma-client";
import { unstable_cache } from "next/cache";

export const getCachedProduct = unstable_cache(
    async (id: string) => {
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

        return product;
    },
    ["product"],
    { revalidate: 3600 }
);