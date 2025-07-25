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

export default async function CheckoutHeader({ className }: Props) {
  const session = await auth();

  return (
    <header className={cn(className)}>
      <Container className="!px-0 xl:!px-16">
        <nav className="px-4 sm:px-8 lg:px-16 xl:px-0 border-b border-[#DEDEDE] py-2 sm:py-3 md:py-4 lg:py-8 flex items-center justify-between gap-3 lg:gap-10">
          <Link
            href="/"
            className="flex items-center gap-4 flex-none mr-0 sm:mr-3 lg:mr-0"
          >
            <Image src="/img/logo.svg" alt="Logo" width={35} height={35} />
            <div className="hidden xs:block">
              <h1 className="uppercase text-2xl font-black leading-tight">
                Next Pizza
              </h1>
              <h2 className="text-base text-gray-500 leading-tight">
                вкусней уже точно некуда
              </h2>
            </div>
          </Link>
          <div className="flex gap-3">
            {!session?.user ? <LoginButton /> : <ProfileButton className="bg-primary text-primary-foreground hover:bg-primary/80" />}
          </div>
        </nav>
      </Container>
    </header>
  );
}
