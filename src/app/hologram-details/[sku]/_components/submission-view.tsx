"use client"
import React, { useState } from "react"
import { LeftArrow, VinylIcon } from "@/components/icons"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ProductItem } from "@/types"
import moment from "moment"
import Link from "next/link"

interface SubmissionViewProps {
  productData: ProductItem
}

const SubmissionView = ({ productData }: SubmissionViewProps) => {
  const router = useRouter()
  const [selectedButton, setSelectedButton] = useState<number>(0)

  const { custom_attributes } = productData

  const hologramId = custom_attributes?.find(
    (custom_attribute) => custom_attribute?.attribute_code === "c2c_holoid"
  )
  const artist = custom_attributes?.find(
    (custom_attribute) => custom_attribute?.attribute_code === "amg_artist"
  )

  const album = custom_attributes?.find(
    (custom_attribute) => custom_attribute?.attribute_code === "amg_album_name"
  )

  const releaseYear = custom_attributes?.find(
    (custom_attribute) =>
      custom_attribute?.attribute_code === "amg_release_year"
  )

  const label = custom_attributes?.find(
    (custom_attribute) =>
      custom_attribute?.attribute_code === "amg_record_label"
  )

  const series = custom_attributes?.find(
    (custom_attribute) => custom_attribute?.attribute_code === "c2c_series"
  )
  const catalogNumber = custom_attributes?.find(
    (custom_attribute) =>
      custom_attribute?.attribute_code === "amg_catalog_number"
  )
  const dateGraded = custom_attributes?.find(
    (custom_attribute) => custom_attribute?.attribute_code === "c2c_graded_date"
  )
  const masterGrade = custom_attributes?.find(
    (custom_attribute) => custom_attribute?.attribute_code === "c2c_grade"
  )

  const media = custom_attributes?.find(
    (custom_attribute) => custom_attribute?.attribute_code === "amg_sub_media"
  )
  const pPackage = custom_attributes?.find(
    (custom_attribute) => custom_attribute?.attribute_code === "amg_sub_package"
  )

  return (
    <div className={"flex flex-col items-center justify-center w-full"}>
      <div className={"max-w-[90rem] p-8 lg:p-12 w-full"}>
        <Link href={"/archiving"} className={"flex gap-4 mb-12"}>
          <LeftArrow />
          <p className={"text-[#854CFF] text-[18px] font-theme-font-roman"}>
            Back to archiving
          </p>
        </Link>
        <div
          className={
            "flex flex-col md:flex-row justify-between gap-6 md:gap-10 lg:items overflow-hidden-start w-full"
          }
        >
          <h1
            className={
              "font-theme-font-medium md:hidden text-start text-[36px] lg:text-[48px]"
            }
          >
            {productData?.name}
          </h1>
          <div className="flex-1 overflow-x-auto flex flex-row md:flex-col flex-nowrap space-x-4 md:space-x-0 md:space-y-8">
            {productData?.custom_attributes?.find(
              (custom_attribute) =>
                custom_attribute?.attribute_code === "thumbnail"
            ) ? (
              <>
                {productData?.media_gallery_entries?.filter((media) => media?.types?.length)?.map((media) => (
                  <div
                    key={media?.id}
                    style={{ backgroundColor: "white" }}
                    className="min-w-[calc(100vw-80px)] max-w-[calc(100vw-80px)] sm:min-w-[calc(100vw-160px)] sm:max-w-[calc(100vw-160px)] md:max-w-none md:min-w-0 p-8 sm:p-16 rounded-3xl"
                  >
                    <div className="w-full h-72  sm:h-96 md:h-96 lg:h-[560px] relative">
                      <a className="w-full h-full" href={`${process.env.NEXT_PUBLIC_MAGENTO_API_END_POINT}/pub/media/catalog/product${media?.file}`} target="_blank" rel="noopener noreferrer">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_MAGENTO_API_END_POINT}/pub/media/catalog/product${media?.file}`}
                          alt={media?.id?.toString()}
                          fill
                          className={"!w-full h-full object-contain"}
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div
                style={{ backgroundColor: "white" }}
                className="min-w-[calc(100vw-80px)] md:max-w-none md:min-w-0 p-8 sm:p-16 rounded-3xl"
              >
                <div className="w-full h-72 sm:h-96 md:h-96 lg:h-[560px]  relative">
                  <Image
                    src={`https://staging.audiomediagrading.com/pub/media/catalog/product/placeholder/default/amgcomingsoon_2.jpg`}
                    alt={"product"}
                    fill
                    className={"!w-full h-full object-contain"}
                  />
                </div>
              </div>
            )}
            {/* <div style={{ backgroundColor: "white" }} className="min-w-[calc(100vw-80px)] max-w-[calc(100vw-80px)] sm:min-w-[calc(100vw-160px)] sm:max-w-[calc(100vw-160px)] md:max-w-none md:min-w-0 p-8 sm:p-16 rounded-3xl">
              <div className="w-full h-72 sm:h-96 md:h-[560px] relative">
                <Image
                  src={`https://staging.audiomediagrading.com/pub/media/catalog/product/placeholder/default/amgcomingsoon_2.jpg`}
                  alt={"product"}
                  fill
                  className={"!w-full h-full"}
                />
              </div>
            </div>
            <div style={{ backgroundColor: "white" }} className="min-w-[calc(100vw-80px)] max-w-[calc(100vw-80px)] sm:min-w-[calc(100vw-160px)] sm:max-w-[calc(100vw-160px)] md:max-w-none md:min-w-0 p-8 sm:p-16 rounded-3xl">
              <div className="w-full h-72 sm:h-96 md:h-[560px] bg-white relative">
                <Image
                  src={`https://staging.audiomediagrading.com/pub/media/catalog/product/placeholder/default/amgcomingsoon_2.jpg`}
                  alt={"product"}
                  fill
                  className={"!w-full h-full"}
                />
              </div>
            </div>
            <div style={{ backgroundColor: "white" }} className="min-w-[calc(100vw-80px)] max-w-[calc(100vw-80px)] sm:min-w-[calc(100vw-160px)] sm:max-w-[calc(100vw-160px)] md:max-w-none md:min-w-0 p-8 sm:p-16 rounded-3xl">
              <div className="w-full h-72 sm:h-96 md:h-[560px]  relative">
                <Image
                  src={`https://staging.audiomediagrading.com/pub/media/catalog/product/placeholder/default/amgcomingsoon_2.jpg`}
                  alt={"product"}
                  fill
                  className={"!w-full h-full"}
                />
              </div>
            </div> */}
          </div>
          <div
            className={
              "!w-full flex-1 md:sticky md:top-2.5 md:overflow-y-auto md:h-screen flex flex-col gap-4"
            }
          >
            <h1
              className={
                "font-theme-font-medium hidden md:block text-start text-[36px] lg:text-[48px]"
              }
            >
              {productData?.name}
            </h1>
            <div className={"flex gap-4"}>
              <button
                onClick={() => setSelectedButton(0)}
                className={`${selectedButton === 0 ? "bg-[#B6B4A2]" : "bg-transparent"
                  } border border-[#B6B4A2] py-2 px-3 sm:py-3 sm:px-6 text-base rounded-full`}
              >
                <p>Album Details</p>
              </button>
              <button
                onClick={() => setSelectedButton(1)}
                className={`${selectedButton === 1 ? "bg-[#B6B4A2]" : "bg-transparent"
                  } border border-[#B6B4A2] py-2 px-3 sm:py-3 sm:px-6 text-base rounded-full`}
              >
                <p>Grading</p>
              </button>
            </div>
            <div className={"w-full flex flex-wrap flex-row"}>
              {selectedButton === 0 ? (
                <>
                  <div
                    className={
                      "flex items-start justify-start flex-col gap-1 mb-4 w-full sm:w-1/2 md:w-full lg:w-1/2"
                    }
                  >
                    <p className={"font-theme-font-bold text-xl text-left"}>
                      Artist
                    </p>
                    <div className={"flex gap-2 items-center"}>
                      <p
                        className={
                          " text-left text-[14px] md:text-[24px] font-theme-font-light"
                        }
                      >
                        {artist?.value}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      "flex items-start justify-start flex-col gap-1 mb-4 w-full sm:w-1/2 md:w-full lg:w-1/2"
                    }
                  >
                    <p className={"font-theme-font-bold text-xl text-left"}>
                      Album
                    </p>
                    <div className={"flex gap-2 items-center"}>
                      <p
                        className={
                          " text-left text-[14px] md:text-[24px] font-theme-font-light"
                        }
                      >
                        {album?.value}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      "flex items-start justify-start flex-col gap-1 mb-4 w-full sm:w-1/2 md:w-full lg:w-1/2"
                    }
                  >
                    <p className={"font-theme-font-bold text-xl text-left"}>
                      Release Year
                    </p>
                    <div className={"flex gap-2 items-center"}>
                      <p
                        className={
                          " text-left text-[14px] md:text-[24px] font-theme-font-light"
                        }
                      >
                        {releaseYear?.value}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      "flex items-start justify-start flex-col gap-1 mb-4 w-full sm:w-1/2 md:w-full lg:w-1/2"
                    }
                  >
                    <p className={"font-theme-font-bold text-xl text-left"}>
                      Label
                    </p>
                    <div className={"flex gap-2 items-center"}>
                      <p
                        className={
                          " text-left text-[14px] md:text-[24px] font-theme-font-light"
                        }
                      >
                        {label?.value}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      "flex items-start justify-start flex-col gap-1 mb-4 w-full sm:w-1/2 md:w-full lg:w-1/2"
                    }
                  >
                    <p className={"font-theme-font-bold text-xl text-left"}>
                      Catalog #
                    </p>
                    <div className={"flex gap-2 items-center"}>
                      <p
                        className={
                          " text-left text-[14px] md:text-[24px] font-theme-font-light"
                        }
                      >
                        {catalogNumber?.value}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      "flex items-start justify-start flex-col gap-1 mb-4 w-full sm:w-1/2 md:w-full lg:w-1/2"
                    }
                  >
                    <p className={"font-theme-font-bold text-xl text-left"}>
                      Series
                    </p>
                    <div className={"flex gap-2 items-center"}>
                      <p
                        className={
                          " text-left text-[14px] md:text-[24px] font-theme-font-light"
                        }
                      >
                        {series?.value}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={
                      "flex items-start justify-start flex-col gap-1 mb-4 w-full sm:w-1/2 md:w-full lg:w-1/2"
                    }
                  >
                    <p className={"font-theme-font-bold text-xl text-left"}>
                      Hologram ID
                    </p>
                    <div className={"flex gap-2 items-center"}>
                      <p
                        className={
                          " text-left text-[14px] md:text-[24px] font-theme-font-light"
                        }
                      >
                        {hologramId?.value}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      "flex items-start justify-start flex-col gap-1 mb-4 w-full sm:w-1/2 md:w-full lg:w-1/2"
                    }
                  >
                    <p className={"font-theme-font-bold text-xl text-left"}>
                      Date Graded
                    </p>
                    <div className={"flex gap-2 items-center"}>
                      <p
                        className={
                          " text-left text-[14px] md:text-[24px] font-theme-font-light"
                        }
                      >
                        {moment(dateGraded?.value)?.format("L")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      "flex items-start justify-start flex-col gap-1 mb-4 w-full sm:w-1/2 md:w-full lg:w-1/2"
                    }
                  >
                    <p className={"font-theme-font-bold text-xl text-left"}>
                      Master Grade
                    </p>
                    <div className={"flex gap-2 items-center"}>
                      <p
                        className={
                          " text-left text-[14px] md:text-[24px] font-theme-font-light"
                        }
                      >
                        {masterGrade?.value}
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex flex-col"> */}
                  <div
                    className={
                      "flex items-start justify-start flex-col gap-1 mb-4 w-full "
                    }
                  >
                    <p className={"font-theme-font-bold text-xl text-left"}>
                      Sub Grades
                    </p>
                    <div className={"flex gap-2 items-center"}>
                      <p
                        className={
                          " text-left text-[14px] md:text-[24px] font-theme-font-light"
                        }
                      ></p>
                    </div>
                  </div>
                  <div className="flex sm:items-center flex-col sm:flex-row gap-2 sm:gap-4">
                    <div
                      className={
                        "flex items-start justify-start w-fit flex-col gap-1 mb-4"
                      }
                    >
                      <p
                        className={"font-theme-font-bold text-base text-left"}
                      >
                        (P) Package
                      </p>
                      <div className={"flex gap-2 items-center"}>
                        <p
                          className={
                            "text-left text-[14px] md:text-[24px] font-theme-font-light"
                          }
                        >
                          {pPackage?.value}
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        "flex items-start justify-start  w-fit flex-col gap-1 mb-4  "
                      }
                    >
                      <p
                        className={"font-theme-font-bold text-base text-left"}
                      >
                        (M) Media
                      </p>
                      <div className={"flex gap-2 items-center"}>
                        <p
                          className={
                            "text-left text-[14px] md:text-[24px] font-theme-font-light"
                          }
                        >
                          {media?.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => {
                if (productData?.media_gallery_entries?.length) {
                  productData?.media_gallery_entries?.forEach((media) => {
                    const element = document.createElement("a");
                    const file = new Blob(
                      [`${process.env.NEXT_PUBLIC_MAGENTO_API_END_POINT}/pub/media/catalog/product${media?.file}`],
                      { type: "image/*" }
                    );
                    element.href = URL.createObjectURL(file);
                    element.download = "image.jpg";
                    element.click();
                  })
                } else {
                  const element = document.createElement("a");
                  const file = new Blob(
                    [
                      "https://staging.audiomediagrading.com/pub/media/catalog/product/placeholder/default/amgcomingsoon_2.jpg"
                    ],
                    { type: "image/*" }
                  );
                  element.href = URL.createObjectURL(file);
                  element.download = "image.jpg";
                  element.click();
                }
              }}
              className={
                "w-full lg:w-[40%] rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3"
              }
            >
              <p className={"font-theme-font-roman"}>Download media</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmissionView
