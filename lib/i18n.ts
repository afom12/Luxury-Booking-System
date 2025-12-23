// Internationalization (i18n) support for Amharic and English

export type Language = 'en' | 'am'

export interface Translations {
  // Navigation
  nav: {
    home: string
    rooms: string
    about: string
    contact: string
    login: string
    register: string
    dashboard: string
    admin: string
    logout: string
    viewCart: string
  }
  // Common
  common: {
    welcome: string
    bookNow: string
    learnMore: string
    readMore: string
    close: string
    submit: string
    cancel: string
    save: string
    delete: string
    edit: string
    search: string
    filter: string
    loading: string
  }
  // Homepage
  home: {
    title: string
    subtitle: string
    featuredRooms: string
    viewAllRooms: string
    yourPerfectGetaway: string
    aboutDescription: string
  }
  // Rooms
  rooms: {
    title: string
    subtitle: string
    availableRooms: string
    roomsAvailable: string
    perNight: string
    guests: string
    beds: string
    viewDetails: string
    selectDates: string
    addToCart: string
  }
  // Booking
  booking: {
    bookYourStay: string
    checkIn: string
    checkOut: string
    nights: string
    night: string
    total: string
    subtotal: string
    confirmation: string
    bookingConfirmed: string
    thankYou: string
  }
  // Contact
  contact: {
    title: string
    subtitle: string
    getInTouch: string
    sendMessage: string
    name: string
    email: string
    phone: string
    message: string
    address: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      rooms: 'Rooms',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      register: 'Sign Up',
      dashboard: 'Dashboard',
      admin: 'Admin',
      logout: 'Logout',
      viewCart: 'View Cart',
    },
    common: {
      welcome: 'Welcome',
      bookNow: 'Book Now',
      learnMore: 'Learn More',
      readMore: 'Read More',
      close: 'Close',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      filter: 'Filter',
      loading: 'Loading...',
    },
    home: {
      title: 'Welcome to Seaside Hotel',
      subtitle: 'Experience luxury beachfront accommodation',
      featuredRooms: 'Featured Rooms',
      viewAllRooms: 'View All Rooms',
      yourPerfectGetaway: 'Your Perfect Getaway Awaits',
      aboutDescription: 'Nestled along the pristine coastline, Seaside Hotel offers an unparalleled experience of luxury and relaxation.',
    },
    rooms: {
      title: 'Our Rooms & Suites',
      subtitle: 'Discover our collection of beautifully designed accommodations',
      availableRooms: 'Available Rooms',
      roomsAvailable: 'rooms available',
      perNight: 'per night',
      guests: 'Guests',
      beds: 'Beds',
      viewDetails: 'View Details',
      selectDates: 'Select Dates to Book',
      addToCart: 'Add to Cart',
    },
    booking: {
      bookYourStay: 'Book Your Stay',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      nights: 'Nights',
      night: 'Night',
      total: 'Total',
      subtotal: 'Subtotal',
      confirmation: 'Confirmation',
      bookingConfirmed: 'Booking Confirmed!',
      thankYou: 'Thank you for your booking.',
    },
    contact: {
      title: 'Contact Us',
      subtitle: "We'd love to hear from you. Get in touch with us today.",
      getInTouch: 'Get in Touch',
      sendMessage: 'Send us a Message',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      address: 'Address',
    },
  },
  am: {
    nav: {
      home: 'መነሻ',
      rooms: 'ክፍሎች',
      about: 'ስለእኛ',
      contact: 'እውቂያ',
      login: 'ግባ',
      register: 'ተመዝግብ',
      dashboard: 'ዳሽቦርድ',
      admin: 'አስተዳዳሪ',
      logout: 'ውጣ',
      viewCart: 'ጋሪ ይመልከቱ',
    },
    common: {
      welcome: 'እንኳን ደህና መጡ',
      bookNow: 'አሁን ይዘዙ',
      learnMore: 'ተጨማሪ ይማሩ',
      readMore: 'ተጨማሪ ያንብቡ',
      close: 'ዝጋ',
      submit: 'አስገባ',
      cancel: 'ተወው',
      save: 'አስቀምጥ',
      delete: 'ሰርዝ',
      edit: 'አርም',
      search: 'ፈልግ',
      filter: 'አጣራ',
      loading: 'በመጫን ላይ...',
    },
    home: {
      title: 'ወደ ሲሳይድ ሆቴል እንኳን ደህና መጡ',
      subtitle: 'የአለም ክፍል የባህር ዳርቻ መሸሸጊያ ልምድ ይለማመዱ',
      featuredRooms: 'የተመረጡ ክፍሎች',
      viewAllRooms: 'ሁሉንም ክፍሎች ይመልከቱ',
      yourPerfectGetaway: 'የእርስዎ ፍጹም መውጣት ይጠብቃል',
      aboutDescription: 'በንጹህ የባህር ዳርቻ አጠገብ የተቀመጠ፣ ሲሳይድ ሆቴል ያለምንም ምሳሌ የክብር እና የእረፍት ልምድ ያቀርባል።',
    },
    rooms: {
      title: 'ክፍሎቻችን እና ስፔሻል ክፍሎች',
      subtitle: 'በውበት የተነደፉ መሸሸጊያዎችን ይፈልጉ',
      availableRooms: 'የሚገኙ ክፍሎች',
      roomsAvailable: 'ክፍሎች ይገኛሉ',
      perNight: 'በሌሊት',
      guests: 'እንግዶች',
      beds: 'አልጋዎች',
      viewDetails: 'ዝርዝሮችን ይመልከቱ',
      selectDates: 'ለመዘዝ ቀኖችን ይምረጡ',
      addToCart: 'ወደ ጋሪ ጨምር',
    },
    booking: {
      bookYourStay: 'መሸሸጊያዎን ይዘዙ',
      checkIn: 'መግቢያ',
      checkOut: 'መውጣት',
      nights: 'ሌሊቶች',
      night: 'ሌሊት',
      total: 'ጠቅላላ',
      subtotal: 'ንዑስ ጠቅላላ',
      confirmation: 'ማረጋገጫ',
      bookingConfirmed: 'መዘዝ ተረጋግጧል!',
      thankYou: 'ስለመዘዝዎ እናመሰግናለን።',
    },
    contact: {
      title: 'እኛን ያግኙን',
      subtitle: 'እኛን ማድረግ እንፈልጋለን። ዛሬ እንያገናኝ።',
      getInTouch: 'እውቂያ',
      sendMessage: 'መልእክት ይላኩ',
      name: 'ስም',
      email: 'ኢሜይል',
      phone: 'ስልክ',
      message: 'መልእክት',
      address: 'አድራሻ',
    },
  },
}

export function getTranslation(lang: Language): Translations {
  return translations[lang] || translations.en
}

