import { CREATE_INSURANCE_AND_SHIPPING, CUSTOMER_CART, DELETE_PRODUCT_FROM_CART } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const session = await getServerAuthSession()

        const { itemId } = await req.json()

        const { data } = await axios.delete(`${DELETE_PRODUCT_FROM_CART}/${itemId}`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const { data: cartData } = await axios.get(CUSTOMER_CART, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        // TODO: Removing Await so it can't wait and return the response
        await axios.post(`${CREATE_INSURANCE_AND_SHIPPING}/?id=${cartData?.customer?.id}`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
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