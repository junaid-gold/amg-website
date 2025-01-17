"use client"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  signUpFormSchema,
  SignUpFormSchemaType,
} from "@/validations/sign-up.validation"
import { Attribute, Country } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { createCustomer } from "../actions"
import toast from "react-hot-toast"
import { errorHandler } from "@/lib/utils"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import WhiteAnimation from "@/components/white-animation"

interface FormProps {
  countries: Country[]
  attributeDetails: Attribute
}

const Form = ({ countries, attributeDetails }: FormProps) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      customer: {
        email: "",
        firstname: "",
        lastname: "",
        addresses: [],
        extension_attributes: {
          is_subscribed: true,
        },
        custom_attributes: [],
      },
      password: "",
      confirmPassword: "",
    },
  })

  const mutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: (data) => {
      if (data?.id) {
        toast.success("Customer Created Successfully!")
      }
      router?.push("/sign-in")
    },
    onError: (error) => {
      errorHandler(error)
    },
  })

  const onSubmit = async (data: SignUpFormSchemaType) => {
    mutation.mutate(data)
  }

  const firstname = watch("customer.addresses.0.firstname")
  const lastname = watch("customer.addresses.0.lastname")

  useEffect(() => {
    setValue("customer.addresses.0.firstname", firstname)
  }, [firstname, setValue])
  useEffect(() => {
    setValue("customer.addresses.0.lastname", lastname)
  }, [lastname, setValue])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 p-4  flex-col items-center justify-center w-full gap-6 md:gap-14"
    >
      <h1 className="font-bold text-4xl">Create your account</h1>
      <div className="flex flex-col flex-1 md:flex-none justify-between md:justify-center gap-10 w-full">
        <div className="flex flex-col items-center justify-center w-full gap-3 md:gap-6">
          <div className="w-full flex flex-col gap-6">
            <h1 className="text-theme-black font-theme-font-medium text-lg">
              Personal Details
            </h1>
            <div className="flex items-center flex-col md:flex-row gap-5">
              <input
                {...register("customer.firstname")}
                placeholder={"First name"}
                className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                  errors?.customer?.firstname?.message === "Required" &&
                  "border-red-500 placeholder-red-500"
                }`}
              />
              <input
                {...register("customer.lastname")}
                placeholder={"Last name"}
                className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                  errors?.customer?.lastname?.message === "Required" &&
                  "border-red-500 placeholder-red-500"
                }`}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <h1 className="text-theme-black font-theme-font-medium text-lg">
              Address Information
            </h1>

            <div className="w-full relative">
              <select
                defaultValue={""}
                {...register("customer.addresses.0.country_id")}
                className={`appearance-none rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                  errors?.customer?.addresses?.[0]?.country_id?.message ===
                    "Required" && "border-red-500 placeholder-red-500"
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
            <input
              {...register("customer.addresses.0.company")}
              placeholder={"Company"}
              className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                errors?.customer?.addresses?.[0]?.company?.message ===
                  "Required" && "border-red-500 placeholder-red-500"
              }`}
            />
            <input
              {...register("customer.addresses.0.street.0")}
              placeholder={"Address line 1"}
              className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                errors?.customer?.addresses?.[0]?.street?.[0]?.message ===
                  "Required" && "border-red-500 placeholder-red-500"
              }`}
            />
            <input
              {...register("customer.addresses.0.street.1")}
              placeholder={"Address line 2"}
              className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                errors?.customer?.addresses?.[0]?.street?.[1]?.message ===
                  "Required" && "border-red-500 placeholder-red-500"
              }`}
            />
            <div className="flex w-full items-center flex-col md:flex-row gap-5">
              <input
                {...register("customer.addresses.0.city")}
                type="text"
                placeholder={"City"}
                className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                  errors?.customer?.addresses?.[0]?.city?.message ===
                    "Required" && "border-red-500 placeholder-red-500"
                }`}
              />

              {countries?.find(
                (country) =>
                  country?.id === watch("customer.addresses.0.country_id")
              )?.available_regions ? (
                <div className="w-full relative">
                  <select
                    defaultValue={""}
                    {...register("customer.addresses.0.region.region_id")}
                    className={`appearance-none rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                      errors?.customer?.addresses?.[0]?.region?.region_id
                        ?.message === "Required" &&
                      "border-red-500 placeholder-red-500"
                    }`}
                  >
                    <option value="" disabled>
                      State
                    </option>

                    {countries
                      ?.find(
                        (country) =>
                          country?.id ===
                          watch("customer.addresses.0.country_id")
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
                  {...register("customer.addresses.0.region.region")}
                  placeholder={"Region"}
                  className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent
                    
                      ${
                        errors?.customer?.addresses?.[0]?.region?.region
                          ?.message === "Required" &&
                        "border-red-500 placeholder-red-500"
                      }
                  `}
                />
              )}

              <input
                {...register("customer.addresses.0.postcode")}
                type="number"
                placeholder={"Postal / Zip"}
                className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                  errors?.customer?.addresses?.[0]?.postcode?.message ===
                    "Required" && "border-red-500 placeholder-red-500"
                }`}
              />
            </div>

            <input
              {...register("customer.addresses.0.telephone")}
              type="number"
              placeholder={"Phone number"}
              className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                errors?.customer?.addresses?.[0]?.telephone?.message ===
                  "Required" && "border-red-500 placeholder-red-500"
              }`}
            />
          </div>

          <div className="w-full flex flex-col gap-6">
            <h1 className="text-theme-black font-theme-font-medium text-lg">
              Sign in Credentials
            </h1>
            <input
              {...register("customer.email")}
              placeholder={"Email"}
              className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                errors?.customer?.email?.message &&
                "border-red-500 placeholder-red-500"
              }`}
            />
            <div className="space-y-1.5">
              <input
                {...register("password")}
                type="password"
                placeholder={"Password"}
                className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                  errors?.password?.message &&
                  "border-red-500 placeholder-red-500"
                }`}
              />

              <p className="text-red-500 font-light text-xs">
                {errors?.password?.message}
              </p>
              <p className="text-gray-500 font-light text-xs pl-[4px]">
                Password must contain atleast six characters, one uppercase
                letter, one number, and one special character
              </p>
            </div>

            <div className="space-y-1.5">
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder={"Confirm Password"}
                className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                  errors?.confirmPassword?.message === "Required" &&
                  "border-red-500 placeholder-red-500"
                }`}
              />
              {watch("confirmPassword")?.length > 0 &&
                watch("confirmPassword") !== watch("password") && (
                  <p className="text-red-500 font-light text-xs">
                    Password must match
                  </p>
                )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <h1 className="text-theme-black font-theme-font-medium text-lg">
              How did you hear about us?
            </h1>
            <div className="w-full relative">
              <select
                {...register("customer.custom_attributes.0.value")}
                className={`appearance-none rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                  errors?.customer?.custom_attributes?.[0]?.value?.message ===
                    "Required" && "border-red-500 placeholder-red-500"
                }`}
              >
                {attributeDetails?.options?.map((attribute) => (
                  <option key={attribute?.value} value={attribute?.value}>
                    {attribute?.value === "" ? "Select One" : attribute?.label}
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
          </div>

          <div className="flex w-full items-center gap-2">
            <input
              id="isSubscribed"
              type="checkbox"
              className="w-5 h-5 accent-[#1ACCF3]"
              {...register("customer.extension_attributes.is_subscribed")}
            />
            <label htmlFor="isSubscribed">
              Sign me up for AMG’s newsletter
            </label>
          </div>
        </div>

        <div className="space-y-2 md:space-y-6 w-full">
          <button
            type="submit"
            className={
              "w-full rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3"
            }
            disabled={mutation?.isPending}
          >
            <p className={"font-theme-font-roman"}>
              {mutation?.isPending ? <WhiteAnimation /> : "Create"}
            </p>
          </button>
          <Link
            href={"/sign-in"}
            className={
              "w-full rounded-full border border-theme-black text-black flex items-center justify-center px-2 py-3"
            }
          >
            <p className={"font-theme-font-roman"}>
              Already have an account? Sign in
            </p>
          </Link>
        </div>
      </div>
    </form>
  )
}

export default Form
