'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Bed, Users, Wifi, Car, Coffee, Waves, Calendar, CheckCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import BookingForm from '@/components/BookingForm'
import ReviewSection from '@/components/ReviewSection'
import { useReview } from '@/context/ReviewContext'
import { differenceInDays } from 'date-fns'

// Room data - in production, this would come from an API
const rooms: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Ocean View Suite',
    description: 'Spacious suite with breathtaking ocean views, private balcony, and luxury amenities. Perfect for couples or small families seeking a romantic getaway.',
    fullDescription: 'Our Ocean View Suite offers an unparalleled experience with floor-to-ceiling windows that frame the stunning ocean panorama. The suite features a king-size bed, separate living area, and a private balcony where you can enjoy your morning coffee while watching the sunrise over the water. The marble bathroom includes a deep soaking tub and premium bath amenities.',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop',
    ],
    maxGuests: 4,
    beds: 2,
    size: '650 sq ft',
    amenities: [
      { name: 'Free WiFi', icon: <Wifi className="w-5 h-5" /> },
      { name: 'Ocean View', icon: <Waves className="w-5 h-5" /> },
      { name: 'Private Balcony', icon: <Calendar className="w-5 h-5" /> },
      { name: 'Mini Bar', icon: <Coffee className="w-5 h-5" /> },
      { name: 'Room Service', icon: <CheckCircle className="w-5 h-5" /> },
      { name: 'Parking', icon: <Car className="w-5 h-5" /> },
    ],
  },
  '2': {
    id: '2',
    name: 'Deluxe Beachfront Room',
    description: 'Elegant room steps away from the beach with modern comforts and stunning views.',
    fullDescription: 'Wake up to the sound of waves in our Deluxe Beachfront Room. Located on the ground floor with direct beach access, this room features a comfortable queen bed, modern furnishings, and a private patio. Perfect for beach lovers who want to step directly onto the sand.',
    price: 199,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=800&fit=crop',
    ],
    maxGuests: 2,
    beds: 1,
    size: '400 sq ft',
    amenities: [
      { name: 'Free WiFi', icon: <Wifi className="w-5 h-5" /> },
      { name: 'Beach Access', icon: <Waves className="w-5 h-5" /> },
      { name: 'Room Service', icon: <CheckCircle className="w-5 h-5" /> },
      { name: 'TV', icon: <CheckCircle className="w-5 h-5" /> },
      { name: 'Coffee Maker', icon: <Coffee className="w-5 h-5" /> },
    ],
  },
  '3': {
    id: '3',
    name: 'Presidential Suite',
    description: 'Ultimate luxury experience with panoramic views, private terrace, and premium services.',
    fullDescription: 'The Presidential Suite is our most luxurious accommodation, spanning over 1,200 square feet. It features a master bedroom with a king-size bed, separate living and dining areas, a fully equipped kitchen, and a private rooftop terrace with a hot tub. Includes 24/7 butler service and premium amenities.',
    price: 599,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=800&fit=crop',
    ],
    maxGuests: 6,
    beds: 3,
    size: '1,200 sq ft',
    amenities: [
      { name: 'Free WiFi', icon: <Wifi className="w-5 h-5" /> },
      { name: 'Private Terrace', icon: <Calendar className="w-5 h-5" /> },
      { name: 'Jacuzzi', icon: <Waves className="w-5 h-5" /> },
      { name: 'Butler Service', icon: <CheckCircle className="w-5 h-5" /> },
      { name: 'Wine Cellar', icon: <Coffee className="w-5 h-5" /> },
      { name: 'Private Elevator', icon: <CheckCircle className="w-5 h-5" /> },
    ],
  },
}

export default function RoomDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { getRoomRating } = useReview()
  const roomId = params.id as string
  const room = rooms[roomId]
  const [selectedImage, setSelectedImage] = useState(0)
  const [bookingData, setBookingData] = useState<{
    checkIn: Date
    checkOut: Date
    guests: number
  } | null>(null)
  const averageRating = getRoomRating(roomId)

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brown-800 mb-4">Room Not Found</h1>
          <button onClick={() => router.push('/rooms')} className="btn-primary">
            Back to Rooms
          </button>
        </div>
      </div>
    )
  }

  const handleBooking = (data: { checkIn: Date; checkOut: Date; guests: number }) => {
    setBookingData(data)
  }

  const handleAddToCart = () => {
    if (!bookingData) {
      alert('Please select check-in and check-out dates first')
      return
    }

    const nights = differenceInDays(bookingData.checkOut, bookingData.checkIn)
    addToCart({
      roomId: room.id,
      roomName: room.name,
      price: room.price,
      image: room.images[0],
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      nights,
    })
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Image Gallery */}
      <section className="relative h-[60vh]">
        <Image
          src={room.images[selectedImage]}
          alt={room.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {room.images.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-3 h-3 rounded-full ${
                selectedImage === index ? 'bg-cream-50' : 'bg-cream-200/50'
              }`}
            />
          ))}
        </div>
      </section>

      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 mb-4">
              {room.name}
            </h1>
            <div className="flex items-center space-x-4 mb-6 text-brown-600">
              <div className="flex items-center space-x-1">
                <Users className="w-5 h-5" />
                <span>{room.maxGuests} Guests</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bed className="w-5 h-5" />
                <span>{room.beds} {room.beds === 1 ? 'Bed' : 'Beds'}</span>
              </div>
              <span>{room.size}</span>
            </div>

            <div className="bg-white rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-brown-800 mb-4">Description</h2>
              <p className="text-brown-600 leading-relaxed mb-4">{room.description}</p>
              <p className="text-brown-600 leading-relaxed">{room.fullDescription}</p>
            </div>

            <div className="bg-white rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-brown-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.amenities.map((amenity: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-brown-700">{amenity.icon}</div>
                    <span className="text-brown-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <ReviewSection roomId={roomId} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-brown-800 mb-2">
                    ${room.price}
                  </div>
                  <div className="text-brown-600">per night</div>
                </div>
                <BookingForm onSearch={handleBooking} />
                {bookingData && (
                  <div className="mt-6 p-4 bg-cream-100 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-brown-700">Nights:</span>
                      <span className="font-semibold text-brown-800">
                        {differenceInDays(bookingData.checkOut, bookingData.checkIn)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-brown-700">Subtotal:</span>
                      <span className="font-semibold text-brown-800">
                        ${room.price * differenceInDays(bookingData.checkOut, bookingData.checkIn)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-brown-300">
                      <span className="text-brown-800">Total:</span>
                      <span className="text-brown-900">
                        ${room.price * differenceInDays(bookingData.checkOut, bookingData.checkIn)}
                      </span>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleAddToCart}
                  className="w-full mt-6 btn-primary"
                  disabled={!bookingData}
                >
                  {bookingData ? 'Add to Cart' : 'Select Dates to Book'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



