import type { Metadata } from 'next'

import './globals.css'

import { ProgressBar } from '@components/common/sub-components/progress-bar'
import { ThemeProvider } from '@components/common/sub-components/theme-provider'
import { Toaster } from 'sonner'

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
    <html lang="en" suppressHydrationWarning>
      <body className="text-basic-primary">
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
