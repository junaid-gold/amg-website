import { ProductItem } from '@/types'
import React from 'react'

interface AlbumProps {
    data: ProductItem

    product_option?: {
        extension_attributes: { custom_options: [{ option_id: string, option_value: string }] }
    }
}
const Album = ({ data, product_option }: AlbumProps) => {

    const { options } = data!

    const product_options = product_option?.extension_attributes?.custom_options

    // Function to merge product_option values into options
    const mergedOptions = options.map((option) => {
        // Find the matching product_option entry by option_id
        const productOption = product_options?.find(
            (po) => parseInt(po.option_id) === option.option_id
        );

        // If a matching product_option is found, add its value to the option object
        if (productOption) {
            return {
                ...option,
                option_value: productOption.option_value,
            };
        }

        // If no match is found, return the option object as is
        return option;
    });

    return (
        <p className="font-theme-font-light leading-[147%] tracking-[0.2px] text-[20px] text-[#100f0f]">

            {
                // @ts-ignore
                mergedOptions?.find((option) => option?.title === "Album Name")?.option_value
            }</p>
    )
}

export default Album