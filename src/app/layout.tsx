import type { Metadata } from 'next'

import './globals.css'

import { Inter, Playfair_Display } from 'next/font/google'

import { ProgressBar } from '@components/common/sub-components/progress-bar'
import { ThemeProvider } from '@components/common/sub-components/theme-provider'
import { Toaster } from 'sonner'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Gibbarosa v4 - Preowned Luxury',
  description: 'Gibbarosa - Preowned Luxury',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className={`${inter.className} text-basic-primary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <ProgressBar />
          <Toaster position="top-right" offset={65} closeButton />
          <main className="relative">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
