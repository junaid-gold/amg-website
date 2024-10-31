import { Customer } from "@/types"
import { useState } from "react"
import ChangeCustomerDataDialog from "./change-customer-data-dialog"

interface CustomerInfoProps {
    currentCustomer: Customer
}

const CustomerInfo = ({ currentCustomer }: CustomerInfoProps) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            {open && (
                <ChangeCustomerDataDialog
                    open={open}
                    customerData={currentCustomer}
                    setOpen={setOpen}
                />
            )}

            <div
                className={
                    " w-full flex flex-col lg:flex-row gap-8"
                }
            >
                <div className="flex-1">
                    <h3
                        className={"font-theme-font-medium mb-4 text-[24px] md:text-[32px]"}
                    >
                        Account Information
                    </h3>
                    <div className="space-y-5 bg-theme-gray rounded-xl p-6">
                        <h2 className="font-theme-font-medium text-2xl">Contact</h2>
                        <div>
                            <p className="">{currentCustomer?.firstname} {currentCustomer?.lastname}</p>
                            <p className="">{currentCustomer?.email}</p>
                        </div>


                        <button className={"underline text-base"} onClick={() => setOpen(true)}>
                            Edit Account Details
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerInfo