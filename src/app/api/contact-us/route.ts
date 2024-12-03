import type { NextApiResponse } from "next"
import { NextResponse } from "next/server"
import mailchimp from 'mailchimp-api-v3';

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const mailchimpClient = new mailchimp(process.env.MAILCHIMP_API_KEY!);

        const { email, phone, message, name } = await req.json()

        if (!email) {
            return res.status(400).json({ error: "Email is required" })
        }

        const campaignOptions = {
            type: 'regular',
            recipients: { to_emails: ["hamzatasadaq51@gmail.com"] },
            settings: {
                subject_line: "subject",
                reply_to: email,
                from_name: email,
            },
        };

        await mailchimpClient.request({
            method: 'POST',
            path: '/campaigns',
            body: {
                type: 'regular',
                recipients: { list_id: 'eb77321d76' },
                settings: {
                    subject_line: "subject",
                    reply_to: "hamzatasadaq51@gmail.com",
                    from_name: name,
                },
                content: {
                    plain_text: message,
                },
            },
        });

        // const MailchimpKey = process.env.MAILCHIMP_API_KEY
        // const MailchimpServer = process.env.MAILCHIMP_API_SERVER
        // const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID

        // if (!MailchimpKey || !MailchimpServer || !MailchimpAudience) {
        //     throw new Error("Missing Mailchimp environment variables")
        // }

        // const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`

        // const response = await fetch(customUrl, {
        //     method: "POST",
        //     headers: {
        //         Authorization: `Basic ${Buffer.from(
        //             `anystring:${MailchimpKey}`
        //         ).toString("base64")}`,
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         email_address: email,
        //         status: "subscribed",
        //     }),
        // })

        // if (!response.ok) {
        //     const errorData = await response.json()
        //     return NextResponse.json(
        //         { error: errorData.detail },
        //         { status: response.status }
        //     )
        // }

        // const received = await response.json()
        return NextResponse.json({})
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
