import axios from "axios";
import { redirect } from "next/navigation";

export const currentCustomer = async () => {
    try {
        return await axios.get("/api/current-customer");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                window.location.href = '/sign-out'
            }
        }
    }
};

export const getCurrentCustomerCart = async () => {
    try {
        const response = await axios.get(`/api/current-customer-cart`)
        return response?.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                window.location.href = '/sign-out'
            } else if (error?.status === 404) {
                return null
            }
        }
    }
}

export const getCurrentCustomerCartItems = async () => {
    try {
        const response = await axios.get(`/api/current-customer-cart-items`)
        return response?.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                window.location.href = '/sign-out'
            } else if (error?.status === 404) {
                return null
            }
        }
    }
}

export const deleteItemFromCart = async (itemId: number) => {
    try {
        const response = await axios.post(`/api/delete-item-from-cart`, { itemId })
        return response?.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
}



export const clearItemFromCart = async (itemIds: string[]) => {
    try {
        await axios.delete("/api/clear-discounts-from-cart")
        const response = await axios.post(`/api/clear-cart-items`, { itemIds })
        return response?.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
}
export const updateCartItemQuantity = async (payload: { itemId: string, cartItem: { qty: number, quote_id: string } }) => {
    try {
        return await axios.put(`/api/update-cart-item`, { payload })

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
}

export const getCartItemDetails = async (sku: string) => {
    try {
        const { data } = await axios.post(`/api/get-cart-item-details`, { sku })
        return data?.items?.[0]
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                window.location.href = '/sign-out'
            }
        }
    }
}