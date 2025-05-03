"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Product } from "@prisma/client";
import { axiosInstance } from "@/lib/axiosInstance";
import { markSubstr } from "@/lib/utils";

export default function SearchProducts() {
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        if (isFocused && searchValue) {
            const fetchData = async () => {
                const { data } = await axiosInstance.get(
                    `/products/search?query=${searchValue}`
                );

                setProducts(data);
            };
            try {
                fetchData();
            } catch (e) {
                console.error(e);
            }
        }
    }, [searchValue]);

    return (
        <div className="w-full relative">
            <Search
                size={16}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            />
            <Input
                className="h-[40px] bg-gray-50 border-none rounded-xl indent-7 placeholder:text-gray-400 focus-visible:ring-0"
                placeholder="Поиск пиццы..."
                value={searchValue}
                onChange={(e) => onChange(e)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {products.length > 0 && searchValue.length > 0 && (
                <ul className="absolute left-0 right-0 top-12 rounded-xl bg-white z-20 overflow-hidden shadow-md">
                    {products.map((product) => {
                        return (
                            <li key={product.id}>
                                <a
                                    href={`/products/${product.id}`}
                                    className="flex items-center px-4 py-2 gap-4 transition-all hover:bg-gray-50"
                                >
                                    <img
                                        src={product.imageUrl}
                                        className="h-10"
                                    />
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: markSubstr(
                                                product.name,
                                                searchValue.trim()
                                            ),
                                        }}
                                    ></span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
