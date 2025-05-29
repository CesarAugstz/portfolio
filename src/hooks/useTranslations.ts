'use client'

import { useAtom } from 'jotai'
import { langAtom } from '@/stores/lang.store'
import { getTranslations, getNestedTranslation } from '@/lib/translations'

export function useTranslations() {
  const [lang] = useAtom(langAtom)
  const dict = getTranslations(lang)

  const t = (path: string): string | string[] => {
    return getNestedTranslation(dict, path)
  }

  return {
    t,
    dict,
    lang,
  }
}
