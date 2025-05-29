'use client'

import { Lang, isValidLang } from '@/stores/lang.store'

export function detectLanguageFromBrowser(): Lang {
  if (typeof window === 'undefined') return 'en-US'

  const browserLang = navigator.language || navigator.languages?.[0] || 'en-US'

  if (browserLang.startsWith('pt')) {
    return 'pt-BR'
  }

  return 'en-US'
}

export function getLanguageFromURL(): Lang | null {
  if (typeof window === 'undefined') return null

  const path = window.location.pathname
  const segments = path.split('/')
  const langSegment = segments[1]

  if (isValidLang(langSegment)) {
    return langSegment
  }

  return null
}
