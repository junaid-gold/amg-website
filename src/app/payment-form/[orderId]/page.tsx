import { CartIcon } from '@/components/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Links from '../_components/links'
import { getOrderItemDetails } from '@/app/orders/[id]/actions'
import { OrderItem } from '@/types'

const page = async ({ params: { orderId } }: { params: { orderId: string } }) => {
    const orderDetails: OrderItem = await getOrderItemDetails("500010692")
    return (
        <div className="bg-[#F8F7F3]">
            <div className={"px-4 py-6  bg-[#fff]"}>
                <div className="flex max-w-[68rem] mx-auto w-full justify-between items-center">
                    <Link href={"/"}>
                        <Image src={"/logo/amg.svg"} alt={"amg"} width={124} height={38} />
                    </Link>
                    <button>
                        <CartIcon />
                    </button>
                </div>
            </div>

            <div className="max-w-[68rem] mx-auto w-full flex flex-col md:flex-row items-start">
                <div className="w-full md:flex-1 p-6 md:border-r DEDEDE]">
                    <div className='space-y-4 border-b border-[#DEDEDE] py-6'>
                        <div className='flex items-center gap-4'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={51}
                                height={50}
                                fill="none"
                            >
                                <path
                                    stroke="#C6ABFF"
                                    strokeWidth={2}
                                    d="M49.5 25c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24Z"
                                />
                                <path
                                    stroke="#C6ABFF"
                                    strokeWidth={2}
                                    d="m15.5 24.511 7.307 7.307L35.625 19"
                                />
                            </svg>
                            <div className='flex items-start gap-0 flex-col '>
                                <h3 className='text-[#707070] font-medium text-base'>{orderDetails?.status?.toUpperCase()} #{orderDetails?.increment_id}</h3>
                                <h1 className='font-semibold text-xl'>Thank you, {orderDetails?.customer_firstname}!</h1>
                            </div>
                        </div>
                        <div>
                            <h3 className='font-semibold text-base'>Your order is {orderDetails?.status}</h3>
                            <h4 className='text-[#707070] text-sm'>You’ll get a confirmation email with your order number soon.</h4>
                        </div>
                    </div>

                    <div className='py-6 border-b border-[#DEDEDE] space-y-4'>
                        <h3 className='font-semibold text-base'>Order details</h3>
                        <div className='grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6'>
                            <div className=''>
                                <h3 className='text-[#707070] text-sm'>Customer Name</h3>
                                <h2>{orderDetails?.customer_firstname} {orderDetails?.customer_lastname}</h2>
                            </div>
                            <div className=''>
                                <h3 className='text-[#707070] text-sm'>Payment method</h3>
                                <h2>{orderDetails?.extension_attributes?.payment_additional_info?.find((paymentInfo) => paymentInfo?.key === "method_title")?.value}</h2>
                            </div>
                            <div className=''>
                                <h3 className='text-[#707070] text-sm'>Shipping Address</h3>
                                <h2>
                                    {orderDetails?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.firstname} {orderDetails?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.lastname}
                                </h2>
                                <h2>
                                    {orderDetails?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.street?.[0]}
                                </h2>

                                {orderDetails?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.street?.[1] &&
                                    <h2>
                                        {orderDetails?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.street?.[1]}
                                    </h2>}

                                <h2>
                                    {orderDetails?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.country_id}
                                </h2>
                                <h2>
                                    {orderDetails?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.city},
                                    {orderDetails?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.region},
                                    {orderDetails?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.postcode}
                                </h2>
                                <h2>{orderDetails?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.telephone}</h2>

                            </div>
                            <div className=''>
                                <h3 className='text-[#707070] text-sm'>Billing Address</h3>
                                <h2>
                                    {orderDetails?.billing_address?.firstname} {orderDetails?.billing_address?.lastname}
                                </h2>
                                <h2>
                                    {orderDetails?.billing_address?.street?.[0]}
                                </h2>
                                {orderDetails?.billing_address?.street?.[1] &&
                                    <h2>
                                        , {orderDetails?.billing_address?.street?.[1]}
                                    </h2>}
                                <h2>
                                    {orderDetails?.billing_address?.country_id}
                                </h2>
                                <h2>
                                    {orderDetails?.billing_address?.city},
                                    {orderDetails?.billing_address?.region},
                                    {orderDetails?.billing_address?.postcode}
                                </h2>
                                <h2 >{orderDetails?.billing_address?.telephone}</h2>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row md:items-start lg:items-center sm:items-center border-b border-[#DEDEDE] py-6 justify-between gap-6'>
                            <div className='flex items-center gap-2'>
                                <h1>Need Help?</h1>
                                <Link href={"/contact-us"} className='underline text-[#9747FF]'>Contact us</Link>
                            </div>
                            <Link href={"/media-submission"} className='bg-theme-black text-center w-fit text-white py-2 sm:py-6 rounded px-4 sm:px-8'>Continue Shopping</Link>
                        </div>
                        <Links />
                    </div>
                </div>
                <div className="md:max-w-[448px] p-6 w-full space-y-6">
                    {/* Items */}
                    <ul className='py-6 border-b border-[#DEDEDE]'>
                        {orderDetails?.items?.map((item) => <li key={item?.id} className='flex items-center my-0.5 justify-between gap-6'>
                            <h3>{item?.name}</h3>
                            <p>${item?.price}</p>
                        </li>)}
                    </ul>

                    <div className="flex flex-col">
                        <ul className="">

                            <li className='flex items-center justify-between gap-5'>
                                <span className=''>Items Subtotal</span>
                                <span className=''>${orderDetails?.base_subtotal_incl_tax}</span>
                            </li>
                            <li className='flex items-center justify-between gap-5'>
                                <span className=''>Discount</span>
                                <span className=''>${orderDetails?.base_discount_amount}</span>
                            </li>
                            <li className='flex items-center justify-between gap-5'>
                                <span className=''>Shipping & Handling</span>
                                <span className=''>${orderDetails?.base_shipping_incl_tax}</span>
                            </li>
                            <li className='flex items-center justify-between gap-5'>
                                <span className=' font-theme-font-bold'>Grand Total</span>
                                <span className=' font-theme-font-bold'>${orderDetails?.base_grand_total}</span>
                            </li>
                            <li className='flex items-center justify-between gap-5'>
                                Including ${orderDetails?.base_tax_amount} in taxes
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page