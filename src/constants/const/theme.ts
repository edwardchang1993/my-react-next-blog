import type { ThemeAttributesType, ThemeType } from '@/constants/types/theme'

const THEME_LIGHT: ThemeAttributesType = {
    background: '#FFFFFF',
    text: '#1A1A1A',
    revertBackground: '#1A1A1A',
    revertText: '#FFFFFF'
} as const

const THEME_DARK: ThemeAttributesType = {
    background: '#090D1F',
    text: '#FFFFFF',
    revertBackground: '#FFFFFF',
    revertText: '#090D1F'
} as const

export const THEME: ThemeType = {
    dark: THEME_DARK,
    light: THEME_LIGHT
}