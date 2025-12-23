'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { CreditCard, Lock, CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsComplete(true)
    clearCart()

    setTimeout(() => {
      router.push('/')
    }, 3000)
  }

  if (items.length === 0 && !isComplete) {
    router.push('/cart')
    return null
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-brown-800 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-brown-600 mb-6">
            Thank you for your booking. A confirmation email has been sent to your email address.
          </p>
          <p className="text-sm text-brown-500">
            Redirecting to homepage...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <section className="bg-brown-900 text-cream-50 py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
            Checkout
          </h1>
          <p className="text-xl text-cream-200">
            Complete your booking securely
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                {/* Personal Information */}
                <h2 className="text-2xl font-bold text-brown-800 mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-brown-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-brown-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <h2 className="text-2xl font-bold text-brown-800 mb-6">Billing Address</h2>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-brown-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-brown-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                </div>

                {/* Payment */}
                <h2 className="text-2xl font-bold text-brown-800 mb-6 flex items-center space-x-2">
                  <CreditCard className="w-6 h-6" />
                  <span>Payment Information</span>
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-brown-700 mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
                      setFormData({ ...formData, cardNumber: value })
                    }}
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-brown-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={formData.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '')
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4)
                        }
                        setFormData({ ...formData, expiryDate: value })
                      }}
                      className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                      className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-brown-600 mb-6">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm">Your payment information is secure and encrypted</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : `Complete Booking - $${total}`}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-brown-800 mb-6">Booking Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.roomId} className="pb-4 border-b border-brown-200">
                      <h3 className="font-semibold text-brown-800 mb-2">{item.roomName}</h3>
                      <p className="text-sm text-brown-600">
                        {item.nights} {item.nights === 1 ? 'night' : 'nights'} • {item.guests} {item.guests === 1 ? 'guest' : 'guests'}
                      </p>
                      <p className="text-brown-700 font-semibold mt-2">${item.price * item.nights}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-brown-300 pt-4">
                  <div className="flex justify-between text-xl font-bold text-brown-800">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



