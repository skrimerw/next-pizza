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

interface Props {
  form: any;
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
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                className={cn("!mt-0 h-12 rounded-xl border-gray-200", type === 'password' && 'pr-10')}
                placeholder={placeholder}
                {...field}
              />

              {type === "password" && (
                <span
                  className="absolute top-1/2 right-4 -translate-y-1/2 inline-block w-fit cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
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
