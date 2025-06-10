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
        xs: "text-base font-bold",
        sm: "text-xl font-bold",
        md: "text-2xl font-bold",
        lg: "text-3xl font-black",
        xl: "text-4xl font-black",
        "2xl": "text-5xl font-black",
    };

    return React.createElement(
        mapTagBySize[size],
        { className: clsx(mapClassNameBySize[size], className) },
        text
    );
}
