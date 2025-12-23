'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { CartItem } from './CartContext'
import { sendBookingConfirmationEmail, sendBookingCancellationEmail } from '@/lib/email'

export interface Booking extends CartItem {
  id: string
  userId: string
  status: 'confirmed' | 'cancelled' | 'completed'
  bookingDate: Date
  confirmationNumber: string
}

interface BookingContextType {
  bookings: Booking[]
  addBooking: (cartItems: CartItem[]) => Promise<string>
  cancelBooking: (bookingId: string) => void
  getUserBookings: () => Booking[]
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const { user } = useAuth()

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = localStorage.getItem('bookings')
    if (storedBookings) {
      try {
        const parsed = JSON.parse(storedBookings)
        // Convert date strings back to Date objects
        const bookingsWithDates = parsed.map((b: any) => ({
          ...b,
          checkIn: new Date(b.checkIn),
          checkOut: new Date(b.checkOut),
          bookingDate: new Date(b.bookingDate),
        }))
        setBookings(bookingsWithDates)
      } catch (error) {
        console.error('Error loading bookings:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Save bookings to localStorage whenever they change
    if (bookings.length > 0) {
      localStorage.setItem('bookings', JSON.stringify(bookings))
    }
  }, [bookings])

  const generateConfirmationNumber = (): string => {
    return `SH${Date.now().toString().slice(-8)}`
  }

  const addBooking = async (cartItems: CartItem[]): Promise<string> => {
    if (!user) throw new Error('User must be logged in')

    const confirmationNumber = generateConfirmationNumber()
    const newBookings: Booking[] = cartItems.map((item) => ({
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      status: 'confirmed' as const,
      bookingDate: new Date(),
      confirmationNumber,
    }))

    setBookings((prev) => [...prev, ...newBookings])

    // Send confirmation emails
    for (const booking of newBookings) {
      try {
        await sendBookingConfirmationEmail(booking, user.email, user.name)
      } catch (error) {
        console.error('Failed to send confirmation email:', error)
      }
    }

    return confirmationNumber
  }

  const cancelBooking = async (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId)
    if (booking && user) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
        )
      )

      // Send cancellation email
      try {
        await sendBookingCancellationEmail(booking, user.email, user.name)
      } catch (error) {
        console.error('Failed to send cancellation email:', error)
      }
    }
  }

  const getUserBookings = (): Booking[] => {
    if (!user) return []
    return bookings.filter((booking) => booking.userId === user.id && booking.status !== 'cancelled')
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, getUserBookings }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

