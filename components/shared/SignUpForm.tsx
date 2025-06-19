"use client";

import React from "react";
import { Button } from "../ui/button";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const SigninSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: "Обязательное поле" })
    .min(2, "Минимальная длина имени - 2 символа"),
  email: z
    .string()
    .nonempty({ message: "Обязательное поле" })
    .email({ message: "Некорректный формат" }),
  password: z.string().nonempty({ message: "Обязательное поле" }),
});

export default function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.output<typeof SigninSchema>) {
    console.log(data);
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
          <Button className="h-12 text-base" type="submit">
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
