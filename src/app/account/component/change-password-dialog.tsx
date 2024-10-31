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
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { changeUserPassword } from "../actions"
import { errorHandler, formatAxiosError } from "@/lib/utils"
import toast from "react-hot-toast"
import WhiteAnimation from "@/components/white-animation"

interface ChangePasswordDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
const ChangePasswordDialog = ({ open, setOpen }: ChangePasswordDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ChangePasswordFormSchemaType>({
    resolver: zodResolver(changePasswordFormSchema),
  })

  const mutation = useMutation({
    mutationFn: changeUserPassword,
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success("Password Change Successfully!")
      }
      reset({
        currentPassword: "",
        password: "",
        confirmPassword: "",
      })
    },
    onError: (error) => {
      errorHandler(error)
    },
  })

  const onSubmit = async (data: ChangePasswordFormSchemaType) => {
    mutation.mutate(data)
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
                Change Your Password
              </h1>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-1 p-4  flex-col items-center justify-center w-full gap-6 "
            >
              <input
                {...register("currentPassword")}
                placeholder={"Current password"}
                className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                  errors?.currentPassword?.message &&
                  "border-red-500 placeholder-red-500"
                }`}
              />

              <div className="space-y-1.5 w-full">
                <input
                  {...register("password")}
                  type="password"
                  placeholder={"New Password"}
                  className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${
                    errors?.password?.message &&
                    "border-red-500 placeholder-red-500"
                  }`}
                />

                <p className="text-red-500 font-light text-xs">
                  {errors?.password?.message}
                </p>
              </div>

              <div className="space-y-1.5 w-full">
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder={"Confirm New Password"}
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

              <div className="flex justify-end w-full">
                <Link
                  href={"/forgot-password"}
                  className="underline text-theme-black text-right "
                >
                  Forgot your password?
                </Link>
              </div>
              <button
                type="submit"
                className={
                  "w-full rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3"
                }
                disabled={mutation?.isPending}
              >
                <p className={"font-theme-font-roman"}>
                  {mutation?.isPending ? <WhiteAnimation /> : "Change password"}
                </p>
              </button>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ChangePasswordDialog
