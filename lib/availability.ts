import { Booking } from '@/context/BookingContext'

export interface AvailabilityCheck {
  roomId: string
  checkIn: Date
  checkOut: Date
  isAvailable: boolean
}

export function checkRoomAvailability(
  roomId: string,
  checkIn: Date,
  checkOut: Date,
  bookings: Booking[]
): boolean {
  // Get all confirmed bookings for this room
  const roomBookings = bookings.filter(
    (booking) =>
      booking.roomId === roomId &&
      booking.status === 'confirmed' &&
      booking.checkIn &&
      booking.checkOut
  )

  // Check if the requested dates overlap with any existing booking
  for (const booking of roomBookings) {
    const bookingCheckIn = new Date(booking.checkIn)
    const bookingCheckOut = new Date(booking.checkOut)

    // Check for overlap
    if (
      (checkIn >= bookingCheckIn && checkIn < bookingCheckOut) ||
      (checkOut > bookingCheckIn && checkOut <= bookingCheckOut) ||
      (checkIn <= bookingCheckIn && checkOut >= bookingCheckOut)
    ) {
      return false // Room is not available
    }
  }

  return true // Room is available
}

export function getAvailableRooms(
  checkIn: Date,
  checkOut: Date,
  bookings: Booking[],
  allRoomIds: string[]
): string[] {
  return allRoomIds.filter((roomId) =>
    checkRoomAvailability(roomId, checkIn, checkOut, bookings)
  )
}

