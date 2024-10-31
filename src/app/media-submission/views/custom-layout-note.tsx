/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import InputComponent from "@/components/common/input.component";
import ThemeCheckboxComponent from "@/components/common/theme-checkbox.component";
import PageWrapperComponent from "@/app/media-submission/component/page-wrapper.component";
import { isEmpty } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import useCartItem from "@/hooks/use-cart-item";

const CustomLayoutNote = ({
  data,
  accordion,
  setAccordion,
}: {
  data: {
    sku: string;
    option_id: number;
    isRequired: boolean;
    data: {
      product_sku: string;
      option_id: number;
      title: string;
      type: string;
      sort_order: number;
      isRequired: boolean;
      price: number;
      price_type: string;
      max_characters: number;
      image_size_x: number;
      image_size_y: number;
    };
  }[];
  accordion?: string[];
  setAccordion?: Dispatch<SetStateAction<string[]>>;
}) => {
  const pathname = usePathname();
  const { updateCustomOption, cartItem } = useCartItem();

  const router = useRouter();
  if (!cartItem?.sku) {
    router.push("/single-page-form?currentPage=0");
  }
  const foundItem = data?.find((data) => data?.sku === cartItem?.sku);

  // Create a debounced version of updateCustomOption
  const debouncedUpdateCustomOption = useCallback(
    debounce((optionId: string, value: string, price?: number) => {
      updateCustomOption(Number(optionId), value, price);
    }, 300),
    [updateCustomOption]
  );

  const handleInputChange =
    (optionId: string, price?: number) =>
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        debouncedUpdateCustomOption(optionId, event.target.value, price);
      };

  return (
    <PageWrapperComponent
      isButtonDisabled={
        foundItem?.isRequired
          ? !cartItem?.product_option?.extension_attributes?.custom_options?.some(
            (option) =>
              option?.option_id === foundItem?.option_id &&
              (option?.option_value as string)?.length
          )
          : false
      }
      estimatedPriceFooter
      title={"Custom Layout Note?"}
      infoText={"Extra"}
      accordion={accordion}
      setAccordion={setAccordion}
    >
      {pathname.includes("media-submission") ? (
        <>
          <textarea
            onChange={handleInputChange(
              foundItem?.option_id?.toString() || "",
              foundItem?.data?.price
            )}
            placeholder={"Custom layout note"}
            className={`rounded-lg px-5 py-3 border border-[#B6B4A2] text-[#100F0F] opacity-60 bg-theme-gray bg-transparent w-full lg:w-2/3`}
          />
        </>
      ) : (
        <>
          {accordion?.includes(
            "How much would you like to insure your item?"
          ) && (
              <div
                className={`${pathname.includes("single-page-form") && "p-4 w-full"}`}
              >
                <textarea
                  onChange={handleInputChange(
                    foundItem?.option_id?.toString() || ""
                  )}
                  placeholder={"Custom layout note"}
                  className={`rounded-lg px-5 py-3 border border-[#B6B4A2] text-[#100F0F] opacity-60 bg-theme-gray bg-transparent w-full lg:w-2/3`}
                />
              </div>
            )}
        </>
      )}
    </PageWrapperComponent>
  );
};

export default CustomLayoutNote;
