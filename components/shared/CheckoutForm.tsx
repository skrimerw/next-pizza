"use client";

import React from "react";
import CheckoutCart from "./CheckoutCart";
import CheckoutPersonalInfo from "./CheckoutPersonalInfo";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutTotal from "./CheckoutTotal";
import { Form } from "../ui/form";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

const PersonalInfoSchema = z.object({
    firstName: z.string().nonempty("Введите ваше имя"),
    lastName: z.string().nonempty("Введите вашу фамилию"),
    email: z.string().email("Некорректный email").nonempty("Введите ваш email"),
    phone: z.string().nonempty("Введите ваш телефон"),
    address: z.string().nonempty("Введите адрес доставки"),
    comment: z.string().optional(),
});

export default function CheckoutForm() {
    const { data } = useSession();

    const form = useForm({
        resolver: zodResolver(PersonalInfoSchema),
        defaultValues: {
            email: data?.user.email || "",
            firstName: data?.user.fullName.split(" ")[0] || "",
            lastName: data?.user.fullName.split(" ")[1] || "",
            phone: "",
            address: "",
            comment: "",
        },
    });

    function onSubmit(data: z.infer<typeof PersonalInfoSchema>) {
        console.log(data);
    }

    return (
        <FormProvider {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-11">
                    <div className="flex flex-col gap-8 lg:gap-11 w-full">
                        <CheckoutCart />
                        <CheckoutPersonalInfo />
                        <CheckoutAddress />
                    </div>
                    <aside className="lg:max-w-md w-full h-fit p-7 bg-white rounded-3xl sticky top-10">
                        <CheckoutTotal />
                    </aside>
                </div>
            </form>
        </FormProvider>
    );
}
