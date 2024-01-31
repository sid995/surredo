import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/shared/Header";
import LeftSidebar from "@/components/shared/Leftsidebar";
import RightSidebar from "@/components/shared/Rightsidebar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Surredo',
  description: 'A Next 14 Social Media Application'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
