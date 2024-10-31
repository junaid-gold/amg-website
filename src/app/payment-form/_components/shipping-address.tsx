"use client";
import AddressDialog from "@/app/account/component/address-dialog";
import { Address, Country } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

interface ShippingAddressProps {
  addresses: Address[];
  setSelectedShippingAddress: Dispatch<SetStateAction<number | undefined>>;
  selectedShippingAddress: number | undefined;

  countries: Country[]
}

const ShippingAddress = ({
  addresses,
  setSelectedShippingAddress,
  selectedShippingAddress,
  countries
}: ShippingAddressProps) => {
  const handleAddressSelect = (address: Address) => {
    setSelectedShippingAddress(address?.id);
  };

  const [open, setOpen] = useState(false)
  const [addressToPass, setAddressToPass] = useState<Address | undefined>()
  return (
    <div className="flex-1 w-full flex flex-col gap-2">
      <h1 className="font-semibold text-xl">Shipping Address</h1>
      {addresses?.map((address, index) => (
        <>
          {(open && addressToPass) && (
            <AddressDialog
              open={open}
              setOpen={setOpen}
              countries={countries}
              address={addressToPass}
              addressType={"Shipping"}
            />
          )}
          <div
            onClick={() => handleAddressSelect(address)}
            key={address?.id}
            className={`flex relative z-10 cursor-pointer w-full border-2 px-4 py-2 gap-2 ${selectedShippingAddress === address?.id ? " border-[#9747FF]  bg-[#C6ABFF1A]" : "border-transparent"} 
          ${index === 0 ? "rounded-t-lg" : ""} 
 ${index + 1 === addresses?.length ? "rounded-b-lg" : ""}
 ${index !== 0 && index + 1 !== addresses?.length ? "rounded-lg" : ""}`}
          >
            <>

              <button onClick={() => {
                setAddressToPass(address)
                setOpen(true)
              }} className="absolute top-2 z-30 right-2">Edit</button>
              {selectedShippingAddress === address?.id && (
                <div className="w-3.5 h-3.5 border-[6px] mt-1.5 border-[#9747FF] p-0.5 rounded-full"></div>
              )}
              <div className="text-xl  flex-1 flex flex-col gap-1">
                <p className="text-sm font-theme-font-light">
                  {address?.firstname} {address?.lastname}
                </p>
                <p className="text-sm font-theme-font-light">{address?.street?.[0]}{address?.street?.[1] ? `, ${address?.street?.[1]}` : null} </p>
                <p className="text-sm font-theme-font-light">
                  {address?.city}, {address?.region?.region} {address?.postcode}
                </p>
                <p className="text-sm font-theme-font-light">{address?.country_id}</p>
                <p className="text-sm font-theme-font-light">{address?.telephone}</p>
              </div>
            </>
          </div>
        </>
      ))}
    </div>
  );
};

export default ShippingAddress;
