
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PWAProvider } from '@/components/pwa-provider'
import { AuthProvider } from '@/components/auth-provider'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Función Lineal - Matemáticas 8° Grado',
  description: 'Aplicación educativa interactiva para aprender función lineal',
  manifest: '/manifest.json',
  icons: {
    apple: '/icon-192x192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light">
          <PWAProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </PWAProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
