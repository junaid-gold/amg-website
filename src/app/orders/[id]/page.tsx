import { getCustomerOrderDetails, getOrderDetails } from './actions'
import { OrderItem } from '@/types'
import { LeftArrowBlack } from '@/components/icons'
import Link from 'next/link'
import moment from 'moment'
import OrderItemsTable from './_components/order-items-table'

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const order: OrderItem = await getCustomerOrderDetails(id)
  const orderDetails = await getOrderDetails(id)
  return (
    <div className={"flex flex-col items-center gap-6 justify-center w-full"}>
      <div className='bg-[#EBEAE2] w-full'>
        <div className={"max-w-[90rem] mx-auto p-8 lg:p-12 w-full"}>
          <Link
            href={"/account?currentTab=2"}
            className={"flex gap-2 items-center mb-12"}
          >
            <LeftArrowBlack />
            <p className={" text-[18px] underline font-semibold font-theme-font-roman"}>
              Back to all orders
            </p>
          </Link>
          <div className='flex flex-col gap-5 md:flex-row md:items-center justify-between'>
            <div>
              <h1 className='font-theme-font-medium text-[46px]'>Order #{order?.increment_id}</h1>
              <div className='flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4'>
                <div className='px-4 py-2 bg-[#FFA462] w-fit capitalize font-theme-font-medium text-base rounded-lg'>{order?.status}</div>
                <p className='text-lg'>Order Date: {moment(order?.created_at)?.format("MMMM DD, YYYY")}</p>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row items-center gap-4'>
              <a className='bg-[#252422] text-[#F4F0ED] w-full sm:w-auto text-lg text-center font-theme-font-medium px-6 py-4 rounded-full' target='_blank' href={`${process.env.NEXT_PUBLIC_MAGENTO_API_END_POINT}/webservices/print/?order=${order?.entity_id}&key=9813y89cryn234ydn`}>Print Packing Slip</a>           </div>
          </div>
        </div>
      </div>
      <OrderItemsTable details={orderDetails as { sku: string, options: [{ label: string, value: string }] }[]} data={order?.items} />
      <div className='max-w-[90rem] p-8 lg:p-12 w-full mx-auto'>
        <div className={"flex flex-col-reverse lg:flex-row items-stretch w-full gap-10"}>
          <div className=' flex-1 w-full bg-[#EBEAE2] space-y-6 rounded-3xl p-6'>
            <h1 className='font-theme-font-bold text-[32px]'>Order Information</h1>
            <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-5'>
              <div className='flex-1'>
                <h3 className='uppercase text-sm text-[#252422] theme-font-medium'>Shipping ADDRESS</h3>
                <div className='mt-3'>
                  <p className='text-xl font-theme-font-light'>
                    {order?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.firstname || order?.billing_address?.firstname} {order?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.lastname || order?.billing_address?.lastname}
                  </p>
                  <p className='text-xl font-theme-font-light'>
                    {order?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.street?.[0] || order?.billing_address?.street?.[0]}
                  </p>

                  {order?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.street?.[1] || order?.billing_address?.street?.[1] &&
                    <p className='text-xl font-theme-font-light'>
                      {order?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.street?.[1] || order?.billing_address?.street?.[1]}
                    </p>}

                  <p className='text-xl font-theme-font-light'>
                    {order?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.country_id}
                  </p>
                  <p className='text-xl font-theme-font-light'>
                    {order?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.city || order?.billing_address?.city},
                    {order?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.region || order?.billing_address?.region},
                    {order?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.postcode || order?.billing_address?.postcode}
                  </p>
                  <p className='text-xl font-theme-font-light mt-4'>T: <a href={`tel:${order?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.telephone || order?.billing_address?.telephone}`} className='font-semibold underline'>{order?.extension_attributes?.shipping_assignments?.[0]?.shipping?.address?.telephone || order?.billing_address?.telephone}</a></p>
                </div>
              </div>
              <div className='flex-1'>
                <h3 className='text-xl'>
                  {order?.shipping_description}
                </h3>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-5'>
              <div className='flex-1'>
                <h3 className='uppercase text-sm text-[#252422] theme-font-medium'>BILLING ADDRESS</h3>
                <div className='mt-3'>
                  <p className='text-lg'>
                    {order?.billing_address?.firstname} {order?.billing_address?.lastname}
                  </p>
                  <p className='text-lg'>
                    {order?.billing_address?.street?.[0]}
                  </p>
                  {order?.billing_address?.street?.[1] &&
                    <p className='text-lg'>
                      , {order?.billing_address?.street?.[1]}
                    </p>}
                  <p className='text-lg'>
                    {order?.billing_address?.country_id}
                  </p>
                  <p className='text-lg'>
                    {order?.billing_address?.city},
                    {order?.billing_address?.region},
                    {order?.billing_address?.postcode}
                  </p>
                  <p className='text-lg mt-4'>T: <a href={`tel:${order?.billing_address?.telephone}`} className='font-semibold underline'>{order?.billing_address?.telephone}</a></p>
                </div>
              </div>
              <div className='flex-1'>
                <h3 className='uppercase text-base text-[#252422] theme-font-medium'>PAYMENT METHOD</h3>
                <div className='mt-3'>
                  {
                    order?.payment?.method === "authnetcim" &&
                    <>
                      <p className='text-lg mb-2'>
                        {order?.extension_attributes?.payment_additional_info?.find((payment_info) => payment_info?.key === "method_title")?.value}
                      </p>
                      <ul className='w-full'>
                        <li className='w-full flex items-center justify-between'>
                          <p className='text-lg font-semibold'>Credit Card Type</p>
                          <p className='text-lg'>{order?.extension_attributes?.payment_additional_info?.find((payment_info) => payment_info?.key === "card_type")?.value}</p>
                        </li>
                        <li className='w-full flex items-center justify-between'>
                          <p className='text-lg font-semibold'>Credit Card Number</p>
                          <p className='text-lg'>{order?.extension_attributes?.payment_additional_info?.find((payment_info) => payment_info?.key === "acc_number")?.value}</p>
                        </li>
                      </ul>
                    </>
                  }
                  {
                    order?.payment?.method === "checkmo" &&
                    <>
                      <p className='text-lg mb-2'>
                        {order?.extension_attributes?.payment_additional_info?.find((payment_info) => payment_info?.key === "method_title")?.value}
                      </p>
                      <ul className='w-full space-y-2'>
                        <li className='w-full flex-wrap flex items-start gap-2 justify-between'>
                          <p className='text-lg font-semibold'>Make Check payable to:</p>
                          <p className='text-lg'>{order?.extension_attributes?.payment_additional_info?.find((payment_info) => payment_info?.key === "payable_to")?.value}</p>
                        </li>
                        <li className='w-full flex-wrap flex items-start gap-1 justify-between'>
                          <p className='text-lg font-semibold'>Send Check to:</p>
                          <p className='text-lg'>{order?.extension_attributes?.payment_additional_info?.find((payment_info) => payment_info?.key === "mailing_address")?.value}</p>
                        </li>
                      </ul>
                    </>
                  }
                  {
                    order?.payment?.method === "paypal_express" &&
                    <>
                      <p className='text-lg mb-2'>
                        {order?.extension_attributes?.payment_additional_info?.find((payment_info) => payment_info?.key === "method_title")?.value}
                      </p>
                      <ul className='w-full'>
                        <li className='w-full flex items-start gap-2 justify-between'>
                          <p className='text-lg font-semibold'>Payer Email</p>
                          <p className='text-lg'>{order?.extension_attributes?.payment_additional_info?.find((payment_info) => payment_info?.key === "paypal_payer_email")?.value}</p>
                        </li>
                      </ul>
                    </>
                  }
                  {
                    order?.payment?.method === "free" &&
                    <p className='text-lg mb-2'>
                      {order?.extension_attributes?.payment_additional_info?.find((payment_info) => payment_info?.key === "method_title")?.value}
                    </p>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className=' flex-1 w-full bg-[#EBEAE2] space-y-2 rounded-3xl p-6'>
            <h1 className='font-theme-font-bold text-[32px]'>Order Summary</h1>
            <ul className='space-y-0.5'>
              <li className='flex items-center justify-between gap-5'>
                <span className='text-xl font-theme-font-light'>Items Subtotal</span>
                <span className='text-xl font-theme-font-light'>${order?.base_subtotal_incl_tax}</span>
              </li>
              <li className='flex items-center justify-between gap-5'>
                <span className='text-xl font-theme-font-light'>Discount</span>
                <span className='text-xl font-theme-font-light'>${order?.base_discount_amount}</span>
              </li>
              <li className='flex items-center justify-between gap-5'>
                <span className='text-xl font-theme-font-light'>Tax</span>
                <span className='text-xl font-theme-font-light'>${order?.base_tax_amount}</span>
              </li>
              <li className='flex items-center justify-between gap-5'>
                <span className='text-xl font-theme-font-light'>Shipping & Handling</span>
                <span className='text-xl font-theme-font-light'>${order?.base_shipping_incl_tax}</span>
              </li>
              <li className='flex items-center justify-between gap-5'>
                <span className='text-xl font-theme-font-bold'>Grand Total</span>
                <span className='text-xl font-theme-font-bold'>${order?.base_grand_total}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page