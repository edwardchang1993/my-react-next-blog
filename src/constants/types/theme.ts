export type ThemeNameType = 'light' | 'dark'

export interface ThemeAttributesType {
    background: string
    text: string
    [key: string]: string
}

export type ThemeType<T extends ThemeAttributesType = ThemeAttributesType> = {
    [key in ThemeNameType]: T;
};