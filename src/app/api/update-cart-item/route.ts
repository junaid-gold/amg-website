import { CREATE_INSURANCE_AND_SHIPPING, CUSTOMER_CART, UPDATE_CART_ITEM } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerAuthSession()
        const { payload } = await req.json()
        const { cartItem, itemId } = payload

        if (cartItem.product_option && cartItem.product_option.extension_attributes) {
            cartItem.product_option.extension_attributes.custom_options.forEach((option: any) => {
                delete option.price; // Remove the price field
            });
        }
        delete cartItem?.valueRange
        const { data } = await axios.put(`${UPDATE_CART_ITEM}/${itemId}`, { cartItem }, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            }
        })



        const { data: cartData } = await axios.get(CUSTOMER_CART, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        setTimeout(() => {
        axios.post(`${CREATE_INSURANCE_AND_SHIPPING}/?id=${cartData?.customer?.id}`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            }
        })
    },1000)
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