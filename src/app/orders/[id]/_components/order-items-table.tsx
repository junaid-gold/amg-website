"use client"
import { Item } from "@/types"
import OrderTableItem from "./order-table-item"

interface OrderItemsTableProps {
  data: Item[]
}

const OrderItemsTable = ({ data }: OrderItemsTableProps) => {
  return (
    <>
      <div className="relative w-full max-w-[90rem] mx-auto">
        <div className="border border-[#B6B4A2]  border-r-0 lg:border-theme-gray flex gap-2 overflow-x-auto w-full">
          <div className={"xl:w-full"}>
            {/* Header */}
            <div className=" w-fit justify-start items-stretch flex">
              <div className="w-full border-y border-r  border-y-[#B6B4A2] border-r-[#B6B4A2] lg:border-r-[#B6B4A2] min-w-[700px] p-6 justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Item
                </div>
              </div>
              <div className="w-full border-y border-r  border-y-[#B6B4A2] border-r-[#B6B4A2] lg:border-r-[#B6B4A2] min-w-[300px] max-w-[300px] p-6 justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  SKU
                </div>
              </div>
              <div className="w-full border-y border-r  border-y-[#B6B4A2] border-r-[#B6B4A2] lg:border-r-[#B6B4A2] min-w-[130px] max-w-[130px] p-6 justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Price
                </div>
              </div>
              <div className="w-full border-y border-r  border-y-[#B6B4A2] border-r-[#B6B4A2] lg:border-r-[#B6B4A2] min-w-[130px] max-w-[130px] p-6 justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Qty
                </div>
              </div>
              <div className="w-full border-y border-r  border-y-[#B6B4A2] border-r-[#B6B4A2] lg:border-r-[#B6B4A2] min-w-[160px] max-w-[160px] p-6 justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Subtotal
                </div>
              </div>
            </div>

            {/* Body */}
            {data?.map((value, index) => (
              <OrderTableItem itemData={value} key={value?.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderItemsTable
