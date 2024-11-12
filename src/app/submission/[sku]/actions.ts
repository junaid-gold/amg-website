import { GET_PRODUCT, GET_SUBMISSION_IMAGES } from "@/http/endpoints"
import axios from "axios"
import { redirect } from "next/navigation"

export const getMySubmissionDetails = async (sku: string) => {
    try {
        if (sku.includes("-")) {

            const { data } = await axios.get(`${GET_PRODUCT}/${sku}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`
                }
            })

            return data
        } else {
            const { data } = await axios.get(`${GET_PRODUCT}?searchCriteria[filterGroups][0][filters][0][field]=c2c_holoid&searchCriteria[filterGroups][0][filters][0][value]=${sku}%25&searchCriteria[filterGroups][0][filters][0][condition_type]=like`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`
                }
            })
            return data?.items?.[0]
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {

                redirect("/sign-out")
            }
        }
    }
}



export const getMySubmissionImages = async (sku: string) => {
    try {
        const { data } = await axios.get(`${GET_SUBMISSION_IMAGES}?sku=${sku}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                }
            })

        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.status === 401) {
                redirect("/sign-out")
            }
        }
    }
}