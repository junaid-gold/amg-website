"use client"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


const PaypalProvider = ({ children }: { children: React.ReactNode }) => {
    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
    };
    return (
        <PayPalScriptProvider options={initialOptions}>
            {children}
        </PayPalScriptProvider>
    );
}

export default PaypalProvider