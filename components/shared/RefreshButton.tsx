"use client";

import React from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RefreshButton() {
    const router = useRouter();

    return (
        <Button
            variant="outline"
            className="group h-12 py-3 px-5 font-bold border-[#C7C7C7] text-[#878787] hover:bg-transparent"
            onClick={router.refresh}
        >
            <RefreshCcw
                size={18}
                className="transition-all group-hover:-rotate-180"
            />
            Обновить
        </Button>
    );
}
