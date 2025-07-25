import React, { TextareaHTMLAttributes } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    form: any;
    name: string;
    label: string;
    placeholder: string;
}

export default function FormTextarea({
    form,
    label,
    name,
    placeholder,
    ...props
}: Props) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-base mb-1 block">
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            {...props}
                            className={cn(
                                "!mt-0 h-12 rounded-xl border-gray-200 !text-[16px] focus-visible:border-primary focus-visible:ring-0",
                                Object.keys(form.formState.errors).includes(
                                    name
                                ) &&
                                    "border-red-500 focus-visible:border-red-500",
                                props.className
                            )}
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
