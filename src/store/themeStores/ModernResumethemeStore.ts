// store/graciousThemeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { GenericTheme } from '../../types/GenericTheme';


export const defaultTheme: GenericTheme = {
  fontSize: "0.875rem", // Tailwind text-sm equivalent, for general paragraph text
  fontFamily: "'Roboto', sans-serif", // Example: Roboto
  nameColor : "#3b82f6",
  textColor: "#1f2937", // text-gray-800
  backgroundColor: "#ffffff",
  sectionTitleTextColor: "#3b82f6", // blue-800 (original text-blue-800)
  spacing: "0.75rem", // Corresponds to Tailwind's spacing unit 3
  headingSize: "1.875rem", // text-3xl (original was 2xl, slightly larger for H1)
  lineHeight: "1.25",
  accentColor: "#3b82f6", // blue-500 (original border-blue-500)
  subtleTextColor: "#6b7280", // text-gray-500
  mediumTextColor: "#4b5563", // text-gray-600 (original uses gray-600 and 700 often)
};
// Theme 1: Executive Slate - Professional dark accent theme
export const executiveSlateTheme: GenericTheme = {
  fontSize: "0.875rem", // text-sm
  nameColor : "#475569",
  fontFamily: "'Inter', sans-serif", // Modern, clean typeface
  textColor: "#111827", // text-gray-900 - darker for better contrast
  backgroundColor: "#f8fafc", // slate-50 - subtle off-white background
  sectionTitleTextColor: "#475569", // slate-600
  spacing: "0.875rem", // Slightly more generous spacing
  headingSize: "2rem", // text-4xl - slightly larger
  lineHeight: "1.375", // Better readability
  accentColor: "#475569", // slate-600 - sophisticated gray-blue
  subtleTextColor: "#64748b", // slate-500
  mediumTextColor: "#374151", // gray-700
};

// Theme 2: Corporate Emerald - Professional green theme
export const corporateEmeraldTheme: GenericTheme = {
  fontSize: "0.875rem", // text-sm
  fontFamily: "'Source Sans Pro', sans-serif", // Professional, readable
  textColor: "#1f2937", // text-gray-800
  nameColor : "#10b981",
  backgroundColor: "#ecfcd8", // Very subtle green-tinted white
  sectionTitleTextColor: "#047857", // emerald-700
  spacing: "0.75rem", // Standard spacing
  headingSize: "1.875rem", // text-3xl
  lineHeight: "1.25",
  accentColor: "#10b981", // emerald-500 - professional green
  subtleTextColor: "#6b7280", // gray-500
  mediumTextColor: "#4b5563", // gray-600
};

// Theme 3: Modern Charcoal - Minimalist dark theme
export const modernCharcoalTheme: GenericTheme = {
  fontSize: "0.875rem", // text-sm
  fontFamily: "'Open Sans', sans-serif", // Highly readable
  textColor: "#1f2937", // text-gray-800
  nameColor : "#374151",
  backgroundColor: "#fafafa", // neutral-50 - warm off-white
  sectionTitleTextColor: "#111827", // gray-900
  spacing: "0.8125rem", // Slightly custom spacing for uniqueness
  headingSize: "1.75rem", // text-2xl - more conservative
  lineHeight: "1.3", // Tighter line height for modern look
  accentColor: "#374151", // gray-700 - sophisticated charcoal
  subtleTextColor: "#9ca3af", // gray-400
  mediumTextColor: "#6b7280", // gray-500
};



// export const useThemeStore = create<ThemeStore>((set) => ({
//   theme: modernCharcoalTheme,
//   setTheme: (newTheme) => set((state) => ({ theme: { ...state.theme, ...newTheme } })),
// }));

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
      name: 'modern-theme-store', // name of the item in localStorage
    }
  )
);

export const modernStore = useThemeStore;