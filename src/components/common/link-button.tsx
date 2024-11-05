"use client"
import useCartItem from "@/hooks/use-cart-item"
import { useRouter } from "next/navigation"
import React from "react"

interface LinkButtonProps {
  buttonText: string
  backgroundColor: string
}

const LinkButton = ({ buttonText, backgroundColor }: LinkButtonProps) => {
  const router = useRouter()
  const { addSku } = useCartItem()
  return (
    <button
      onClick={() => {
        const skuToPush =
          (buttonText === "Submit a vinyl" && "VNL001") ||
          (buttonText === "Submit a CD" && "VNL004") ||
          (buttonText === "Submit an 8-Track" && "VNL005") ||
          (buttonText === "Submit a Cassette" && "VNL003") ||
          ""
        const priceToPush =
          (buttonText === "Submit a vinyl" && 25) ||
          (buttonText === "Submit a CD" && 50) ||
          (buttonText === "Submit an 8-Track" && 50) ||
          (buttonText === "Submit a Cassette" && 50) ||
          ""
        addSku(skuToPush)
        localStorage.setItem("skuToPush", skuToPush)
        localStorage.setItem("priceToPush", priceToPush?.toString())
        router.push("/single-page-form")
      }}
      // href={`/single-page-form?selectedProduct=${cassette?.heading === "Vinyl" && "VNL001"}`}
      className={`w-full relative z-10 mt-16 xl:w-fit rounded-full border border-white xl:border-theme-black text-theme-black bg-white xl:bg-transparent px-6 py-3 ${backgroundColor === "#252422" && "!border-white xl:text-white"
        }`}
    >
      <p className={"font-theme-font-roman"}>{buttonText}</p>
    </button>
  )
}

export default LinkButton
