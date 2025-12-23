import Image from 'next/image'
import { Award, Users, Heart, Shield } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <section className="bg-brown-900 text-cream-50 py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            About Seaside Hotel
          </h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            Where luxury meets the ocean
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-brown-800 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-brown-600 mb-4 leading-relaxed">
                Founded in 2010, Seaside Hotel was born from a vision to create the perfect
                beachfront retreat. Nestled along the pristine coastline, we've been providing
                exceptional hospitality experiences for over a decade.
              </p>
              <p className="text-lg text-brown-600 mb-4 leading-relaxed">
                Our commitment to excellence has earned us numerous awards and recognition
                in the hospitality industry. We believe that every guest deserves a memorable
                experience, and we go above and beyond to ensure your stay is nothing short
                of extraordinary.
              </p>
              <p className="text-lg text-brown-600 leading-relaxed">
                From our carefully designed rooms to our world-class amenities and dedicated
                staff, every aspect of Seaside Hotel is crafted with your comfort and satisfaction
                in mind.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
                alt="Hotel Exterior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-brown-800 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-brown-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brown-700 text-cream-50 rounded-full mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brown-800 mb-2">Excellence</h3>
              <p className="text-brown-600">
                We strive for perfection in every detail of your stay
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brown-700 text-cream-50 rounded-full mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brown-800 mb-2">Care</h3>
              <p className="text-brown-600">
                Your comfort and happiness are our top priorities
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brown-700 text-cream-50 rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brown-800 mb-2">Trust</h3>
              <p className="text-brown-600">
                We build lasting relationships through transparency and reliability
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brown-700 text-cream-50 rounded-full mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brown-800 mb-2">Community</h3>
              <p className="text-brown-600">
                We're committed to supporting our local community and environment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-brown-800 mb-4">
              Hotel Amenities
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop"
                alt="Spa"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brown-900/60 flex items-center justify-center">
                <h3 className="text-2xl font-serif font-bold text-cream-50">Spa & Wellness</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop"
                alt="Restaurant"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brown-900/60 flex items-center justify-center">
                <h3 className="text-2xl font-serif font-bold text-cream-50">Fine Dining</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=800&h=600&fit=crop"
                alt="Pool"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brown-900/60 flex items-center justify-center">
                <h3 className="text-2xl font-serif font-bold text-cream-50">Infinity Pool</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



