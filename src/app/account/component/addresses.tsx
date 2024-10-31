import { Address, Country } from "@/types"
import BillingAddress from "./billing-address"
import ShippingAddress from "./shipping-address"
import { useState } from "react"
import AddressDialog from "./address-dialog"

interface AddressBookViewProps {
    customerAddresses: Address[]
    countries: Country[]
    billingAddress: Address
    shippingAddress: Address | []
}


const Addresses = ({ billingAddress, shippingAddress, countries }: AddressBookViewProps) => {
    const [openAddressDialog, setOpenAddressDialog] = useState(false)
    return (
        <div className='w-full'>
            <div className="flex items-center justify-between">
                <h3 className={"font-theme-font-medium mb-4 text-[24px] md:text-[32px]"}>
                    Addresses
                </h3>
                {openAddressDialog && (
                    <AddressDialog open={openAddressDialog} setOpen={setOpenAddressDialog} countries={countries} />
                )}

                <button onClick={() => {
                    setOpenAddressDialog((openAddressDialog) => !openAddressDialog)
                }} className="underline  text-base font-theme-font-medium">
                    <span className="md:hidden">
                        + Add Address
                    </span>
                    <span className="hidden md:block">
                        + Add a new address
                    </span>
                </button>

            </div>
            <div className={""}>
                <div className={"flex  flex-col bg-theme-gray p-6 gap-8 sm:flex-row md:flex-col sm:gap-4 md:gap-8 overflow-hidden rounded-3xl lg:flex-row "}>
                    <BillingAddress headerTitle="Billing Address" className="!p-0" billingAddress={billingAddress} countries={countries} />
                    <ShippingAddress headerTitle="Shipping Address" className="!p-0" countries={countries} shippingAddress={shippingAddress} />
                </div>
            </div>
        </div>
    )
}

export default Addresses