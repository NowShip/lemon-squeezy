"use client";

import React, { useState } from "react";

import { createCheckout } from "@/lib/action";

type Props = {
  productId: string;
};

export default function BuyButton({ productId }: Props) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    console.log(productId);
    const { error, data, status } = await createCheckout(productId);

    if (error) {
      console.log(error);
    } else {
      window.open(data, "_blank");
    }
    setLoading(false);
  };

  return (
    <button className="mt-4" onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : "Buy Now"}
    </button>
  );
}
