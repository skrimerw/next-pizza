"use client";

import React from "react";
import WhiteBlock from "./WhiteBlock";
import FormTextarea from "./FormTextarea";
import { Form } from "../ui/form";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AddressInput from "./AddressInput";
import { cn } from "@/lib/utils";

const AddressSchema = z.object({
    address: z.string().nonempty(),
    comment: z.string().optional(),
});

export default function CheckoutAddress() {
    const form = useFormContext();
    /* const form = useForm({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      comment: "",
    },
  }); */

    function onSubmit(data: z.infer<typeof AddressSchema>) {
        console.log(data);
    }

    return (
        <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-8 mb-auto divide-solid divide-[#F6F6F6]">
                {/* <Form {...form}>
          <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            </form>
          </Form> */}
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
