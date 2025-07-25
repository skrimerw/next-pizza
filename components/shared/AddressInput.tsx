"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { DaDataAddress, DaDataSuggestion } from "react-dadata";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/shared/hooks";
import { UseFormReturn } from "react-hook-form";

interface Props {
    form: UseFormReturn;
    name: string;
    onChange?: (value?: string) => void
}

export default function AddressInput({ form, name, onChange }: Props) {
    const [suggestion, setSuggestion] = useState("");
    const [addresses, setAddresses] = useState<
        DaDataSuggestion<DaDataAddress>[]
    >([]);
    const addressEl = useRef<HTMLUListElement>(null);
    const containerEl = useRef<HTMLDivElement>(null);
    const [currentAddressId, setCurrentAddressId] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);

    useClickOutside(containerEl, () => {
        setIsFocused(false);
    });

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

                onChange?.(suggestion)
            } catch (e) {
                console.error(e);
            }
        }

        getData();
    }, [suggestion]);

    function scrollToAddress(addressId: number) {
        if (addressEl.current) {
            const curLi = addressEl.current.querySelectorAll("li")?.[addressId];

            if (!curLi) return;

            const curLiHeight = curLi.getBoundingClientRect().height,
                addressElHeight =
                    addressEl.current.getBoundingClientRect().height;

            if (
                curLi.offsetTop - addressEl.current.scrollTop + curLiHeight >
                addressElHeight
            ) {
                addressEl.current.scrollTop =
                    curLi.offsetTop - (addressElHeight - curLiHeight) + 6;
            } else if (curLi.offsetTop - addressEl.current.scrollTop <= 0) {
                addressEl.current.scrollTop = curLi.offsetTop - 4;
            }
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        let newAddressId = -1;

        switch (e.key) {
            case "ArrowDown":
                newAddressId =
                    currentAddressId === addresses.length - 1
                        ? 0
                        : currentAddressId + 1;

                setCurrentAddressId(newAddressId);

                scrollToAddress(newAddressId);

                break;
            case "ArrowUp":
                e.preventDefault();

                newAddressId =
                    currentAddressId === 0
                        ? addresses.length - 1
                        : currentAddressId - 1;
                setCurrentAddressId(newAddressId);

                scrollToAddress(newAddressId);

                break;
            case "Enter":
                e.preventDefault();

                if (currentAddressId === -1) break;

                setSuggestion(addresses[currentAddressId].value);

                break;
            case "Tab":
                setIsFocused(false);

                break;
        }
    }

    return (
        <div className="relative">
            <p className="font-medium mb-1">Введите адрес</p>
            <div ref={containerEl}>
                <Input
                    className={cn(
                        "!mt-0 h-12 rounded-xl border-gray-200 !text-[16px] focus-visible:border-primary focus-visible:ring-0",
                        Object.keys(form.formState.errors).includes(name) &&
                            "border-red-500 focus-visible:border-red-500"
                    )}
                    placeholder="Введите адрес доставки"
                    value={suggestion}
                    onChange={(e) => {
                        setSuggestion(e.target.value);
                        setCurrentAddressId(-1);

                        if (addressEl.current) {
                            addressEl.current.scrollTop = 0;
                        }
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onKeyDown={(e) => handleKeyDown(e)}
                />

                <ul
                    ref={addressEl}
                    className={cn(
                        "addresses absolute z-10 w-full top-18 left-0 right-0 p-1 rounded-xl bg-white border border-black/5 shadow-md overflow-y-auto h-fit max-h-[250px] invisible opacity-0",
                        addresses.length > 0 &&
                            isFocused &&
                            "visible opacity-100"
                    )}
                >
                    {addresses.map(({ value }, i) => {
                        return (
                            <li
                                key={i}
                                className={cn(
                                    "rounded-xl p-2 hover:bg-secondary hover:text-primary cursor-pointer",
                                    i === currentAddressId &&
                                        "bg-secondary text-primary"
                                )}
                                onClick={() => setSuggestion(value)}
                            >
                                {value}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
