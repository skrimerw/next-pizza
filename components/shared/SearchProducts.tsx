"use client";

import { LoaderCircle, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Product } from "@prisma/client";
import { axiosInstance } from "@/lib/axiosInstance";
import { cn, markSubstr } from "@/lib/utils";
import { useAppContext } from "@/contexts/AppContextProvider";
import SearchFocusedOverlay from "./SearchFocusedOverlay";

export default function SearchProducts() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { isSearchFocused, setIsSearchFocused } = useAppContext();

  function onDocumentClick(e: HTMLElement) {
    if (e.closest(".search-input-container") === null) {
      setIsSearchFocused(false);

      return;
    }

    setIsSearchFocused(true);
  }

  useEffect(() => {
    if (isSearchFocused && searchValue) {
      setLoading(true);

      async function fetchData() {
        try {
          const { data } = await axiosInstance.get("/products/search", {
            params: { query: searchValue },
          });

          setProducts(data);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }

    document.addEventListener("click", (e) =>
      onDocumentClick(e.target as never)
    );

    return () => {
      document.removeEventListener("click", (e) =>
        onDocumentClick(e.target as never)
      );
    };
  }, [searchValue]);

  return (
    <>
      <SearchFocusedOverlay />
      <div className={cn("search-input-container w-full relative z-50")}>
        <Search
          size={16}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
        />
        <Input
          className="h-[40px] bg-gray-50 border-none rounded-xl indent-7 placeholder:text-gray-400 focus-visible:ring-0"
          placeholder="Поиск пиццы..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
        />
        {((loading && isSearchFocused) ||
          (searchValue.length > 0 && isSearchFocused)) && (
          <>
            <div className="absolute left-0 right-0 top-12 rounded-xl min-h-16 bg-white z-20 overflow-hidden shadow-md">
              <div
                className={`absolute h-full w-full bg-white/60 flex transition-all items-center justify-center overflow-hidden ${
                  loading ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <LoaderCircle
                  size={30}
                  className="text-gray-400 animate-spin"
                />
              </div>
              {products.length === 0 && !loading ? (
                <span className="text-center block mt-5 text-gray-500">
                  Ничего не найдено
                </span>
              ) : (
                products.map((product) => {
                  return (
                    <div key={product.id}>
                      <a
                        href={`/products/${product.id}`}
                        className="flex items-center px-4 py-2 gap-4 transition-all hover:bg-gray-50"
                      >
                        <img src={product.imageUrl} className="h-10" />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: markSubstr(
                              product.name,
                              searchValue.trim()
                            ),
                          }}
                        ></span>
                      </a>
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
