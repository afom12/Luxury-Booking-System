import Image from 'next/image'
import Link from 'next/link'
import { Bed, Users, Wifi, Car } from 'lucide-react'

interface Room {
  id: string
  name: string
  description: string
  price: number
  image: string
  maxGuests: number
  beds: number
  amenities: string[]
}

interface RoomCardProps {
  room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="card">
      <div className="relative h-64 w-full">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-brown-700 text-cream-50 px-4 py-2 rounded-lg font-bold">
          ${room.price}/night
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-brown-800 mb-2">
          {room.name}
        </h3>
        <p className="text-brown-600 mb-4 line-clamp-2">
          {room.description}
        </p>
        <div className="flex items-center space-x-4 mb-4 text-brown-600">
          <div className="flex items-center space-x-1">
            <Users className="w-5 h-5" />
            <span>{room.maxGuests} Guests</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bed className="w-5 h-5" />
            <span>{room.beds} Beds</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-cream-200 text-brown-700 px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
        </div>
        <Link
          href={`/rooms/${room.id}`}
          className="btn-primary w-full text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}



