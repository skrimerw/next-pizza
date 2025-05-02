"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const ScrollCategoryContext = createContext<{
    activeCat: number;
    setActiveCat: (val: any) => void;
} | null>(null);

export function useScrollCategoryContext() {
    const context = useContext(ScrollCategoryContext);

    if (!context) {
        throw new Error(
            "useScrollCategoryContext must be used within a Provider"
        );
    }
    return context;
}

export default function ScrollCategoryContextProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [activeCat, setActiveCat] = useState(1);

    useEffect(() => {
        let defaultValue = 1;
        if (typeof window !== undefined) {
            defaultValue = location.hash.match(/product-group-[0-9]{1}/g)
                ? Number(location.hash.split("-").at(-1))
                : 1;
            setActiveCat(defaultValue);
        }
    }, []);

    return (
        <ScrollCategoryContext.Provider
            value={{
                activeCat,
                setActiveCat,
            }}
        >
            {children}
        </ScrollCategoryContext.Provider>
    );
}
