'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar, Users, Search } from 'lucide-react'

interface BookingFormProps {
  onSearch?: (data: { checkIn: Date; checkOut: Date; guests: number }) => void
}

export default function BookingForm({ onSearch }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(2)

  const handleSearch = () => {
    if (checkIn && checkOut && onSearch) {
      onSearch({ checkIn, checkOut, guests })
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
      <h3 className="text-2xl font-serif font-bold text-brown-800 mb-6">
        Book Your Stay
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Check-in */}
        <div>
          <label className="block text-sm font-semibold text-brown-700 mb-2">
            Check-in
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-500" />
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              placeholderText="Select date"
              className="w-full pl-10 pr-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 text-brown-800"
              dateFormat="MMM dd, yyyy"
            />
          </div>
        </div>

        {/* Check-out */}
        <div>
          <label className="block text-sm font-semibold text-brown-700 mb-2">
            Check-out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-500" />
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()}
              placeholderText="Select date"
              className="w-full pl-10 pr-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 text-brown-800"
              dateFormat="MMM dd, yyyy"
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-semibold text-brown-700 mb-2">
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-500" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 text-brown-800 appearance-none bg-white"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full mt-6 btn-primary flex items-center justify-center space-x-2"
      >
        <Search className="w-5 h-5" />
        <span>Search Availability</span>
      </button>
    </div>
  )
}



