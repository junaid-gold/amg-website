import useCartItem from "@/hooks/use-cart-item"
import { Value } from "@/types"
import React from "react"
import SelectedButtonComponent from "../component/seelcted-button.component"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface DropdownInputProps {
  value: { option_id: number } & Value
  title?: string,
  customLayoutOptionId: string
}

const DropdownInput = ({ value, title, customLayoutOptionId }: DropdownInputProps) => {
  const { updateCustomOption, cartItem, removeCustomOption } = useCartItem()

  const filteredCustomOption =
    cartItem?.product_option?.extension_attributes?.custom_options?.find(
      (custom_option) => custom_option?.option_id === value?.option_id
    )
  const selectedOne = cartItem?.product_option?.extension_attributes?.custom_options?.find((option) => option?.option_id?.toString() === value?.option_id?.toString())

  const pathname = usePathname()
  const isSelected = selectedOne?.option_value?.toString() === value?.option_type_id?.toString() || filteredCustomOption?.option_value?.toString() === value?.option_type_id?.toString()
  return (
    <SelectedButtonComponent
      className={
        title === "Type" || title === "How do you want your record displayed?"
          ? "min-w-[151px] h-[201px]  max-w-[151px] lg:min-w-0 lg:max-w-none lg:flex-1"
          : ""
      }
      selected={isSelected}
      onClick={() => {
        if (isSelected) {
          removeCustomOption(value?.option_id)
        } else {
          updateCustomOption(value.option_id, value?.option_type_id!, value?.price)
        }
        if (title === "Type" || title === "How do you want your record displayed?") {
          if (value?.title !== "Custom Layout" && value?.title !== "") {
            removeCustomOption(299138)
            removeCustomOption(299134)
            removeCustomOption(299130)
            // Vinyl
            removeCustomOption(299234)
          }
        }
      }}
      title={value?.title}
    >
      <div
        className={`min-w-[77px] min-h-[77px] relative flex items-center justify-center`}
      >
        {value?.title === "Sealed" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={64}
            height={64}
            alt={value?.title}
          />
        )}
        {value?.title === "Open (Record in the sleeve)" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={64}
            height={64}
            alt={value?.title}
          />
        )}

        {value?.title ===
          "Open Displayed (Record half in sleeve half exposed)" && (
            <Image
              src={`/images/products/${value?.option_type_id}.png`}
              width={64}
              height={64}
              alt={value?.title}
            />
          )}

        {value?.title ===
          "Open Displayed (Record to the right of the sleeve)" && (
            <Image
              src={`/images/products/${value?.option_type_id}.png`}
              width={64}
              height={64}
              alt={value?.title}
            />
          )}

        {value?.title === "Custom Layout" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={64}
            height={64}
            alt={value?.title}
          />
        )}

        {value?.title === "Open (Cassette in Holder or Loose Cassette)" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={64}
            height={64}
            alt={value?.title}
          />
        )}

        {value?.title === "Open (Cassette to the right of the holder)" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={64}
            height={64}
            alt={value?.title}
          />
        )}
        {value?.title === "Open (CD in the jewel case)" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={64}
            height={64}
            alt={value?.title}
          />
        )}
        {value?.title === "Open (CD to the right of the jewel case)" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={64}
            height={64}
            alt={value?.title}
          />
        )}
        {value?.title === "Open (With Slide Box - No Cellophane)" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={64}
            height={64}
            alt={value?.title}
          />
        )}
        {value?.title ===
          "Open (8-Track displayed to the right of the box)" && (
            <Image
              src={`/images/products/${value?.option_type_id}.png`}
              width={64}
              height={64}
              alt={value?.title}
            />
          )}

        {/* SIZES */}
        {value?.title === "7 Inch" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={26}
            height={26}
            alt={value?.title}
          />
        )}
        {value?.title === "10 Inch" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={49}
            height={49}
            alt={value?.title}
          />
        )}
        {value?.title === "12 Inch" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={78}
            height={78}
            alt={value?.title}
          />
        )}
        {value?.title === "Other" && (
          <Image
            src={`/images/products/${value?.option_type_id}.png`}
            width={64}
            height={64}
            alt={value?.title}
          />
        )}
        {value?.price ? (
          <div
            className={`bg-[#8DE1F3] px-2 py-1 absolute rounded-full text-xs ${pathname?.includes("media-submission")
              ? "-top-2 -left-5 lg:-top-4 lg:-left-9 px-2 py-1"
              : "-top-1 -right-2 py-0.5 px-1.5"
              }`}
          >
            +${value?.price}
          </div>
        ) : null}
      </div>
      <div className={"flex flex-col items-center justify-center"}>
        <p className={"text-[14px] font-theme-font-roman font-medium"}>
          {value?.title}
        </p>
      </div>
    </SelectedButtonComponent>
  )
}

export default DropdownInput
