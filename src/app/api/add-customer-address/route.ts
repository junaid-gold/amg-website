import { CREATE_CUSTOMER, CURRENT_CUSTOMER, SET_PAYMENT_METHOD, SET_SHIPPING_ADDRESS } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerAuthSession()
        const { payload } = await req.json()

        const { data: customerData } = await axios.get(CURRENT_CUSTOMER, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json"
            }
        })

        const payloadToPass = {
            customer: {
                ...customerData,
                addresses: [...customerData?.addresses, payload]
            }
        }

        const { data } = await axios.put(`${CREATE_CUSTOMER}/${customerData?.id}`, payloadToPass, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            }
        })

        return NextResponse.json(data);
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