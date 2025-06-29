import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  sectionSpacing: "1.5rem",
  headingFontFamily: "sans-serif",
  sectionHeadingColor: "#111827", // dark text
  bulletStyle: "disc", // 'circle', 'square' etc.
  dividerColor: "#d1d5db"
};


export const elegantTheme: GenericTheme = {
  fontSize: "1rem",
  fontFamily: "serif",
  textColor: "#3b3b3b",
  backgroundColor: "#f4f1ee", // light beige
  secondaryTextColor: "#5c5c5c",
  accentColor: "#d4af37", // rich gold
  spacing: "2rem",
  headingSize: "1.5rem",
  lineHeight: "1.2",
    sectionSpacing: "1.5rem",
  headingFontFamily: "sans-serif",
  sectionHeadingColor: "#111827", // dark text
  bulletStyle: "disc", // 'circle', 'square' etc.
  dividerColor: "#d1d5db"
};

export const freshTheme: GenericTheme = {
  fontSize: "1rem",
  fontFamily: "sans-serif",
  textColor: "#374151", // gray-700
  backgroundColor: "#f9fafb", // subtle off-white
  secondaryTextColor: "#6b7280", // gray-600
  accentColor: "#10b981", // emerald-500
  spacing: "1rem",
  headingSize: "1rem",
  lineHeight: "1.2",
    sectionSpacing: "1.5rem",
  headingFontFamily: "sans-serif",
  sectionHeadingColor: "#111827", // dark text
  bulletStyle: "disc", // 'circle', 'square' etc.
  dividerColor: "#d1d5db"
};

export const Soothing: GenericTheme = {
  fontSize: "1rem",
  fontFamily: "Georgia, serif",
  textColor: "#1e293b", // slate-800
  backgroundColor: "#ffffff",
  secondaryTextColor: "#475569", // slate-600
  accentColor: "#0ea5e9", // sky-500
  spacing: "2rem",
  headingSize: "1.5rem",
  lineHeight: "1.3",
    sectionSpacing: "1.5rem",
  headingFontFamily: "sans-serif",
  sectionHeadingColor: "#111827", // dark text
  bulletStyle: "disc", // 'circle', 'square' etc.
  dividerColor: "#d1d5db"
};



export const useThemeStore = create(
  persist<{
    theme: GenericTheme;
    setTheme: (theme: GenericTheme) => void;
    loadTheme: (theme: GenericTheme) => void;
  }>(
    (set) => ({
      theme: defaultTheme,
      setTheme: (theme) => set({ theme }),
      loadTheme: (data: GenericTheme) => set({ theme: { ...data } }),
    }),
    {
      name: 'professional-theme-store', // name of the item in localStorage
    }
  )
);
export const professionalStore = useThemeStore;