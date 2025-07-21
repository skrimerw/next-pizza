/* 'use client'

import React from 'react'

export default function CheckoutPage() {
  return (
    <div>CheckoutPage</div>
  )
} */




import {
  CheckoutAddress,
  CheckoutCart,
  CheckoutForm,
  CheckoutPersonalInfo,
  CheckoutTotal,
  Container,
  Title,
} from "@/components/shared";
import React from "react";

export default function CheckoutPage() {
  return (
    <Container className="pb-20 lg:pb-32">
      <Title
        text="Оформление заказа"
        size="xl"
        className="font-extrabold my-12"
      />
      <CheckoutForm />
      {/* <div className="flex flex-col lg:flex-row gap-8 lg:gap-11">
        <div className="flex flex-col gap-8 lg:gap-11 w-full">
          <CheckoutCart />
          <CheckoutPersonalInfo />
          <CheckoutAddress />
        </div>
        <aside className="lg:max-w-md w-full h-fit p-7 bg-white rounded-3xl sticky top-10">
          <CheckoutTotal />
        </aside>
      </div> */}
    </Container>
  );
}
