'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { Trash2, Calendar, Users, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

export default function CartPage() {
  const { items, removeFromCart, total, clearCart } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-brown-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-brown-600 mb-8">Start booking your perfect stay!</p>
          <button onClick={() => router.push('/rooms')} className="btn-primary">
            Browse Rooms
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <section className="bg-brown-900 text-cream-50 py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
            Your Booking Cart
          </h1>
          <p className="text-xl text-cream-200">
            Review your selections before checkout
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.roomId} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="relative w-full md:w-64 h-48 md:h-auto">
                      <Image
                        src={item.image}
                        alt={item.roomName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-serif font-bold text-brown-800">
                          {item.roomName}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.roomId)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-2 text-brown-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span>
                            {format(item.checkIn, 'MMM dd, yyyy')} - {format(item.checkOut, 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5" />
                          <span>{item.guests} {item.guests === 1 ? 'Guest' : 'Guests'}</span>
                        </div>
                        <div>
                          <span>{item.nights} {item.nights === 1 ? 'Night' : 'Nights'}</span>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-brown-800">
                        ${item.price * item.nights}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-brown-800 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.roomId} className="flex justify-between text-brown-700">
                      <span>{item.roomName}</span>
                      <span>${item.price * item.nights}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-brown-300 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold text-brown-800 mb-2">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                  <p className="text-sm text-brown-600">
                    Includes all taxes and fees
                  </p>
                </div>
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => router.push('/rooms')}
                  className="w-full btn-secondary"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={clearCart}
                  className="w-full mt-4 text-brown-600 hover:text-brown-800 text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



