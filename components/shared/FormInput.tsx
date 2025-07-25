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
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

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

export default function FormInput({
    form,
    label,
    name,
    placeholder,
    type = "text",
    ...props
}: Props) {
    const [showPassword, setShowPassword] = useState(false);

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
                                type={
                                    type === "password"
                                        ? showPassword
                                            ? "text"
                                            : "password"
                                        : type
                                }
                                className={cn(
                                    "!mt-0 h-12 rounded-xl border-gray-200 !text-[16px] focus-visible:border-primary focus-visible:ring-0",
                                    type === "password" && "pr-10",
                                    Object.keys(form.formState.errors).includes(
                                        name
                                    ) &&
                                        "border-red-500 focus-visible:border-red-500"
                                )}
                                placeholder={placeholder}
                                {...field}
                            />

                            {type === "password" && (
                                <span
                                    className="absolute top-1/2 right-4 -translate-y-1/2 inline-block w-fit cursor-pointer text-black/70"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {!showPassword ? (
                                        <Eye size={20} />
                                    ) : (
                                        <EyeOff size={20} />
                                    )}
                                </span>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
