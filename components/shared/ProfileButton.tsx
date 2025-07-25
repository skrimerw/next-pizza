"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Package, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
    className?: string;
}

export default function ProfileButton({ className }: Props) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    className={cn(
                        "flex items-center flex-col sm:flex-row gap-1 h-10 px-2 text-primary font-semibold bg-accent text-base sm:px-6 sm:py-3 border-none hover:bg-accent/80 sm:rounded-xl focus-visible:ring-0",
                        className
                    )}
                >
                    <User className="hidden sm:block" size={16} />
                    Профиль
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
            >
                <DropdownMenuItem className="text-base">
                    <Settings className="!w-5 !h-5" />
                    Настройки
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-base">
                    <Link href="/orders">
                        <Package className="!w-5 !h-5" />
                        Заказы
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-500 text-base"
                    onClick={async () => {
                        await signOut();
                    }}
                >
                    <LogOut className="!w-5 !h-5" />
                    Выйти
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
