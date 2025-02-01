import type { ThemeAttributesType, ThemeType } from "@/types/theme";

const THEME_LIGHT: ThemeAttributesType = {
  background: "#FFFFFF",
  text: "#1A1A1A",
  revertBackground: "#1A1A1A",
  revertText: "#FFFFFF",
  buttonBackground: "#35261c4d",
  buttonHoverBackground: "#E0E0E0",
  menuButtonHoverBackground: "#1c191799",
};

const THEME_DARK: ThemeAttributesType = {
  background: "#090D1F",
  text: "#FFFFFF",
  revertBackground: "#FFFFFF",
  revertText: "#090D1F",
  buttonBackground: "#ffffffcc",
  buttonHoverBackground: "#6C6C6C",
  menuButtonHoverBackground: "#ffffff1f",
};

export const THEME: ThemeType = {
  dark: THEME_DARK,
  light: THEME_LIGHT,
};
