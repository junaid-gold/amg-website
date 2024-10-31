"use client";
import { useState } from "react";
import { Address, Country } from "@/types";
import dynamic from "next/dynamic";

// Dynamically import the EditAddressDialog
const AddressDialog = dynamic(() => import("./address-dialog"), {
  ssr: false, // Disable server-side rendering if it's not necessary
});

interface EditAddressDialogOpenerProps {
  address: Address;
  addressType?: "Billing" | "Shipping";
  countries: Country[];
}

const EditAddressDialogOpener = ({
  address,
  addressType,
  countries,
}: EditAddressDialogOpenerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <AddressDialog
          open={open}
          setOpen={setOpen}
          countries={countries}
          address={address}
          addressType={addressType}
        />
      )}

      <button className={"underline text-base"} onClick={() => setOpen(true)}>
        Edit
      </button>
    </>
  );
};

export default EditAddressDialogOpener;
