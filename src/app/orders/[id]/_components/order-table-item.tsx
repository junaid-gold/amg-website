import { Item, ProductItem } from "@/types"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { getOrderItemDetails } from "../actions"
import BlackAnimation from "@/components/black-animation"

interface OrderTableItemProps {
  itemData: Item
}

const OrderTableItem = ({ itemData }: OrderTableItemProps) => {
  const { data, isPending } = useQuery<ProductItem>({
    queryKey: ["orderItem", itemData?.sku],
    queryFn: () => getOrderItemDetails(itemData?.sku),
    refetchOnWindowFocus: true,
  })

  let mergedOptions: any[] = []
  if (data) {
    const { options } = data

    const product_options =
      itemData?.product_option?.extension_attributes?.custom_options
    // Function to merge product_option values into options
    mergedOptions = options.map((option) => {
      // Find the matching product_option entry by option_id
      const productOption = product_options?.find(
        (po) => parseInt(po.option_id) === option.option_id
      )

      // If a matching product_option is found, add its value to the option object
      if (productOption) {
        return {
          ...option,
          option_value: productOption.option_value,
        }
      }

      return productOption
    })
  }

  return (
    <div className="w-fit justify-start  flex">
      <div className="w-full border-b border-r border-y-[#B6B4A2] border-r-[#B6B4A2] lg:border-r-[#B6B4A2] min-w-[700px] p-6 justify-start items-center gap-2 flex">
        <div className="">
          <p className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
            {itemData?.name}
          </p>
          <div className="mt-4">
            {isPending ? (
              <BlackAnimation />
            ) : (
              <>
                {mergedOptions?.filter((option) => option?.title)?.map((mergedOption) => (
                  <div className="" key={mergedOption?.option_id}>
                    <h1 className="text-lg font-semibold inline-block w-fit">
                      {mergedOption?.title}:
                    </h1>
                    {
                      // @ts-ignore
                      mergedOption?.type === "area" ||
                        mergedOption?.type === "field" ? (
                        <span className="text-lg">
                          {mergedOption?.option_value}
                        </span>
                      ) : (
                        <span className="w-fit text-base inline-block ml-2">
                          {/* @ts-ignore */}
                          {
                            mergedOption?.values?.find(
                              (value: any) =>
                                value?.option_type_id ===
                                Number(mergedOption?.option_value)
                            )?.title
                          }
                        </span>
                      )
                    }
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full border-b border-r border-y-[#B6B4A2] border-r-[#B6B4A2] lg:border-r-[#B6B4A2] min-w-[300px] max-w-[300px] p-6 justify-start items-start gap-2 flex">
        <div className="text-theme-black text-[18px] lg:text-[24px] leading-[21px]">
          {itemData?.sku}
        </div>
      </div>
      <div className="w-full border-b border-r border-y-[#B6B4A2] border-r-[#B6B4A2] lg:border-r-[#B6B4A2] min-w-[130px] max-w-[130px] p-6 justify-start items-start gap-2 flex">
        <div className="text-theme-black text-[18px] lg:text-[24px] leading-[21px]">
          ${itemData?.price_incl_tax}
        </div>
      </div>
      <div className="w-full border-b border-r border-y-[#B6B4A2] border-r-[#B6B4A2] lg:border-r-[#B6B4A2] min-w-[130px] max-w-[130px] p-6 justify-start items-start gap-2 flex">
        <div className="text-theme-black text-[18px] lg:text-[24px] leading-[21px]">
          {itemData?.qty_ordered}
        </div>
      </div>
      <div className="w-full border-b border-r border-y-[#B6B4A2] border-r-[#B6B4A2] lg:border-r-[#B6B4A2] min-w-[160px] max-w-[160px] p-6 justify-start items-start gap-2 flex">
        <div className="text-theme-black text-[18px] lg:text-[24px] leading-[21px]">
          ${itemData?.price_incl_tax}
        </div>
      </div>
    </div>
  )
}

export default OrderTableItem
