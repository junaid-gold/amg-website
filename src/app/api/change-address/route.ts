import { CHANGE_USER_PASSWORD, CURRENT_CUSTOMER, UPDATE_USER_ADDRESS } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import Email from "next-auth/providers/email";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerAuthSession()
        const address = await req.json()
        const { data: customerData } = await axios.get(`${CURRENT_CUSTOMER}`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
            }
        })
        const { id } = address
        // @ts-ignore
        const payloadToPass = { id: customerData?.id, website_id: customerData?.website_id, email: customerData?.email, firstname: customerData?.firstname, lastname: customerData?.lastname, addresses: [...customerData?.addresses?.filter((address) => address?.id !== id), address] }

        const { data } = await axios.put(`${CURRENT_CUSTOMER}`, { customer: payloadToPass }, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
            }
        })

        return NextResponse.json({ data });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { status, message } = formatAxiosError(error)

            return new Response(JSON.stringify({ message }), {
                status,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            return new Response(JSON.stringify({ message: 'An unknown error occurred' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
}