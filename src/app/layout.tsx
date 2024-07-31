import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
    title: 'TimeTracker - Momo',
    description: 'Momo',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className={GeistSans.className}>
        </body>
        </html>
    )
}
