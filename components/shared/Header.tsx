import React from "react";
import { Container } from "@/components/shared";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchProducts from "./SearchProducts";

interface Props {
    className?: string;
}

export default function Header({ className }: Props) {
    return (
        <header className={cn("border-b border-gray-100", className)}>
            <Container>
                <nav className="py-8 flex items-center justify-between gap-10">
                    <Link
                        href="/"
                        className="flex items-center gap-4 flex-none"
                    >
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={35}
                            height={35}
                        />
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
                        <Button className="group h-[40px] px-6 py-3">
                            <span>520 ₽</span>
                            <div className="h-full w-[1px] bg-white opacity-25"></div>
                            <div className="relative">
                                <span className="flex items-center transition-all gap-1 group-hover:opacity-0">
                                    <ShoppingCart />
                                    <span>3</span>
                                </span>
                                <ArrowRight
                                    className="absolute left-[50%] top-[50%] -translate-y-[50%] opacity-0 transition-all -translate-x-[100%] group-hover:opacity-100 group-hover:-translate-x-[40%]"
                                />
                            </div>
                        </Button>
                    </div>
                </nav>
            </Container>
        </header>
    );
}
