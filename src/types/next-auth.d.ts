// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User {
        token: string; // Add token property to the User type
    }

    interface Session {
        accessToken?: string; // Add accessToken property to the Session type
    }
}
