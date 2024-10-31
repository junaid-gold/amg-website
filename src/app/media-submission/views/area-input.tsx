/* eslint-disable react-hooks/exhaustive-deps */
import useCartItem from "@/hooks/use-cart-item"
import { Option } from "@/types"
import { debounce } from "lodash"
import { usePathname } from "next/navigation"
import React, { useCallback, useState } from "react"

interface AreaInputProps {
  option: Option
}

const AreaInput = ({ option }: AreaInputProps) => {
  const { updateCustomOption, cartItem } = useCartItem()
  const pathname = usePathname()

  const debouncedUpdateCustomOption = useCallback(
    debounce((optionId: string, value: string, price: number) => {
      updateCustomOption(Number(optionId), value, price)
    }, 300),
    [updateCustomOption]
  )
  const selectedOne = cartItem?.product_option?.extension_attributes?.custom_options?.find((option) => option?.option_id?.toString() === option?.option_id?.toString())

  const [value, setValue] = useState(selectedOne?.option_value || "")

  const handleInputChange = (optionId: string, price: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event?.target?.value)
    debouncedUpdateCustomOption(optionId, event.target.value, price)
  }

  return (
    <textarea
      onChange={handleInputChange(
        option.option_id?.toString(),
        option?.price || 0,
      )}
      placeholder={
        option?.title ===
          "Any Special Notes About This Submission? Please add any details that will assist in grading your item. Such as variations, exclusives, give-aways, limited edition numbers, signature names, etc."
          ? "Any notes about this submission that you would like to share."
          : option?.title
      }
      value={value}
      className={`rounded-lg px-5 py-3 border border-[#B6B4A2]/60 text-[#100F0F] placeholder:text-[#100f0f]/60 bg-theme-gray bg-transparent w-full ${pathname?.includes("/media-submission") ? "lg:w-2/3" : ""}`}
    />
  )
}

export default AreaInput
