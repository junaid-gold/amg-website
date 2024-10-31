import { DELETE_ADDRESS } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerAuthSession()
        const { addressId } = await req.json()

        const { data } = await axios.delete(`${DELETE_ADDRESS}/${addressId}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`
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