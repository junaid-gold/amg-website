"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { errorHandler } from "@/lib/utils";
import { resetPassword } from "../actions";
import {
  resetPasswordFormSchema,
  ResetPasswordFormSchemaType,
} from "@/validations/reset-password-validation";
import WhiteAnimation from "@/components/white-animation";

interface FormProps {
  resetToken: string;
}

const Form = ({ resetToken }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success("Password Reset Successfully!");
      }
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const onSubmit = async (data: ResetPasswordFormSchemaType) => {
    const { password, email } = data;
    mutation.mutate({ email, newPassword: password, resetToken });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 p-4  flex-col items-center justify-center w-full gap-6 md:gap-14"
    >
      <h1 className="font-bold text-4xl">Reset your password</h1>
      <div className="flex flex-col flex-1 md:flex-none justify-between md:justify-center gap-10 w-full">
        <div className="flex flex-col items-center justify-center w-full gap-3 md:gap-6">
          <div className="flex flex-col w-full gap-6">
            <input
              {...register("email")}
              placeholder={"Email"}
              className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.email?.message && "border-red-500 placeholder-red-500"
                }`}
            />
            <input
              placeholder={"Password"}
              type="password"
              {...register("password")}
              className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent ${errors?.password?.message &&
                "!border-red-500 !placeholder-red-500"
                }`}
            />
            <p className="text-left mt-1 text-red-500">
              {errors?.password?.message}
            </p>
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
              {mutation?.isPending ? (
                <WhiteAnimation />
              ) : (
                "Submit"
              )}
            </p>
          </button>
          <Link
            href={"/sign-in"}
            className={
              "w-full rounded-full border border-theme-black text-black flex items-center justify-center px-2 py-3"
            }
          >
            <p className={"font-theme-font-roman"}>Cancel</p>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Form;
