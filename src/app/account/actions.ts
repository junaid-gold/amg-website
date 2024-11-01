import { CURRENT_CUSTOMER, GET_BILLING_ADDRESS, GET_CUSTOMER_ORDER, GET_PRODUCT, GET_SHIPPING_ADDRESS } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { requiredNameAddressFormSchema } from "@/validations/address.validation";
import { changeCustomerDataFormSchema } from "@/validations/change-customer-data.validation";
import { ChangePasswordFormSchemaType } from "@/validations/change-password.validation";
import { creditCardFormSchema } from "@/validations/credit-card.valiation";
import axios from "axios";
import { redirect } from "next/navigation";
import { z } from "zod";

export const getShippingAddress = async () => {
    try {
        const session = await getServerAuthSession()
        const { data } = await axios.get(GET_SHIPPING_ADDRESS, {
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

export const getBillingAddress = async () => {
    try {

        const session = await getServerAuthSession()
        const { data } = await axios.get(GET_BILLING_ADDRESS, {
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

export const changeUserPassword = async (payload: ChangePasswordFormSchemaType) => {
    try {

        const { currentPassword, password } = payload;

        return await axios.put("/api/change-password", { currentPassword, newPassword: password })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
}

export const getCustomerOrders = async () => {
    try {
        const session = await getServerAuthSession()
        const { data } = await axios.get(CURRENT_CUSTOMER, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
            }
        })
        return await axios.get(`${GET_CUSTOMER_ORDER}?searchCriteria[filter_groups][0][filters][0][field]=customer_id&searchCriteria[filter_groups][0][filters][0][value]=${data?.id}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`
            }
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
}

export const getMySubmissions = async () => {
    try {
        const session = await getServerAuthSession()
        const { data: customerData } = await axios.get(CURRENT_CUSTOMER, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
            }
        })

        const { data } = await axios.get(`${GET_PRODUCT}?searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][value]=${customerData?.id}%25&searchCriteria[filterGroups][0][filters][0][condition_type]=like`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`
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

export const getCustomerAddresses = async () => {
    try {
        const session = await getServerAuthSession()
        const { data } = await axios.get(CURRENT_CUSTOMER, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
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

export const getCurrentCustomer = async () => {
    try {
        const session = await getServerAuthSession()
        const { data } = await axios.get(CURRENT_CUSTOMER, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
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

export const deleteAddress = async (addressId: number) => {
    return await axios.post("/api/delete-address", { addressId })
}

export const addNewAddress = async (payload: z.infer<typeof requiredNameAddressFormSchema>) => {
    return await axios.put("/api/add-customer-address", { payload })
}

export const updateAddress = async (payload: z.infer<typeof requiredNameAddressFormSchema> & { id: number }) => {
    const { default_billing, default_shipping, ...rest } = payload
    return await axios.put("/api/change-address", { ...payload })
}


export const changeCustomerData = async (payload: z.infer<typeof changeCustomerDataFormSchema> & { website_id: number }) => {
    const { firstName, lastName, email, website_id } = payload
    const payloadToPass = {
        customer: {
            firstname: firstName,
            lastname: lastName,
            email,
            website_id
        },
    }
    return await axios.put("/api/change-customer-data", payloadToPass)
}

export const storePaymentMethod = async (payload: z.infer<typeof creditCardFormSchema>) => {
    return await axios.post("/api/store-credit-card", payload)
}

export const getStoredPaymentMethods = async () => {
    const { data } = await axios.get("/api/get-store-credit-card")

    return data
}


export const deletePaymentMethod = async (paymentProfileId: string) => {
    try {
        const response = await axios.post(`/api/delete-payment-profile`, { paymentProfileId })
        return response?.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
}
