"use client";

import React, { useState } from "react";
import CheckoutCart from "./CheckoutCart";
import CheckoutPersonalInfo from "./CheckoutPersonalInfo";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutTotal from "./CheckoutTotal";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axiosInstance";
import { totalCartPrice } from "@/lib/utils";
import { useAppContext } from "@/contexts/AppContextProvider";
import { CartRelations } from "./Cart";
import { failToast, successToast } from "./toast";
import { useRouter } from "next/navigation";

const OrderSchema = z.object({
    firstName: z.string().nonempty("Введите ваше имя"),
    lastName: z.string().nonempty("Введите вашу фамилию"),
    email: z.string().email("Некорректный email").nonempty("Введите ваш email"),
    phone: z
        .string()
        .nonempty("Введите ваш телефон")
        .regex(
            /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/gm,
            "Введите телефон полностью"
        ),
    address: z.string().nonempty("Введите адрес доставки"),
    comment: z.string().optional(),
});

export default function CheckoutForm() {
    const { data: session } = useSession();
    const { cart, setCart } = useAppContext();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(OrderSchema),
        defaultValues: {
            email: session?.user.email || "",
            firstName: session?.user.fullName.split(" ")[0] || "",
            lastName: session?.user.fullName.split(" ")[1] || "",
            phone: "",
            address: "",
            comment: "",
        },
    });

    async function onSubmit({
        address,
        email,
        firstName,
        lastName,
        phone,
        comment,
    }: z.infer<typeof OrderSchema>) {
        try {
            setLoading(true);

            const { data } = await axiosInstance.post("/orders", {
                userId: session?.user.id,
                totalAmount: totalCartPrice(cart as CartRelations),
                items: cart?.cartItems.map((item) => {
                    return {
                        productItem: item.productItem,
                        quantity: item.quantity,
                        ingredients: item.ingredients,
                    };
                }),
                fullName: firstName + " " + lastName,
                email,
                address,
                phone,
                comment,
            });

            successToast("Заказ успешно создан!");
            setCart(data.cart);

            router.push("/");
        } catch (e) {
            failToast("Ошбика сервера. Попробуйте позже");

            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-11">
                    <div className="flex flex-col gap-8 lg:gap-11 w-full">
                        <CheckoutCart />
                        <CheckoutPersonalInfo />
                        <CheckoutAddress />
                    </div>
                    <aside className="lg:max-w-md w-full h-fit p-5 xs:p-7 bg-white rounded-3xl sticky top-10">
                        <CheckoutTotal loading={loading} />
                    </aside>
                </div>
            </form>
        </FormProvider>
    );
}
