"use client"
import TypeMediaView from "../../media-submission/views/type-media.view"
import { Product } from "@/types"
import { Suspense, useEffect, useState } from "react"
import useCartItem from "@/hooks/use-cart-item"
import Step from "@/app/media-submission/views/step"
import FooterWithPrice from "./footer-with-price"

const Tabs = ({ data }: { data: Product }) => {
  const [accordion, setAccordion] = useState<string[]>([""])
  const [currentTab, setCurrentTab] = useState(0)
  const [loading, setLoading] = useState(true)

  const { cartItem, addSku, addPrice } = useCartItem()
  useEffect(() => {
    const skuToPush = localStorage.getItem("skuToPush")
    const priceToPush = localStorage.getItem("priceToPush")
    if (!cartItem?.sku) {
      if (skuToPush) {
        addSku(skuToPush)
      }
    }
    if (!cartItem?.price) {
      if (priceToPush !== "") {
        addPrice(Number(priceToPush))
      }
    }
    setLoading(false)

    setTimeout(() => {
      if (priceToPush) {
        localStorage.removeItem("priceToPush")
      }
      if (skuToPush) {
        localStorage.removeItem("skuToPush")
      }
    }, 2000); // 2-second delay
  }, [])

  useEffect(() => {
    setAccordion((accordion) => ([...accordion, "What type of media are you submitting?"]))
  }, [])

  // Titles to filter for Album-related options
  const albumTitles = [
    "Artist",
    "Album Name",
    "Record Label",
    "Discogs ID (If Known)",
    "Catalog Number (If Known)",
    "Release Year (If Known)",
    "Release Year (If Unknown)",
    "Any notes about this submission that you would like to share?",
  ]

  const selectedSkuOptions = data?.items?.find(
    (item) => item?.sku === cartItem?.sku
  )?.options

  const sortedSelectedSkuOptions = selectedSkuOptions?.sort(
    (a, b) => a.sort_order - b.sort_order
  )

  const otherOptions = sortedSelectedSkuOptions?.filter(
    ({ title }) =>
      title !== "Discogs ID (If Known)"
  )

  const albumSelectedSkuOptions = sortedSelectedSkuOptions?.filter(
    ({ title }) => albumTitles.includes(title)
  )
  const albumSelectedSkuOptionsReOrder = albumSelectedSkuOptions

  const otherSelectedSkuOptions = otherOptions?.filter(
    ({ title }) => !albumTitles.includes(title)
  )
  const finalMergedOptions = [
    ...(otherSelectedSkuOptions || []),
    ...(albumSelectedSkuOptionsReOrder?.length
      ? [
        {
          title: "Tell us a few details about the album",
          sort_order: 0,
          option_id: albumSelectedSkuOptionsReOrder?.[0]?.option_id,
          options: albumSelectedSkuOptionsReOrder, // Ensure 'options' is always present
        },
      ]
      : []),
  ]

  const finalFilteredOptions = finalMergedOptions?.filter(
    (option) => option !== null || option !== undefined
  )
  const isButtonDisabled = selectedSkuOptions
    ?.filter((option) => option?.is_require)
    ?.every((option) =>
      cartItem?.product_option?.extension_attributes?.custom_options?.some(
        (customOption) => customOption?.option_id?.toString() === option?.option_id?.toString()
      )
    )



  const customOrder = ["Vinyl", "CD", "Cassette", "8 Track", "Custom Display"]

  if (loading) {
    return null
  }

  return (
    <div className={"flex flex-col items-center min-h-screen"}>
      <div className="w-full pb-32 md:pb-40 px-6 md:px-0 space-y-6 max-w-[90rem] py-10 mx-auto">
        <Suspense fallback={<></>}>
          {
            <TypeMediaView
              accordion={accordion}
              setAccordion={setAccordion}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              data={data?.items?.filter((item) => item?.status === 1)
                ?.sort((a, b) => {
                  return (
                    customOrder.indexOf(a.name) - customOrder.indexOf(b.name)
                  )
                })
                ?.map((item) => ({
                  id: item?.id,
                  sku: item?.sku,
                  name: item?.name,
                  price: item?.price,
                  imageUrl: item?.media_gallery_entries?.[0]?.file,
                }))}
            />
          }
          <div className="sm:px-0 w-full flex items-center justify-center">
            <div className="max-w-[620px] bg-[#2524221A] w-full h-px"></div>
          </div>
          {
            // @ts-ignore
            finalFilteredOptions
              ?.sort((a, b) => a!.sort_order - b!.sort_order)
              ?.map((option, index) => (
                <div key={option?.option_id} className="space-y-6">
                  <Step
                    // @ts-ignore
                    option={option!}
                    accordion={accordion}
                    setAccordion={setAccordion}
                    customOptions={finalFilteredOptions}
                    isLast={index + 1 !== finalFilteredOptions?.length}
                  />
                </div>
              ))
          }
          <FooterWithPrice isButtonDisabled={!isButtonDisabled} />
        </Suspense>
      </div>
    </div>
  )
}

export default Tabs
