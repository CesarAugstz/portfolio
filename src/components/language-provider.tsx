'use client'

import { useCallback, useEffect } from 'react'
import { useAtom } from 'jotai'
import { useParams, useRouter, usePathname } from 'next/navigation'
import {
  langAtom,
  getLangFromParam,
  type Lang,
  isValidLang,
} from '@/stores/lang.store'
import {
  detectLanguageFromBrowser,
  getLanguageFromURL,
} from '@/lib/language-detection'

interface LanguageProviderProps {
  children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [, setLang] = useAtom(langAtom)
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()

  const redirectToLanguage = useCallback(
    (lang: Lang) => {
      const currentPath = pathname
      const segments = currentPath.split('/')

      if (isValidLang(segments[1])) segments[1] = lang
      else segments.splice(1, 0, lang)

      const newPath = segments.join('/')
      router.replace(newPath)
    },
    [pathname, router],
  )

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
      return
    }

    const storedLang = localStorage.getItem('preferred-language')
    let targetLang: Lang

    if (storedLang && isValidLang(storedLang)) targetLang = storedLang
    else {
      targetLang = detectLanguageFromBrowser()
      localStorage.setItem('preferred-language', targetLang)
    }

    setLang(targetLang)
    redirectToLanguage(targetLang)
  }, [params.lang, setLang, pathname, router, redirectToLanguage])

  return <>{children}</>
}
