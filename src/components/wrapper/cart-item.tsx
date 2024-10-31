import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  deleteItemFromCart,
  getCartItemDetails,
  updateCartItemQuantity,
} from "./actions"
import toast from "react-hot-toast"
import { errorHandler } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import BlackAnimation from "../black-animation"
import useCartItem from "@/hooks/use-cart-item"
import { debounce } from "lodash"
import Image from "next/image"
import { ProductItem } from "@/types"
import Artist from "./artist"
import Album from "./album"
import useOpenCart from "@/hooks/use-open-cart"

const CartItemDetails = dynamic(() => import("./cart-item-details"), {
  ssr: false,
})
interface CartItemProps {
  item_id: number
  name: string
  price: number
  sku: string
  quote_id: string
  qty: number
  product_option?: {
    extension_attributes: {
      custom_options: [{ option_id: string; option_value: string }]
    }
  }

  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>
}

const CartItem = ({
  item_id,
  name,
  price,
  sku,
  qty,
  quote_id,
  product_option,
  setOpenCart
}: CartItemProps) => {
  const { setCartItem } = useCartItem()
  const [showDetails, setShowDetails] = useState(false)
  const queryClient = useQueryClient()
  const [quantity, setQuantity] = useState(qty)
  const router = useRouter()

  const { data, isPending } = useQuery<ProductItem>({
    queryKey: ["customerCart", sku],
    queryFn: () => getCartItemDetails(sku),
    refetchOnWindowFocus: true,
  })
  const { setOpenCart: setOpenCartGlobal } = useOpenCart()

  useEffect(() => {
    setQuantity(qty)
  }, [qty])
  const deleteMutation = useMutation({
    mutationFn: deleteItemFromCart,
    mutationKey: [`cart-item-${item_id}`],
    onSuccess: (data) => {
      if (data) {
        toast.success("Item deleted Successfully!")
        queryClient.invalidateQueries({
          queryKey: ["customerCart"],
          refetchType: "all",
        })
        queryClient.refetchQueries({
          queryKey: ["customerCartItems"],
        })
        router.refresh()
      }
    },
    onError: (error) => {
      errorHandler(error)
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateCartItemQuantity,
    mutationKey: [`cart-item-update-${item_id}`],
    onSuccess: (data) => {
      if (data?.status === 200) {
        // toast.success("Item Quantity Update Successfully!")
        queryClient.refetchQueries({
          queryKey: ["customerCart"],
        })

        router.refresh()
      }
    },
    onError: (error) => {
      errorHandler(error)
    },
  })

  const isRegularItem = [
    "VNL001",
    "VNL002",
    "VNL003",
    "VNL004",
    "VNL005",
  ]?.some((prefix) => sku?.startsWith(prefix))

  const handleEditClick = () => {
    let customOptions: { price?: number | undefined; option_id: string; option_value: string }[] = [];
    (product_option?.extension_attributes?.custom_options?.forEach((option) => {
      const filteredOption = data?.options?.find((dataOption) => dataOption?.option_id?.toString() === option?.option_id)
      if (filteredOption?.type === "radio") {
        customOptions.push({ ...option, price: filteredOption?.values?.find((valueId) => valueId?.option_type_id?.toString() === option?.option_value)?.price || 0 })
      }
      if (filteredOption?.type === "field") {
        customOptions.push({ ...option, price: filteredOption?.price })
      }
      if (filteredOption?.type === "drop_down") {
        customOptions.push({ ...option, price: filteredOption?.values?.find((valueId) => valueId?.option_type_id?.toString() === option?.option_value)?.price || 0 })
      }
      if (filteredOption?.type === "checkbox") {
        customOptions.push({ ...option, price: filteredOption?.values?.find((valueId) => valueId?.option_type_id?.toString() === option?.option_value)?.price || 0 })
      }
      if (filteredOption?.type === "area") {
        customOptions.push({ ...option, price: filteredOption?.price })
      }
    }))
    setCartItem({
      item_id,
      sku,
      qty,
      price: data?.price || 0,
      quote_id,
      // @ts-ignore
      product_option: {
        extension_attributes: {
          custom_options: customOptions
        },
      } || { extension_attributes: { custom_options: [] } }, // Provide default value
    })
    setOpenCartGlobal(false)
    setOpenCart(false)
    router.push("/single-page-form")
  }
  function handleDebounceFn(quantity: number) {
    updateMutation?.mutate({
      itemId: item_id?.toString(),
      cartItem: { qty: quantity, quote_id },
    })
  }

  const debounceFn = useCallback(debounce(handleDebounceFn, 300), [])

  return (
    <div className="w-full">
      <div key={item_id} className={"flex gap-4 w-full"}>
        <div className="w-28 h-28">
          {name === "8 Track" && (
            <Image
              src="/images/8Track.png"
              className="object-contain"
              alt={name}
              height={112}
              width={112}
            />
          )}
          {name === "Vinyl" && (
            <Image
              src="/images/vinyl.png"
              className="object-contain"
              alt={name}
              height={112}
              width={112}
            />
          )}
          {name === "CD" && (
            <Image
              src="/images/cd.png"
              className="object-contain"
              alt={name}
              height={112}
              width={112}
            />
          )}
          {name === "Cassette" && (
            <Image
              src="/images/cassette.png"
              className="object-contain"
              alt={name}
              height={112}
              width={112}
            />
          )}
          {name.includes("SHIPPING") && (
            <Image
              src="/images/shipping.png"
              className="object-contain"
              alt={name}
              height={112}
              width={112}
            />
          )}
          {name.includes("INSURANCE") && (
            <Image
              src="/images/insurance.png"
              className="object-contain"
              alt={name}
              height={112}
              width={112}
            />
          )}
          {/* <SquareVinylIcon /> */}
        </div>
        {/* Old Design */}
        <div className="flex-1 ">
          <div className={" w-full flex flex-col p-2 justify-between"}>
            <div className="flex items-center justify-between">
              {" "}
              <p className="font-theme-font-medium leading-[147%] tracking-[0.2px] text-[20px] text-[#100f0f]">
                {isPending ? (
                  <BlackAnimation />
                ) : (
                  <Artist data={data!} product_option={product_option} />
                )}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isRegularItem && (
                    <button
                      onClick={() => {
                        setShowDetails((showDetails) => !showDetails)
                      }}
                      className={"font-theme-font-light underline text-[14px]"}
                    >
                      {showDetails ? "Hide Details" : "View Details"}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              {isPending ? (
                <BlackAnimation />
              ) : (
                <Album data={data!} product_option={product_option} />
              )}
              <p
                className={
                  "font-theme-font-bold text-[20px] leading-[84%] tracking-[0.2px]"
                }
              >
                ${price}
              </p>
            </div>
            <p
              className={
                "font-theme-font-light text-[16px] leading-[147%] tracking-[0.16px] text-[#100f0f]"
              }
            >
              {name}
            </p>

            <div className="flex items-end justify-between">
              <div>
                {isRegularItem && (
                  <div className="flex items-center gap-x-[24px]">
                    <button
                      onClick={handleEditClick}
                      className={"font-theme-font-light underline text-[14px]"}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        deleteMutation?.mutate(item_id)
                      }}
                      disabled={
                        deleteMutation?.isPending || updateMutation?.isPending
                      }
                      className={"font-theme-font-light underline text-[14px]"}
                    >
                      {deleteMutation?.isPending ? (
                        <BlackAnimation />
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                )}
              </div>
              <div>
                {isRegularItem && (
                  <div className="flex items-center gap-x-2 relative">
                    <div className="flex w-fit items-center border px-[20px] border-[#B6B4A2] rounded-[8px] h-[50px] max-w-[100px]">
                      <button
                        onClick={() => {
                          // setQuantity((quantity) => quantity - 1);
                          updateMutation?.mutate({
                            itemId: item_id?.toString(),
                            cartItem: { qty: qty - 1, quote_id },
                          })
                        }}
                        className="flex items-center justify-center text-clip w-[16px] h-[16px]"
                        disabled={
                          qty === 1 ||
                          deleteMutation?.isPending ||
                          updateMutation?.isPending
                        }
                      >
                        -
                      </button>
                      <span className="text-[18px] font-theme-font-light leading-[147%] tracking-[0.18px]">
                        <input
                          value={quantity}
                          disabled={
                            deleteMutation?.isPending ||
                            updateMutation?.isPending
                          }
                          type="number"
                          className="w-10 text-center bg-transparent"
                          onChange={(e) => {
                            const value = e?.target?.value
                            if (Number(value) > -1) {
                              setQuantity(Number(value))
                              debounceFn(Number(value))
                            }
                          }}
                        />
                      </span>
                      <button
                        onClick={() => {
                          // setQuantity((quantity) => quantity + 1);
                          updateMutation?.mutate({
                            itemId: item_id?.toString(),
                            cartItem: { qty: qty + 1, quote_id },
                          })
                        }}
                        disabled={
                          deleteMutation?.isPending || updateMutation?.isPending
                        }
                        className="flex items-center justify-center text-clip w-[16px] h-[16px]"
                      >
                        +
                      </button>
                    </div>
                    {updateMutation?.isPending && (
                      <svg
                        aria-hidden="true"
                        className="w-[20px] absolute right-[-30px] h-[20px] text-gray-400 animate-spin dark:text-gray-600 fill-black"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Old Design */}
      </div>
      {showDetails && (
        <CartItemDetails product_option={product_option} sku={sku} />
      )}
    </div>
  )
}

export default CartItem
