"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { DialogDescription, DialogTitle } from "../../ui/dialog";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignupSchema } from "./schemas";
import { axiosInstance } from "@/lib/axiosInstance";
import { LoaderCircle } from "lucide-react";

export default function SignUpForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
        },
    });

    async function onSubmit(data: z.output<typeof SignupSchema>) {
        try {
            setLoading(true);

            await axiosInstance.post("/auth/signup", data);

            location.reload();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <DialogTitle className="text-[26px] font-bold text-foreground text-center">
                Регистрация
            </DialogTitle>
            <DialogDescription className="text-center text-base">
                Введите свои данные, чтобы зарегистрироваться
            </DialogDescription>
            <Form {...form}>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormInput
                        form={form}
                        name="fullName"
                        label="Полное имя"
                        placeholder="Введите полное имя"
                    />
                    <FormInput
                        form={form}
                        name="email"
                        label="Email"
                        type="email"
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
                        className="relative h-12 text-base"
                        type="submit"
                        disabled={loading}
                    >
                        {loading && (
                            <span className="block absolute top-1/2 left-4 -translate-y-1/2 size-5">
                                <LoaderCircle className="animate-spin !w-full !h-full" />
                            </span>
                        )}
                        Зарегистрироваться
                    </Button>
                </form>
            </Form>
            <span className="inline-block w-full h-[1px] bg-gray-200"></span>
        </>
    );
}
