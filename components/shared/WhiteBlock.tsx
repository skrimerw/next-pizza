import React from "react";
import Title from "./Title";
import { cn } from "@/lib/utils";

interface Props {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export default function WhiteBlock({ title, children, className }: Props) {
    return (
        <div className={cn("rounded-3xl bg-white w-full h-fit", className)}>
            <header className="flex justify-between px-5 xs:px-7 sm:px-9 py-4 xs:pt-5 sm:pt-7 xs:pb-4 sm:pb-6 border-b border-[#F6F6F6]">
                <Title text={title} size="md" />
            </header>
            <div className="white-block-content p-5 xs:p-7 sm:p-9">
                {children}
            </div>
        </div>
    );
}
