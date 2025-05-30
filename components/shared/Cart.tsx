import { cn } from "@/lib/utils";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, ShoppingCart, X } from "lucide-react";
import Title from "./Title";
import Image from "next/image";

interface Props {
  className?: string;
}

export default function Cart({ className }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={cn("group h-[40px] px-6 py-3", className)}>
          <span>520 ₽</span>
          <div className="h-full w-[1px] bg-white opacity-25"></div>
          <div className="relative">
            <span className="flex items-center transition-all gap-1 group-hover:opacity-0">
              <ShoppingCart />
              <span>3</span>
            </span>
            <ArrowRight className="absolute left-[50%] top-[50%] -translate-y-[50%] opacity-0 transition-all -translate-x-[100%] group-hover:opacity-100 group-hover:-translate-x-[40%]" />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white border-0">
        <SheetClose className="absolute -left-16 top-1/2 -translate-y-1/2 rounded-sm ring-offset-background transition-all duration-500 hover:rotate-180 focus:outline-none focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-10 w-10 text-white" />
          <span className="sr-only">Close</span>
        </SheetClose>
        <SheetTitle />
        <div className="flex flex-col justify-center items-center h-full">
          <Image src={"/img/empty-box.svg"} alt="" width={120} height={120} />
          <Title text="Корзина пустая" className="font-semibold text-center" />
          <p className="text-center text-gray-400 mb-9">
            Добавьте хотя бы один продукт, чтобы совершить заказ
          </p>
          <SheetClose asChild>
            <Button type="submit" className="h-12 px-8 py-3 group">
              <ArrowLeft className="transition-all group-hover:-translate-x-1" />
              Вернуться назад
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
