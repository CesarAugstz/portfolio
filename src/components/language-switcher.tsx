'use client'

import { useAtom } from 'jotai'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { langAtom, type Lang } from '@/stores/lang.store'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'en-US' as Lang, name: 'English', flag: '🇺🇸' },
  { code: 'pt-BR' as Lang, name: 'Português', flag: '🇧🇷' },
]

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useAtom(langAtom)
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLang: Lang) => {
    setCurrentLang(newLang)
    localStorage.setItem('preferred-language', newLang)
    const segments = pathname.split('/')
    segments[1] = newLang
    const newPath = segments.join('/')
    router.push(newPath)
  }

  const otherLanguage = languages.find(lang => lang.code !== currentLang)

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => otherLanguage && handleLanguageChange(otherLanguage.code)}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">
        {otherLanguage?.flag} {otherLanguage?.name}
      </span>
      <span className="sm:hidden">
        {otherLanguage?.flag}
      </span>
    </Button>
  )
}
