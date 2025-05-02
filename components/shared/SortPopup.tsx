import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";

interface Props {
    className?: string;
}

export default function SortPopup({ className }: Props) {
    return (
        <div
            className={cn(
                "flex items-center gap-2 p-2 px-5 rounded-2xl bg-gray-50 w-fit h-14",
                className
            )}
        >
            <ArrowUpDown size={16} />
            Сортировка по:
            <span className="text-accent-foreground font-bold">рейтингу</span>
        </div>
    );
}
