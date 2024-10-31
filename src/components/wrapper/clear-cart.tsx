import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { clearItemFromCart } from './actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { errorHandler } from '@/lib/utils';
import BlackAnimation from '../black-animation';

interface ClearCartProps {
    itemIds: string[]
}

const ClearCart = ({ itemIds }: ClearCartProps) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: clearItemFromCart,
        mutationKey: [`clear-cart-items`],
        onSuccess: (data) => {
            if (data) {
                toast.success("Items deleted Successfully!");
                queryClient.invalidateQueries({
                    queryKey: ["customerCart"],
                    refetchType: "all",
                });
                queryClient.refetchQueries({
                    queryKey: ["customerCartItems"]
                });
                router.refresh()
            }
        },
        onError: (error) => {
            errorHandler(error);
        },
    });

    return (


        <button
            onClick={() => {
                deleteMutation?.mutate(itemIds);
            }}
            className={"font-theme-font-light underline text-[14px]"}
        >
            {deleteMutation?.isPending ? <BlackAnimation /> : "Clear Cart"}
        </button>
    )
}

export default ClearCart