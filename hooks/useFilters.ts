import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "qs";

export type OrderType = "desc" | "asc";
export type SortByType = "name" | "price";

export interface QueryFilters {
    priceFrom: string;
    priceTo: string;
    sizes: string;
    ingredients: string;
    doughTypes: string;
    order: OrderType;
    sortBy: string;
}

export function useFilters() {
    const router = useRouter();

    const searchParams = useSearchParams() as unknown as Map<
        keyof QueryFilters,
        string
    >;

    const [prices, setPrices] = useState<any[]>([
        // eslint-disable-line
        Number(searchParams.get("priceFrom")) || undefined,
        Number(searchParams.get("priceTo")) || undefined,
    ]);
    const [checkedSizes, setCheckedSizes] = useState<string[]>(
        searchParams.get("sizes")?.split(",") || []
    );
    const [checkedDoughTypes, setCheckedDoughTypes] = useState<string[]>(
        searchParams.get("doughTypes")?.split(",") || []
    );
    const [checkedIngredients, setCheckedIngredients] = useState<string[]>(
        searchParams.get("ingredients")?.split(",") || []
    );
    const [order, setOrder] = useState<OrderType | "">(
        (searchParams.get("order") as OrderType) || undefined
    );
    const [sortBy, setSortBy] = useState<SortByType>(
        (searchParams.get("sortBy") as SortByType) || undefined
    );

    useEffect(() => {
        const filters = {
            doughTypes: checkedDoughTypes,
            ingredients: checkedIngredients,
            sizes: checkedSizes,
            priceFrom: prices[0],
            priceTo: prices[1],
            order,
            sortBy,
        };
        console.log(filters)
        
        const queryString = qs.stringify(filters, { arrayFormat: "comma" });

        router.push(`/?${queryString}`, { scroll: false });
    }, [
        checkedSizes,
        checkedDoughTypes,
        prices,
        checkedIngredients,
        order,
        sortBy,
    ]);

    return {
        prices,
        setPrices,
        checkedSizes,
        setCheckedSizes,
        checkedDoughTypes,
        setCheckedDoughTypes,
        checkedIngredients,
        setCheckedIngredients,
        order,
        setOrder,
        sortBy,
        setSortBy,
    };
}
