"use client";

import { LoaderCircle, Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Product } from "@prisma/client";
import { axiosInstance } from "@/lib/axiosInstance";
import { cn, markSubstr } from "@/lib/utils";
import { useAppContext } from "@/contexts/AppContextProvider";
import SearchFocusedOverlay from "./SearchFocusedOverlay";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    className?: string;
}

export default function SearchProducts({ className }: Props) {
    const [searchValue, setSearchValue] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const { isSearchFocused, setIsSearchFocused } = useAppContext();
    const searchInput = useRef<HTMLInputElement>(null);
    const [currentProduct, setCurrentProduct] = useState<number | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (isSearchFocused && searchValue && currentProduct === null) {
            setLoading(true);

            async function fetchData() {
                try {
                    const { data } = await axiosInstance.get(
                        "/products/search",
                        {
                            params: { query: searchValue },
                        }
                    );

                    setProducts(data);
                } catch (e) {
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        }
    }, [searchValue]);

    function resetSearch() {
        setSearchValue("");
        setProducts([]);
        setCurrentProduct(null);

        searchInput.current?.blur();
    }

    function handleArrowPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (products.length === 0) return

        let newCurrentProduct = currentProduct;
        switch (e.key) {
            case "ArrowDown":
                if (
                    currentProduct === null ||
                    currentProduct === products.length - 1
                ) {
                    newCurrentProduct = 0;
                } else {
                    newCurrentProduct = currentProduct + 1;
                }

                break;
            case "ArrowUp":
                e.preventDefault();

                if (!currentProduct) {
                    newCurrentProduct = products.length - 1;
                } else {
                    newCurrentProduct = currentProduct - 1;
                }

                break;
            case "Enter":
                if (currentProduct !== null) {
                    router.push(`/products/${products[currentProduct].id}`);
                }
                resetSearch();
                setIsSearchFocused(false);

                return;
        }

        console.log(newCurrentProduct)

        if (newCurrentProduct !== null && searchInput.current) {
            setCurrentProduct(newCurrentProduct);
            setSearchValue(products[newCurrentProduct].name);

            searchInput.current.focus();
        }
    }

    return (
        <>
            <SearchFocusedOverlay
                onClick={() => {
                    setIsSearchFocused(false);
                }}
            />
            <div
                className={cn(
                    "search-input-container w-full relative z-50",
                    className
                )}
            >
                <Search
                    size={16}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />
                {searchValue.length > 0 && (
                    <X
                        onClick={resetSearch}
                        size={16}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                )}
                <Input
                    ref={searchInput}
                    className={cn(
                        "h-10 bg-gray-50 border-none rounded-xl px-9 placeholder:text-gray-400 focus-visible:ring-0",
                        isSearchFocused && "bg-white"
                    )}
                    placeholder="Поиск пиццы..."
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setCurrentProduct(null);
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={(e) => handleArrowPress(e)}
                />
                {((loading && isSearchFocused) ||
                    (searchValue.length > 0 && isSearchFocused)) && (
                    <>
                        <div className="absolute left-0 right-0 top-12 rounded-xl min-h-14 bg-white z-20 overflow-hidden shadow-md">
                            <div
                                className={`absolute h-full w-full bg-white/60 flex transition-all items-center justify-center overflow-hidden ${
                                    loading
                                        ? "opacity-100 visible"
                                        : "opacity-0 invisible"
                                }`}
                            >
                                <LoaderCircle
                                    size={30}
                                    className="text-gray-400 animate-spin"
                                />
                            </div>
                            {products.length === 0 && !loading ? (
                                <span className="text-center block mt-4 text-gray-500">
                                    Ничего не найдено
                                </span>
                            ) : (
                                products.map((product, index) => {
                                    return (
                                        <div key={product.id}>
                                            <Link
                                                onClick={() => {
                                                    resetSearch();
                                                    setIsSearchFocused(false);
                                                }}
                                                href={`/products/${product.id}`}
                                                className={cn(
                                                    "flex items-center px-4 py-2 gap-4 transition-all hover:bg-gray-100",
                                                    currentProduct === index &&
                                                        "bg-gray-100 hover:bg-gray-200"
                                                )}
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
                                            </Link>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
