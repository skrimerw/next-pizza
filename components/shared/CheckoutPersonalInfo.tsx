"use client";

import React, { useState } from "react";
import WhiteBlock from "./WhiteBlock";
import FormInput from "./FormInput";
import { useFormContext } from "react-hook-form";
import InputPhone from "./InputPhone";

export default function CheckoutPersonalInfo() {
    const [phone, setPhone] = useState();
    const form = useFormContext();

    function maskPhoneNumber(value: string) {}

    return (
        <WhiteBlock title="2. Персональная информация">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-auto divide-solid divide-[#F6F6F6]">
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
                <InputPhone
                    form={form}
                    name="phone"
                    label="Телефон"
                    placeholder="Введите телефон"
                />
                {/* <FormInput
                    form={form}
                    name="phone"
                    label="Телефон"
                    placeholder="Введите телефон"
                    type="tel"
                    onChange={(e) => maskPhoneNumber(e.target.value)}
                /> */}
            </div>
        </WhiteBlock>
    );
}
