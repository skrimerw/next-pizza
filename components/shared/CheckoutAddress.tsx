"use client";

import React from "react";
import WhiteBlock from "./WhiteBlock";
import FormTextarea from "./FormTextarea";
import { Controller, useFormContext } from "react-hook-form";
import AddressInput from "./AddressInput";

export default function CheckoutAddress() {
    const form = useFormContext();

    return (
        <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-8 mb-auto divide-solid divide-[#F6F6F6]">
                <Controller
                control={form.control}
                    name="address"
                    render={({ field, fieldState }) => (
                        <div>
                            <AddressInput form={form} name="address" onChange={field.onChange} />
                            {fieldState.error?.message && (
                                <p className="text-red-500 text-[12.8px] mt-1">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </div>
                    )}
                />
                <FormTextarea
                    className="max-h-64 h-32"
                    form={form}
                    name="comment"
                    placeholder="Укажите тут дополнительную информацию для курьера"
                    label="Комментарий к заказу"
                    rows={8}
                />
            </div>
        </WhiteBlock>
    );
}
