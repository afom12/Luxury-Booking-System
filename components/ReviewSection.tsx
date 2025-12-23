'use client'

import { useState } from 'react'
import { Star, User } from 'lucide-react'
import { useReview } from '@/context/ReviewContext'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'

interface ReviewSectionProps {
  roomId: string
}

export default function ReviewSection({ roomId }: ReviewSectionProps) {
  const { getRoomReviews, getUserReview, addReview, getRoomRating } = useReview()
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const reviews = getRoomReviews(roomId)
  const userReview = getUserReview(roomId)
  const averageRating = getRoomRating(roomId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert('Please login to leave a review')
      return
    }

    setIsSubmitting(true)
    try {
      addReview(roomId, rating, comment)
      setComment('')
      setRating(5)
      setShowForm(false)
    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-brown-800 mb-2">Reviews</h2>
          {averageRating > 0 && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-brown-600 font-semibold">
                {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </div>
        {user && !userReview && (
          <button onClick={() => setShowForm(!showForm)} className="btn-secondary">
            Write a Review
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-cream-100 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-brown-700 mb-2">
              Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-brown-700 mb-2">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 text-brown-800"
              placeholder="Share your experience..."
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setComment('')
                setRating(5)
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-brown-600 text-center py-8">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-brown-200 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brown-700 text-cream-50 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-brown-800">{review.userName}</p>
                    <p className="text-sm text-brown-600">{format(review.date, 'MMM dd, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-brown-700 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

