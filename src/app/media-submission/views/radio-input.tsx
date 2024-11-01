import React from 'react'
import useCartItem from '@/hooks/use-cart-item'
import { Value } from '@/types'
import { usePathname } from 'next/navigation'

interface RadioStepProps {
    value: { option_id: number } & Value
}

const RadioInput = ({ value }: RadioStepProps) => {
    const { updateCustomOption, cartItem, removeCustomOption } = useCartItem()
    const pathname = usePathname()
    const selectedOne = cartItem?.product_option?.extension_attributes?.custom_options?.find((option) => option?.option_id?.toString() === value?.option_id?.toString())

    const filteredCustomOption =
        cartItem?.product_option?.extension_attributes?.custom_options?.find(
            (custom_option) => custom_option?.option_id === value?.option_id
        )

    const isSelected = selectedOne?.option_value?.toString() === value?.option_type_id?.toString() || filteredCustomOption?.option_value?.toString() === value?.option_type_id?.toString()
    return (
        <div
            className={
                `flex items-center px-8 py-4 justify-between bg-theme-gray w-full rounded-lg ${pathname.includes("/single-page-form") ? "" : "lg:w-2/3"
                }`
            }
            key={value?.option_type_id}
        >
            <div className={"flex items-center relative gap-6"}>
                <input
                    // onClick={(e) => {
                    //     if (isSelected) {
                    //         e.preventDefault();
                    //         removeCustomOption(value?.option_id);
                    //     }
                    // }}
                    onChange={(e) => {
                        if (!isSelected) {
                            updateCustomOption(
                                value?.option_id,
                                value?.option_type_id,
                                value?.price
                            );
                        }
                    }}
                    checked={isSelected}
                    className={"w-5 h-5 "}
                    type="radio"
                    id={value?.option_type_id?.toString()}
                    name={`${value?.option_id?.toString()}`}
                />
                <label htmlFor={value?.option_type_id?.toString()} className=" text-[18px] font-theme-font-light"  >
                    {value?.title}
                </label>
            </div>
            {value?.price ? (
                <div className={"bg-[#8DE1F3] px-2 py-1 rounded-full text-xs"}>
                    ${value?.price}
                </div>
            ) : null}

        </div>

    )
}

export default RadioInput