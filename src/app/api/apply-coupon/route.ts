import { APPLY_COUPON } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerAuthSession()
        const { payload } = await req.json()
        const { coupon_code } = payload

        const { data } = await axios.post(APPLY_COUPON, { couponCodes: [coupon_code] }, {
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