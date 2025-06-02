import { create } from 'zustand';

import type { GenericTheme } from '../../types/GenericTheme';

export const defaultTheme: GenericTheme = {
  fontSize: "1rem", // text-sm
  fontFamily: "sans-serif",
  textColor: "#1f2937", // gray-800
  backgroundColor: "#ffffff",
  secondaryTextColor: "#6b7280", // gray-600
  accentColor: "#3b82f6", // blue-500
  spacing: "2rem", // p-8
  headingSize: "1.5rem", // text-2xl
  lineHeight: "1.1",
};

export const elegantTheme: GenericTheme = {
  fontSize: "1rem",
  fontFamily: "sans-serif",
  textColor: "black",
  backgroundColor: "#DDBD9E",
  secondaryTextColor: "black",
  accentColor: "", // yellow-400
  spacing: "2rem",
  headingSize: "1.5rem",
  lineHeight: "1",
};

export const useThemeStore = create<{
  theme: GenericTheme;
  setTheme: (theme: GenericTheme) => void;
}>((set) => ({
  theme: defaultTheme,
  setTheme: (theme) => set({ theme }),
}));