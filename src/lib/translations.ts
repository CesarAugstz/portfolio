import { Lang } from '@/stores/lang.store'

import enTranslations from '@/app/[lang]/dictionaries/en.json'
import ptTranslations from '@/app/[lang]/dictionaries/pt.json'
import enSkillsTranslations from '@/app/[lang]/dictionaries/skills-en.json'
import ptSkillsTranslations from '@/app/[lang]/dictionaries/skills-pt.json'

export type Dictionary = typeof enTranslations & typeof enSkillsTranslations

export const translations: Record<Lang, Dictionary> = {
  'en-US': { ...enTranslations, ...enSkillsTranslations } as Dictionary,
  'pt-BR': { ...ptTranslations, ...ptSkillsTranslations } as Dictionary,
}

export function getTranslations(lang: Lang): Dictionary {
  return translations[lang] || translations['en-US']
}

export function getNestedTranslation(
  dict: Dictionary,
  path: string,
): string | string[] {
  const keys = path.split('.')
  let current: any = dict

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current)
      current = current[key]
    else return path
  }

  return current
}
