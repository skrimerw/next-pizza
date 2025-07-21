import React from "react";
import Title from "./Title";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function WhiteBlock({ title, children }: Props) {
  return (
    <div className="rounded-3xl bg-white w-full h-fit">
      <header className="flex justify-between px-7 sm:px-9 pt-5 sm:pt-7 pb-4 sm:pb-6 border-b border-[#F6F6F6]">
        <Title text={title} size="md" />

        {/* <Button
          variant="ghost"
          className="text-base text-gray-500 hover:text-gray-500 hover:bg-transparent hover:underline"
        >
          <Trash2 />
          Очистить корзину
        </Button> */}
      </header>
      <div className="p-7 sm:p-9">{children}</div>
    </div>
  );
}
