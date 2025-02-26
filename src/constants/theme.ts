import type { ThemeAttributesType, ThemeType } from "@/types/theme";

const THEME_LIGHT: ThemeAttributesType = {
  background: "#FFFFFF",
  text: "#1A1A1A",
  subText: "#65636D",
  revertBackground: "#1A1A1A",
  revertText: "#FFFFFF",
  buttonBackground: "#35261c4d",
  buttonHoverBackground: "#E0E0E0",
  menuButtonHoverBackground: "#1c191799",
  dialogBorder: "#3F3A4C",
};

const THEME_DARK: ThemeAttributesType = {
  background: "#090D1F",
  text: "#FFFFFF",
  subText: "#B4B3BC",
  revertBackground: "#FFFFFF",
  revertText: "#090D1F",
  buttonBackground: "#ffffffcc",
  buttonHoverBackground: "#6C6C6C",
  menuButtonHoverBackground: "#ffffff1f",
  dialogBorder: "#3F3A4C",
};

export const THEME: ThemeType = {
  dark: THEME_DARK,
  light: THEME_LIGHT,
};
