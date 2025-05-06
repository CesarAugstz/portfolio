import { atom } from 'jotai'

export type Lang = 'pt-BR' | 'en-US'

export type LangParams = {
  lang: Lang
}

export enum LangEnum {
  'pt-BR' = 'pt',
  'en-US' = 'en',
}

export const langAtom = atom<Lang>('pt-BR')
