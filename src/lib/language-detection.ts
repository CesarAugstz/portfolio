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

export function redirectToLanguage(lang: Lang) {
  if (typeof window === 'undefined') return
  
  const currentPath = window.location.pathname
  const segments = currentPath.split('/')
  
  if (isValidLang(segments[1])) {
    segments[1] = lang
  } else {
    segments.splice(1, 0, lang)
  }
  
  const newPath = segments.join('/')
  window.history.replaceState({}, '', newPath)
}

export function initializeLanguage(): Lang {
  const urlLang = getLanguageFromURL()
  if (urlLang) {
    return urlLang
  }
  
  const storedLang = localStorage.getItem('preferred-language')
  if (storedLang && isValidLang(storedLang)) {
    redirectToLanguage(storedLang)
    return storedLang
  }
  
  const browserLang = detectLanguageFromBrowser()
  redirectToLanguage(browserLang)
  localStorage.setItem('preferred-language', browserLang)
  
  return browserLang
}
