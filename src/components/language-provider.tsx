'use client'

import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useParams } from 'next/navigation'
import { langAtom, getLangFromParam } from '@/stores/lang.store'
import { initializeLanguage, getLanguageFromURL } from '@/lib/language-detection'

interface LanguageProviderProps {
  children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [, setLang] = useAtom(langAtom)
  const params = useParams()

  useEffect(() => {
    if (params.lang && typeof params.lang === 'string') {
      const validLang = getLangFromParam(params.lang)
      setLang(validLang)
      localStorage.setItem('preferred-language', validLang)
      return
    }

    const urlLang = getLanguageFromURL()
    if (urlLang) {
      setLang(urlLang)
      localStorage.setItem('preferred-language', urlLang)
    } else {
      const detectedLang = initializeLanguage()
      setLang(detectedLang)
    }
  }, [params.lang, setLang])

  return <>{children}</>
}
