'use client'

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center flex-col sm:flex-row gap-1 h-10 px-2 text-primary font-semibold bg-accent text-base sm:px-6 sm:py-3 border-none hover:bg-accent/80 sm:rounded-xl focus-visible:ring-0">
          <User className="hidden sm:block" size={16} />
          Профиль
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Настройки</DropdownMenuItem>
        <DropdownMenuItem>Заказы</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500"
        onClick={async () => {
            await signOut()
        }}
        >Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
