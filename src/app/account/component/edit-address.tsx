import { useState } from "react";
import EditAddressDialog from "./address-dialog";
import { Address, Country } from "@/types";
import { getCountries } from "@/app/(auth)/sign-up/actions";
import EditAddressDialogOpener from "./edit-address-dialog-opener";

interface EditAddressProps {
  address: Address;
  addressType: "Billing" | "Shipping";
  countries: Country[];
}

const EditAddress = ({
  address,
  addressType,
  countries,
}: EditAddressProps) => {
  return (
    <>
      <EditAddressDialogOpener
        countries={countries}
        address={address}
        addressType={addressType}
      />
    </>
  );
};

export default EditAddress;
