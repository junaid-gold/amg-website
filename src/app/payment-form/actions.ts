import { CURRENT_CUSTOMER, GET_CART_PAYMENT_METHODS, CUSTOMER_CART, CART_MINE_TOTAL } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import axios from "axios";
import { redirect } from "next/navigation";

export const getCartMineTotal = async () => {
    try {
        const session = await getServerAuthSession()
        const { data } = await axios.get(CART_MINE_TOTAL, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            }
        });

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
};


export const getAddresses = async () => {
    try {
        const session = await getServerAuthSession()

        const { data } = await axios.get(CURRENT_CUSTOMER, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            }
        })

        return data?.addresses
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
}

export const getPaymentMethods = async () => {

    try {
        const session = await getServerAuthSession()

        const { data } = await axios.get(GET_CART_PAYMENT_METHODS, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json"
            }
        })

        return data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
}

export const setShippingAddress = async (payload: any) => {
    return await axios.post("/api/set-shipping-address", { payload })
}

export const setPaymentMethod = async (payload: {
    paymentMethod: {
        method: string,
        additional_data?: {
            acceptjs_key: string | null,
            acceptjs_value: string | null,
            card_id?: string
            cc_bin: string,
            cc_cid: string,
            cc_exp_month: string,
            cc_exp_year: string,
            cc_last4: string,
            save: boolean

        },
        extension_attributes: { agreement_ids: string[] }
    }
}) => {
    return await axios.post("/api/set-payment-method", { payload })
}



export const chargeCustomer = async (payload:
    { customerPaymentProfileId: string }
) => {
    return await axios.post("/api/charge-customer", { payload })
}

export const getCartCoupons = async () => {
    try {

        const session = await getServerAuthSession()
        const { data } = await axios.get(`${CUSTOMER_CART}/coupons`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            }
        })

        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
}


export const applyCoupon = async (payload: {
    coupon_code: string
}) => {
    return await axios.post("/api/apply-coupon", { payload })
}


export const doApiRequest = async (payload: {
    "securePaymentContainerRequest": {
        "merchantAuthentication": {
            "name": string,
            "clientKey": string
        },
        "data": {
            "type": string,
            "id": string,
            "token": {
                "cardNumber": string,
                "expirationDate": string,
                "cardCode": string
            }
        }
    }

}) => {
    return await axios.post("https://api2.authorize.net/xml/v1/request.api", payload)
}



export const createSubmission = async (payload: {
    orderId: string
}) => {
    return await axios.post("/api/create-submission", { payload })
}

export const clearDiscountFromCart = async () => {
    return await axios.delete("/api/clear-discounts-from-cart")
}