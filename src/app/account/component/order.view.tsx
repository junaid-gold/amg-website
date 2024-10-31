"use client";
import { DownloadIcon } from "@/components/icons";
import { OrderItem } from "@/types";
import moment from "moment";
import Link from "next/link";

interface OrderViewProps {
  orderItems: OrderItem[];
}

const OrderView = ({ orderItems }: OrderViewProps) => {
  return (
    <div className="w-full max-w-[90rem] justify-center pt-10 lg:py-16 flex flex-col gap-8">
      <div className="w-full flex justify-center items-center">
        <h3 className="font-theme-font-medium lg:mb-8 px-5 lg:px-12 w-full text-[24px] md:text-[32px]">
          All orders
        </h3>
      </div>

      <div className="relative w-full">
        <div
          className="border border-[#F2F1F1] border-r-0 lg:border-[#B6B4A2] flex gap-2 overflow-x-auto w-full"
        >
          <div className={"xl:w-full"}>
            {/* Header */}
            <div className="bg-theme-gray w-full justify-start items-start flex">
              <div className="w-full border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2] min-w-[200px] max-w-[200px] p-6 justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Order #
                </div>
              </div>
              <div className="w-full border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2] min-w-[160px] max-w-[160px] p-6 justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Date
                </div>
              </div>
              <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2] min-w-[270px] max-w-[270px] justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Ship to
                </div>
              </div>
              <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2] min-w-[220px] max-w-[220px] justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Total
                </div>
              </div>
              <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2] min-w-[160px] max-w-[160px] justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Status
                </div>
              </div>
              <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2] min-w-[400px]  justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Action
                </div>
              </div>
            </div>

            {orderItems?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())?.map((value, index) => (
              <Link key={value?.increment_id} href={`/orders/${value?.increment_id}`}>
                <div
                  className={`${index % 2 === 1 ? "bg-white" : "bg-theme-gray"} w-full justify-start items-center flex`}
                >
                  <div className="w-full h-[6.2em] border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2] min-w-[200px] max-w-[200px] p-6 justify-start items-center gap-2 flex">
                    <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px] font-semibold">
                      #{value?.increment_id}
                    </div>
                  </div>
                  <div className="w-full h-[6.2em] border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2] max-w-[160px] min-w-[160px] p-6 justify-start items-center gap-2 flex">
                    <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
                      {moment(value?.created_at)?.format("L")}
                    </div>
                  </div>
                  <div className="w-full p-6 h-[6.2em] border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2] max-w-[270px]  min-w-[270px] justify-start items-center gap-2 flex">
                    <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
                      {value?.customer_firstname} {value?.customer_lastname}
                    </div>
                  </div>
                  <div className="w-full p-6 h-[6.2em] border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2] max-w-[220px]  min-w-[220px] justify-start items-center gap-2 flex">
                    <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
                      ${value?.base_grand_total}
                    </div>
                  </div>
                  <div className="w-full p-6 h-[6.2em] border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2] max-w-[160px]  min-w-[160px] justify-start items-center gap-2 flex">
                    <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
                      {value?.status}
                    </div>
                  </div>
                  <div className="w-full p-6 h-[6.2em] border-r border-r-[#F2F1F1] lg:border-r-[#B6B4A2]   min-w-[400px] justify-start items-center gap-2 flex">
                    {/* Using Backend API Key because the services are  on the old server not on us */}
                    <a
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_MAGENTO_API_END_POINT}/webservices/print/?order=${value?.increment_id}&key=9813y89cryn234ydn`}
                      className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light flex gap-4 items-center leading-[21px]"
                    >
                      <div className="bg-black rounded-full p-2 lg:p-3">
                        <DownloadIcon />
                      </div>
                      Download Packing Slip
                    </a>
                  </div>
                </div></Link>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
