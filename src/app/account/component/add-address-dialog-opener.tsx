import { Country } from "@/types";
import dynamic from "next/dynamic";
import { useState } from "react";

const AddressDialog = dynamic(() => import("./address-dialog"), {
  ssr: false,
});

interface AddAddressDialogOpenerProps {
  countries: Country[];
}

const AddAddressDialogOpener = ({ countries }: AddAddressDialogOpenerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <AddressDialog open={open} setOpen={setOpen} countries={countries} />
      )}

      <button
        onClick={() => setOpen(true)}
        className={
          "min-w-fit  rounded-full border border-theme-black text-theme-black bg-transparent flex items-center justify-center px-6 py-3"
        }
      >
        <p className={"font-theme-font-roman"}>Add a new address</p>
      </button>
    </>
  );
};

export default AddAddressDialogOpener;
