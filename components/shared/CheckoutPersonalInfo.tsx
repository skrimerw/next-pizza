"use client";

import React from "react";
import WhiteBlock from "./WhiteBlock";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

const PersonalInfoSchema = z.object({
  firstName: z.string().nonempty("Введите ваше имя"),
  lastName: z.string().nonempty("Введите вашу фамилию"),
  email: z.string().email("Некорректный email").nonempty("Введите ваш email"),
  phone: z.string().nonempty("Введите ваш телефон"),
});

export default function CheckoutPersonalInfo() {
  const { data } = useSession();

  const form = useForm({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      email: data?.user.email || "",
      firstName: data?.user.fullName.split(" ")[0] || "",
      lastName: data?.user.fullName.split(" ")[1] || "",
      phone: "",
    },
  });

  function onSubmit(data: z.infer<typeof PersonalInfoSchema>) {
    console.log(data);
  }

  return (
    <WhiteBlock title="2. Персональная информация">
      <Form {...form}>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-auto divide-solid divide-[#F6F6F6]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            form={form}
            name="firstName"
            label="Имя"
            placeholder="Введите ваше имя"
          />
          <FormInput
            form={form}
            name="lastName"
            label="Фамилия"
            placeholder="Введите вашу фамилию"
            type="text"
          />
          <FormInput
            form={form}
            name="email"
            label="Email"
            placeholder="Введите email"
            type="email"
          />
          <FormInput
            form={form}
            name="phone"
            label="Телефон"
            placeholder="Введите телефон"
            type="text"
          />
        </form>
      </Form>
    </WhiteBlock>
  );
}
