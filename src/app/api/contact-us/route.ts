import axios from "axios";
import type { NextApiResponse } from "next"
import { NextResponse } from "next/server"
import nodemailer from 'nodemailer';

export async function POST(req: Request, res: NextApiResponse) {
    try {

        const { email, phone, message, name } = await req.json()

        if (!email) {
            return res.status(400).json({ error: "Email is required" })
        }

        const emailPayload = {
            service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Replace with your EmailJS service ID
            template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Replace with your EmailJS template ID
            user_id: "fwc-CTM8jaBXE-0QX", // Replace with your EmailJS public key
            template_params: {
                name, // Variables defined in your EmailJS template
                email,
                phone,
                message,
            },
        };

        const emailJSResponse = await axios.post("https://api.emailjs.com/api/v1.0/email/send", emailPayload, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return NextResponse.json({ message: "Email Sended" })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}