import { Lang } from '@/stores/lang.store'

import enTranslations from '@/app/[lang]/dictionaries/en.json'
import ptTranslations from '@/app/[lang]/dictionaries/pt.json'

export type Dictionary = typeof enTranslations

export const translations: Record<Lang, Dictionary> = {
  'en-US': enTranslations,
  'pt-BR': ptTranslations,
}

export function getTranslations(lang: Lang): Dictionary {
  return translations[lang] || translations['en-US']
}

export function getNestedTranslation(dict: Dictionary, path: string): string {
  const keys = path.split('.')
  let current: any = dict

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return path
    }
  }

  return typeof current === 'string' ? current : path
}
