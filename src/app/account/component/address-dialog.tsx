import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction, useEffect } from "react"
import { useForm } from "react-hook-form"
import {
  requiredNameAddressFormSchema,
  RequiredNameAddressFormSchemaType,
} from "@/validations/address.validation"
import { Address, Country } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { addNewAddress, updateAddress } from "../actions"
import toast from "react-hot-toast"
import { errorHandler } from "@/lib/utils"
import { useRouter } from "next/navigation"
import WhiteAnimation from "@/components/white-animation"

interface AddressDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  countries: Country[]
  address?: Address
  addressType?: "Billing" | "Shipping"
}
const AddressDialog = ({
  open,
  setOpen,
  countries,
  address,
  addressType,
}: AddressDialogProps) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RequiredNameAddressFormSchemaType>({
    resolver: zodResolver(requiredNameAddressFormSchema),
  })

  useEffect(() => {
    reset({
      ...address,
      // Ensure `street` is always an array of two strings
      street: [address?.street?.[0] || "", address?.street?.[1] || ""],
      region: {
        region_id: address?.region?.region_id?.toString() || "",
        region: address?.region?.region || "",
      },
    })
  }, [address, reset])

  const mutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success("Addrees Update Successfully!")
        router.refresh()
        setOpen(false)
      }
    },
    onError: (error) => {
      errorHandler(error)
    },
  })

  const addAddressMutation = useMutation({
    mutationFn: addNewAddress,
    mutationKey: ["add-new-address"],
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success("New Address Added Successfully")
        router.refresh()
        setOpen(false)
      }
    },
    onError: (error) => {
      errorHandler(error)
    },
  })
  const onSubmit = async (data: RequiredNameAddressFormSchemaType) => {
    address
      ? mutation.mutate({
        ...data,
        id: address?.id
      })
      : addAddressMutation?.mutate(data)
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
                {address ? "Update your address" : "Add new address"}
              </h1>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-1 p-4  flex-col items-center justify-center w-full gap-6 "
            >
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

                  {countries
                    ?.filter((country) => country?.id === "US")
                    ?.map((country) => (
                      <option key={country?.id} value={country?.id}>
                        {country?.full_name_english}
                      </option>
                    ))}

                  {countries
                    ?.filter((country) => country?.id !== "US")
                    ?.sort((a, b) =>
                      a.full_name_english.localeCompare(b.full_name_english)
                    ) // Sort alphabetically
                    ?.map((country) => (
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
                        ?.find((country) => country?.id === watch("country_id"))
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
              <input
                {...register("telephone")}
                type="number"
                placeholder={"Phone number"}
                className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.telephone?.message === "Required" &&
                  "border-red-500 placeholder-red-500"
                  }`}
              />

              <div className="w-full">
                {addressType ? (
                  <div className="flex items-center w-full gap-2">
                    {addressType === "Billing" ? (
                      <input
                        disabled
                        id="billingAddress"
                        type="checkbox"
                        className="w-5 h-5 accent-[#1ACCF3]"
                        {...register("default_billing")}
                      />
                    ) : (
                      <input
                        disabled
                        id="shippingAddress"
                        type="checkbox"
                        className="w-5 h-5 accent-[#1ACCF3]"
                        {...register("default_shipping")}
                      />
                    )}
                    <label
                      htmlFor={
                        addressType === "Billing"
                          ? "billingAddress"
                          : "shippingAddress"
                      }
                    >
                      Set as default{" "}
                      {addressType === "Billing" ? "billing" : "shipping"}{" "}
                      address
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center w-full gap-2">
                      <input
                        id="billingAddress"
                        type="checkbox"
                        className="w-5 h-5 accent-[#1ACCF3]"
                        {...register("default_billing")}
                      />
                      <label htmlFor={"billingAddress"}>
                        Set as default billing address
                      </label>
                    </div>
                    <div className="flex items-center w-full gap-2">
                      <input
                        id="shippingAddress"
                        type="checkbox"
                        className="w-5 h-5 accent-[#1ACCF3]"
                        {...register("default_shipping")}
                      />
                      <label htmlFor={"shippingAddress"}>
                        Set as default shipping address
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className={
                  "w-full rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3"
                }
                disabled={mutation?.isPending || addAddressMutation?.isPending}
              >
                <p className={"font-theme-font-roman"}>
                  {mutation?.isPending || addAddressMutation?.isPending ? (
                    <WhiteAnimation />
                  ) : address ? (
                    "Update address"
                  ) : (
                    "Add address"
                  )}
                </p>
              </button>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default AddressDialog
