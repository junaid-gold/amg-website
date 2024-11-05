"use client";

import { Address, Country } from "@/types";
import AddressItem from "./address-item";
import AddAddressDialogOpener from "./add-address-dialog-opener";

interface AddressesViewProps {
  addresses: Address[];
  countries: Country[];
}

const AddressesView = ({ addresses, countries }: AddressesViewProps) => {
  return (
    <div className="w-full  max-w-[90rem] justify-center items-center pt-10 lg:py-16 flex flex-col gap-8">
      <div className="w-full px-10 flex justify-between items-center">
        <h3 className="font-theme-font-medium lg:mb-8  w-full text-[24px] md:text-[32px]">
          Additional Address Entries
        </h3>
        <AddAddressDialogOpener countries={countries} />
      </div>
      {addresses?.length ? (
        <div className="relative w-full">
          <div
            className="border border-[#F2F1F1] border-r-0 lg:border-theme-gray flex gap-2 overflow-x-auto w-full"

          >
            <div className={"xl:w-full"}>
              {/* Header */}
              <div className="bg-white w-fit justify-start items-start flex">

                <div className="border-r border-r-[#F2F1F1] lg:border-r-theme-gray w-full max-w-[200px] min-w-[200px] p-6 justify-start items-center gap-2 flex">
                  <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                    Actions
                  </div>
                </div>
                <div className="border-r border-r-[#F2F1F1] lg:border-r-theme-gray w-full max-w-[300px] min-w-[300px] p-6 justify-start items-center gap-2 flex">
                  <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                    First Name
                  </div>
                </div>
                <div className="border-r border-r-[#F2F1F1] lg:border-r-theme-gray w-full max-w-[300px] min-w-[300px] p-6 justify-start items-center gap-2 flex">
                  <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                    Last Name
                  </div>
                </div>
                <div className="border-r border-r-[#F2F1F1] lg:border-r-theme-gray w-full max-w-[400px] min-w-[400px] p-6 justify-start items-center gap-2 flex">
                  <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                    Street Address
                  </div>
                </div>
                <div className="border-r border-r-[#F2F1F1] lg:border-r-theme-gray w-full max-w-[150px] min-w-[150px] p-6 justify-start items-center gap-2 flex">
                  <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                    City
                  </div>
                </div>
                <div className="border-r border-r-[#F2F1F1] lg:border-r-theme-gray w-full max-w-[150px] min-w-[150px] p-6 justify-start items-center gap-2 flex">
                  <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                    Country
                  </div>
                </div>
                <div className="border-r border-r-[#F2F1F1] lg:border-r-theme-gray w-full max-w-[150px] min-w-[150px] p-6 justify-start items-center gap-2 flex">
                  <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                    State
                  </div>
                </div>
                <div className="border-r border-r-[#F2F1F1] lg:border-r-theme-gray w-full max-w-[150px] min-w-[150px] p-6 justify-start items-center gap-2 flex">
                  <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                    Zip/Postal
                  </div>
                </div>
                <div className="border-r border-r-[#F2F1F1] lg:border-r-theme-gray w-full max-w-[200px] min-w-[200px] p-6 justify-start items-center gap-2 flex">
                  <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                    Phone
                  </div>
                </div>
              </div>

              {/* Body */}
              {addresses?.map((value, index) => (
                <AddressItem countries={countries} address={value} index={index} key={value?.id} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>There is no address associated to this customer</div>
      )}
    </div>
  );
};

export default AddressesView;
