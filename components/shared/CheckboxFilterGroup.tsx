"use client";

import React, { useState } from "react";
import Title from "./Title";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface Props {
    title: string;
    items: Array<string>;
    limit?: number;
    className?: string;
}

export default function CheckboxFilterGroup({
    title,
    items,
    limit = 6,
    className,
}: Props) {
    const [showAll, setShowAll] = useState<boolean>(false);
    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const [searchItems, setSearchItems] = useState<string[]>([]);

    function markSubstr(
        str: string,
        substr: string,
        specialSymbol: string = "\n"
    ) {
        const regex = new RegExp(substr, "i");
        let htmlStr = "";

        let actualSubstr = str.slice(
            str.toLowerCase().indexOf(substr.toLowerCase()),
            str.toLowerCase().indexOf(substr.toLowerCase()) + substr.length
        );
        str = str.replace(regex, specialSymbol);

        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === specialSymbol) {
                htmlStr += `<b>${actualSubstr}</b>`;

                continue;
            }

            htmlStr += str.charAt(i);
        }

        return htmlStr;
    }

    function onSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchInputValue(e.target.value);

        let searchItemsArr: string[] = [];

        searchItemsArr = items.filter((item) =>
            item.toLowerCase().includes(e.target.value.toLowerCase().trim())
        );

        setSearchItems(searchItemsArr);
    }

    return (
        <div className={cn("flex flex-col gap-4 pb-6 pt-8", className)}>
            <Title text={title} size="xs" />
            <Input
                placeholder="Поиск..."
                className="bg-gray-50 border-none"
                value={searchInputValue}
                onChange={(e) => onSearchInput(e)}
            />
            <div className="flex flex-col gap-4 max-h-96 scrollbar">
                {(searchInputValue.trim() ? searchItems : items).map(
                    (item, i) => {
                        if (showAll || i + 1 <= limit) {
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <Checkbox id={`checkbox-group-item-${i}`} />
                                    <label
                                        dangerouslySetInnerHTML={{
                                            __html: markSubstr(
                                                item,
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
