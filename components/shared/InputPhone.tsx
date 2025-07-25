"use client";

import React, { useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

interface Props
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "className" | "form"
    > {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    placeholder: string;
    type?: string;
}

export default function InputPhone({
    form,
    label,
    name,
    placeholder,
    ...props
}: Props) {
    function handleInputPhoneChange(
        target: EventTarget & HTMLInputElement,
        value: string,
        field: ControllerRenderProps<any, string>,
        type: string
    ) {
        const input = target;
        const selectInEnd = input.selectionStart === value.length;
        let selectionStart = selectInEnd
            ? value.length + 1
            : input.selectionStart ?? 0;

        console.log(type);

        let maskedPhone = "";
        let cleanPhone = target.value.replaceAll(/\D/g, "");

        if (value === "+" && value.length === 1) {
            cleanPhone += "7";
        }

        for (let i = 0; i < cleanPhone.length; i++) {
            const currentNumber = cleanPhone.at(i);

            if (i === 0) {
                if (currentNumber === "7" || currentNumber === "8") {
                    maskedPhone += "+7";
                } else {
                    maskedPhone += "+7 (" + currentNumber;
                    selectionStart = selectInEnd
                        ? selectionStart + 1
                        : selectionStart + 0;
                }
            } else if (i === 1) {
                maskedPhone += " (" + currentNumber;
                selectionStart = selectInEnd
                    ? selectionStart + 1
                    : selectionStart + 0;
            } else if (i === 4) {
                maskedPhone += ") " + currentNumber;
            } else if (i === 7 || i === 9) {
                maskedPhone += "-" + currentNumber;
            } else {
                maskedPhone += currentNumber;
            }
        }

        field.onChange(maskedPhone);

        requestAnimationFrame(() => {
            if (selectionStart > 3) {
                target.setSelectionRange(selectionStart, selectionStart);
            } else {
                target.setSelectionRange(4, 4);
            }
        });
    }

    function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;

        target.value = "";
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;

        if (e.key === "Backspace" && target.value === "+7") {
            target.value = "";
        }
    }

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-1">
                    <FormLabel className="text-base text-foreground">
                        {label}
                    </FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                {...props}
                                maxLength={18}
                                type="tel"
                                className={cn(
                                    "!mt-0 h-12 rounded-xl border-gray-200 !text-[16px] focus-visible:border-primary focus-visible:ring-0",
                                    Object.keys(form.formState.errors).includes(
                                        name
                                    ) &&
                                        "border-red-500 focus-visible:border-red-500"
                                )}
                                placeholder={placeholder}
                                {...field}
                                onChange={(e) => {
                                    handleInputPhoneChange(
                                        e.target,
                                        e.target.value,
                                        field,

                                        "change"
                                    );
                                }}
                                onPaste={(e) => handlePaste(e)}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
