import { cn } from "@/lib/utils";
import React from "react";

interface Props {
    className?: string;
    children: React.ReactNode;
}

export default function Container({ className, children }: Props) {
    return (
        <div className={cn(`max-w-screen-xl my-0 mx-auto px-4 sm:px-6 md:px-8 lg:px-16`, className)}>
            {children}
        </div>
    );
}
