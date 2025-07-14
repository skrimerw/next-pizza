"use client";

import React from "react";
import WhiteBlock from "./WhiteBlock";
import FormTextarea from "./FormTextarea";
import { Form } from "../ui/form";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AddressInput from "./AddressInput";

const AddressSchema = z.object({
  comment: z.string().optional(),
});

export default function CheckoutAddress() {
  const form = useForm({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof AddressSchema>) {
    console.log(data);
  }

  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-8 mb-auto cart-scroll divide-solid divide-[#F6F6F6]">
        <Form {...form}>
          <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              name="address"
              render={({ field, fieldState }) => (
                <>

                  <AddressInput />
                  {/* {fieldState.error?.message && (
                    <ErrorText text={fieldState.error.message} />
                  )} */}
                </>
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
          </form>
        </Form>
      </div>
    </WhiteBlock>
  );
}
