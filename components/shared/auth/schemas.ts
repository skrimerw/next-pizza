import { z } from "zod";

export const SigninSchema = z.object({
    email: z
        .string()
        .nonempty({ message: "Обязательное поле" })
        .email({ message: "Некорректный формат" }),
    password: z.string().nonempty({ message: "Обязательное поле" }),
});

export const SignupSchema = z.object({
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