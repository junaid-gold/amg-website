import { CREATE_CUSTOMER } from "@/http/endpoints";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { password, customer } = await req.json()
        if (!customer && !password) {
            return new Response(JSON.stringify({ message: "Customer & Password required" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const { firstname, lastname } = customer;
        const region = customer?.addresses[0]?.region?.region_id ? {
            region_id: customer?.addresses[0]?.region?.region_id,
        } : {
            region: customer?.addresses[0]?.region?.region
        }
        const payloadToPass = {
            customer: {
                ...customer,
                addresses: [
                    {
                        ...customer?.addresses[0],
                        firstname,
                        lastname,
                        street: customer?.addresses[0]?.street?.filter(
                            (street: string) => street?.trim() !== ""
                        ),
                        region,
                        default_shipping: true,
                        default_billing: true,
                    },
                ],
            },
            password,
        };

        const { data } = await axios.post(CREATE_CUSTOMER, payloadToPass, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

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