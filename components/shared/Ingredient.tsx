import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import React from "react";

interface Props extends React.HTMLProps<HTMLDivElement>{
    imageUrl: string;
    name: string;
    price: number;
    checked?: boolean;
    className?: string;
}

export default function Ingredient({
    imageUrl,
    name,
    price,
    checked = false,
    className,
    ...props
}: Props) {
    return (
        <div
            className={cn(
                "relative flex flex-col items-center border border-transparent bg-white rounded-xl p-2 sm:p-[10px] pt-3 shadow-lg cursor-pointer transition-all hover:shadow-md",
                checked && "border border-secondary-foreground shadow-none hover:shadow-none",
                className
            )}

            {...props}
        >
            <CheckCircle2 className={cn("absolute top-2 right-2 text-accent-foreground opacity-0 invisible transition-all", checked && "opacity-100 visible")} />
            <img src={imageUrl} alt={name} className="mb-1" />
            <h6 className="text-center text-xs">{name}</h6>
            <span className="text-sm mt-auto font-semibold">{price} ₽</span>
        </div>
    );
}
