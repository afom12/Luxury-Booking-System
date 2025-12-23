import { Booking } from '@/context/BookingContext'

export interface EmailData {
  to: string
  subject: string
  body: string
}

export async function sendBookingConfirmationEmail(
  booking: Booking,
  userEmail: string,
  userName: string
): Promise<void> {
  // In production, this would call an email service API (SendGrid, AWS SES, etc.)
  // For now, we'll simulate it and log to console
  
  const emailData: EmailData = {
    to: userEmail,
    subject: `Booking Confirmation - ${booking.confirmationNumber}`,
    body: `
Dear ${userName},

Thank you for your booking at Seaside Hotel!

Booking Details:
- Confirmation Number: ${booking.confirmationNumber}
- Room: ${booking.roomName}
- Check-in: ${booking.checkIn.toLocaleDateString()}
- Check-out: ${booking.checkOut.toLocaleDateString()}
- Guests: ${booking.guests}
- Nights: ${booking.nights}
- Total Amount: $${booking.price * booking.nights}

We look forward to welcoming you!

Best regards,
Seaside Hotel Team
    `.trim(),
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In production, replace this with actual email API call
  console.log('Email sent:', emailData)
  
  // Example API call (commented out):
  // await fetch('/api/send-email', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(emailData),
  // })
}

export async function sendBookingCancellationEmail(
  booking: Booking,
  userEmail: string,
  userName: string
): Promise<void> {
  const emailData: EmailData = {
    to: userEmail,
    subject: `Booking Cancelled - ${booking.confirmationNumber}`,
    body: `
Dear ${userName},

Your booking has been cancelled.

Cancelled Booking Details:
- Confirmation Number: ${booking.confirmationNumber}
- Room: ${booking.roomName}
- Check-in: ${booking.checkIn.toLocaleDateString()}
- Check-out: ${booking.checkOut.toLocaleDateString()}

If you have any questions, please contact us.

Best regards,
Seaside Hotel Team
    `.trim(),
  }

  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log('Cancellation email sent:', emailData)
}

