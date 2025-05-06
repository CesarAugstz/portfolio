import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import { Lang } from "@/stores/lang.store"

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'pt-BR' }]
}
 

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "Personal portfolio showcasing my projects and skills",
  keywords: ["developer", "portfolio", "react", "next.js", "web development"],
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Lang }>
}>) {
  console.log('params', await params)
  return (
    <html lang={(await params).lang}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CustomCursor />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 mx-2 container mx-auto">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

