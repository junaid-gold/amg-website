"use client";
import { Address } from "@/types";
import { useSearchParams } from "next/navigation";

interface PlaceOrderProps {
  addresses: Address[];
}

const PlaceOrder = ({ addresses }: PlaceOrderProps) => {
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId");
  const selectedAddress = addresses?.find(
    (adderss) => adderss?.id === Number(addressId)
  );
  return (
    <div>
      <button>Place Order</button>
    </div>
  );
};

export default PlaceOrder;
