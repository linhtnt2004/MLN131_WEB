import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gia đình Việt Nam 4.0 – Giữ hồn truyền thống, sống cùng hiện đại',
  description:
    'Hành trình chuyển đổi của gia đình Việt Nam dưới tác động của kinh tế thị trường, đô thị hóa, hội nhập quốc tế và chuyển đổi số – giữ gìn giá trị truyền thống, tiếp thu giá trị hiện đại.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#3a2d22',
}

import { FamilyValueProvider } from "./context/FamilyValueContext"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`light scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className="bg-background font-sans antialiased">
        <FamilyValueProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </FamilyValueProvider>
      </body>
    </html>
  )
}
