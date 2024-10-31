import React from "react"
import Image from "next/image"
import client from "@/sanity/client"
import { cassetteDataQuery } from "@/sanity/query"
import { CassetteType } from "@/types"
import LinkButton from "./link-button"

const TypeCassetteComponent = async () => {
  const cassetteData: CassetteType[] = await client.fetch(cassetteDataQuery)
  return (
    <div
      className={
        "flex max-w-[90rem] md:mb-7 lg:mb-0 w-full flex-wrap justify-center items-center gap-6 py-20 px-7 lg:px-14"
      }
    >
      {cassetteData.map((cassette, key) => (
        <div
          key={cassette.heading}
          style={{
            background: cassette.backgroundColor,
          }}
          className={`overflow-hidden flex flex-col justify-between relative h-[480px] p-12 w-full sm:w-[48%] xl:w-[48%] rounded-3xl ${
            cassette.backgroundColor !== "#252422" ? "text-black" : "text-white"
          }`}
        >
          <div className="z-10">
            <h1 className={`text-[48px] leading-[1em] font-theme-font-medium`}>
              {cassette.heading}
            </h1>
            <p className={"font-theme-font-medium text-2xl mt-2"}>
              {cassette?.text}
            </p>
          </div>
          <LinkButton
            backgroundColor={cassette?.backgroundColor}
            buttonText={cassette?.buttonText}
          />
          <Image
            src={cassette.image}
            alt={"homepage"}
            width={419.807}
            height={468.371}
            className={`absolute right-0 top-[180px] lg:top-[150px] z-0`}
          />
          {/* <Image
            src={cassette.image}
            alt={"homepage"}
            width={419.807}
            height={468.371}
            className={`
                           absolute  ${key !== 0 ? "-bottom-0" : "-bottom-4"} 
                           ${
                             key !== 0
                               ? key === 3
                                 ? "lg:-bottom-12"
                                 : "lg:-bottom-24"
                               : "lg:-bottom-36"
                           } 
                           ${
                             key !== 0
                               ? key === 1
                                 ? "!w-[93%]"
                                 : "!w-full"
                               : "!w-[88%]"
                           } 
                           !h-[324.663px] lg:!w-[419.807px] lg:!h-[468.371px] 
                           ${key !== 0 ? "lg:-right-[5%]" : "lg:right-0"} 
                           ${
                             key !== 0
                               ? key === 1
                                 ? "right-[4%]"
                                 : "right-[1%]"
                               : "right-[6.3%]"
                           } z-0`}
          /> */}
        </div>
      ))}
    </div>
  )
}

export default TypeCassetteComponent
