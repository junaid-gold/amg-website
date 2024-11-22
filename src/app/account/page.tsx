import { getBillingAddress, getCurrentCustomer, getCustomerAddresses, getCustomerOrders, getMySubmissions, getShippingAddress } from "./actions";
import { OrderItem, OrdersSearchCriteria } from "@/types";
import AccountWrapperView from "./component/account-wrapper-view";
import { getCountries } from "../(auth)/sign-up/actions";
export const maxDuration = 60; // This function can run for a maximum of 5 seconds
export const revalidate = 0;

const Account = async ({ params, searchParams }: { params: {}, searchParams: { [key: string]: string } }) => {
  const [
    orderResponse,
    customerAddresses,
    countries,
    mySubmissions,
    billingAddress,
    shippingAddress,
    currentCustomer
  ] = await Promise.all([
    getCustomerOrders(),
    getCustomerAddresses(),
    getCountries(),
    getMySubmissions(),
    getBillingAddress(),
    getShippingAddress(),
    getCurrentCustomer()
  ]);

  const orders: {
    items: OrderItem[];
    search_criteria: OrdersSearchCriteria;
    total_count: number;
  } = orderResponse?.data;
  return (
    <>
      <div className="min-h-[calc(100vh-536px)]">
        <AccountWrapperView tab={searchParams?.currentTab} currentCustomer={currentCustomer} billingAddress={billingAddress} items={orders?.items} shippingAddress={shippingAddress} countries={countries} customerAddresses={customerAddresses} mySubmissions={mySubmissions} />
      </div>
    </>
  );
};

export default Account;
