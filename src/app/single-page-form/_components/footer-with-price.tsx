import React from 'react'
import useCartItem from '@/hooks/use-cart-item';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorHandler } from '@/lib/utils';
import WhiteAnimation from '@/components/white-animation';
import { createItemInCart, updateCartItem } from '@/app/media-submission/actions';
import useOpenCart from '@/hooks/use-open-cart';

interface FooterWithPriceProps {
    isButtonDisabled: boolean;
}

const FooterWithPrice = ({ isButtonDisabled, }: FooterWithPriceProps) => {
    const { setOpenCart } = useOpenCart()
    const { cartItem, resetCartItem } = useCartItem();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createItemInCart,
        mutationKey: ["create"],
        onSuccess: (data) => {
            if (data?.item_id) {
                // router?.push("/");
                setOpenCart(true)
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

    const updateMutation = useMutation({
        mutationFn: updateCartItem,
        mutationKey: ["create"],
        onSuccess: (data) => {
            if (data) {
                setOpenCart(true)
                toast.success("Item Updated Successfully!");
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
                            {(cartItem?.product_option?.extension_attributes?.custom_options?.reduce((acc, current) => acc + (current?.price || 0), cartItem?.price) || 0)?.toFixed(2)}
                        </h1>
                    </div>

                    <button
                        disabled={isButtonDisabled || mutation?.isPending}
                        onClick={() => {

                            // setOpenCart(true)
                            // return;
                            const valueInRange = cartItem?.valueRange;

                            if (valueInRange) {
                                const { lowerBound, upperBound, valueToCheck } = valueInRange;
                                const value = Number(valueToCheck);
                                // Case 1: If upperBound is null and lowerBound is not null
                                if (upperBound === null && lowerBound !== null) {
                                    if (value !== null && value < lowerBound) {
                                        toast.error(`Value must be greater than or equal to $${lowerBound?.toLocaleString("en-US")}`);
                                        return;
                                    }
                                }

                                // Case 2: Both lowerBound and upperBound are defined (upperBound is 0, lowerBound is not null and not 0)
                                if (lowerBound !== null && upperBound === 0 && lowerBound !== 0) {
                                    if (value !== null && (value < lowerBound || value > upperBound)) {
                                        toast.error(`Insurance value must be in the range of $${lowerBound?.toLocaleString("en-US")} to $${upperBound?.toLocaleString("en-US")}`);
                                        return;
                                    }
                                }

                                // Case 3: Both bounds are defined and valid, value must fall between them

                                if (lowerBound === 0 && upperBound === 0) {
                                    if (value < 0 || value >= 499.99) {
                                        toast.error(`Insurance value must be in the range of $${0} to $${499.99}`);
                                        return;
                                    }
                                }

                                if (lowerBound !== 0 && upperBound !== 0) {
                                    if (lowerBound !== null && lowerBound >= 0 && upperBound !== null && value !== null) {
                                        const formattedLowerBound = (lowerBound || 0).toLocaleString("en-US");
                                        const formattedUpperBound = (upperBound || 499.99).toLocaleString("en-US");

                                        if (value < lowerBound || value > upperBound) {
                                            toast.error(`Insurance value must be in the range of $${formattedLowerBound} to $${formattedUpperBound}`);
                                            return;
                                        }
                                    }
                                }

                                // Case 4: Lower bound is null but upper bound is defined
                                if (lowerBound === null && upperBound !== null) {
                                    if (value !== null && value > upperBound) {
                                        toast.error(`Value must be less than or equal to $${upperBound?.toLocaleString("en-US")}`);
                                        return;
                                    }
                                }

                                // Case 5: Both bounds are 0 and no value is provided
                                if (lowerBound === 0 && upperBound === 0 && !value) {
                                    toast.error("Insurance value must be in the range of $0 to $499.99");
                                    return;
                                }

                                // Case 6: Both bounds are 0, value must be within a fixed range
                                if (lowerBound === 0 && upperBound === 0) {
                                    if (value !== null) {
                                        if (value < 0 || value > 499.99) {
                                            toast.error("Insurance value must be in the range of $0 to $499.99");
                                            return;
                                        }
                                    } else {
                                        toast.error("Insurance value must be in the range of $0 to $499.99");
                                        return;
                                    }
                                }

                                // Case 7: Both bounds are null, invalid state
                                if (lowerBound === null && upperBound === null) {
                                    toast.error("Invalid range. Both bounds cannot be null.");
                                    return;
                                }
                            }

                            // @ts-ignore
                            cartItem?.item_id ? updateMutation.mutate({ itemId: cartItem?.item_id, cartItem: { item_id: cartItem?.item_id, product_option: cartItem?.product_option, qty: cartItem?.qty, quote_id: cartItem?.quote_id, sku: cartItem?.sku } }) :
                                mutation.mutate({ ...cartItem });
                        }}
                        className={`w-[70%] sm:w-[55%] md:w-[40%] xl:w-[30%] rounded-full border border-theme-black text-white bg-black flex items-center justify-center px-2 py-3 
              ${(isButtonDisabled || mutation?.isPending) && "!bg-[#25242233] !text-[#F4F0ED] !border-[#25242233]"}
              `}
                    >
                        <p className={"font-theme-font-roman"}>
                            {mutation?.isPending || updateMutation?.isPending ? <WhiteAnimation /> : cartItem?.item_id ? "Update" : "Add to Cart"}
                        </p>
                    </button>

                </div>
            </div>
        </div >
    )
}

export default FooterWithPrice