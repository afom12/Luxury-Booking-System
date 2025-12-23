'use client'

import Image from 'next/image'
import BookingForm from '@/components/BookingForm'
import RoomCard from '@/components/RoomCard'
import { Star, Award, Shield, Heart } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

// Sample room data
const featuredRooms = [
  {
    id: '1',
    name: 'Ocean View Suite',
    description: 'Spacious suite with breathtaking ocean views, private balcony, and luxury amenities.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
    maxGuests: 4,
    beds: 2,
    amenities: ['WiFi', 'Ocean View', 'Balcony', 'Mini Bar'],
  },
  {
    id: '2',
    name: 'Deluxe Beachfront Room',
    description: 'Elegant room steps away from the beach with modern comforts and stunning views.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
    maxGuests: 2,
    beds: 1,
    amenities: ['WiFi', 'Beach Access', 'Room Service', 'TV'],
  },
  {
    id: '3',
    name: 'Presidential Suite',
    description: 'Ultimate luxury experience with panoramic views, private terrace, and premium services.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    maxGuests: 6,
    beds: 3,
    amenities: ['WiFi', 'Private Terrace', 'Jacuzzi', 'Butler Service'],
  },
]

const features = [
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Award Winning',
    description: 'Recognized for excellence in hospitality',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Secure Booking',
    description: 'Safe and encrypted payment processing',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Best Service',
    description: 'Dedicated staff available 24/7',
  },
]

export default function Home() {
  const { t } = useLanguage()
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&h=1080&fit=crop"
            alt="Seaside Hotel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-brown-900/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            {t.home.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cream-100">
            {t.home.subtitle}
          </p>
          <div className="flex items-center justify-center space-x-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-lg">4.9/5 Rating</span>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="section-padding bg-cream-100 -mt-20 relative z-20">
        <div className="container-custom">
          <BookingForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brown-700 text-cream-50 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-brown-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-brown-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 mb-4">
              {t.home.featuredRooms}
            </h2>
            <p className="text-lg text-brown-600 max-w-2xl mx-auto">
              {t.rooms.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/rooms" className="btn-secondary">
              {t.home.viewAllRooms}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 mb-6">
                {t.home.yourPerfectGetaway}
              </h2>
              <p className="text-lg text-brown-600 mb-4">
                {t.home.aboutDescription}
              </p>
              <p className="text-lg text-brown-600 mb-6">
                Each room is thoughtfully designed with modern amenities and elegant
                decor, ensuring your stay is both comfortable and memorable. From
                romantic getaways to family vacations, we cater to every need.
              </p>
              <a href="/about" className="btn-primary">
                {t.common.learnMore}
              </a>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
                alt="Hotel Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



