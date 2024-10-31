import React, { useState } from "react"
import { PlusWhiteIcon, RightArrow } from "@/components/icons"
import { beforeYouSendData, maintainingData, tipsData } from "@/data/help.data"
import FooterComponent from "@/components/common/footer.component"
import { FaqType, HelpType } from "@/types"
import client from "@/sanity/client"
import { faqDataQuery, helpDataQuery } from "@/sanity/query"
import Faq from "./faq"
import Image from "next/image"

export const revalidate = 0
const Help = async () => {
  const helpData: HelpType = await client.fetch(helpDataQuery)
  const faqData: FaqType[] = await client.fetch(faqDataQuery)

  return (
    <>
      <div className={"flex flex-col items-center justify-center"}>
        <div className="flex flex-col relative min-h-[900px] sm:min-h-[1000px] md:min-h-[500px] lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[850px] max-h-[800px] max-w-[1440px] w-full">
          <div className="absolute top-[70px] z-10 text-white max-w-[330px] sm:max-w-[480px] md:max-w-[300px] lg:max-w-[450px] xl:max-w-[544px] mx-auto left-0 right-0 md:left-auto md:right-[50px] md:top-1/3 text-center md:text-left gap-y-[12px] flex flex-col">
            <h1 className="text-[48px] md:text-[30px] lg:text-[46px] xl:text-[52px] leading-[115%] xl:leading-[120%] tracking-[-1.04px] xl:tracking-[0.32px] font-theme-font-medium">
              {helpData?.heading}
            </h1>
            <p className="text-[18px] md:text-[16px] lg:text-[24px] xl:text-[32px] leading-[147%] xl:leading-[147%] tracking-[0.18px] xl:tracking-[0.32px] font-theme-font-light">
              {helpData?.text}
            </p>
          </div>

          <Image
            fill
            src={helpData?.backgroundImage}
            alt={helpData?.heading}
            className="z-0 hidden md:block object-cover object-center"
          />
          <Image
            fill
            src={helpData?.backgroundImageSm}
            alt={helpData?.heading}
            className="z-0 md:hidden object-cover object-bottom w-full"
          />
        </div>
        {/* <div
          className={`flex flex-col items-center px-[30px] relative md:justify-center md:items-end max-w-[480rem] about-container `}
        >
          <h1
            className={
              "md:w-[39%] text-[48px] leading-[115%] mt-[140px] relative z-10 w-full text-center md:text-left lg:px-6 md:mr-20 text-white font-theme-font-medium"
            }
          >
            {helpData?.heading}
          </h1>
          <p
            className={
              "md:w-[39%] text-[18px] leading-[147%] tracking-[0.18px] relative z-10 text-center md:text-left w-full lg:px-6 md:mr-20 mt-[12px] text-white md:leading-[47.2px] font-theme-font-light"
            }
          >
            {helpData?.text}
          </p>
          <Image
            fill
            src={helpData?.backgroundImage}
            alt={helpData?.heading}
            className="z-0 hidden md:block object-cover object-center"
          />
          <Image
            fill
            src={helpData?.backgroundImageSm}
            alt={helpData?.heading}
            className="z-0 md:hidden object-cover object-bottom"
          />
        </div> */}
        <div
          className={
            "px-6 pb-10 flex justify-between w-full max-w-[90rem] mt-[70px]"
          }
        >
          <div className={"hidden lg:flex flex-col"}>
            <p className={"text-[18px]"}>Resources</p>
            <div className={"flex mt-6"}>
              <p className={"font-theme-font-medium text-[32px]"}>
                Before you send {"\n"}Preservation Tips{"\n"}Maintaining Acrylic
              </p>
              <div className={"mt-2 -ml-7"}>
                <RightArrow size={"32"} />
              </div>
            </div>
          </div>
          <div className={"flex flex-col lg:gap-12 gap-6 w-full lg:w-4/6"}>
            {faqData?.map((data) => (
              <Faq key={data?.heading} data={data} />
            ))}
          </div>
        </div>
      </div>

      <FooterComponent />
    </>
  )
}

export default Help
