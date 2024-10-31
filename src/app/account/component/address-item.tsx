import { Address, Country } from "@/types";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { deleteAddress } from "../actions";
import toast from "react-hot-toast";
import { errorHandler } from "@/lib/utils";
import { useRouter } from "next/navigation";
import EditAddressDialogOpener from "./edit-address-dialog-opener";
import BlackAnimation from "@/components/black-animation";
interface AddressItemProps {
  address: Address;
  index: number;
  countries: Country[]
}
const AddressItem = ({ countries, address, index }: AddressItemProps) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: (data) => {
      if (data?.status === 200) {
        router.refresh();
        toast.success("Address Deleted Successfully!");
      }
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  return (
    <div
      className={`${index % 2 === 1 ? "bg-theme-gray" : "bg-white"} w-fit justify-start items-center flex`}
    >
      <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray  max-w-[300px]  min-w-[300px] justify-start items-center gap-2 flex">
        <div className="text-theme-black font-semibold text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
          {address?.firstname}
        </div>
      </div>
      <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray  max-w-[300px]  min-w-[300px] justify-start items-center gap-2 flex">
        <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
          {address?.lastname}
        </div>
      </div>
      <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray  max-w-[400px]  min-w-[400px] justify-start items-center gap-2 flex">
        <div className="text-theme-black text-[18px] lg:text-[24px] overflow-hidden text-ellipsis whitespace-nowrap font-theme-font-light leading-[24px]">
          {address?.street?.[0]}
        </div>
      </div>
      <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray  max-w-[150px]  min-w-[150px] justify-start items-center gap-2 flex">
        <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
          {address?.city}
        </div>
      </div>
      <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray  max-w-[150px]  min-w-[150px] justify-start items-center gap-2 flex">
        <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
          {address?.country_id}
        </div>
      </div>
      <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray  max-w-[150px]  min-w-[150px] justify-start items-center gap-2 flex">
        <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
          {address?.region?.region}
        </div>
      </div>
      <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray  max-w-[150px]  min-w-[150px] justify-start items-center gap-2 flex">
        <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
          {address?.postcode}
        </div>
      </div>
      <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray  max-w-[200px]  min-w-[200px] justify-start items-center gap-2 flex">
        <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
          {address?.telephone}
        </div>
      </div>
      <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray  max-w-[200px]  min-w-[200px] justify-start items-center gap-2 flex">
        <div className="text-theme-black flex gap-4 text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
          <button
            onClick={() => {
              mutation?.mutate(address?.id);
            }}
            disabled={mutation?.isPending}
            className="underline text-base"
          >
            {mutation?.isPending ? (
              <BlackAnimation />
            ) : (
              "Delete"
            )}
          </button>
          <EditAddressDialogOpener countries={countries} address={address} />
        </div>
      </div>
    </div>
  );
};

export default AddressItem;
