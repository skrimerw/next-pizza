"use client";

import React, { act, useEffect, useRef, useState } from "react";
import Categories from "./Categories";
import SortPopup from "./SortPopup";
import { cn } from "@/lib/utils";
import Container from "./Container";
import { useScrollCategoryContext } from "../contexts/ScrollCategoryContextProvider";

interface Props {
    className?: string;
}

export default function ToolBar({ className }: Props) {
    const [hasShadow, setHasShadow] = useState(false);
    const toolbar = useRef<HTMLDivElement>(null);
    const { setActiveCat } = useScrollCategoryContext();

    function onScroll() {
        if (window.scrollY + 1 >= (toolbar.current?.offsetTop ?? 0)) {
            setHasShadow(true);
        } else {
            setHasShadow(false);
        }

        const productGroups =
            document.querySelectorAll<HTMLDivElement>(".product-group");

        productGroups.forEach((productGroup) => {
            if (
                (window.innerHeight -
                    productGroup.getBoundingClientRect().top) /
                    window.innerHeight >=
                0.33
            ) {
                setActiveCat(
                    Number(
                        productGroup.getAttribute(
                            "data-product-group-id"
                        ) as never
                    )
                );
            }
        });
    }

    useEffect(() => {
        if (location.hash) {
            window.scrollTo({
                top:
                    (document.querySelector<HTMLDivElement>(location.hash)
                        ?.offsetTop as number) - 140,
            });
        }

        window.addEventListener("wheel", onScroll);
        window.addEventListener("touch", onScroll);

        return () => {
            window.removeEventListener("wheel", onScroll);
            window.removeEventListener("touch", onScroll);
        };
    }, [onScroll]);

    return (
        <div
            ref={toolbar}
            className={cn(
                "sticky top-0 bg-white z-10 w-full transon-itishadow py-3",
                hasShadow ? "shadow-mid" : "",
                className
            )}
        >
            <Container className="flex justify-between">
                <Categories />
                <SortPopup />
            </Container>
        </div>
    );
}
