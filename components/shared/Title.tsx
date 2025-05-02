import clsx from "clsx";
import React from "react";
type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
    className?: string;
    text: string;
    size?: TitleSize;
}

export default function Title({ className, text, size = "sm" }: Props) {
    const mapTagBySize = {
        xs: "h5",
        sm: "h4",
        md: "h3",
        lg: "h2",
        xl: "h1",
        "2xl": "h1",
    };

    const mapClassNameBySize = {
        xs: "text-[16px] font-bold",
        sm: "text-[22px] font-bold",
        md: "text-[26px] font-bold",
        lg: "text-[32px] font-black",
        xl: "text-[40px] font-black",
        "2xl": "text-[48px] font-black",
    };

    return React.createElement(
        mapTagBySize[size],
        { className: clsx(mapClassNameBySize[size], className) },
        text
    );
}
