import {
  CheckoutAddress,
  CheckoutCart,
  CheckoutPersonalInfo,
  CheckoutTotal,
  Container,
  Title,
} from "@/components/shared";
import React from "react";

export default function CheckoutPage() {
  return (
    <Container className="pb-32">
      <Title
        text="Оформление заказа"
        size="xl"
        className="font-extrabold my-12"
      />
      <div className="flex gap-11">
        <div className="flex flex-col gap-11 w-full">
          <CheckoutCart />
          <CheckoutPersonalInfo />
          <CheckoutAddress />
        </div>
        <aside className="max-w-md w-full h-fit p-11 bg-white rounded-3xl sticky top-10">
          <CheckoutTotal />
        </aside>
      </div>
    </Container>
  );
}
