import { ErrorResponse } from "@/types";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export function formatAxiosError(error: AxiosError<ErrorResponse>): { status: number, message: string } {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';

    return { status, message };
}


export const errorHandler = (error: Error) => {
    if (axios.isAxiosError(error)) {
        if (error?.status === 401) {
            window.location.href = '/sign-out'
        }
        const message = error.response?.data?.message || error.message || 'An unexpected error occurred';

        toast.error(message)
    } else {
        toast.error("Something went wrong!")
    }
}

