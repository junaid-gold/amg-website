"use client";
import {
  signInFormSchema,
  SignInFormSchemaType,
} from "@/validations/sign-in.validation";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import WhiteAnimation from "@/components/white-animation";
import useCartItem from "@/hooks/use-cart-item";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
  });

  const { cartItem } = useCartItem()
  const onSubmit = async (data: SignInFormSchemaType) => {
    const skuToPush = localStorage.getItem("skuToPush")
    const { username, password } = data;
    setIsLoading(true);
    const response = await signIn("credentials", {
      username,
      password,
      callbackUrl: `${cartItem?.sku ? `${window.location.origin}/single-page-form` : window.location.origin}`,
      redirect: false,
    });
    if (response?.error) {
      toast.error(response?.error);
      setIsLoading(false);
    }

    if (cartItem?.sku || skuToPush) {
      router.push("/single-page-form")
      window.location.href = `/single-page-form`
    } else {
      if (response?.url) router.push(response?.url);
      router.refresh()
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 p-4  flex-col items-center justify-center w-full gap-6 md:gap-14"
    >
      <h1 className="font-bold text-4xl">Login</h1>
      <div className="flex flex-col flex-1 md:flex-none justify-between md:justify-center gap-10 w-full">
        <div className="flex flex-col items-center justify-center w-full gap-3 md:gap-6">
          <input
            {...register("username")}
            placeholder={"Username"}
            className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent  ${errors?.username?.message === "Required" &&
              "border-red-500 placeholder-red-500"
              }`}
          />
          <input
            placeholder={"Password"}
            type="password"
            {...register("password")}
            className={`rounded-lg px-5 py-3 border w-full border-[#B6B4A2] text-[#100F0F] opacity-60 bg-transparent ${errors?.password?.message === "Required" &&
              "!border-red-500 !placeholder-red-500"
              }`}
          />
          <div className="flex justify-end w-full">
            <Link
              href={"/forgot-password"}
              className="underline text-theme-black text-right "
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div className="space-y-2 md:space-y-6 w-full">
          <button
            type="submit"
            className={
              "w-full rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3"
            }
            disabled={isLoading}
          >
            <p className={"font-theme-font-roman"}>
              {isLoading ? (
                <WhiteAnimation />
              ) : (
                "Sign In"
              )}
            </p>
          </button>
          <Link
            href={"/sign-up"}
            className={
              "w-full rounded-full border border-theme-black text-black flex items-center justify-center px-2 py-3"
            }
          >
            <p className={"font-theme-font-roman"}>Create account</p>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Form;
