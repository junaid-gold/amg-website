import {
  changePasswordFormSchema,
  ChangePasswordFormSchemaType,
} from "@/validations/change-password.validation"
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { changeCustomerData } from "../actions"
import { errorHandler } from "@/lib/utils"
import toast from "react-hot-toast"
import { Customer } from "@/types"
import {
  changeCustomerDataFormSchema,
  ChangeCustomerDataFormSchemaType,
} from "@/validations/change-customer-data.validation"
import { useRouter } from "next/navigation"
import WhiteAnimation from "@/components/white-animation"

interface ChangeCustomerDataDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  customerData: Customer
}
const ChangeCustomerDataDialog = ({
  open,
  setOpen,
  customerData,
}: ChangeCustomerDataDialogProps) => {
  const router = useRouter()
  const [isModified, setIsModified] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ChangeCustomerDataFormSchemaType>({
    resolver: zodResolver(changeCustomerDataFormSchema),
    defaultValues: {
      firstName: customerData?.firstname,
      lastName: customerData?.lastname,
      email: customerData?.email,
    },
  })
  const watchedFields = watch(["firstName", "lastName", "email"])

  useEffect(() => {
    const hasChanged =
      watchedFields[0] !== customerData?.firstname ||
      watchedFields[1] !== customerData?.lastname ||
      watchedFields[2] !== customerData?.email
    setIsModified(hasChanged)
  }, [watchedFields, customerData])
  const mutation = useMutation({
    mutationFn: changeCustomerData,
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success("Customer Data Updated Successfully!")
      }
      reset({
        firstName: "",
        lastName: "",
        email: "",
      })

      setOpen((open) => !open)
      router.refresh()
    },
    onError: (error) => {
      errorHandler(error)
    },
  })

  const onSubmit = async (data: ChangeCustomerDataFormSchemaType) => {
    mutation.mutate({ ...data, website_id: customerData?.website_id })
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
                Edit Account Details
              </h1>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-1 p-4  flex-col items-center justify-center w-full gap-6 "
            >
              <div className="w-full flex flex-col gap-6 ">
                <h1 className="text-[#100F0F] font-theme-font-medium">
                  Contact Information
                </h1>
                <div className="flex flex-col w-full gap-5 md:flex-row">
                  <div className="space-y-1.5 w-full">
                    <input
                      {...register("firstName")}
                      placeholder={"First Name"}
                      className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.firstName?.message &&
                        "border-red-500 placeholder-red-500"
                        }`}
                    />
                  </div>
                  <div className="space-y-1.5 w-full">
                    <input
                      {...register("lastName")}
                      placeholder={"Last Name"}
                      className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.lastName?.message &&
                        "border-red-500 placeholder-red-500"
                        }`}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-6 ">
                <h1 className="text-[#100F0F] font-theme-font-medium">
                  Change Account Email
                </h1>
                <div className="w-full flex flex-col gap-5">
                  <div className="space-y-1.5 w-full">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder={"New Email"}
                      className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.email?.message &&
                        "border-red-500 placeholder-red-500"
                        }`}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={`w-full rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3 ${!isModified ||
                  (mutation?.isPending &&
                    "!bg-[#25242233] !text-[#F4F0ED] !border-[#25242233]")
                  }`}
                disabled={!isModified || mutation?.isPending}
              >
                <p className={"font-theme-font-roman"}>
                  {mutation?.isPending ? <WhiteAnimation /> : "Save"}
                </p>
              </button>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ChangeCustomerDataDialog
