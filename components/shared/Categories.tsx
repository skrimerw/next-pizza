import { useScrollCategoryContext } from "@/components/contexts/ScrollCategoryContextProvider";
import { cn } from "@/lib/utils";
import React from "react";

const categories = [
    {
        id: 1,
        name: "Пиццы",
    },
    {
        id: 2,
        name: "Закуски",
    },
    {
        id: 3,
        name: "Десерты",
    },
];

interface Props {
    className?: string;
}

export default function Categories({ className }: Props) {
    const { activeCat, setActiveCat } = useScrollCategoryContext();

    function onCategoryClick(
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        id: number
    ) {
        setActiveCat(id);
        window.location.hash = `product-group-${id}`;
        scrollTo({
            top:
                (document.querySelector<HTMLDivElement>(`#product-group-${id}`)
                    ?.offsetTop as number) - 140,
        });
    }

    return (
        <ul
            className={cn(
                "flex gap-1 p-2 rounded-2xl bg-gray-50 w-fit h-14",
                className
            )}
        >
            {categories.map((cat, i) => {
                return (
                    <li
                        className={cn(
                            `py-2 px-6 rounded-2xl cursor-pointer `,
                            i === activeCat - 1
                                ? "bg-white text-[#FE5F00] shadow-md"
                                : ""
                        )}
                        key={cat.id}
                        onClick={(e) => onCategoryClick(e, cat.id)}
                    >
                        {cat.name}
                    </li>
                );
            })}
        </ul>
    );
}
