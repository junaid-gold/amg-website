// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;


export default async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret });
    // If token doesn't exist or is expired, redirect to sign-in page
    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // Token exists and is valid, allow access
    return NextResponse.next();
}

// Specify which pages are protected
export const config = {
    matcher: ['/payment-form', "/checkout", "/account", "/orders/:path*", "/single-page-form"]
};