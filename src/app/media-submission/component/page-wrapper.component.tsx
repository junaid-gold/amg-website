"use client"
import React, { Dispatch, SetStateAction } from "react"
import { LeftVectorIcon } from "@/components/icons"
import Link from "next/link"
import Image from "next/image"
import BottomNextComponent from "@/app/media-submission/component/bottom-next.component"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useCartItem from "@/hooks/use-cart-item"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createItemInCart } from "../actions"
import toast from "react-hot-toast"
import { errorHandler } from "@/lib/utils"
import WhiteAnimation from "@/components/white-animation"

type componentPropType = {
  children: React.ReactNode
  infoText: string
  title: string
  estimatedPriceFooter?: boolean
  footerBtnLabel?: string
  accordion?: string[]
  setAccordion?: Dispatch<SetStateAction<string[]>>
  isButtonDisabled: boolean
}

const PageWrapperComponent = ({
  title,
  infoText,
  children,
  estimatedPriceFooter,
  footerBtnLabel,
  accordion,
  setAccordion,
  isButtonDisabled,
}: componentPropType) => {
  const searchParams = useSearchParams()
  const currentPage = searchParams.get("currentPage")
  const router = useRouter()
  const { cartItem, resetCartItem } = useCartItem()
  const pathname = usePathname()

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createItemInCart,
    mutationKey: ["create"],
    onSuccess: (data) => {
      if (data?.item_id) {
        toast.success("Item Added to Cart Successfully!")
        router?.push("/")
        queryClient.refetchQueries()
        queryClient.invalidateQueries({
          queryKey: ["customerCartItems"],
          refetchType: "all",
        })
        resetCartItem()
      }
    },
    onError: (error) => {
      errorHandler(error)
    },
  })
  return (
    <div
      className={`flex flex-col justify-start items-center w-full  ${pathname.includes("media-submission")
        ? "min-h-screen py-10 lg:py-16"
        : "py-6"
        }`}
    >
      {pathname.includes("media-submission") && (
        <div className={"max-w-[90rem] w-full flex px-10 justify-between"}>
          <button
            onClick={() => {
              if (Number(currentPage) > 0) {
                router.back()
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
        className={` overflow-hidden w-full flex  flex-col items-center justify-center gap-1 ${pathname.includes("media-submission")
          ? "mt-[10vh] max-w-[90rem] px-10 pb-24"
          : "max-w-[680px]"
          }`}
      >
        {pathname.includes("media-submission") && (
          <p
            className={
              "text-[#B6B4A2] text-[14px] xl:text-base uppercase text-center font-theme-font-medium"
            }
          >
            {infoText}
          </p>
        )}

        <div
          onClick={() => {
            if (setAccordion) {
              if (accordion?.includes(title)) {
                setAccordion((accordion) =>
                  accordion?.filter((acc) => acc !== title)
                )
                return
              }
              setAccordion((acc) => [...acc, title])
            }
          }}
          className={`flex items-center justify-between w-full  ${pathname.includes("single-page-form")
            ? "cursor-pointer px-4"
            : "mb-10"
            }`}
        >
          <h1
            className={`w-full  font-theme-font-medium  ${pathname.includes("media-submission")
              ? "text-center text-[32px] xl:text-[40px]"
              : "text-left text-lg"
              }`}
          >
            {title}
          </h1>

          {!pathname.includes("media-submission") && (
            <svg
              className={`${!accordion?.includes(title) && "rotate-180"}`}
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
          )}
        </div>
        {children}
      </div>
      {estimatedPriceFooter ? (
        <>
          {pathname.includes("media-submission") ? (
            <div
              className={
                "flex items-center px-10 justify-center bg-white fixed bottom-0 w-full"
              }
              style={{ boxShadow: "0px -10.48px 10.48px 0px #8883F01A" }}
            >
              <div
                className={
                  "py-6 md:py-8 gap-1 w-full max-w-[90rem] flex items-center justify-between"
                }
              >
                <div>
                  <p className={"text-[14px] font-theme-font-light"}>
                    Estimated Total
                  </p>
                  <h1 className={"font-theme-font-medium text-[34px]"}>
                    $
                    {(
                      cartItem?.product_option?.extension_attributes?.custom_options?.reduce(
                        (acc, current) => acc + (current?.price || 0),
                        cartItem?.price
                      ) || 0
                    )?.toFixed(2)}
                  </h1>
                </div>
                <button
                  disabled={mutation?.isPending || isButtonDisabled}
                  onClick={() => {
                    if (Number(currentPage) === 5) {
                      const valueInRange = cartItem?.valueRange
                      if (valueInRange) {
                        const { lowerBound, upperBound, valueToCheck } =
                          valueInRange
                        const value = Number(valueToCheck)
                        // Ensure valueToCheck is a valid number
                        if (isNaN(value)) {
                          toast.error(
                            "Invalid value. Please enter a valid number."
                          )
                          return
                        } // Case 1: Only lowerBound exists (upperBound is null)
                        if (upperBound === null && lowerBound !== null) {
                          if (value < lowerBound) {
                            toast.error(
                              `Value must be greater than or equal to ${lowerBound}`
                            )
                            return
                          }
                        }
                        // Case 2: Only upperBound exists (lowerBound is null)
                        if (lowerBound === null && upperBound !== null) {
                          if (value > upperBound) {
                            toast.error(
                              `Value must be less than or equal to ${upperBound}`
                            )
                            return
                          }
                        } // Case 3: Both lowerBound and upperBound exist
                        if (lowerBound !== null && upperBound !== null) {
                          if (value < lowerBound || value > upperBound) {
                            toast.error(
                              `Value must be in the range of ${lowerBound} to ${upperBound}`
                            )
                            return
                          }
                        }
                        // Case 4: No bounds exist (both are null) - invalid case
                        if (lowerBound === null && upperBound === null) {
                          toast.error(
                            "Invalid range. Both bounds cannot be null."
                          )
                          return
                        }
                      }
                    }

                    if (Number(currentPage) > 10) {
                      if (footerBtnLabel) {
                        mutation.mutate({ ...cartItem })
                      } else {
                        router.replace("/#sidebar")
                      }
                    } else {
                      let nextPageNumber = Number(currentPage) + 1
                      if (
                        cartItem?.sku === "VNL003" ||
                        cartItem?.sku === "VNL004" ||
                        cartItem?.sku === "VNL005"
                      ) {
                        if (currentPage === "7" || currentPage === "1") {
                          nextPageNumber = Number(currentPage) + 2
                        }
                      }
                      const params = new URLSearchParams(window.location.search)
                      params.set("currentPage", nextPageNumber?.toString())
                      const newSearch = params?.toString()

                      router.push(`${window.location.pathname}?${newSearch}`)
                    }
                  }}
                  className={`w-[35%] md:w-[50%] lg:w-[20%] rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3 ${isButtonDisabled &&
                    "!bg-[#25242233] !text-[#F4F0ED] !border-[#25242233]"
                    }`}
                >
                  <p className={"font-theme-font-roman"}>
                    {footerBtnLabel ? (
                      mutation?.isPending ? (
                        <WhiteAnimation />
                      ) : (
                        footerBtnLabel
                      )
                    ) : (
                      "Next"
                    )}
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <div
              className={
                "flex items-center px-10 justify-center bg-white fixed bottom-0 w-full"
              }
            // style={{ boxShadow: "0px -10.48px 10.48px 0px #8883F01A" }}
            >
              <div
                className={
                  "py-6 md:py-8 gap-1 w-full max-w-[680px] flex items-center justify-between"
                }
              >
                <button
                  onClick={() => {
                    if (footerBtnLabel === "Add to cart") {
                      mutation.mutate({ ...cartItem })
                    } else {
                      router.replace("/#sidebar")
                    }
                  }}
                  className="w-full text-center bg-black text-white rounded-full text-lg py-4"
                >
                  <p className={"font-theme-font-roman"}>
                    {footerBtnLabel ? footerBtnLabel : "Next"}
                  </p>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>{/* <BottomNextComponent isButtonDisabled={isButtonDisabled} /> */}</>
      )}
    </div>
  )
}

export default PageWrapperComponent
