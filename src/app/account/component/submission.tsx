"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SubmissionProps {
  products: Product;
}

const Submission = ({ products }: SubmissionProps) => {
  const router = useRouter()

  return (
    <div className="w-full max-w-[90rem] justify-center items-center pt-10 lg:py-16 flex flex-col gap-8">
      <div className="w-full flex justify-center items-center">
        <h3 className="font-theme-font-medium lg:mb-8 px-5 lg:px-12 w-full text-[24px] md:text-[32px]">
          All submissions
        </h3>
      </div>

      <div className="relative w-full">
        <div
          className="border border-[#F2F1F1] border-r-0 lg:border-theme-gray flex gap-2 overflow-x-auto w-full"
        >
          <div className={"xl:w-full"}>
            {/* Header */}
            <div className="bg-white w-full justify-start items-start flex">
              {/* <div className="min-w-[80px] p-6 justify-center items-center gap-2 flex">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 rounded border-[#D9D9D9] text-black min-w-fit"
                />
              </div> */}
              <div className="w-full border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[150px] p-6 justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Options
                </div>
              </div>
              <div className="w-full border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[250px] p-6 justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  ID #
                </div>
              </div>
              <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[250px] justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Name
                </div>
              </div>
              <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[150px] justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Type to
                </div>
              </div>
              <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[150px] justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Photo
                </div>
              </div>
              <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[160px] justify-start items-center gap-2 flex">
                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                  Grade
                </div>
              </div>
            </div>

            {/* Body */}
            {products?.items
              ?.filter(
                (item) =>
                  item?.name !== "SHIPPING AMOUNT" &&
                  item?.name !== "RETURN INSURANCE AMOUNT"
              )?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              ?.map((value, index) => (
                <div
                  key={value?.sku}

                  className={`${index % 2 === 1 ? "bg-theme-gray" : "bg-white"} ${value?.custom_attributes?.find(
                    (custom_attribute) =>
                      custom_attribute?.attribute_code ===
                      "c2c_received_date"
                  ) && "cursor-pointer"} w-full justify-start items-center flex`}
                >
                  {/* <div className="min-w-[80px] p-6 justify-center items-center gap-2 flex">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-5 w-5 rounded border-[#D9D9D9] text-black min-w-fit"
                  />
                </div> */}
                  <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[150px] justify-start items-center gap-2 flex">
                    <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
                      {
                        value?.custom_attributes?.find(
                          (custom_attribute) =>
                            custom_attribute?.attribute_code === "c2c_graded_date"
                        )
                          ? (
                            <>
                              <div className="mb-2">
                                Received on: <br />
                                {moment(
                                  value?.custom_attributes?.find(
                                    (custom_attribute) =>
                                      custom_attribute?.attribute_code ===
                                      "c2c_received_date"
                                  )?.value
                                )?.format("L")}
                              </div>
                              <Link className="text-base w-fit  rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-5 py-1" href={`/submission/${value?.sku}`}>View</Link>

                            </>
                          ) : (
                            <>
                              {"Item Not Received by AMG Yet."
                              }
                              <br />

                            </>
                          )}
                    </div>
                  </div>
                  <div className="w-full border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[250px] p-6 justify-start items-center gap-2 flex">
                    <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                      {value?.sku}
                    </div>
                  </div>
                  <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[250px] justify-start items-center gap-2 flex">
                    <div className="text-theme-black text-[18px] lg:text-[24px] overflow-hidden text-ellipsis whitespace-nowrap font-theme-font-light leading-[24px]">
                      {value?.name}
                    </div>
                  </div>
                  <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[150px] justify-start items-center gap-2 flex">
                    <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
                      Grading
                    </div>
                  </div>
                  <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[150px] justify-start items-center gap-2 flex">
                    <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
                      {value?.custom_attributes?.find(
                        (custom_attribute) =>
                          custom_attribute?.attribute_code === "image"
                      ) ? (
                        <Image
                          className={"rounded-md"}
                          src={`${process.env.NEXT_PUBLIC_MAGENTO_API_END_POINT}/pub/media/catalog/product${value?.custom_attributes?.find(
                            (custom_attribute) =>
                              custom_attribute?.attribute_code === "image"
                          )?.value
                            }`}
                          alt={"photo"}
                          width={98}
                          height={98}
                        />
                      ) : (
                        <Image
                          className={"rounded-md"}
                          src={`https://staging.audiomediagrading.com/pub/media/catalog/product/placeholder/default/amgcomingsoon_2.jpg`}
                          alt={"photo"}
                          width={98}
                          height={98}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[170px] justify-start items-center gap-2 flex">
                    <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
                      {value?.custom_attributes?.find(
                        (custom_attribute) =>
                          custom_attribute?.attribute_code === "c2c_graded_date"
                      ) ? (
                        <>
                          {
                            value?.custom_attributes?.find(
                              (custom_attribute) =>
                                custom_attribute?.attribute_code === "c2c_grade"
                            )?.value
                          }{" "}
                          On
                          <br />
                          {moment(
                            value?.custom_attributes?.find(
                              (custom_attribute) =>
                                custom_attribute?.attribute_code ===
                                "c2c_graded_date"
                            )?.value
                          )?.format("L")}
                        </>
                      ) : (
                        "Item Not Graded Yet."
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;
