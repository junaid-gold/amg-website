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
import Script from "next/script"

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
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4T5472V5WZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4T5472V5WZ');
          `}
        </Script>

        {/* Google Tag Manager Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11476083695"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11476083695');
          `}
        </Script>
        <title>AMG</title>
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <Toast />
          <AuthProvider session={session}>
            <WrapperMain>{children}</WrapperMain>
          </AuthProvider>
        </QueryProvider>

        {/* Facebook Pixel Script */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive" // Ensures the script loads after the page is interactive
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '577056731340332');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* Noscript Fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=577056731340332&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

      </body>
    </html>
  )
}
