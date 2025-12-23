'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'

interface RoomFilterProps {
  onFilterChange: (filters: FilterOptions) => void
}

export interface FilterOptions {
  minPrice: number
  maxPrice: number
  maxGuests: number
  amenities: string[]
}

const availableAmenities = ['WiFi', 'Ocean View', 'Balcony', 'Room Service', 'TV', 'Coffee Maker', 'Beach Access', 'Kitchenette', 'Jacuzzi', 'Parking']

export default function RoomFilter({ onFilterChange }: RoomFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 1000,
    maxGuests: 10,
    amenities: [],
  })

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const activeFilterCount = filters.amenities.length + 
    (filters.minPrice > 0 ? 1 : 0) + 
    (filters.maxPrice < 1000 ? 1 : 0) +
    (filters.maxGuests < 10 ? 1 : 0)

  const resetFilters = () => {
    const reset = {
      minPrice: 0,
      maxPrice: 1000,
      maxGuests: 10,
      amenities: [],
    }
    setFilters(reset)
    onFilterChange(reset)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary flex items-center space-x-2 relative"
      >
        <Filter className="w-5 h-5" />
        <span>Filter</span>
        {activeFilterCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-brown-700 text-cream-50 text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl p-6 z-50 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-brown-800">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brown-600 hover:text-brown-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-brown-700 mb-3">
                Price Range (ETB)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-brown-600 mb-1">Min</label>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange({
                        ...filters,
                        minPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-brown-600 mb-1">Max</label>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange({
                        ...filters,
                        maxPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
              </div>
            </div>

            {/* Max Guests */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-brown-700 mb-3">
                Max Guests
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={filters.maxGuests}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    maxGuests: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
              />
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-brown-700 mb-3">
                Amenities
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availableAmenities.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-cream-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity)}
                      onChange={(e) => {
                        const newAmenities = e.target.checked
                          ? [...filters.amenities, amenity]
                          : filters.amenities.filter((a) => a !== amenity)
                        handleFilterChange({
                          ...filters,
                          amenities: newAmenities,
                        })
                      }}
                      className="rounded border-brown-300 text-brown-600 focus:ring-brown-500"
                    />
                    <span className="text-sm text-brown-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="w-full btn-secondary text-sm"
              >
                Reset Filters
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

