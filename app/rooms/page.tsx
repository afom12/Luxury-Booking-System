'use client'

import { useState, useMemo } from 'react'
import RoomCard from '@/components/RoomCard'
import RoomFilter, { FilterOptions } from '@/components/RoomFilter'

// Extended room data
const allRooms = [
  {
    id: '1',
    name: 'Ocean View Suite',
    description: 'Spacious suite with breathtaking ocean views, private balcony, and luxury amenities. Perfect for couples or small families seeking a romantic getaway.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
    maxGuests: 4,
    beds: 2,
    amenities: ['WiFi', 'Ocean View', 'Balcony', 'Mini Bar', 'Room Service'],
  },
  {
    id: '2',
    name: 'Deluxe Beachfront Room',
    description: 'Elegant room steps away from the beach with modern comforts and stunning views. Wake up to the sound of waves.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
    maxGuests: 2,
    beds: 1,
    amenities: ['WiFi', 'Beach Access', 'Room Service', 'TV', 'Coffee Maker'],
  },
  {
    id: '3',
    name: 'Presidential Suite',
    description: 'Ultimate luxury experience with panoramic views, private terrace, and premium services. The pinnacle of hospitality.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    maxGuests: 6,
    beds: 3,
    amenities: ['WiFi', 'Private Terrace', 'Jacuzzi', 'Butler Service', 'Wine Cellar'],
  },
  {
    id: '4',
    name: 'Garden View Room',
    description: 'Peaceful room overlooking our lush gardens. Perfect for those seeking tranquility and natural beauty.',
    price: 149,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    maxGuests: 2,
    beds: 1,
    amenities: ['WiFi', 'Garden View', 'TV', 'Coffee Maker'],
  },
  {
    id: '5',
    name: 'Family Suite',
    description: 'Spacious accommodation designed for families with separate living area and multiple bedrooms.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
    maxGuests: 6,
    beds: 3,
    amenities: ['WiFi', 'Kitchenette', 'Living Room', 'TV', 'Crib Available'],
  },
  {
    id: '6',
    name: 'Penthouse Suite',
    description: 'Exclusive top-floor suite with 360-degree views, private elevator access, and premium amenities.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop',
    maxGuests: 4,
    beds: 2,
    amenities: ['WiFi', 'Private Elevator', 'Rooftop Terrace', 'Jacuzzi', 'Butler Service'],
  },
]

export default function RoomsPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 1000,
    maxGuests: 10,
    amenities: [],
  })

  const filteredRooms = useMemo(() => {
    return allRooms.filter((room) => {
      // Price filter
      if (room.price < filters.minPrice || room.price > filters.maxPrice) {
        return false
      }

      // Guests filter
      if (room.maxGuests > filters.maxGuests) {
        return false
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const roomAmenities = room.amenities.map((a) => a.toLowerCase())
        const hasAllAmenities = filters.amenities.every((amenity) =>
          roomAmenities.some((ra) => ra.includes(amenity.toLowerCase()))
        )
        if (!hasAllAmenities) {
          return false
        }
      }

      return true
    })
  }, [filters])

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <section className="bg-brown-900 text-cream-50 py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            Our Rooms & Suites
          </h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            Discover our collection of beautifully designed accommodations, each offering unique experiences
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brown-800">
                Available Rooms
              </h2>
              <p className="text-brown-600 mt-2">
                {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'} available
              </p>
            </div>
            <RoomFilter onFilterChange={setFilters} />
          </div>

          {filteredRooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brown-600 text-lg mb-4">No rooms match your filters.</p>
              <button
                onClick={() =>
                  setFilters({
                    minPrice: 0,
                    maxPrice: 1000,
                    maxGuests: 10,
                    amenities: [],
                  })
                }
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}



