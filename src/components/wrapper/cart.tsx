import Link from "next/link"
import React, { Dispatch, SetStateAction } from "react"
import { CancelIcon, PlusIcon } from "../icons"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { getCurrentCustomerCartItems } from "./actions"
import { Item } from "@/types"
import CartItem from "./cart-item"
import BlackAnimation from "../black-animation"
import ClearCart from "./clear-cart"
import useOpenCart from "@/hooks/use-open-cart"


// Function to sort the shipping and insurance amounts
const sortShippingAndInsurance = (items: Item[]) => {
  return items?.sort((a, b) => {
    // Prioritize shipping and insurance items
    const aIsRelevant = a.sku.includes('shipping') || a.sku.includes('insurance');
    const bIsRelevant = b.sku.includes('shipping') || b.sku.includes('insurance');

    // If both are relevant, sort by name
    if (aIsRelevant && bIsRelevant) {
      return a.name.localeCompare(b.name);
    }

    // If one is relevant and the other is not, the relevant one goes last
    if (aIsRelevant) return 1;
    if (bIsRelevant) return -1;

    // Otherwise, sort by name
    return a.name.localeCompare(b.name);
  });
};

interface CartProps {
  setOpenCart: Dispatch<SetStateAction<boolean>>
}

const Cart = ({ setOpenCart }: CartProps) => {
  const { setOpenCart: setOpenCartGlobal } = useOpenCart()
  const { data, isPending } = useQuery<Item[]>({
    queryFn: getCurrentCustomerCartItems,
    queryKey: ["customerCart"],
    refetchOnWindowFocus: true,
  })
  return (
    <div
      className={"absolute flex z-20 justify-end top-0 left-0 w-full h-full"}
    >
      <div
        onClick={() => {
          setOpenCart(false)
          setOpenCartGlobal(false)
        }}
        className={"bg-[#252422] opacity-40 w-0 lg:w-3/5"}
      />
      <div
        className={
          "w-full lg:w-2/5 relative bg-white h-full flex flex-col justify-between items-center"
        }
      >
        <button
          onClick={() => {
            setOpenCart(false)
            setOpenCartGlobal(false)
          }}
          className={"absolute top-10 right-10"}
        >
          <CancelIcon />
        </button>
        <>
          <div
            className={
              "w-full flex flex-col overflow-hidden h-full justify-center items-center"
            }
          >
            <Link href={"/"} className={"block lg:hidden"}>
              <Image
                src={"/logo/amg.svg"}
                alt={"logo"}
                width={137}
                height={41.144}
                className={
                  "!w-[75px] !h-[22.524px] md:!w-[137px] md:!h-[41.144px] mt-12"
                }
              />
            </Link>
            <p
              className={
                "text-[#000] mb-5 text-base uppercase text-center mt-[2vh] lg:mt-[38px]  font-theme-font-medium"
              }
            >
              Shopping Cart
            </p>
            <div className="space-y-4 pb-64 relative overflow-auto flex-1 w-full z-0 px-10">
              {!isPending ? (
                <>
                  {sortShippingAndInsurance(data as Item[])?.map((item) => (
                    <CartItem

                      setOpenCart={setOpenCart}
                      item_id={item?.item_id}
                      name={item?.name}
                      price={item?.price}
                      key={item?.item_id}
                      sku={item?.sku}
                      qty={item?.qty}
                      quote_id={item?.quote_id}
                      // @ts-ignore
                      product_option={item?.product_option || undefined}
                    />
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center">
                  <BlackAnimation />
                </div>
              )}
            </div>
          </div>
          {!isPending && (
            <div
              className={
                "absolute bottom-0 z-10 bg-white w-full pt-5 b flex flex-col justify-center items-center"
              }
              style={{ boxShadow: "0px -10.48px 10.48px 0px #8883F01A" }}
            >
              <Link
                onClick={() => {
                  setOpenCart(false)
                  setOpenCartGlobal(false)
                }}
                href={"/single-page-form"}
                className={
                  "flex mb-4 gap-2 items-center justify-center w-4/5 rounded-full border border-[#252422] px-4 py-3.5"
                }
              >
                <PlusIcon />
                <p className={"font-theme-font-roman text-[18.86px]"}>
                  Continue Shopping
                </p>
              </Link>

              {data?.length ? (
                <div className="w-full">
                  <div className={"flex items-center justify-center w-full"}>
                    <div
                      className={
                        "py-4 gap-1 w-4/5 flex items-center justify-between"
                      }
                    >
                      <div>
                        <p className={"text-[14px] font-theme-font-light"}>
                          Estimated Total
                        </p>
                        <h1 className={"font-theme-font-medium text-[34px]"}>
                          ${" "}
                          {data?.reduce(
                            (acc, currentValue) =>
                              acc + currentValue?.qty * currentValue?.price,
                            0
                          ) || 0}
                        </h1>
                      </div>
                      {data?.length && (
                        <Link
                          href={"/payment-form"}
                          className={
                            "w-[40%] lg:w-[30%] rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3"
                          }
                        >
                          <p className={"font-theme-font-roman"}>Checkout</p>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="w-4/5 mx-auto flex items-center justify-center  pb-4">
                    <ClearCart
                      itemIds={data?.map((item) => item?.item_id?.toString())}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </>
      </div>
    </div>
  )
}

export default Cart
