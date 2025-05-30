"use client";

import { useAppContext } from "@/contexts/AppContextProvider";
import { cn } from "@/lib/utils";
import React from "react";

export default function SearchFocusedOverlay() {
  const { isSearchFocused } = useAppContext();

  return <div className={cn("fixed inset-0 bg-black/30 z-40 transition-all opacity-0 invisible", isSearchFocused ? "opacity-100 visible shadow-md" : "")}></div>;
}
