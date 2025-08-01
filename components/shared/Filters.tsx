"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { DualRangeSlider } from "../ui/dual-range-slider";
import { Button } from "../ui/button";
import CheckboxFilterGroup from "./CheckboxFilterGroup";
import { axiosInstance } from "@/lib/axiosInstance";
import { useFilters } from "@/hooks/useFilters";
import { Ingredient } from "@prisma/client";
import { useTopLoader } from "nextjs-toploader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface Props {
    className?: string;
}

const pizzaSizes = [
    {
        id: 1,
        size: 20,
    },
    {
        id: 2,
        size: 30,
    },
    {
        id: 3,
        size: 40,
    },
];

const pizzaDough = [
    {
        id: 1,
        name: "Традиционное",
    },
    {
        id: 2,
        name: "Тонкое",
    },
];

export default function Filters({ className }: Props) {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const {
        prices,
        setPrices,
        checkedSizes,
        setCheckedSizes,
        checkedDoughTypes,
        setCheckedDoughTypes,
        checkedIngredients,
        setCheckedIngredients,
    } = useFilters();

    const pathname = usePathname();
    const sp = useSearchParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosInstance.get("/ingredients");

                setIngredients(data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();
    }, []);

    function onPriceRangeChange({ from, to }: { from: string; to: string }) {
        from = from.replaceAll(/\D/g, "");
        to = to.replaceAll(/\D/g, "");

        setPrices([Number(from), Number(to)]);
    }

    function onPizzaSizeChanged(value: string) {
        if (checkedSizes.includes(value)) {
            setCheckedSizes((prev) => prev.filter((item) => item !== value));
        } else {
            setCheckedSizes((prev) => [...prev, value]);
        }
    }

    function onDoughTypeChanged(value: string) {
        if (checkedDoughTypes.includes(value)) {
            setCheckedDoughTypes((prev) =>
                prev.filter((item) => item !== value)
            );
        } else {
            setCheckedDoughTypes((prev) => [...prev, value]);
        }
    }

    return (
        <aside className={cn("w-[250px] pb-10 flex-none", className)}>
            <Title text="Фильтрация" />
            <div className="flex flex-col gap-4 pb-6 pt-8 border-b border-gray-100">
                <Title text="Размер:" size="xs" />
                {pizzaSizes.map(({ id, size }) => {
                    return (
                        <label
                            className="flex items-center gap-3"
                            htmlFor={`size-${size}`}
                            key={id}
                        >
                            <Checkbox
                                id={`size-${size}`}
                                value={size}
                                onClick={(e) =>
                                    onPizzaSizeChanged(e.currentTarget.value)
                                }
                                checked={checkedSizes.includes(String(size))}
                            />
                            {size} см
                        </label>
                    );
                })}
            </div>
            <div className="flex flex-col gap-4 pb-6 pt-8 border-b border-gray-100">
                <Title text="Тип теста:" size="xs" />
                {pizzaDough.map(({ id, name }) => {
                    return (
                        <label
                            className="flex items-center gap-3"
                            htmlFor={`doughType-${id}`}
                            key={id}
                        >
                            <Checkbox
                                id={`doughType-${id}`}
                                value={id}
                                onClick={(e) =>
                                    onDoughTypeChanged(e.currentTarget.value)
                                }
                                checked={checkedDoughTypes.includes(String(id))}
                            />
                            {name}
                        </label>
                    );
                })}
            </div>
            <div className="flex flex-col gap-4 pb-6 pt-8 border-b border-gray-100">
                <Title text="Цена:" size="xs" />
                <div className="flex gap-3">
                    <label className="flex items-center h-10 p-2 rounded-md border border-gray-100">
                        <span className="text-sm text-gray-400 mr-2">от</span>
                        <Input
                            value={prices[0] ? prices[0].toLocaleString() : 0}
                            className="border-none p-0 focus-visible:ring-0"
                            maxLength={7}
                            onChange={(e) =>
                                onPriceRangeChange({
                                    from: e.target.value,
                                    to: String(prices[1]),
                                })
                            }
                        />
                        <span className="text-sm text-gray-400">₽</span>
                    </label>
                    <label className="flex items-center h-10 p-2 rounded-md border border-gray-100">
                        <span className="text-sm text-gray-400 mr-2">до</span>
                        <Input
                            value={
                                prices[1] ? prices[1].toLocaleString() : 1000
                            }
                            className="border-none p-0 focus-visible:ring-0"
                            maxLength={7}
                            onChange={(e) =>
                                onPriceRangeChange({
                                    from: String(prices[0]),
                                    to: e.target.value,
                                })
                            }
                        />
                        <span className="text-sm text-gray-400">₽</span>
                    </label>
                </div>
                <DualRangeSlider
                    value={[prices[0] || 0, prices[1] || 1000]}
                    onValueChange={setPrices}
                    min={0}
                    max={1000}
                    step={1}
                />
            </div>
            <CheckboxFilterGroup
                title="Ингредиенты: "
                items={ingredients}
                checkedIds={checkedIngredients}
                setCheckedIds={setCheckedIngredients}
            />
            {/* <Button className="w-full h-12">Применить</Button> */}
        </aside>
    );
}
