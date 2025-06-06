"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Title from "./Title";
import { Checkbox } from "../ui/checkbox";
import { cn, markSubstr } from "@/lib/utils";
import { Input } from "../ui/input";
import { Ingredient } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";

interface Props {
    title: string;
    items: Ingredient[];
    checkedIds: string[];
    setCheckedIds: Dispatch<SetStateAction<string[]>>;
    limit?: number;
    className?: string;
}

export default function CheckboxFilterGroup({
    title,
    items,
    limit = 6,
    checkedIds,
    setCheckedIds,
    className,
}: Props) {
    const [showAll, setShowAll] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [searchItems, setSearchItems] = useState<Ingredient[]>([]);

    function onSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchInputValue(e.target.value);

        let searchItemsArr: Ingredient[] = [];

        searchItemsArr = items.filter(({ name }) =>
            name.toLowerCase().includes(e.target.value.toLowerCase().trim())
        );

        setSearchItems(searchItemsArr);
    }

    function onCheckboxChanged(id: string) {
        if (checkedIds.includes(id)) {
            setCheckedIds((prev) => prev.filter((item) => item !== id));
        } else {
            setCheckedIds((prev) => [...prev, id]);
        }
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col gap-4 pb-6 pt-8">
                <Title text={title} size="xs" />
                {Array.from({ length: limit }, (_, i) => {
                    return (
                        <div key={i} className="flex gap-3">
                            <Skeleton className="h-6 w-6 bg-gray-50 flex-none" />
                            <Skeleton className="h-6 w-full bg-gray-50" />
                        </div>
                    );
                })}
                <Skeleton className="h-6 w-28 bg-gray-50 mt-1" />
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-4 pb-6 pt-8", className)}>
            <Title text={title} size="xs" />
            {showAll && (
                <Input
                    placeholder="Поиск..."
                    className="bg-gray-50 border-none focus-visible:ring-0 placeholder:text-gray-400"
                    value={searchInputValue}
                    onChange={(e) => onSearchInput(e)}
                />
            )}
            <div className="flex flex-col gap-4 max-h-96 scrollbar">
                {(searchInputValue.trim() ? searchItems : items).map(
                    (item, i) => {
                        if (showAll || i + 1 <= limit) {
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <Checkbox
                                        id={`checkbox-group-item-${i}`}
                                        onClick={() =>
                                            onCheckboxChanged(String(item.id))
                                        }
                                        checked={checkedIds.includes(
                                            String(item.id)
                                        )}
                                    />
                                    <label
                                        dangerouslySetInnerHTML={{
                                            __html: markSubstr(
                                                item.name,
                                                searchInputValue.trim()
                                            ),
                                        }}
                                        htmlFor={`checkbox-group-item-${i}`}
                                    ></label>
                                </div>
                            );
                        }
                    }
                )}
            </div>
            {(searchInputValue.trim() ? searchItems : items).length > limit && (
                <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="text-accent-foreground w-fit text-start transition-all duration-300 hover:opacity-70"
                >
                    {showAll ? "Скрыть" : "+ Показать все"}
                </button>
            )}
        </div>
    );
}
