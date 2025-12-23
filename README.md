# Seaside Hotel - Luxury Booking Website

A modern, elegant hotel booking website built with Next.js 14, featuring a beautiful brown and cream color scheme and comprehensive ecommerce functionality.

## Features

- 🏨 **Modern Design**: Elegant brown and cream color palette inspired by luxury hotel aesthetics
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🛏️ **Room Listings**: Browse and filter available rooms and suites
- 📅 **Booking System**: Select dates, guests, and book rooms with real-time availability
- 🛒 **Shopping Cart**: Add multiple rooms to cart and manage bookings
- 💳 **Checkout Flow**: Complete booking process with secure payment form
- ⚡ **Fast Performance**: Built with Next.js 14 for optimal speed and SEO
- 🎨 **Beautiful UI**: Modern components with smooth animations and transitions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Picker**: react-datepicker
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage
│   ├── rooms/              # Room listing and detail pages
│   ├── cart/               # Shopping cart page
│   ├── checkout/           # Checkout page
│   ├── about/              # About page
│   └── contact/            # Contact page
├── components/
│   ├── Navbar.tsx          # Navigation component
│   ├── Footer.tsx          # Footer component
│   ├── BookingForm.tsx    # Booking date picker form
│   └── RoomCard.tsx        # Room card component
├── context/
│   └── CartContext.tsx     # Shopping cart state management
└── public/                 # Static assets
```

## Features in Detail

### Booking System
- Date range selection with check-in/check-out
- Guest count selection
- Real-time price calculation based on nights
- Add to cart functionality

### Shopping Cart
- View all selected bookings
- Remove items from cart
- Calculate total price
- Proceed to secure checkout

### Checkout Process
- Personal information form
- Billing address
- Payment information (simulated)
- Booking confirmation

## Customization

### Colors
The brown and cream color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  brown: { /* brown shades */ },
  cream: { /* cream shades */ }
}
```

### Room Data
Room data is currently stored in page components. In production, this should be fetched from an API or database.

## Completed Enhancements

- [x] **User authentication and accounts** - Login/Register pages with user management
- [x] **Booking history and management** - User dashboard to view and manage bookings
- [x] **Reviews and ratings system** - Users can rate and review rooms
- [x] **Email notifications** - Simulated email notifications for bookings (ready for API integration)
- [x] **Room availability API** - Availability checking functionality
- [x] **Admin dashboard** - Admin panel to manage bookings and view analytics

## Future Enhancements

- [ ] Integration with payment gateway (Stripe, PayPal)
- [ ] Multi-language support
- [ ] Real-time chat support
- [ ] Mobile app version
- [ ] Advanced filtering and search
- [ ] Loyalty program

## License

This project is open source and available under the MIT License.

## Support

For support, email info@seasidehotel.com or visit our contact page.



