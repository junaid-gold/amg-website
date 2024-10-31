import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react'
import { applyCoupon, clearDiscountFromCart } from '../actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { errorHandler } from '@/lib/utils';
import WhiteAnimation from '@/components/white-animation';

const Coupon = () => {
    const router = useRouter()
    const [input, setInput] = useState('');

    const mutation = useMutation({
        mutationFn: applyCoupon,
        mutationKey: ["applyCoupon"],
        onSuccess: (data) => {
            if (data?.status === 200) {
                data?.data?.map((couponResponse: { applied: boolean, code: string }) => couponResponse?.applied ? toast.success(`Coupon ${couponResponse?.code} applied successfully.`) : toast.error(`${couponResponse?.code} is not a valid coupon code.`))
                router.refresh()
                setInput('');
            }
        },
        onError: (error) => {
            errorHandler(error)
        }
    })



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({ coupon_code: input })
    };
    return (
        <div className='space-y-2'>
            <form className='gap-4 flex items-center' onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Discount Code"
                    required
                    className={`rounded-md flex-1 px-5 py-2  bg-[#FFFFFF] border w-full border-[#B6B4A2] text-[#100F0F]`}
                />
                <button disabled={mutation?.isPending} className={
                    "w-fit rounded-md border border-[#D6D6D6] text-[#707070] bg-[#EDEDED] flex items-center justify-center px-4 py-2"
                }
                    type="submit">
                    {mutation?.isPending ? (
                        <WhiteAnimation />
                    ) : (
                        "Apply"
                    )}
                </button>
            </form>
        </div>
    )
}

export default Coupon