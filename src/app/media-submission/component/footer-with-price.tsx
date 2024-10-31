import useCartItem from '@/hooks/use-cart-item';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react'
import { createItemInCart } from '../actions';
import toast from 'react-hot-toast';
import { errorHandler } from '@/lib/utils';
import WhiteAnimation from '@/components/white-animation';
import BlackAnimation from '@/components/black-animation';

interface FooterWithPriceProps {
    isButtonDisabled: boolean;
    currentTab: number;
    setCurrentTab: Dispatch<SetStateAction<number>>;
    totalOptions?: number;
}


const FooterWithPrice = ({
    isButtonDisabled,
    currentTab,
    setCurrentTab,
    totalOptions, }: FooterWithPriceProps) => {
    const router = useRouter();
    const { cartItem, resetCartItem } = useCartItem();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createItemInCart,
        mutationKey: ["create"],
        onSuccess: (data) => {
            if (data?.item_id) {
                router?.push("/");
                toast.success("Item Added to Cart Successfully!");
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
        <div className='w-full'>

            <div
                className={
                    "flex items-center px-10 left-0 right-0 justify-center bg-white fixed bottom-0 w-full"
                }
                style={{ boxShadow: "0px -10.48px 10.48px 0px #8883F01A" }}
            >
                <div
                    className={
                        "py-6 md:py-8 gap-1 w-full max-w-[90rem] flex items-center justify-between"
                    }
                >
                    <div>
                        <p className={"text-[14px] font-theme-font-light"}>
                            Estimated Total
                        </p>
                        <h1 className={"font-theme-font-medium text-[34px]"}>
                            $
                            {(
                                cartItem?.product_option?.extension_attributes?.custom_options?.reduce(
                                    (acc, current) => acc + (current?.price || 0),
                                    cartItem?.price
                                ) || 0
                            )?.toFixed(2)}
                        </h1>
                    </div>

                    {currentTab === totalOptions ? (
                        <button
                            disabled={isButtonDisabled || mutation?.isPending}
                            onClick={() => {
                                mutation.mutate({ ...cartItem });
                            }}
                            className={`w-[70%] sm:w-[55%] md:w-[40%] xl:w-[30%] rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3 
              ${(isButtonDisabled || mutation?.isPending) && "!bg-[#25242233] !text-[#F4F0ED] !border-[#25242233]"}
              `}
                        >
                            <p className={"font-theme-font-roman"}>
                                {mutation?.isPending ? <WhiteAnimation /> : "Add to Cart"}
                            </p>
                        </button>
                    ) : (
                        <button
                            disabled={isButtonDisabled}
                            onClick={() => {

                                const valueInRange = cartItem?.valueRange;
                                if (valueInRange) {
                                    const { lowerBound, upperBound, valueToCheck } = valueInRange;
                                    const value = Number(valueToCheck);
                                    // Ensure valueToCheck is a valid number
                                    // if (isNaN(value)) {
                                    //     toast.error("Invalid value. Please enter a valid number.");
                                    //     return;
                                    // }  
                                    // Case 1: Only lowerBound exists (upperBound is null)
                                    if (upperBound === null && lowerBound !== null) {
                                        if (value < lowerBound) {
                                            toast.error(`Value must be greater than or equal to ${lowerBound}`);
                                            return;
                                        }
                                    }
                                    // Case 2: Only upperBound exists (lowerBound is null)
                                    if (lowerBound === null && upperBound !== null) {
                                        if (value > upperBound) {
                                            toast.error(`Value must be less than or equal to ${upperBound}`);
                                            return;
                                        }
                                    } // Case 3: Both lowerBound and upperBound exist
                                    if (lowerBound !== null && upperBound !== null) {
                                        if (value < lowerBound || value > upperBound) {
                                            toast.error(
                                                `Value must be in the range of ${lowerBound} to ${upperBound}`
                                            );
                                            return;
                                        }
                                    }
                                    // Case 4: No bounds exist (both are null) - invalid case
                                    if (lowerBound === null && upperBound === null) {
                                        toast.error("Invalid range. Both bounds cannot be null.");
                                        return;
                                    }
                                }
                                setCurrentTab((currentTab) => currentTab + 1);
                            }}
                            className={`w-[70%] sm:w-[55%] md:w-[40%] xl:w-[30%] rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3 ${isButtonDisabled && "!bg-[#25242233] !text-[#F4F0ED] !border-[#25242233]"}`}
                        >
                            <p className={"font-theme-font-roman"}>Next</p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FooterWithPrice