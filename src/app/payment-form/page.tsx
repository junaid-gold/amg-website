import {
  getAddresses,
  getCartMineTotal,
  getPaymentMethods
} from "./actions";
import PageView from "./_components/page-view";
import { getCountries } from "../(auth)/sign-up/actions";
import { redirect } from "next/navigation";

const PaymentForm = async () => {
  const [cartMineTotal, addresses, paymentMethods, countries] = await Promise.all([
    getCartMineTotal(),
    getAddresses(),
    getPaymentMethods(),
    getCountries(),
  ]);

  if (cartMineTotal?.items?.length === 0) {
    return redirect("/")
  }
  return (
    <div className="bg-[#F8F7F3]">
      <PageView
        addresses={addresses}
        cartMineTotal={cartMineTotal}
        paymentMethods={paymentMethods}
        countries={countries}
      />
    </div>
  );
};

export default PaymentForm;
