"use client";

import React, { useEffect, useState } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Filter, X } from "lucide-react";
import Filters from "./Filters";

interface Props {
    className?: string;
}

export default function FiltersSheet({ className }: Props) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 640);
            console.log(window.innerWidth >= 640);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        !isDesktop && (
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        className={cn(
                            "bg-gray-50 text-[#0C0A09] hover:bg-gray-100 h-10 mr-auto sm:hidden",
                            className
                        )}
                    >
                        <Filter />
                        Фильтры
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"} className="w-full xs:w-fit p-0">
                    <SheetClose className="absolute top-4 cursor-pointer z-50 text-sm flex justify-center right-6 bg-white items-center shadow-[0_0_8px_0_rgba(0,0,0,0.1)] h-10 w-10 rounded-full sm:shadow-none sm:w-fit sm:h-fit sm:right-4">
                        <X className="sm:h-10 sm:w-10 text-black/60 sm:text-white" />
                        <span className="sr-only">Close</span>
                    </SheetClose>
                    <SheetTitle />
                    <Filters className="w-full overflow-y-auto h-full p-5 filters-scroll" />
                </SheetContent>
            </Sheet>
        )
    );
}
