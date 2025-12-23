'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useBooking } from '@/context/BookingContext'
import { CreditCard, Lock, CheckCircle, Smartphone } from 'lucide-react'
import { getAvailablePaymentMethods, processStripePayment, processMobileMoneyPayment } from '@/lib/payment'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user, isLoading: authLoading } = useAuth()
  const { addBooking } = useBooking()
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
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [mobileMoneyPhone, setMobileMoneyPhone] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [confirmationNumber, setConfirmationNumber] = useState('')
  const [paymentError, setPaymentError] = useState('')
  const paymentMethods = getAvailablePaymentMethods()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/checkout')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
      }))
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentError('')
    
    if (!user) {
      router.push('/login?redirect=/checkout')
      return
    }

    // Validate payment method specific fields
    if (paymentMethod === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      setPaymentError('Please fill in all card details')
      return
    }

    if (paymentMethod !== 'card' && !mobileMoneyPhone) {
      setPaymentError('Please enter your mobile money phone number')
      return
    }

    setIsProcessing(true)

    try {
      let paymentResult

      // Process payment based on selected method
      if (paymentMethod === 'card') {
        paymentResult = await processStripePayment(
          total,
          'card_' + formData.cardNumber.replace(/\s/g, '').slice(-4),
          { bookingId: 'temp' }
        )
      } else {
        paymentResult = await processMobileMoneyPayment(
          total,
          mobileMoneyPhone,
          paymentMethod as 'telebirr' | 'm_pesa' | 'cbe_birr'
        )
      }

      if (paymentResult.status !== 'succeeded') {
        setPaymentError('Payment failed. Please try again.')
        setIsProcessing(false)
        return
      }

      // Save booking
      const confirmation = await addBooking(items)
      setConfirmationNumber(confirmation)

      setIsProcessing(false)
      setIsComplete(true)
      clearCart()

      setTimeout(() => {
        router.push('/dashboard')
      }, 5000)
    } catch (error) {
      console.error('Booking error:', error)
      setPaymentError('An error occurred. Please try again.')
      setIsProcessing(false)
    }
  }

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
          <p className="text-brown-600 mb-2">
            Thank you for your booking. A confirmation email has been sent to your email address.
          </p>
          {confirmationNumber && (
            <p className="text-lg font-semibold text-brown-800 mb-6">
              Confirmation: {confirmationNumber}
            </p>
          )}
          <p className="text-sm text-brown-500">
            Redirecting to dashboard...
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
                  <span>Payment Method</span>
                </h2>

                {paymentError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {paymentError}
                  </div>
                )}

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-brown-700 mb-3">
                    Select Payment Method *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 border-2 rounded-lg text-center transition-all ${
                          paymentMethod === method.id
                            ? 'border-brown-700 bg-brown-50'
                            : 'border-brown-300 hover:border-brown-500'
                        }`}
                      >
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <div className="text-sm font-semibold text-brown-800">{method.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-brown-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        required={paymentMethod === 'card'}
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
                          required={paymentMethod === 'card'}
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
                          required={paymentMethod === 'card'}
                          maxLength={4}
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                          className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Mobile Money Payment Form */}
                {paymentMethod !== 'card' && (
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-brown-700 mb-2">
                      Mobile Money Phone Number *
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-500" />
                      <input
                        type="tel"
                        required={paymentMethod !== 'card'}
                        placeholder="0911 234 567"
                        value={mobileMoneyPhone}
                        onChange={(e) => setMobileMoneyPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                      />
                    </div>
                    <p className="mt-2 text-sm text-brown-600">
                      You will receive a payment request on your phone. Please confirm the payment.
                    </p>
                  </div>
                )}

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



