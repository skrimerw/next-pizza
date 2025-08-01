"use client";

import { CartRelations } from "@/components/shared/Cart";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext<{
    activeCat: number;
    setActiveCat: (val: number) => void;
    hasShadow: boolean;
    setHasShadow: (val: boolean) => void;
    isSearchFocused: boolean;
    setIsSearchFocused: (val: boolean) => void;
    cart: CartRelations | null;
    setCart: (val: CartRelations | null) => void;
} | null>(null);

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within a Provider");
    }
    return context;
}

export default function AppProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [activeCat, setActiveCat] = useState(1);
    const [hasShadow, setHasShadow] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [cart, setCart] = useState<CartRelations | null>(null);

    useEffect(() => {
        let defaultValue = 1;
        if (typeof window !== undefined) {
            defaultValue = location.hash.match(/product-group-[0-9]{1,}/g)
                ? Number(location.hash.split("-").at(-1))
                : 1;
            if (location.hash) {
                window.scrollTo({
                    top:
                        (document.querySelector<HTMLDivElement>(location.hash)
                            ?.offsetTop as number) - 140,
                });
            }
            setActiveCat(defaultValue);
        }
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axiosInstance.get("/carts");

                setCart(data);
            } catch (e) {
                console.error(e);
            }
        }

        getData();
    }, []);

    return (
        <AppContext.Provider
            value={{
                activeCat,
                setActiveCat,
                hasShadow,
                setHasShadow,
                isSearchFocused,
                setIsSearchFocused,
                cart,
                setCart,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
