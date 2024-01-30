import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import "@/app/globals.css"

export const metadata = {
  title: 'Surredo',
  description: 'A Next 14 Social Media Application'
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="el">
        <body className={`${inter.className} bg-dark-1`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}