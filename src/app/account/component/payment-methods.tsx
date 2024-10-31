import Image from "next/image"
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react"
import dynamic from "next/dynamic"
import { Country } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { getStoredPaymentMethods } from "../actions"
import PaymentMethodItem from "./payment-method-item"
import WhiteAnimation from "@/components/white-animation"
import BlackAnimation from "@/components/black-animation"

const AddCreditCardDialog = dynamic(() => import("./add-credit-card-dialog"), {
  ssr: false,
})

interface PaymentMethodsProps {
  countries: Country[]
}

const PaymentMethods = ({ countries }: PaymentMethodsProps) => {
  const [open, setOpen] = useState(false)

  const { data, isPending, error } = useQuery({
    queryKey: ["customerStoredPaymentMethods"],
    queryFn: getStoredPaymentMethods,
    refetchOnWindowFocus: true,
  })

  return (
    <>
      <div className={"w-full"}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={"font-theme-font-medium text-[24px] md:text-[32px]"}>
            Payment Methods
          </h3>
          <button
            onClick={() => {
              setOpen((open) => !open)
            }}
            className="underline  text-base font-theme-font-medium"
          >
            <span className="md:hidden">+ Add method</span>
            <span className="hidden md:block">+ Add new payment method</span>
          </button>
        </div>
        <ul className={"flex flex-col gap-4"}>
          {isPending ? (
            <div className="flex items-center min-h-[100px] justify-center h-full">
              {" "}
              <BlackAnimation />
            </div>
          ) : (
            <>
              {data?.paymentMethods?.map(
                (paymentMethod: {
                  customerPaymentProfileId: Key | null | undefined
                  payment: {
                    creditCard: {
                      cardNumber:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<AwaitedReactNode>
                        | null
                        | undefined
                    }
                  }
                }) => (
                  <PaymentMethodItem
                    key={paymentMethod?.customerPaymentProfileId}
                    customerPaymentProfileId={
                      paymentMethod?.customerPaymentProfileId as string
                    }
                    cardNumber={
                      paymentMethod?.payment?.creditCard?.cardNumber as string
                    }
                  />
                )
              )}
            </>
          )}
        </ul>
      </div>

      {open && (
        <AddCreditCardDialog
          countries={countries}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  )
}

export default PaymentMethods
