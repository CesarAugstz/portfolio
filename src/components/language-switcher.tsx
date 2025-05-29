'use client'

import { useAtom } from 'jotai'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { langAtom, type Lang } from '@/stores/lang.store'
import { Globe } from 'lucide-react'
import { useCallback } from 'react'

const languages = [
  {
    code: 'en-US' as Lang,
    name: 'English',
    flag: 'icon-[emojione--flag-for-united-states]',
  },
  {
    code: 'pt-BR' as Lang,
    name: 'Português',
    flag: 'icon-[emojione--flag-for-brazil]',
  },
]

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useAtom(langAtom)
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = useCallback(
    (newLang: Lang) => {
      setCurrentLang(newLang)
      localStorage.setItem('preferred-language', newLang)
      const segments = pathname.split('/')
      segments[1] = newLang
      const newPath = segments.join('/')
      router.replace(newPath)
    },
    [pathname, router, setCurrentLang],
  )

  const otherLanguage = languages.find(lang => lang.code !== currentLang)

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => otherLanguage && handleLanguageChange(otherLanguage.code)}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:flex gap-2 items-center">
        <span className={otherLanguage?.flag} />
        {otherLanguage?.name}
      </span>
      <span className="sm:hidden">{otherLanguage?.flag}</span>
    </Button>
  )
}
