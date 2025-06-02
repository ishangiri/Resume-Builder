import { create } from 'zustand';

import  type { GenericTheme } from '../../types/GenericTheme';


export const defaultGraciousTheme: GenericTheme = {
  fontSize: "1rem", // text-sm
  fontFamily: "sans-serif",
  textColor: "#1f2937", // gray-900
  backgroundColor: "#ffffff",
  sectionTitleBg: "#d1fae5", // green-100
  sectionTitleTextColor: "#111827", // gray-900
  spacing: "0.75rem", // p-3
  headingSize: "1.25rem", // text-xl
  lineHeight: "1.25",
};

export const elegantGraciousDark: GenericTheme = {
  fontSize: "1rem",
  fontFamily: "Georgia, serif",
  textColor: "#f9fafb",
  backgroundColor: "#1f2937",
  sectionTitleBg: "#374151",
  sectionTitleTextColor: "#facc15",
  spacing: "0.75rem",
  headingSize: "1.25rem",
  lineHeight: "1.25",
};

export const useThemeStore = create<{theme: GenericTheme; setTheme: (theme: GenericTheme) => void;}>((set) => ({
  theme: defaultGraciousTheme,
  setTheme: (theme) => set({ theme }),
}));
