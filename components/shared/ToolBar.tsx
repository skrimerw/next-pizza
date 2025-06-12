"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Container from "./Container";
import { useAppContext } from "../../contexts/AppContextProvider";
import Cart from "./Cart";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function ToolBar({ className, children }: Props) {
    const toolbar = useRef<HTMLDivElement>(null);
    const { setActiveCat, hasShadow, setHasShadow } = useAppContext();

    function onScroll() {
        if (window.scrollY + 1 >= (toolbar.current?.offsetTop ?? 0)) {
            setHasShadow(true);
        } else {
            setHasShadow(false);
        }
    }

    function getVisibilityPercentage(element: HTMLElement) {
        const clientRect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const visibleHeight = Math.max(
            0,
            Math.min(clientRect.bottom, viewportHeight) -
                Math.max(clientRect.top, 0)
        );

        return visibleHeight / viewportHeight;
    }

    function handleNavbarSwitch() {
        const productGroups =
            document.querySelectorAll<HTMLDivElement>(".product-group");
        const catsContainer = document.querySelector<HTMLDivElement>(
            ".categories-container"
        );
        const catItems = catsContainer?.children;

        let visibleProductGroup = productGroups.item(0);

        productGroups.forEach((productGroup) => {
            const curVisibilityPercent =
                getVisibilityPercentage(visibleProductGroup);
            const newVisibilityPercent = getVisibilityPercentage(productGroup);

            if (curVisibilityPercent < newVisibilityPercent) {
                visibleProductGroup = productGroup;
            }
        });

        const visibleCatId = Number(
            visibleProductGroup.getAttribute("data-product-group-id") as never
        );

        if (!isNaN(visibleCatId) && catItems?.length && catsContainer) {
            const targetItem = catItems.item(visibleCatId - 1);

            if (targetItem) {
                const container = catsContainer;
                const target = targetItem;
                const containerRect = container.getBoundingClientRect();
                const targetRect = target.getBoundingClientRect();

                const isPartiallyHidden =
                    targetRect.left < containerRect.left ||
                    targetRect.right > containerRect.right;

                if (isPartiallyHidden) {
                    const containerScrollLeft = container.scrollLeft;
                    const containerWidth = container.clientWidth;
                    const targetOffsetLeft = target.offsetLeft;
                    const targetWidth = target.offsetWidth;

                    const scrollTo =
                        targetOffsetLeft - containerWidth / 2 + targetWidth / 2;

                    container.scrollTo({
                        left: scrollTo,
                        behavior: "smooth",
                    });
                }
            }
        }

        setActiveCat(visibleCatId);
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        window.addEventListener("scroll", handleNavbarSwitch);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("scroll", handleNavbarSwitch);
        };
    }, []);

    return (
        <div
            ref={toolbar}
            className={cn(
                "sticky top-0 bg-white z-10 w-full transon-itishadow py-3",
                hasShadow ? "shadow-mid" : "",
                className
            )}
        >
            <Container className="flex items-center flex-wrap gap-3 sm:gap-0">
                {children}
                <Cart
                    className={cn(
                        "w-0 opacity-0 invisible transition-all px-0 hidden sm:flex",
                        hasShadow || toolbar.current?.offsetTop === 0
                            ? "w-[100px] md:w-[130px] opacity-100 visible sm:ml-3 md:ml-4"
                            : ""
                    )}
                />
            </Container>
        </div>
    );
}
