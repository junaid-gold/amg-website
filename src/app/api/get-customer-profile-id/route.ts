import { CUSTOMER_PROFILE_ID } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        // const { id } = await req.json()
        const id = "6468"
        const session = await getServerAuthSession()
        const { data } = await axios.get(`${CUSTOMER_PROFILE_ID}/?function=lookup&id=${id}&key=AMG123!`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json({ data: data?.SUCCESS });
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