import { GET_PRODUCT } from "@/http/endpoints";
import axios from "axios";
import { redirect } from "next/navigation";

export const getProductType = async () => {
    try {
        const { data } = await axios.get(`${GET_PRODUCT}?searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][value]=vnl001,vnl002,vnl003,vnl004,vnl005&searchCriteria[filterGroups][0][filters][0][condition_type]=in`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`,
            },
        });

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
}


export const getOneProductType = async (sku: string) => {
    try {
        const { data } = await axios.get(`${GET_PRODUCT}?searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][value]=${sku}&searchCriteria[filterGroups][0][filters][0][condition_type]=in`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`,
            },
        });

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                // redirect("/sign-out")
            }
        }
    }
}

export const createItemInCart = async (payload: any) => {
    try {
        const response = await axios.post("/api/create-item-in-cart", { payload })

        return response?.data
    } catch (error) {
        throw (error)
    }
}
export const updateCartItem = async (payload: { itemId: string, cartItem: any }) => {
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
