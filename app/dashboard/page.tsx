'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { useBooking } from '@/context/BookingContext'
import { Calendar, MapPin, Users, CreditCard, X, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { getUserBookings, cancelBooking } = useBooking()
  const router = useRouter()
  const bookings = getUserBookings()

  const handleCancelBooking = async (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(bookingId)
    }
  }

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-brown-600">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <section className="bg-brown-900 text-cream-50 py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
            My Dashboard
          </h1>
          <p className="text-xl text-cream-200">
            Welcome back, {user.name}!
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {/* Account Info */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-brown-800 mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-brown-600 mb-1">Name</p>
                <p className="text-brown-800 font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-brown-600 mb-1">Email</p>
                <p className="text-brown-800 font-semibold">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Bookings */}
          <div>
            <h2 className="text-2xl font-bold text-brown-800 mb-6">My Bookings</h2>
            {bookings.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Calendar className="w-16 h-16 text-brown-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-brown-800 mb-2">No bookings yet</h3>
                <p className="text-brown-600 mb-6">Start exploring our rooms and make your first booking!</p>
                <a href="/rooms" className="btn-primary inline-block">
                  Browse Rooms
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="md:flex">
                      <div className="relative w-full md:w-64 h-48 md:h-auto">
                        <Image
                          src={booking.image}
                          alt={booking.roomName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-serif font-bold text-brown-800 mb-2">
                              {booking.roomName}
                            </h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : booking.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-brown-600">
                              Confirmation: <span className="font-semibold">{booking.confirmationNumber}</span>
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-brown-600">
                            <Calendar className="w-5 h-5" />
                            <span>
                              {format(booking.checkIn, 'MMM dd, yyyy')} - {format(booking.checkOut, 'MMM dd, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-brown-600">
                            <Users className="w-5 h-5" />
                            <span>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-brown-600">
                            <MapPin className="w-5 h-5" />
                            <span>{booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-brown-600">
                            <CreditCard className="w-5 h-5" />
                            <span className="font-semibold text-brown-800">${booking.price * booking.nights}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button className="text-brown-600 hover:text-brown-800 text-sm font-semibold">
                            View Details
                          </button>
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-semibold"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

