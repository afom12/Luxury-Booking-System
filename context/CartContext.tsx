'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  roomId: string
  roomName: string
  price: number
  image: string
  checkIn: Date
  checkOut: Date
  guests: number
  nights: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (roomId: string) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      // Remove existing booking for same room if exists
      const filtered = prev.filter((i) => i.roomId !== item.roomId)
      return [...filtered, item]
    })
  }

  const removeFromCart = (roomId: string) => {
    setItems((prev) => prev.filter((item) => item.roomId !== roomId))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price * item.nights, 0)
  const itemCount = items.length

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}



