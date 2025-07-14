"use client";

import React, { useEffect, useRef, useState } from "react";
import "react-dadata/dist/react-dadata.css";
import { Input } from "../ui/input";
import { DaDataAddress, DaDataSuggestion } from "react-dadata";
import { cn } from "@/lib/utils";

export default function AddressInput() {
    const [suggestion, setSuggestion] = useState("");
    const [addresses, setAddresses] = useState<
        DaDataSuggestion<DaDataAddress>[]
    >([]);
    const addressEl = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch(
                    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization:
                                "Token " +
                                "603d4715324dc1b593417c7c750c9fd3268e29ac",
                            "X-Secret":
                                "dc4c63b88a368997fdf876245f047188e7ab5ea3",
                        },
                        body: JSON.stringify({
                            count: 10,
                            query: suggestion,
                        }),
                    }
                );

                const data = await res.json();

                setAddresses(data.suggestions);
            } catch (e) {
                console.error(e);
            }
        }

        getData();
    }, [suggestion]);

    useEffect(() => {
        document.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
console.log(target.closest(".addresses"))
            if (!target.closest(".addresses")) {
                setIsFocused(false);
            }
        });
    });

    return (
        <div className="relative">
            {/*  <AddressSuggestions token="603d4715324dc1b593417c7c750c9fd3268e29ac" /> */}
            <p className="font-medium mb-1">Введите адрес</p>
            <Input
                className="!mt-0 h-12 rounded-xl border-gray-200 !text-base focus-visible:border-primary focus-visible:ring-0"
                placeholder="Введите адрес доставки"
                value={suggestion}
                onChange={(e) => {
                    setSuggestion(e.target.value);
                    setIsFocused(true);
                }}
            />

            <ul
                ref={addressEl}
                className={cn(
                    "addresses absolute w-full top-18 left-0 right-0 p-1 rounded-xl bg-white border border-black/5 shadow-md overflow-y-auto h-fit max-h-[250px]",
                    (addresses.length === 0 || isFocused) && "invisible opacity-0"
                )}
            >
                {addresses.map(({ value }, i) => {
                    return (
                        <li
                            key={i}
                            className="rounded-xl p-2 hover:bg-secondary hover:text-primary cursor-pointer"
                            onClick={() => setSuggestion(value)}
                        >
                            {value}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
