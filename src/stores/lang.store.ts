import { atom } from 'jotai'

export type Lang = 'pt-BR' | 'en-US'

export type LangParams = {
  lang: Lang
}

export enum LangEnum {
  'pt-BR' = 'pt',
  'en-US' = 'en',
}

export const langAtom = atom<Lang>('en-US')

export function isValidLang(lang: string): lang is Lang {
  return lang === 'pt-BR' || lang === 'en-US'
}

export function getLangFromParam(param: string): Lang {
  if (isValidLang(param)) {
    return param
  }
  return 'en-US' 
}
