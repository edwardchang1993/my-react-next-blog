export type ThemeNameType = "light" | "dark";

export interface ThemeAttributesType {
  [key: string]: string;
}

export type ThemeType<T extends ThemeAttributesType = ThemeAttributesType> = {
  [key in ThemeNameType]: T;
};
