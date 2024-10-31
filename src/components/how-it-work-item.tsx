import client from "@/sanity/client"
import React from "react"

const HowItWorkItem = async ({
  data,
}: {
  data: {
    heading: string
    text: string
    index: number
  }
}) => {
  return (
    <div
      className={
        "flex px-14 flex-col sm:min-h-fit py-16 lg:py-12 lg:min-h-[377px] min-h-[377px] w-full lg:w-[23.5%] lg:min-w-[18rem] items-start relative justify-start bg-[#EBEAE2] rounded-3xl gap-8"
      }
    >
      <p className={"relative z-10 font-theme-font-medium text-3xl leading-9"}>
        {data?.heading}
      </p>
      <p className={"-mt-5 font-theme-font-light"}>{data.text}</p>
      <p
        className={
          "font-theme-font-medium text-[#B6B4A2] text-[136.312px] lg:block hidden absolute -top-5 left-5 z-0 opacity-20"
        }
      >
        {data?.index?.toString().padStart(2, "0")}
      </p>
    </div>
  )
}

export default HowItWorkItem
