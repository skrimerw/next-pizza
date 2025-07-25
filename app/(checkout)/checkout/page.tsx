import { auth } from "@/auth";
import { CheckoutForm, Container, Title } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import React from "react";

export default async function CheckoutPage() {
    const session = await auth();

    if (session?.user) {
        const cart = await prisma.cart.findFirst({
            where: {
                userId: session.user.id,
            },
            include: {
                cartItems: true,
            },
        });

        if (cart?.cartItems.length === 0) {
            redirect("/");
        }
    } else {
        redirect("/");
    }

    return (
        <Container className="pb-20 lg:pb-32">
            <Title
                text="Оформление заказа"
                size="xl"
                className="font-extrabold my-6 sm:my-12 text-[26px] sm:text-4xl"
            />
            <CheckoutForm />
        </Container>
    );
}
