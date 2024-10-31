"use client"
import React, { Dispatch, SetStateAction } from "react"
import { LeftVectorIcon } from "@/components/icons"
import Link from "next/link"
import Image from "next/image"
import SelectedButtonComponent from "@/app/media-submission/component/seelcted-button.component"
import BottomNextComponent from "@/app/media-submission/component/bottom-next.component"
import { usePathname, useRouter } from "next/navigation"
import useCartItem from "@/hooks/use-cart-item"

const TypeMediaView = ({
  data,
  currentTab,
  setCurrentTab,
  accordion,
  setAccordion,
}: {
  data: {
    id: number
    sku: string
    name: string
    price: number
    imageUrl: any
  }[]

  accordion?: string[]
  setAccordion?: Dispatch<SetStateAction<string[]>>
  currentTab: number
  setCurrentTab: Dispatch<SetStateAction<number>>
}) => {
  const { addSku, resetCartItem, cartItem, addPrice } = useCartItem()

  const pathname = usePathname()
  const router = useRouter()
  const title = "What type of media are you submitting?"

  return (
    <div
      className={`flex flex-col w-full  max-w-[90rem] items-center ${pathname.includes("single-page-form")
        ? ""
        : "  py-10 min-h-screen lg:py-16"
        }`}
    >
      {pathname.includes("/media-submission") && (
        <div className={"flex px-10 w-full justify-between"}>
          <button
            onClick={() => {
              if (currentTab > 0) {
                setCurrentTab((currentTab) => currentTab - 1)
              } else {
                router.push("/")
              }
            }}
          >
            <LeftVectorIcon />
          </button>
          <Link href={"/"}>
            <Image
              src={"/logo/amg.svg"}
              alt={"logo"}
              width={137}
              height={41.144}
              className={
                "!w-[75px] !h-[22.524px] lg:!w-[137px] lg:!h-[41.144px]"
              }
            />
          </Link>
          <div className={"w-6"}></div>
        </div>
      )}
      <div
        className={`flex flex-col items-center  justify-center gap-6 w-full ${pathname.includes("single-page-form")
          ? " max-w-[680px]"
          : "mt-[10vh] max-w-[90rem] px-10 pb-24"
          }`}
      >
        {/* <p
          className={
            "text-[#B6B4A2] text-[14px] xl:text-base uppercase text-center font-theme-font-medium"
          }
        >
          Question One
        </p> */}
        <div
          className={`flex items-center justify-between w-full  ${pathname.includes("single-page-form") ? "cursor-pointer " : "mb-10"
            }`}
          onClick={() => {
            if (setAccordion) {
              setAccordion((accordion = []) => {
                if (accordion.includes(title)) {
                  return accordion.filter((acc) => acc !== title)
                } else {
                  return [...accordion, title]
                }
              })
            }
          }}
        >
          <h1
            className={` font-theme-font-medium w-full  ${pathname.includes("/single-page-form")
              ? "text-left text-lg"
              : "text-center text-[32px] xl:text-[40px]"
              }`}
          >
            {title}
          </h1>
          {pathname?.includes("/single-page-form") && (
            <button>
              <svg
                className={`${accordion?.includes(title) && "-rotate-180"}`}
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                height={9}
                fill="none"
              >
                <path
                  fill="#252422"
                  d="M1.148 6.96 7.12 1.236c.171-.168.359-.265.546-.265.188 0 .375.069.519.209l5.972 5.722c.3.286.31.76.022 1.059a.746.746 0 0 1-1.06.022L7.667 2.787l-5.48 5.25a.746.746 0 0 1-1.06-.022.743.743 0 0 1 .022-1.056Z"
                />
              </svg>
            </button>
          )}
        </div>
        {accordion?.includes(title) && (
          <div
            className={`flex flex-wrap w-full  max-w-full ${pathname?.includes("/single-page-form")
              ? "flex-nowrap lg:flex-wrap no-scrollbar overflow-x-auto py-3.5 overflow-y-visible justify-start lg:justify-center gap-2"
              : "gap-4 justify-center"
              }`}
          >
            {data?.map((data) => (
              <SelectedButtonComponent
                key={data?.sku}
                selected={cartItem?.sku === data?.sku}
                onClick={() => {
                  resetCartItem()
                  addSku(data?.sku)
                  addPrice(data?.price)
                }}
                title={title}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_MAGENTO_API_END_POINT}/pub/media/catalog/product${data?.imageUrl}`}
                  alt={data?.sku}
                  width={64}
                  height={64}
                />
                <div className={"flex flex-col items-center justify-center"}>
                  <p
                    className={"text-[14px] font-theme-font-roman font-medium"}
                  >
                    {data?.name}
                  </p>
                  <p className={"text-sm font-theme-font-light-italic"}>
                    Starting at ${data?.price}
                  </p>
                </div>
              </SelectedButtonComponent>
            ))}
          </div>
        )}
      </div>
      {pathname.includes("/media-submission") && (
        <BottomNextComponent
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isButtonDisabled={!cartItem?.sku}
        />
      )}
    </div>
  )
}

export default TypeMediaView
