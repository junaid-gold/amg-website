import React from 'react'
import ShippingAddress from './shipping-address'
import BillingAddress from './billing-address'
import AddressesView from './addresses-view'
import { Address, Country } from '@/types'

interface AddressBookViewProps {
  customerAddresses: Address[]
  countries: Country[]
  billingAddress: Address
  shippingAddress: Address | []
}


const AddressBookView = ({ countries, customerAddresses, billingAddress, shippingAddress }: AddressBookViewProps) => {
  return (
    <div className={"w-full max-w-[90rem] flex flex-col lg:flex-row mb-5 py-10 lg:py-16 gap-8"}>
      <div className={"w-full "}>
        <div className='px-10'>
          <h3 className={"font-theme-font-medium mb-8 text-[24px] md:text-[32px]"}>
            Address
          </h3>
          <div className={""}>
            <div className={"flex gap-6 lg:gap-12 flex-col lg:flex-row "}>
              <BillingAddress billingAddress={billingAddress} countries={countries} />
              <ShippingAddress countries={countries} shippingAddress={shippingAddress} />
            </div>
          </div>
        </div>

        <AddressesView countries={countries} addresses={customerAddresses} />
      </div>
    </div>
  )
}

export default AddressBookView