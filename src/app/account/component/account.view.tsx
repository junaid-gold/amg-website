import { Address, Country, Customer } from "@/types";
import PasswordAndSecurity from "./password-and-security";
import CustomerInfo from "./customer-info";
import Addresses from "./addresses";
import PaymentMethods from "./payment-methods";

interface AccountViewProps {
  currentCustomer: Customer

  customerAddresses: Address[]
  countries: Country[]
  billingAddress: Address
  shippingAddress: Address | []
}

const AccountView = ({ currentCustomer, customerAddresses, countries, billingAddress, shippingAddress }: AccountViewProps) => {
  return (
    <div className="pt-10 lg:py-16 max-w-[90rem] mx-auto  space-y-6 lg:space-y-10 w-full px-10">
      <div className="flex items-start gap-5 lg:gap-10 flex-col lg:flex-row">
        <Addresses customerAddresses={customerAddresses} countries={countries} billingAddress={billingAddress} shippingAddress={shippingAddress} />
        <PaymentMethods countries={countries} />
      </div>
      <div className="flex items-start gap-5 lg:gap-10 flex-col lg:flex-row">
        <CustomerInfo currentCustomer={currentCustomer} />
        <PasswordAndSecurity />
      </div>
    </div>
  );
};

export default AccountView;
