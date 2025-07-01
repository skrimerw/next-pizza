"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { DialogDescription, DialogTitle } from "../../ui/dialog";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { failToast, successToast } from "../toast";
import { SigninSchema } from "./schemas";
import { useRouter } from "next/navigation";

interface Props {
    onClose: () => void;
}

export default function SignInForm({ onClose }: Props) {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(SigninSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.output<typeof SigninSchema>) {
        setLoading(true);

        try {
            const resp = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            if (resp?.error) {
                throw new Error();
            }

            successToast("Вы успешно вошли в аккаунт");

            location.reload()

            onClose();
        } catch (error) {
            console.error("Error [LOGIN]", error);
            failToast("Неверный логин или пароль");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <DialogTitle className="text-[26px] font-bold text-foreground text-center">
                Вход в аккаунт
            </DialogTitle>
            <DialogDescription className="text-center text-base">
                Введите свою почту, чтобы войти в свой аккаунт
            </DialogDescription>

            <Form {...form}>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormInput
                        form={form}
                        name="email"
                        label="Email"
                        placeholder="Введите email"
                    />
                    <FormInput
                        form={form}
                        name="password"
                        label="Пароль"
                        placeholder="Введите пароль"
                        type="password"
                    />
                    <Button
                        className="h-12 text-base"
                        type="submit"
                        disabled={loading}
                    >
                        Войти
                    </Button>
                </form>
            </Form>
            <span className="inline-block w-full h-[1px] bg-gray-200"></span>
        </>
    );
}
