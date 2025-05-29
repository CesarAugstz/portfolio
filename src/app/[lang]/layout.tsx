import type React from "react"
import type { Metadata } from "next/types"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "Personal portfolio showcasing my projects and skills",
  keywords: ["developer", "portfolio", "react", "next.js", "web development"],
}

export default async function LangLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto">{children}</main>
      <Footer />
    </div>
  )
}
