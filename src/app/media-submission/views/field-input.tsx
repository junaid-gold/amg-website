/* eslint-disable react-hooks/exhaustive-deps */
import useCartItem from "@/hooks/use-cart-item"
import { Option } from "@/types"
import { debounce } from "lodash"
import { usePathname } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"

interface FieldInputProps {
  option: Option
}

const FieldInput = ({ option }: FieldInputProps) => {
  const { option_id } = option
  const { setValueRange, cartItem } = useCartItem()
  const { updateCustomOption, removeCustomOption } = useCartItem()
  const debouncedUpdateCustomOption = useCallback(
    debounce((optionId: string, value: string, price: number) => {
      if (value?.length) {

        updateCustomOption(Number(optionId), value, price)
        if (option?.title === "How much would you like to insure your item?") {
          setValueRange(
            cartItem?.valueRange?.lowerBound!,
            cartItem?.valueRange?.upperBound!,
            Number(value)
          )
        }
      } else {
        removeCustomOption(Number(optionId))
      }
    }, 300),
    [updateCustomOption, cartItem?.valueRange?.lowerBound, cartItem?.valueRange?.upperBound]
  )

  const handleInputChange = (optionId: string, price: number) => (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event?.target?.value)
    debouncedUpdateCustomOption(optionId, event.target.value, price)
  }

  const selectedOne = cartItem?.product_option?.extension_attributes?.custom_options?.find((option) => option?.option_id?.toString() === option_id?.toString())

  const [value, setValue] = useState(selectedOne?.option_value || "")

  useEffect(() => {
    if (option?.title === "How much would you like to insure your item?") {
      setValueRange(
        cartItem?.valueRange?.lowerBound!,
        cartItem?.valueRange?.upperBound!,
        Number(selectedOne?.option_value)
      )
    }
  }, [])
  const pathname = usePathname()
  return (
    <div className={`rounded-lg px-5 py-3 flex items-center border border-[#B6B4A2]/60 text-[#100F0F] placeholder:text-[#100f0f]/60 bg-theme-gray bg-transparent w-full ${pathname?.includes("/media-submission") ? "lg:w-2/3" : ""
      }`}>

      {
        (value as string)?.length && option?.title === "How much would you like to insure your item?" ? <span>$</span> : null
      }
      {
        option?.type === "field" ?

          <input
            placeholder={`${option?.title} ${option?.is_require ? "*" : ""}`}
            onChange={
              handleInputChange(
                option.option_id?.toString(),
                option?.price || 0,
              )
            }
            value={value}
            className="w-full bg-transparent flex-1 outline-none"
          /> :
          <textarea
            placeholder={`${option?.title} ${option?.is_require ? "*" : ""}`}
            onChange={
              handleInputChange(
                option.option_id?.toString(),
                option?.price || 0,
              )
            }
            value={value}
            className="w-full bg-transparent flex-1 outline-none"
          />
      }
    </div>
  )
}

export default FieldInput
