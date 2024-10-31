"use client";
import { useState } from "react";
import { Address, Country, Customer, OrderItem, Product } from "@/types";
import TabsList from "./tabs-list";
import AccountView from "./account.view";
import Orders from "./orders";
import SubmissionView from "./submission.view";
import AddressBookView from "./address-book-view";

interface AccountWrapperViewProps {
    items: OrderItem[];
    customerAddresses: Address[]
    countries: Country[]
    mySubmissions: Product
    billingAddress: Address
    shippingAddress: Address | []
    currentCustomer: Customer
    tab?: string
}

const AccountWrapperView = ({ items, customerAddresses, currentCustomer, countries, shippingAddress, mySubmissions, billingAddress, tab }: AccountWrapperViewProps) => {
    const [currentTab, setCurrentTab] = useState(tab ? Number(tab) : 1);
    return (
        <div className={"flex flex-col pb-10 items-center justify-center"}>
            <TabsList currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {currentTab === 1 || !currentTab ? (
                <AccountView currentCustomer={currentCustomer} billingAddress={billingAddress} shippingAddress={shippingAddress} customerAddresses={customerAddresses} countries={countries} />
            ) : currentTab === 2 ? (
                <Orders items={items} />
            ) : currentTab === 3 ? (
                <SubmissionView mySubmissions={mySubmissions} />
            ) : (
                <AddressBookView billingAddress={billingAddress} shippingAddress={shippingAddress} customerAddresses={customerAddresses} countries={countries} />
            )}
        </div>
    );
};

export default AccountWrapperView;
