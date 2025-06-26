"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { failToast, successToast } from "./toast";

const SigninSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Обязательное поле" })
    .email({ message: "Некорректный формат" }),
  password: z.string().nonempty({ message: "Обязательное поле" }),
});

interface Props {
  onClose: () => void
}

export default function SignInForm({onClose}:Props) {
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

      onClose()
    } catch (error) {
      console.error("Error [LOGIN]", error);
      failToast("Не удалось войти в аккаунт");
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
          <Button className="h-12 text-base" type="submit" disabled={loading}>
            Войти
          </Button>
        </form>
      </Form>
      <span className="inline-block w-full h-[1px] bg-gray-200"></span>
      <div className="flex gap-4">
        <Button
          variant={"secondary"}
          className="h-10 w-full text-base transition-all hover:bg-transparent"
        >
          <img
            className="w-6 h-6"
            src="https://github.githubassets.com/favicons/favicon.svg"
          ></img>
          Github
        </Button>
        <Button
          variant={"secondary"}
          className="h-10 w-full text-base transition-all hover:bg-transparent"
        >
          <img
            className="w-6 h-6"
            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
          ></img>
          Google
        </Button>
      </div>
    </>
  );
}
