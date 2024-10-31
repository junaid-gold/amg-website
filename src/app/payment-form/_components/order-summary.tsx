import { CartMineTotal } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { clearDiscountFromCart } from "../actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { errorHandler } from "@/lib/utils";

interface OrderSummaryProps {
  cartMineTotal: CartMineTotal;
}

const OrderSummary = ({ cartMineTotal }: OrderSummaryProps) => {
  const taxSegment = cartMineTotal?.total_segments?.find((segment) => segment?.code === "tax")

  const router = useRouter()


  const clearMutation = useMutation({
    mutationFn: clearDiscountFromCart,
    mutationKey: ["clearDiscountFromCart"],
    onSuccess: (data) => {
      if (data?.status === 200) {

        router.refresh()
        toast.success("Coupons removed from the cart")
      }
    },
    onError: (error) => {
      errorHandler(error)
    }
  })

  const discount = cartMineTotal?.total_segments?.find((segment) => segment?.code === "discount")
  const shippingAmount = cartMineTotal?.items?.find((item) => item?.name === "SHIPPING AMOUNT")
  const insuranceAmount = cartMineTotal?.items?.find((item) => item?.name === "RETURN INSURANCE AMOUNT")
  const tax = cartMineTotal?.total_segments?.find((segment) => segment?.code === "tax")
  const grandTotal = cartMineTotal?.total_segments?.find((segment) => segment?.code === "grand_total")

  return (
    <div className="flex flex-col">
      <ul className="text-lg ">
        <li className={`my-1 flex items-center justify-between`}>
          <h3 className={`text-sm font-normal`}>{
            cartMineTotal?.total_segments?.find((segment) => segment?.code === "subtotal")?.title}</h3>

          <p className={`text-sm font-normal"}`}>${
            cartMineTotal?.total_segments?.find((segment) => segment?.code === "subtotal")?.value}</p>
        </li>
        <li className={`my-1 flex items-center justify-between`}>
          <h3 className={`text-sm font-normal`}>{shippingAmount?.name}</h3>

          <p className={`text-sm font-normal"}`}>${shippingAmount?.price}</p>
        </li>
        <li className={`my-1 flex items-center justify-between`}>
          <h3 className={`text-sm font-normal`}>{insuranceAmount?.name}</h3>

          <p className={`text-sm font-normal"}`}>${insuranceAmount?.price}</p>
        </li>
        <li className={`my-1 flex items-center justify-between`}>
          <h3 className={`text-sm font-normal`}>FL Sales tax</h3>
          <p className={`text-sm font-normal"}`}>${tax?.value}</p>
        </li>
        {
          discount &&

          <li className={` flex items-center justify-between`}>
            <h3 className={`text-sm font-normal`}>{
              discount?.title}</h3>
            <button onClick={() => {
              clearMutation.mutate()
            }} disabled={clearMutation?.isPending} className={`ml-2 flex-1  ${clearMutation?.isPending && "opacity-50"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
              >
                <path
                  fill="#000"
                  d="M18.79 7a.79.79 0 0 0-.79.79v8.84A3.37 3.37 0 0 1 14.63 20H8.95a3.37 3.37 0 0 1-3.37-3.37V7.79a.79.79 0 1 0-1.58 0v8.84a5 5 0 0 0 5 4.95h5.68a5 5 0 0 0 4.95-4.95V7.79a.79.79 0 0 0-.84-.79Z"
                />
                <path
                  fill="#000"
                  fillRule="evenodd"
                  d="M18.79 5.58h-14a.79.79 0 1 1 0-1.58h2.65l1.18-1.28A2.41 2.41 0 0 1 10.33 2h2.92a2.39 2.39 0 0 1 1.69.7l1.2 1.3h2.65a.79.79 0 1 1 0 1.58Zm-5.54-2h-2.92a.8.8 0 0 0-.54.21l-.19.2h4.38l-.19-.2a.78.78 0 0 0-.54-.21Z"
                  clipRule="evenodd"
                />
                <path
                  fill="#000"
                  d="M8.04 8.79v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0ZM11.04 8.79v8a.75.75 0 0 0 1.5 0v-8a.75.75 0 0 0-1.5 0ZM14.04 8.79v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0Z"
                />
              </svg>
            </button>
            <p className={`text-sm font-normal"}`}>${discount?.value}</p>
          </li>
        }
        <li className={`my-2 flex items-center justify-between`}>
          <h3 className={`text-sm font-semibold`}>{grandTotal?.title}</h3>
          <p className={`text-sm font-semibold"}`}>${grandTotal?.value}</p>
        </li>
      </ul>
    </div>
  );
};

export default OrderSummary;
