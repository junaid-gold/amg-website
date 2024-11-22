import { Item, ProductItem } from "@/types"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { getOrderItemDetails } from "../actions"
import BlackAnimation from "@/components/black-animation"

interface OrderTableItemProps {
  itemData: Item
  details: { sku: string, options: [{ label: string, value: string }] }
}

const OrderTableItem = ({ itemData, details }: OrderTableItemProps) => {


  return (
    <div className="w-fit justify-start  flex">
      <div className="w-full border-b border-r border-y-[#B6B4A2] border-r-[#B6B4A2] lg:border-r-[#B6B4A2] min-w-[700px] p-6 justify-start items-center gap-2 flex">
        <div className="">
          <p className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
            {itemData?.name}
          </p>
          <div className="mt-4">
            <>

              {details?.options?.map((item, index) =>
                <div className="" key={index}>

                  <h1 className="text-lg font-semibold inline-block w-fit">
                    {item?.label}:
                  </h1>

                  <span className="w-fit text-base inline-block ml-2">
                    {item?.value}</span>
                </div>)}
            </>
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
