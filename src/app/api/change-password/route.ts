import { CHANGE_USER_PASSWORD } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerAuthSession()
        const { currentPassword, newPassword } = await req.json()

        const { data } = await axios.put(CHANGE_USER_PASSWORD, { currentPassword, newPassword }, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
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