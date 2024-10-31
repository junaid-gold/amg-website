
import { getServerSession, NextAuthOptions, User } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                try {
                    const { data } = await axios.post(
                        `${process.env.NEXT_PUBLIC_MAGENTO_API_END_POINT}/rest/V1/integration/customer/token`,
                        {
                            username: credentials?.username,
                            password: credentials?.password
                        },
                        {
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );
                    if (data) {
                        return { id: credentials?.username, name: credentials?.username, token: data } as User; // 'id' as a string
                    }

                    throw new Error('Invalid credentials');

                } catch (error) {
                    // @ts-ignore
                    throw new Error(error?.response?.data?.message || 'Login failed');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Add token to JWT if user object is provided
            if (user) {
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            // Add accessToken to session
            session.accessToken = token.accessToken as string;
            return session;
        }
    },
    jwt: {
        maxAge: 60 * 60, // 1 hour (in seconds)
    },
    session: {
        maxAge: 60 * 60, // Set the session to expire after 1 hour
    },
    pages: {
        signIn: '/sign-in', // Define custom sign-in page if needed
        error: '/sign-in', // Redirect to sign-in page on error
    },
    secret: process.env.NEXTAUTH_SECRET,
}
const getServerAuthSession = () => getServerSession(authOptions); //(6)



export default getServerAuthSession