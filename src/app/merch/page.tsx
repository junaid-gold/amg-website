import { merchData } from "@/data/merch.data"
import FooterComponent from "@/components/common/footer.component"
import Link from "next/link"
import { MerchType } from "@/types"
import client from "@/sanity/client"
import { merchDataQuery } from "@/sanity/query"
import Image from "next/image"

export const revalidate = 0
const Merch = async () => {
  const merchData: MerchType[] = await client.fetch(merchDataQuery)
  return (
    <>
      <div className={"flex flex-col items-center justify-center"}>
        <div
          className={
            "w-full bg-theme-gray gap-3 py-[64px] lg:py-[104px] px-7 lg:px-12 flex flex-col items-center justify-center"
          }
        >
          <h1
            className={
              "font-theme-font-medium text-center text-[48px] lg:text-[64px]"
            }
          >
            Shop AMG Merch
          </h1>
        </div>
        <div className={"w-full max-w-[90rem] flex justify-end my-10 px-6"}>
          <select className={"bg-white"}>
            <option>Featured</option>
            <option>High price</option>
            <option>Low price</option>
          </select>
        </div>
        <div
          className={
            "flex flex-wrap max-w-[90rem] items-start justify-center gap-[2%] mb-20 mt-10 px-6"
          }
        >
          {merchData.map((data) => (
            <div key={data.title} className={"w-full sm:w-[48%] mb-10"}>
              <Link
                href={"/product/0"}
                className={
                  "rounded-3xl flex items-center justify-center relative bg-[#fff] mb-4 lg:mb-6 min-h-[20rem] sm:min-h-[25rem] md:min-h-[30rem] lg:min-h-[45rem] p-12"
                }
              >
                <Image
                  width={620}
                  height={620}
                  alt={data?.title}
                  src={data?.image}
                />

                <div className="px-[8px] w-full max-w-[105px] bg-[#252422] text-[#fff] rounded-[100px] absolute top-[28px] right-[34px] text-center font-theme-font-medium text-[18px] leading-[147%] tracking-[0.16px] h-[45px] flex items-center justify-center">
                  Sold Out
                </div>
              </Link>
              <p
                className={"font-theme-font-medium text-[24px] lg:text-[32px]"}
              >
                {data.title}
              </p>
              <p
                className={
                  "font-theme-font-roman text-[18px] lg:text-[24px] -mt-[0.25rem]"
                }
              >
                ${data.price?.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <FooterComponent />
    </>
  )
}

export default Merch
