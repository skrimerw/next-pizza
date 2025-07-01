import React from "react";
import {
  Cart,
  Container,
  LoginButton,
  ProfileButton,
  SearchProducts,
} from "@/components/shared";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { auth } from "@/auth";

interface Props {
  className?: string;
}

export default async function Header({ className }: Props) {
  const session = await auth();

  return (
    <header className={cn("border-b border-gray-100", className)}>
      <Container>
        <nav className="py-2 sm:py-3 md:py-4 lg:py-8 flex items-center justify-between gap-3 lg:gap-10">
          <Link
            href="/"
            className="flex items-center gap-4 flex-none mr-0 sm:mr-3 lg:mr-0"
          >
            <Image src="/img/logo.svg" alt="Logo" width={35} height={35} />
            <div className="hidden sm:block">
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
            {!session?.user ? <LoginButton /> : <ProfileButton />}
            <Cart
              className={cn(
                "w-[100px] md:w-[130px]  opacity-100 visible transition-all hidden sm:flex"
              )}
            />
          </div>
        </nav>
      </Container>
    </header>
  );
}
