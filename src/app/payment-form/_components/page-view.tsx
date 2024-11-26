"use client";
import ShippingAddress from "./shipping-address";
import OrderSummary from "./order-summary";
import { Address, CartMineTotal, Country, PaymentMethod } from "@/types";
import { useEffect, useState } from "react";
import PaymentMethods from "./payment-methods";
import Coupon from "./coupon";
import Links from "./links";
import BillingAddress from "./billing-address";
import ItemsInCart from "./items-in-cart";
import dynamic from "next/dynamic";

const AddressDialog = dynamic(() => import("@/app/account/component/address-dialog"), {
  ssr: false, // Disable server-side rendering if it's not necessary
});


interface PageViewProps {
  addresses: Address[];
  cartMineTotal: CartMineTotal;
  paymentMethods: PaymentMethod[];
  countries: Country[]
}

const PageView = ({ addresses, cartMineTotal, paymentMethods, countries }: PageViewProps) => {
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<number | undefined>(addresses?.find((address) => address?.default_shipping)?.id || addresses?.[0]?.id);
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<number | undefined>(addresses?.find((address) => address?.default_billing)?.id || addresses?.[0]?.id);
  const [isBothAddressSame, setIsBothAddressSame] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  useEffect(() => {
    const defaultShippingAddress = addresses?.find((address) => address?.default_shipping)?.id
    if (defaultShippingAddress) {
      setSelectedShippingAddress(defaultShippingAddress)
    }
    const defaultBillingAddress = addresses?.find((address) => address?.default_billing)?.id
    if (defaultBillingAddress) {
      setSelectedBillingAddress(defaultBillingAddress)
    }
  }, [addresses])

  return (
    <div className="max-w-[68rem] mx-auto w-full flex flex-col md:flex-row items-start">
      <div className="w-full md:flex-1 p-6 md:border-r border-[#DEDEDE]">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-8">
              <ShippingAddress
                addresses={addresses}
                selectedShippingAddress={selectedShippingAddress}
                setSelectedShippingAddress={setSelectedShippingAddress}
                countries={countries}
              />
              {
                !isBothAddressSame &&
                <BillingAddress
                  countries={countries}
                  addresses={addresses}
                  selectedBillingAddress={selectedBillingAddress}
                  setSelectedBillingAddress={setSelectedBillingAddress}
                />
              }
            </div>
            {
              showAddressDialog &&
              <AddressDialog open={showAddressDialog} setOpen={setShowAddressDialog} countries={countries} />
            }

            <button
              onClick={() => setShowAddressDialog(true)}
              className={
                "min-w-fit w-full  rounded-full border border-theme-black text-theme-black bg-transparent flex items-center justify-center px-6 py-3"
              }
            >
              <p className={"font-theme-font-roman"}>Add a new address</p>
            </button>
          </div>
          <PaymentMethods
            paymentMethods={paymentMethods}
            addresses={addresses}
            selectedShippingAddress={selectedShippingAddress}
            selectedBillingAddress={selectedBillingAddress}
            isBothAddressSame={isBothAddressSame}
            setIsBothAddressSame={setIsBothAddressSame}
          />
          <Links />
        </div>
      </div>
      <div className="md:max-w-[448px] p-6 w-full space-y-6">
        <ItemsInCart cartMineTotal={cartMineTotal} />
        <Coupon />
        <OrderSummary cartMineTotal={cartMineTotal} />
      </div>
    </div>
  );
};

export default PageView;
