import { GET_CUSTOMER_ORDER, GET_ORDER_DETAILS } from "@/http/endpoints"
import getServerAuthSession from "@/lib/auth"
import axios from "axios"
import { redirect } from "next/navigation"

export const getCustomerOrderDetails = async (increment_id: string) => {
    try {
        const { data } = await axios.get(`${GET_CUSTOMER_ORDER}?searchCriteria[filterGroups][0][filters][0][field]=increment_id&searchCriteria[filterGroups][0][filters][0][value]=${increment_id}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`
            }
        })

        return data?.items?.[0]
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                redirect("/sign-out")
            }
        }
    }
}

export const getOrderDetails = async (increment_id: string) => {
    try {
        const { data } = await axios.get(`${GET_ORDER_DETAILS}?order=${increment_id}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`
            }
        })
        return Object.values(data?.[0]?.items)?.filter((item: any) => {
            // Exclude items where `sku` contains "shipping" or "return-insurance"
            return !item.sku.includes('shipping') && !item.sku.includes('return-insurance');
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                redirect("/sign-out")
            }
        }
    }
}




export const getOrderItemDetails = async (increment_id: string) => {
    try {
        const { data } = await axios.post(`/api/get-order-item-details`, { increment_id })
        return data?.items?.[0]
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                window.location.href = '/sign-out'
            }
        }
    }
}