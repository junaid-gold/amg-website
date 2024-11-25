import { Option } from "@/types"
import { usePathname } from "next/navigation"
import React, { Dispatch, SetStateAction, useEffect } from "react"
import useCartItem from "@/hooks/use-cart-item"
import SliderInput from "./slider-input"
import RadioInput from "./radio-input"
import DropdownInput from "./dropdown-input"
import FieldInput from "./field-input"
import CheckboxInput from "./checkbox-input"

interface StepProps {
    option: Option & { options: Option[] }
    accordion?: string[]
    setAccordion?: Dispatch<SetStateAction<string[]>>
    customOptions: (Option | {
        title: string;
        sort_order: number;
        option_id: number;
        options: Option[];
    })[]
    isLast: boolean
}

const Step = ({ isLast, option, accordion, setAccordion, customOptions }: StepProps) => {
    const pathname = usePathname()
    const { cartItem } = useCartItem()
    const filteredCustomOption = cartItem?.product_option?.extension_attributes?.custom_options
    const typeOption = customOptions?.find((option) => option?.title === "Type" || option?.title === "How do you want your record displayed?")

    useEffect(() => {
        if (setAccordion) {
            setAccordion((accordion) => [...accordion, option?.title])
        }
    }, [])

    const typeId = typeOption?.option_id;
    // @ts-ignore
    const customOptionType = typeOption?.values?.find((value) => value?.title === "Custom Layout")
    if (option?.title === "Custom Layout Note" || option?.title === "Custom Layout") {
        const isTypeOptionExists = filteredCustomOption?.find((option) => option?.option_id?.toString() === typeId?.toString())
        if (isTypeOptionExists === undefined || isTypeOptionExists === null) {
            return;
        }
        else if (isTypeOptionExists?.option_value?.toString() === customOptionType?.option_type_id?.toString()) {
        } else {
            return;
        }
    }
    return (
        <div>
            <div
                className={`flex flex-col w-full items-center   max-w-[90rem] ${pathname.includes("single-page-form") ? "" : "  py-10 min-h-screen lg:py-16"}`}
            >
                <div
                    className={`flex flex-col items-center  justify-center gap-6 w-full ${pathname.includes("single-page-form")
                        ? " max-w-[680px]"
                        : "mt-[10vh] max-w-[90rem] px-10 pb-24"
                        }`}
                >
                    <div className="w-full space-y-4">
                        <div
                            onClick={() => {
                                if (setAccordion) {
                                    setAccordion((accordion = []) => {
                                        if (accordion.includes(option?.title)) {
                                            return accordion.filter((acc) => acc !== option?.title)
                                        } else {
                                            return [...accordion, option?.title]
                                        }
                                    })
                                }
                            }}
                            className={`flex items-center justify-between w-full  ${pathname.includes("single-page-form")
                                ? "cursor-pointer "
                                : "mb-10"
                                }`}
                        >
                            <h1
                                className={` font-theme-font-medium w-full  ${pathname.includes("single-page-form")
                                    ? "text-left text-lg"
                                    : "text-center text-[32px] xl:text-[40px]"
                                    }`}
                            >
                                {option?.title}  {option?.is_require && "*"}
                            </h1>
                            {pathname?.includes("/single-page-form") && (
                                <button>
                                    <svg
                                        className={`${accordion?.includes(option?.title) && "-rotate-180"
                                            }`}
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
                    </div>
                    {accordion?.includes(option?.title) && (
                        <div
                            className={`${option?.title === "Type" || option?.title === "How do you want your record displayed?" ? "flex flex-wrap" : " flex flex-wrap"
                                } w-full gap-4  max-w-full ${pathname.includes("/single-page-form")
                                    ? option?.type === "drop_down"
                                        ? "flex-nowrap px-3.5 lg:flex-wrap overflow-x-auto no-scrollbar overflow-y-visible justify-start  lg:justify-center gap-2 py-3.5"
                                        : "justify-center"
                                    : "lg:max-w-[70%] justify-center"
                                }`}
                        >
                            {option?.title ===
                                "How much would you like to insure your item?" && (
                                    <p className="font-theme-font-light text-base w-full text-left">
                                        This helps protect your items and guarantees they&apos;re
                                        insured for their full value in case of any issues.
                                    </p>
                                )}

                            {option?.type === "checkbox" && <>
                                <>{
                                    option?.values?.map((value) =>
                                        <CheckboxInput
                                            key={value?.option_type_id}
                                            value={{ option_id: option?.option_id, ...value }} />
                                    )}
                                </>
                            </>
                            }

                            {(option?.title === "Type" || option?.title === "How do you want your record displayed?") && option?.type === "drop_down" && (
                                <>
                                    <div className="flex w-full items-center gap-2.5">
                                        {option?.values?.slice(0, 2)?.map((value) => (
                                            <DropdownInput
                                                key={value?.option_type_id}
                                                title={option?.title}
                                                value={{ option_id: option?.option_id, ...value }}
                                                customLayoutOptionId={typeId!?.toString()}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex w-full items-center gap-2.5">
                                        {option?.values
                                            ?.slice(2, option?.values?.length)
                                            ?.map((value) => (
                                                <DropdownInput
                                                    key={value?.option_type_id}
                                                    title={option?.title}
                                                    value={{ option_id: option?.option_id, ...value }}
                                                    customLayoutOptionId={typeId!?.toString()}
                                                />
                                            ))}
                                    </div>
                                </>
                            )}
                            {option?.type === "radio" &&
                                option?.title ===
                                "What is the estimated value of your record?" && (
                                    <>
                                        <SliderInput
                                            option_id={option?.option_id}
                                            values={option?.values!}
                                        />
                                    </>
                                )}
                            {option?.type === "radio" &&
                                option?.title !==
                                "What is the estimated value of your record?" && (
                                    <>
                                        {
                                            !option?.is_require &&
                                            <RadioInput value={{ option_id: option?.option_id, title: "None" }} />
                                        }
                                        {option?.values?.map((value) => (
                                            <RadioInput
                                                key={value?.option_type_id}
                                                value={{ option_id: option?.option_id, ...value }}
                                            />
                                        ))}
                                    </>
                                )}
                            {option?.type === "drop_down" && option?.title !== "Type" && option?.title !== "How do you want your record displayed?" && (
                                <>
                                    {option?.values?.map((value) => (
                                        <DropdownInput
                                            key={value?.option_type_id}
                                            value={{ option_id: option?.option_id, ...value }}
                                            customLayoutOptionId={typeId!?.toString()}
                                        />
                                    ))}
                                </>
                            )}
                            {option?.title === "Tell us a few details about the album" &&
                                option?.options?.map((innerOption) => {
                                    // if (innerOption?.type === "field") {
                                    return (
                                        <FieldInput
                                            key={innerOption?.option_id}
                                            option={innerOption}
                                        />
                                    )
                                })}
                            {option?.type === "field" && <FieldInput option={option} />}
                            {option?.type === "area" && <FieldInput option={option} />}
                        </div>
                    )}
                </div>
            </div>
            {isLast && (
                <div className="sm:px-0 w-full flex items-center justify-center">
                    <div className="max-w-[620px] bg-[#2524221A] w-full h-px"></div>
                </div>
            )}
        </div>
    )
}

export default Step
