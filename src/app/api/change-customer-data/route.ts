import { CHANGE_USER_PASSWORD, CURRENT_CUSTOMER, UPDATE_USER_ADDRESS } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import Email from "next-auth/providers/email";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerAuthSession()
        const payload = await req.json();
        const { data } = await axios.put(`${CURRENT_CUSTOMER}`, { ...payload }, {
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