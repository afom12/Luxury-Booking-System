'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

export interface Review {
  id: string
  roomId: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: Date
}

interface ReviewContextType {
  reviews: Review[]
  addReview: (roomId: string, rating: number, comment: string) => void
  getRoomReviews: (roomId: string) => Review[]
  getUserReview: (roomId: string) => Review | null
  getRoomRating: (roomId: string) => number
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const { user } = useAuth()

  useEffect(() => {
    // Load reviews from localStorage
    const storedReviews = localStorage.getItem('reviews')
    if (storedReviews) {
      try {
        const parsed = JSON.parse(storedReviews)
        const reviewsWithDates = parsed.map((r: any) => ({
          ...r,
          date: new Date(r.date),
        }))
        setReviews(reviewsWithDates)
      } catch (error) {
        console.error('Error loading reviews:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Save reviews to localStorage whenever they change
    if (reviews.length > 0) {
      localStorage.setItem('reviews', JSON.stringify(reviews))
    }
  }, [reviews])

  const addReview = (roomId: string, rating: number, comment: string) => {
    if (!user) throw new Error('User must be logged in')

    const newReview: Review = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      roomId,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      date: new Date(),
    }

    setReviews((prev) => {
      // Remove existing review by same user for same room
      const filtered = prev.filter((r) => !(r.roomId === roomId && r.userId === user.id))
      return [...filtered, newReview]
    })
  }

  const getRoomReviews = (roomId: string): Review[] => {
    return reviews.filter((review) => review.roomId === roomId).sort((a, b) => b.date.getTime() - a.date.getTime())
  }

  const getUserReview = (roomId: string): Review | null => {
    if (!user) return null
    return reviews.find((review) => review.roomId === roomId && review.userId === user.id) || null
  }

  const getRoomRating = (roomId: string): number => {
    const roomReviews = getRoomReviews(roomId)
    if (roomReviews.length === 0) return 0
    const sum = roomReviews.reduce((acc, review) => acc + review.rating, 0)
    return Math.round((sum / roomReviews.length) * 10) / 10
  }

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getRoomReviews, getUserReview, getRoomRating }}>
      {children}
    </ReviewContext.Provider>
  )
}

export function useReview() {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error('useReview must be used within a ReviewProvider')
  }
  return context
}

