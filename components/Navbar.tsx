'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Calendar } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-brown-700 text-cream-50 p-2 rounded-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-2xl font-serif font-bold text-brown-800">
              Seaside Hotel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-brown-700 hover:text-brown-900 font-medium transition-colors">
              Home
            </Link>
            <Link href="/rooms" className="text-brown-700 hover:text-brown-900 font-medium transition-colors">
              Rooms
            </Link>
            <Link href="/about" className="text-brown-700 hover:text-brown-900 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-brown-700 hover:text-brown-900 font-medium transition-colors">
              Contact
            </Link>
            <Link href="/cart" className="btn-primary relative">
              View Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-brown-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-brown-700 hover:text-brown-900 font-medium">
                Home
              </Link>
              <Link href="/rooms" className="text-brown-700 hover:text-brown-900 font-medium">
                Rooms
              </Link>
              <Link href="/about" className="text-brown-700 hover:text-brown-900 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-brown-700 hover:text-brown-900 font-medium">
                Contact
              </Link>
              <Link href="/cart" className="btn-primary text-center relative">
                View Cart
                {itemCount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
