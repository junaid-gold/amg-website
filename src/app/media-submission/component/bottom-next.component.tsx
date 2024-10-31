"use client";
import useCartItem from "@/hooks/use-cart-item";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { createItemInCart } from "../actions";
import toast from "react-hot-toast";
import { errorHandler } from "@/lib/utils";
import WhiteAnimation from "@/components/white-animation";

interface BottomNextComponentProps {
  isButtonDisabled: boolean;
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  totalOptions?: number;
}

const BottomNextComponent = ({
  isButtonDisabled,
  currentTab,
  setCurrentTab,
  totalOptions,
}: BottomNextComponentProps) => {
  const router = useRouter();
  const { cartItem, resetCartItem } = useCartItem();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createItemInCart,
    mutationKey: ["create"],
    onSuccess: (data) => {
      if (data?.item_id) {
        toast.success("Item Added to Cart Successfully!");
        router?.push("/");
        queryClient.refetchQueries();
        queryClient.invalidateQueries({
          queryKey: ["customerCartItems"],
          refetchType: "all",
        });
        resetCartItem();
      }
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
  return (
    <div
      className={`flex flex-col items-center bg-white  xl:shadow-none justify-center gap-1 fixed bottom-0  w-full max-w-[90rem] shadow-theme-shadow py-8`}
    >
      {currentTab === totalOptions ? (
        <button
          disabled={isButtonDisabled || mutation?.isPending}
          onClick={() => {
            mutation.mutate({ ...cartItem });
          }}
          className={`w-[70%] sm:w-[55%] md:w-[40%] xl:w-[30%] rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3 ${(isButtonDisabled || mutation?.isPending) && "!bg-[#25242233] !text-[#F4F0ED] !border-[#25242233]"}`}
        >
          <p className={"font-theme-font-roman"}>
            {mutation?.isPending ? <WhiteAnimation /> : "Add to Cart"}
          </p>
        </button>
      ) : (
        <button
          disabled={isButtonDisabled}
          onClick={() => {
            setCurrentTab((currentTab) => currentTab + 1);
          }}
          className={`w-[70%] sm:w-[55%] md:w-[40%] xl:w-[30%] rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3 ${isButtonDisabled && "!bg-[#25242233] !text-[#F4F0ED] !border-[#25242233]"}`}
        >
          <p className={"font-theme-font-roman"}>Next</p>
        </button>
      )}
    </div>
  );
};

export default BottomNextComponent;
