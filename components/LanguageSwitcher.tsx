'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { Language } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'am' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 text-brown-700 hover:text-brown-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-cream-100"
      title={language === 'en' ? 'Switch to Amharic' : 'Switch to English'}
    >
      <Globe className="w-5 h-5" />
      <span className="font-semibold">{language === 'en' ? 'EN' : 'አማ'}</span>
    </button>
  )
}

