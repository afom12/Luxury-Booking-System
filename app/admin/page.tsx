'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useBooking } from '@/context/BookingContext'
import { Calendar, Users, DollarSign, TrendingUp, Package } from 'lucide-react'
import { format } from 'date-fns'

export default function AdminDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const { bookings } = useBooking()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
      } else if (user.role !== 'admin') {
        router.push('/dashboard')
      }
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-brown-600">Loading...</div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed')
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled')
  const totalRevenue = confirmedBookings.reduce(
    (sum, booking) => sum + booking.price * booking.nights,
    0
  )

  const stats = [
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Confirmed',
      value: confirmedBookings.length,
      icon: <Package className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      title: 'Cancelled',
      value: cancelledBookings.length,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-red-500',
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-yellow-500',
    },
  ]

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <section className="bg-brown-900 text-cream-50 py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xl text-cream-200">Manage bookings and view analytics</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} text-white p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-sm text-brown-600 mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-brown-800">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-brown-800 mb-6">All Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-brown-600 text-center py-8">No bookings yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brown-200">
                      <th className="text-left py-3 px-4 text-brown-700 font-semibold">Confirmation</th>
                      <th className="text-left py-3 px-4 text-brown-700 font-semibold">Room</th>
                      <th className="text-left py-3 px-4 text-brown-700 font-semibold">Guest</th>
                      <th className="text-left py-3 px-4 text-brown-700 font-semibold">Dates</th>
                      <th className="text-left py-3 px-4 text-brown-700 font-semibold">Nights</th>
                      <th className="text-left py-3 px-4 text-brown-700 font-semibold">Amount</th>
                      <th className="text-left py-3 px-4 text-brown-700 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-brown-100 hover:bg-cream-50">
                        <td className="py-3 px-4 text-brown-800 font-mono text-sm">
                          {booking.confirmationNumber}
                        </td>
                        <td className="py-3 px-4 text-brown-800">{booking.roomName}</td>
                        <td className="py-3 px-4 text-brown-600">{booking.guests} guests</td>
                        <td className="py-3 px-4 text-brown-600 text-sm">
                          {format(booking.checkIn, 'MMM dd')} - {format(booking.checkOut, 'MMM dd')}
                        </td>
                        <td className="py-3 px-4 text-brown-600">{booking.nights}</td>
                        <td className="py-3 px-4 text-brown-800 font-semibold">
                          ${booking.price * booking.nights}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

