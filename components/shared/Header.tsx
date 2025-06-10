import React from "react";
import { Cart, Container, SearchProducts } from "@/components/shared";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

export default function Header({ className }: Props) {
    return (
        <header className={cn("border-b border-gray-100", className)}>
            <Container>
                <nav className="py-2 sm:py-3 md:py-4 lg:py-8 flex items-center justify-between gap-3 lg:gap-10">
                    <Link
                        href="/"
                        className="flex items-center gap-4 flex-none mr-0 sm:mr-3 lg:mr-0"
                    >
                        <Image
                            src="/img/logo.svg"
                            alt="Logo"
                            width={35}
                            height={35}
                        />
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
                        <Button
                            variant="secondary"
                            className="flex items-center flex-col sm:flex-row gap-1 h-10 px-2 font-semibold bg-accent text-base sm:px-6 sm:py-3 border-none hover:bg-accent/80 sm:rounded-xl"
                        >
                            <User className="hidden sm:block" size={16} />
                            Войти
                        </Button>
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
