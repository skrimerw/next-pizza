//"use client";

import React from "react";
import { Cart, Container, SearchProducts } from "@/components/shared";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
//import { useAppContext } from "@/contexts/AppContextProvider";

interface Props {
  className?: string;
}

export default function Header({ className }: Props) {
  /* const { hasShadow } = useAppContext(); */

  return (
    <header className={cn("border-b border-gray-100", className)}>
      <Container>
        <nav className="py-8 flex items-center justify-between gap-10">
          <Link href="/" className="flex items-center gap-4 flex-none">
            <Image src="/img/logo.svg" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="uppercase text-2xl font-black leading-tight">
                Next Pizza
              </h1>
              <h2 className="text-base text-gray-500 leading-tight">
                вкусней уже некуда
              </h2>
            </div>
          </Link>
          <SearchProducts />
          <div className="flex gap-3">
            <Button
              variant={"outline"}
              className="flex items-center gap-1 h-[40px] px-6 py-3"
            >
              <User size={16} />
              Войти
            </Button>
            <Cart
              className={cn(
                "min-w-[130px] opacity-100 visible transition-all",
                /* hasShadow ? "w-0 opacity-0 invisible" : "" */
              )}
            />
          </div>
        </nav>
      </Container>
    </header>
  );
}
