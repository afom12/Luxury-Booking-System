import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brown-900 text-cream-50">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Seaside Hotel</h3>
            <p className="text-cream-200">
              Experience luxury beachfront accommodation with world-class amenities and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/rooms" className="text-cream-200 hover:text-cream-50 transition-colors">
                  Our Rooms
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream-200 hover:text-cream-50 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream-200 hover:text-cream-50 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-cream-200">
                <MapPin className="w-5 h-5" />
                <span>Bole Road, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center space-x-2 text-cream-200">
                <Phone className="w-5 h-5" />
                <span>+251 11 123 4567</span>
              </li>
              <li className="flex items-center space-x-2 text-cream-200">
                <Mail className="w-5 h-5" />
                <span>info@seasidehotel.et</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brown-700 mt-8 pt-8 text-center text-cream-200">
          <p>&copy; {new Date().getFullYear()} Seaside Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}



