import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "404 | Страница не найдена",
};

export default function NotFoundCatchAll() {
  notFound();
}
