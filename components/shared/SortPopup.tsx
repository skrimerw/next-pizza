"use client";

import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { SortByType, useFilters } from "@/hooks/useFilters";

interface Props {
    className?: string;
}

type SortCat = {
    readonly id: number;
    name: string;
    value: SortByType;
};

const sortCats: SortCat[] = [
    {
        id: 1,
        name: "По цене",
        value: "price",
    },
    {
        id: 2,
        name: "По названию",
        value: "name",
    },
];

export default function SortPopup({ className }: Props) {
    const [currentSortCat, setCurrentSortCat] = useState<SortCat>(sortCats[0]);
    const { order, setOrder, sortBy, setSortBy } = useFilters();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div
                    className={cn(
                        "flex items-center gap-2 p-2 px-5 rounded-2xl bg-gray-50 w-fit h-14 cursor-pointer",
                        className
                    )}
                >
                    <ArrowUpDown size={16} />
                    Сортировка:
                    <span className="text-accent-foreground font-bold">
                        {currentSortCat.name.toLocaleLowerCase()}
                    </span>
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="border-none p-0 rounded-xl overflow-hidden w-fit min-w-40"
                sideOffset={10}
                align="end"
            >
                <div>
                    {sortCats.map((cat) => {
                        return (
                            <PopoverClose
                                key={cat.id}
                                className="flex items-center gap-2 text-sm cursor-pointer outline-none hover:bg-gray-50 py-2 px-4 w-full text-start"
                                onClick={() => {
                                    setOrder("desc");
                                    setSortBy(cat.value);
                                    setCurrentSortCat(cat);
                                }}
                            >
                                {cat.name}
                            </PopoverClose>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    );
}
