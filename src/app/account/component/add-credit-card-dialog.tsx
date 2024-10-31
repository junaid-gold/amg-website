import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { Country } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { storePaymentMethod } from "../actions"
import toast from "react-hot-toast"
import { errorHandler } from "@/lib/utils"
import { useRouter } from "next/navigation"
import WhiteAnimation from "@/components/white-animation"
import {
  creditCardFormSchema,
  CreditCardFormSchemaType,
} from "@/validations/credit-card.valiation"
import { formatCreditCardNumber } from "@/app/payment-form/_components/payment-methods"

interface AddCreditCardDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  countries: Country[]
}
const AddCreditCardDialog = ({
  open,
  setOpen,
  countries,
}: AddCreditCardDialogProps) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    reset,
  } = useForm<CreditCardFormSchemaType>({
    resolver: zodResolver(creditCardFormSchema),
    mode: "onChange", // Enables validation on every change
  })

  const queryClient = useQueryClient();
  const addAddressMutation = useMutation({
    mutationFn: storePaymentMethod,
    onSuccess: (data) => {
      if (data?.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["customerStoredPaymentMethods"],
          refetchType: "all",
        })

        toast.success("Credit Card added Successfully!")
        router.refresh()
        setOpen(false)
      }
    },
    onError: (error) => {
      errorHandler(error)
    },
  })

  const onSubmit = async (data: CreditCardFormSchemaType) => {
    addAddressMutation?.mutate(data)
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative max-w-[680px] w-full transform overflow-hidden rounded-t-3xl md:rounded-3xl bg-white p-6 md:px-8 md:py-12 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="relative">
              <button
                onClick={() => {
                  setOpen(false)
                }}
                className="absolute -top-5  md:-top-8 right-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={26}
                  height={26}
                  fill="none"
                  className="hidden md:block"
                >
                  <path
                    stroke="#252422"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M25 25 13 13m0 0L1 1m12 12L25 1M13 13 1 25"
                  />
                </svg>

                <svg
                  className="md:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="none"
                >
                  <path
                    stroke="#252422"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-9-9m0 0L1 1m9 9 9-9m-9 9-9 9"
                  />
                </svg>
              </button>
              <h1 className="font-bold mt-8 text-4xl text-center">
                Add a Payment Method
              </h1>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-1 p-4  flex-col items-center justify-center w-full gap-6 "
            >
              <div className="flex flex-1  flex-col items-center justify-center w-full gap-4">
                <h1 className="text-[#100F0F] text-lg w-full text-left font-theme-font-medium">
                  Cardholder Information
                </h1>
                <div className="flex items-center w-full flex-col md:flex-row gap-5">
                  <input
                    {...register("firstname")}
                    placeholder={"First name"}
                    className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.firstname?.message === "Required" &&
                      "border-red-500 placeholder-red-500"
                      }`}
                  />
                  <input
                    {...register("lastname")}
                    placeholder={"Last name"}
                    className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.lastname?.message === "Required" &&
                      "border-red-500 placeholder-red-500"
                      }`}
                  />
                </div>
                <input
                  {...register("company")}
                  placeholder={"Company"}
                  className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.company?.message === "Required" &&
                    "border-red-500 placeholder-red-500"
                    }`}
                />
                <input
                  {...register("telephone")}
                  type="number"
                  placeholder={"Phone number"}
                  className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.telephone?.message === "Required" &&
                    "border-red-500 placeholder-red-500"
                    }`}
                />
              </div>

              <div className="flex flex-1  flex-col items-center justify-center w-full gap-4">
                <h1 className="text-[#100F0F] text-lg w-full text-left font-theme-font-medium">
                  Cardholder Address
                </h1>
                <input
                  {...register("street.0")}
                  placeholder={"Address line 1"}
                  className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.street?.[0]?.message === "Required" &&
                    "border-red-500 placeholder-red-500"
                    }`}
                />
                <input
                  {...register("street.1")}
                  placeholder={"Address line 2"}
                  className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.street?.[1]?.message === "Required" &&
                    "border-red-500 placeholder-red-500"
                    }`}
                />
                <div className="w-full relative">
                  <select
                    defaultValue={""}
                    {...register("country_id")}
                    className={`appearance-none rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.country_id?.message === "Required" &&
                      "border-red-500 placeholder-red-500"
                      }`}
                  >
                    <option value="" disabled>
                      Country
                    </option>
                    {countries?.map((country) => (
                      <option key={country?.id} value={country?.id}>
                        {country?.full_name_english}
                      </option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 right-4 flex items-center pr-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={10}
                      height={6}
                      fill="none"
                    >
                      <path
                        stroke="#252422"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 1 5 5 1 1"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex w-full  items-center flex-col md:flex-row gap-5">
                  <input
                    {...register("city")}
                    type="text"
                    placeholder={"City"}
                    className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.city?.message === "Required" &&
                      "border-red-500 placeholder-red-500"
                      }`}
                  />
                  {countries?.find(
                    (country) => country?.id === watch("country_id")
                  )?.available_regions ? (
                    <div className="w-full relative">
                      <select
                        defaultValue={""}
                        {...register("region.region_id")}
                        className={`appearance-none rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.region?.region_id?.message ===
                          "Expected number, received string" &&
                          "border-red-500 placeholder-red-500"
                          }`}
                      >
                        <option value="" disabled>
                          State
                        </option>
                        {countries
                          ?.find(
                            (country) => country?.id === watch("country_id")
                          )
                          ?.available_regions?.map((region) => (
                            <option key={region?.id} value={region?.id}>
                              {region?.name}
                            </option>
                          ))}
                      </select>
                      <span className="absolute inset-y-0 right-4 flex items-center pr-2 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={10}
                          height={6}
                          fill="none"
                        >
                          <path
                            stroke="#252422"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1 5 5 1 1"
                          />
                        </svg>
                      </span>
                    </div>
                  ) : (
                    <input
                      {...register("region.region")}
                      placeholder={"Region"}
                      className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.region?.region?.message === "Required" &&
                        "border-red-500 placeholder-red-500"
                        }`}
                    />
                  )}
                  <input
                    {...register("postcode")}
                    type="number"
                    placeholder={"Postal / Zip"}
                    className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.postcode?.message === "Required" &&
                      "border-red-500 placeholder-red-500"
                      }`}
                  />
                </div>
              </div>

              <div className="flex flex-1  flex-col items-center justify-center w-full gap-4">
                <div className="w-full">
                  <h1 className="text-[#100F0F] text-lg w-full text-left font-theme-font-medium">
                    Cardholder Information
                  </h1>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={38}
                      height={25}
                      fill="none"
                    >
                      <g clipPath="url(#a)">
                        <path
                          fill="#DEDEDE"
                          d="M35 .5H3c-1.7 0-3 1.3-3 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3v-18c0-1.7-1.4-3-3-3Z"
                        />
                        <path
                          fill="#fff"
                          d="M35 1.5c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-18c0-1.1.9-2 2-2h32Z"
                        />
                        <path
                          fill="#142688"
                          d="M28.3 10.6H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3Zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 9.2c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2Zm-13.4-.3.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1Zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2l-1.7.1ZM5 8.7c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2L11.9 16c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 10c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.7Z"
                        />
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path fill="#fff" d="M0 .5h38v24H0z" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={38}
                      height={25}
                      fill="none"
                    >
                      <g clipPath="url(#a)">
                        <path
                          fill="#DEDEDE"
                          d="M35 .5H3c-1.7 0-3 1.3-3 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3v-18c0-1.7-1.4-3-3-3Z"
                        />
                        <path
                          fill="#fff"
                          d="M35 1.5c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-18c0-1.1.9-2 2-2h32Z"
                        />
                        <path
                          fill="#EB001B"
                          d="M15 19.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"
                        />
                        <path
                          fill="#F79E1B"
                          d="M23 19.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"
                        />
                        <path
                          fill="#FF5F00"
                          d="M22 12.5c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7 0 2.3 1.2 4.5 3 5.7 1.8-1.2 3-3.3 3-5.7Z"
                        />
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path fill="#fff" d="M0 .5h38v24H0z" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={38}
                      height={25}
                      fill="none"
                    >
                      <g clipPath="url(#a)">
                        <path
                          fill="#DEDEDE"
                          d="M35 .5H3c-1.7 0-3 1.3-3 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3v-18c0-1.7-1.4-3-3-3Z"
                        />
                        <path
                          fill="#006FCF"
                          d="M35 1.5c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-18c0-1.1.9-2 2-2h32Z"
                        />
                        <path
                          fill="#fff"
                          d="m8.971 10.768.774 1.876H8.203l.768-1.876Zm16.075.078h-2.977v.827h2.929v1.239h-2.923v.922h2.977v.739l2.077-2.245-2.077-2.34-.006.858Zm-14.063-2.34h3.995l.887 1.935.822-1.941h10.37l1.078 1.19L29.25 8.5h4.763l-3.519 3.852 3.483 3.828h-4.834l-1.078-1.19-1.125 1.19H10.03l-.494-1.19h-1.13l-.495 1.19H4L7.286 8.5h3.43l.267.006Zm8.663 1.078h-2.239l-1.5 3.536-1.625-3.536H12.06v4.81L10 9.584H8.007l-2.382 5.512H7.18l.494-1.19h2.596l.494 1.19h2.72v-3.935l1.751 3.941h1.19l1.74-3.929v3.93h1.458l.024-5.52-.001.001Zm9.34 2.768 2.531-2.768h-1.822l-1.601 1.726-1.548-1.726h-5.894v5.518h5.81l1.614-1.738 1.548 1.738h1.875l-2.512-2.75h-.001Z"
                        />
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path fill="#fff" d="M0 .5h38v24H0z" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <input
                    {...register(
                      "creditCardNumber"
                      //     , {
                      //     pattern: {
                      //         value: /^\d{16}$/, // Assuming a 16-digit card number
                      //         message: "Credit Card Number must be 16 digits"
                      //     }
                      // }
                    )}
                    // type="number"
                    onChange={(e) => {
                      const formattedValue = e?.target?.value.replace(/\D/g, ""); // Remove non-numeric characters
                      const finalValue = formatCreditCardNumber(formattedValue)
                      if (errors?.creditCardNumber) {
                        clearErrors("creditCardNumber")
                      }
                      setValue("creditCardNumber", finalValue)
                    }}
                    minLength={13}
                    maxLength={19}
                    placeholder={"Credit Card Number *"}
                    className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.creditCardNumber?.message &&
                      "border-red-500 placeholder-red-500"
                      }`}
                  />
                  {errors?.creditCardNumber?.message && (
                    <p className="text-red-300 text-xs">
                      {errors?.creditCardNumber?.message}
                    </p>
                  )}
                </div>
                <div className="flex w-full items-center md:items-start flex-col md:flex-row gap-5">
                  <div className="w-full flex flex-col items-center gap-1">
                    <input
                      maxLength={2}
                      minLength={2}
                      {...register("creditCardExpiryMonth")}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                        // Check if the value is valid (between 01 and 12) or allow empty value for user typing
                        if (/^(0[1-9]|1[0-2])$/.test(value) || value === "") {
                          setValue("creditCardExpiryMonth", value);
                        }
                        // Clear errors if any when the user starts typing
                        if (errors?.creditCardExpiryMonth) {
                          clearErrors("creditCardExpiryMonth");
                        }
                      }}
                      placeholder={"Expiration MM* "}
                      className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.creditCardExpiryMonth?.message &&
                        "border-red-500 placeholder-red-500"
                        }`}
                    />
                    {errors?.creditCardExpiryMonth?.message && (
                      <p className="text-red-300 text-xs">
                        {errors?.creditCardExpiryMonth?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col items-center gap-1">
                    <input
                      maxLength={4}
                      minLength={4}
                      {...register("creditCardExpiryYear")}

                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

                        // Check if the value is valid (between 01 and 12) or allow empty value for user typing
                        if (Number(value) >= new Date()?.getFullYear()) {
                          setValue("creditCardExpiryYear", value);
                        }
                        // Clear errors if any when the user starts typing
                        if (errors?.creditCardExpiryYear) {
                          clearErrors("creditCardExpiryYear");
                        }
                      }}
                      placeholder={"Expiration YYYY*"}
                      className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.creditCardExpiryYear?.message &&
                        "border-red-500 placeholder-red-500"
                        }`}
                    />
                    {errors?.creditCardExpiryYear?.message && (
                      <p className="text-red-300 text-xs">
                        {errors?.creditCardExpiryYear?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <input
                      minLength={3}
                      maxLength={4}
                      {...register("creditCardCvc", {
                        pattern: {
                          value: /^\d{3,4}$/,
                          message: "Invalid CVC",
                        },
                      })}

                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                        setValue("creditCardCvc", value);
                        // Clear errors if any when the user starts typing
                        if (errors?.creditCardCvc) {
                          clearErrors("creditCardCvc");
                        }
                      }}

                      placeholder={"CVC*"}
                      className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.creditCardCvc?.message &&
                        "border-red-500 placeholder-red-500"
                        }`}
                    />

                    {errors?.creditCardCvc?.message && (
                      <p className="text-red-300 text-xs">
                        {errors?.creditCardCvc?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={
                  "w-full rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3"
                }
                disabled={addAddressMutation?.isPending}
              >
                <p className={"font-theme-font-roman"}>
                  {addAddressMutation?.isPending ? <WhiteAnimation /> : "Save"}
                </p>
              </button>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default AddCreditCardDialog
