import { LangEnum } from '@/stores/lang.store'
import 'server-only'
 
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  pt: () => import('./dictionaries/pt.json').then((module) => module.default),
}

export type Dictionary = typeof import('./dictionaries/pt.json')
 
export async function getDictionary(locale: 'pt-BR' | 'en-US'): Promise<Dictionary> {
  return  dictionaries[LangEnum[locale]]()
}
