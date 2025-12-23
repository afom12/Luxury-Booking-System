import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import React from 'react'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { BookingProvider } from '@/context/BookingContext'
import { ReviewProvider } from '@/context/ReviewContext'
import { LanguageProvider } from '@/context/LanguageContext'
import ChatWidget from '@/components/ChatWidget'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Seaside Hotel - Luxury Beachfront Accommodation',
  description: 'Experience luxury at Seaside Hotel. Book your perfect beachfront room today.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <AuthProvider>
            <BookingProvider>
              <ReviewProvider>
                <CartProvider>
                  <Navbar />
                  <main>{children}</main>
                  <Footer />
                  <ChatWidget />
                </CartProvider>
              </ReviewProvider>
            </BookingProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
