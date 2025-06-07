import { Container, Header, RefreshButton, Title } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    title: "404 | Страница не найдена",
};

export default function NotFound() {
    return (
        <div className="grid grid-rows-[auto_1fr] min-h-screen">
            <Header />
            <main className="flex items-center h-full">
                <Container className="flex items-center gap-10 max-w-[950px]">
                    <div className="h-full">
                        <Title
                            text="Страница не найдена"
                            size="xl"
                            className="font-extrabold mb-3"
                        />
                        <p className="mb-11 text-xl text-secondary-color">
                            Проверьте корректность введённого адреса или
                            повторите попытку позже
                        </p>
                        <div className="flex items-center gap-5">
                            <Link
                                href="/"
                                className="group flex items-center gap-2 h-12 py-3 px-5 font-bold text-secondary-foreground border-secondary-foreground border rounded-xl text-sm"
                            >
                                <ArrowLeft
                                    size={18}
                                    className="transition-all group-hover:-translate-x-1"
                                />
                                На главную
                            </Link>
                            <RefreshButton />
                        </div>
                    </div>
                    <img src="/img/404.svg" alt="Ошибка 404" />
                </Container>
            </main>
        </div>
    );
}
