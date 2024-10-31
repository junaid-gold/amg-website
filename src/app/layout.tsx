import type { Metadata } from "next"
import { Inter } from "next/font/google"
import WrapperMain from "@/components/wrapper"
import AuthProvider from "@/components/providers/auth-provider"
import getServerAuthSession from "@/lib/auth"
import QueryProvider from "@/components/providers/query-provider"
import Toast from "@/components/providers/toast"
import "@/styles/image-container.css"
import "@/styles/animation.css"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AMG",
  description: "Grading has a new standard. Preserve the legend.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerAuthSession()

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>AMG</title>
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <Toast />
          <AuthProvider session={session}>
            <WrapperMain>{children}</WrapperMain>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
