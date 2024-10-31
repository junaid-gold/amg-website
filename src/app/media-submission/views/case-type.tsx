"use client";
import React, { Dispatch, SetStateAction } from "react";
import PageWrapperComponent from "@/app/media-submission/component/page-wrapper.component";
import { usePathname, useRouter } from "next/navigation";
import useCartItem from "@/hooks/use-cart-item";

const CaseType = ({
  data,
  accordion,
  setAccordion,
}: {
  data: {
    sku: string;
    option_id: number;
    isRequired: boolean;
    options: {
      title: string;
      sort_order: number;
      price: number;
      price_type: string;
      option_type_id: number;
    }[];
  }[];
  accordion?: string[];
  setAccordion?: Dispatch<SetStateAction<string[]>>;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartItem, updateCustomOption } = useCartItem();

  if (!cartItem?.sku) {
    router.push("/single-page-form?currentPage=0");
  }
  const foundItem = data?.find(({ sku }) => sku === cartItem?.sku);
  return (
    <PageWrapperComponent
      isButtonDisabled={
        foundItem?.isRequired
          ? !cartItem?.product_option?.extension_attributes?.custom_options?.some(
            (option) => option?.option_id === foundItem?.option_id
          )
          : false
      }
      estimatedPriceFooter
      title={"Case Type"}
      infoText={"Extra"}
      accordion={accordion}
      setAccordion={setAccordion}
    >
      {pathname.includes("media-submission") ? (
        <>
          {foundItem?.options?.map((optionData) => (
            <div
              className={
                "flex items-center px-8 py-4 justify-between bg-theme-gray w-full lg:w-2/3 mb-4 rounded-lg"
              }
              key={optionData?.option_type_id}
            >
              <div className={"flex items-center gap-6"}>
                <label className="custom-checkbox">
                  <input
                    onChange={(e) => {
                      if (foundItem) {
                        updateCustomOption(
                          foundItem.option_id,
                          optionData?.option_type_id,
                          optionData?.price
                        );
                      }
                    }}
                    className={"w-5 h-5"}
                    type="radio"
                    name="Case-Type"
                  />
                </label>
                <p className={"text-[18px] font-theme-font-light"}>
                  {optionData?.title}
                </p>
              </div>
              {optionData?.price ? (
                <div className={"bg-[#8DE1F3] px-2 py-1 rounded-full text-xs"}>
                  ${optionData?.price}
                </div>
              ) : null}
            </div>
          ))}
        </>
      ) : (
        <>
          {accordion?.includes("Case Type") && (
            <div
              className={`${pathname.includes("single-page-form") && "p-4 w-full"}`}
            >
              {foundItem?.options?.map((optionData) => (
                <div
                  className={`flex items-center px-8 py-4 justify-between bg-theme-gray  mb-4 rounded-lg  ${pathname?.includes("single-page-form")
                    ? "w-full"
                    : "w-full lg:w-2/3"
                    }
                      `}
                  key={optionData?.option_type_id}
                >
                  <div className={"flex-1 flex items-center gap-6"}>
                    <label className="custom-checkbox">
                      <input
                        onChange={(e) => {
                          if (foundItem) {
                            updateCustomOption(
                              foundItem.option_id,
                              optionData?.option_type_id,
                              optionData?.price
                            );
                          }
                        }}
                        className={"w-5 h-5"}
                        type="radio"
                        name="Case-Type"
                      />
                    </label>
                    <p className={"text-[18px] font-theme-font-light"}>
                      {optionData?.title}
                    </p>
                  </div>
                  {optionData?.price ? (
                    <div
                      className={"bg-[#8DE1F3] px-2 py-1 rounded-full text-xs"}
                    >
                      {optionData?.price}
                    </div>
                  ) : null}

                  <div
                    className={`flex-1 ${pathname?.includes("single-page-form") ? "hidden sm:block" : "hidden"}`}
                  ></div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </PageWrapperComponent>
  );
};

export default CaseType;
