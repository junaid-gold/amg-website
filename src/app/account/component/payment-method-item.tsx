import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { deletePaymentMethod } from '../actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { errorHandler } from '@/lib/utils';
import BlackAnimation from '@/components/black-animation';

interface PaymentMethodItem {
    customerPaymentProfileId: string;
    cardNumber: string
}

const PaymentMethodItem = ({ customerPaymentProfileId, cardNumber }: PaymentMethodItem) => {


    const queryClient = useQueryClient();
    const router = useRouter()
    const deleteMutation = useMutation({
        mutationFn: deletePaymentMethod,
        mutationKey: [`payment-method-${customerPaymentProfileId}`],
        onSuccess: (data) => {
            if (data) {
                toast.success("Payment method deleted Successfully!");
                queryClient.invalidateQueries({
                    queryKey: ["customerStoredPaymentMethods"],
                    refetchType: "all",
                });
                router.refresh()
            }
        },
        onError: (error) => {
            errorHandler(error);
        },
    });
    return (
        <li
            className={
                "flex w-full items-center justify-between bg-[#FFFFFF] border border-[#E7E7E7] rounded-md p-4"
            }
        >

            <div className={"flex gap-4 w-full"}>
                <p className={"text-base text-[#898A8D]"}>**** **** ****{cardNumber?.slice(-4)}</p>
            </div>
            <button onClick={() => {
                deleteMutation?.mutate(customerPaymentProfileId);
            }}>{deleteMutation?.isPending ? <BlackAnimation /> : "Delete"}</button>
        </li>
    )
}

export default PaymentMethodItem