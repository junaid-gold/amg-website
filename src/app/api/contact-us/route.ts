import type { NextApiResponse } from "next"
import { NextResponse } from "next/server"
import nodemailer from 'nodemailer';

export async function POST(req: Request, res: NextApiResponse) {
    try {

        const { email, phone, message, name } = await req.json()

        if (!email) {
            return res.status(400).json({ error: "Email is required" })
        }

        // Configure the SMTP transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.eu-west-1.awsapps.com', // Replace with your SMTP server (e.g., Gmail, Outlook)
            port: 465, // Use 465 for secure, or 587 for non-secure
            secure: true, // true for 465, false for other ports
            auth: {
                // user: "contact@audiomediagrading.com", // Your SMTP username
                // pass: "AMG123dnh3SyyrSKha5gP*", // Your SMTP password

                user: "noreply@gurubook.de", // Your SMTP username
                pass: "b4uYENJ.<8wr%fe7G>n6F", // Your SMTP password
            },
        });
        // Send the email
        const info = await transporter.sendMail({
            from: '"Audio Media Grading" <noreply@gurubook.de>', // Sender address
            to: "hamzatasadaq51@gmail.com", // Recipient address
            // info@audiomediagrading.com
            subject: "Contact Us", // Subject line
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}
            `, // Plain text body
            // html, // HTML body
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
