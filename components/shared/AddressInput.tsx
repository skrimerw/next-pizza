"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

export default function AddressInput() {
  return (
    <div>
        <p className="font-medium mb-1">
            Введите адрес
        </p>
      <AddressSuggestions
        token="603d4715324dc1b593417c7c750c9fd3268e29ac"
        count={7}
        onChange={() => console.log("asdasdad")}
      />
    </div>
  );
}
