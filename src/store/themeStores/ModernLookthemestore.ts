import { create } from "zustand";
import type { GenericTheme } from "../../types/GenericTheme";
import { persist } from "zustand/middleware";

export const defaultModerntheme: GenericTheme = {
  fontSize: "14px",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  textColor: "#1f2937",
  primaryColor: "#000000",
  sectionSpacing: "1rem",
  headerColor: "#000000",
  accentColor: "#1f2937",
  backgroundColor: "#f8f8f8", // Very light gray, almost white
  headingFontFamily: "sans-serif",
  sectionHeadingColor: "black",
  bulletStyle: "circle",
  dividerColor: "blue",
};

export const sophisticatedSerifTheme: GenericTheme = {
  fontSize: "14px",
  fontFamily: "'Georgia', 'Times New Roman', Times, serif",
  textColor: "#4A4A4A",       // Dark Charcoal Gray
  primaryColor: "#8B4513",    // Saddle Brown / Dark Wood Tone - for section titles
  sectionSpacing: "1rem",
  headerColor: "#2F4F4F",     // Dark Slate Gray - for the main name
  accentColor: "#A0522D",     // Sienna - for borders or highlights (complements primaryColor)
  backgroundColor: "#fcfaf6", // Off-white/cream, subtle warmth
  headingFontFamily: "sans-serif",
  sectionHeadingColor: "black",
  bulletStyle: "circle",
  dividerColor: "blue",
};

export const corporateBlueTheme: GenericTheme = {
  fontSize: "13.5px",
  fontFamily: "'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  textColor: "#374151",       // Dark Gray (Tailwind gray-700) - for good readability
  primaryColor: "#2563eb",    // Medium Blue (Tailwind blue-600) - for section titles/headings
  sectionSpacing: "1rem",     // Consistent spacing
  headerColor: "#1e3a8a",     // Dark Blue (Tailwind blue-900) - for the main name
  accentColor: "#60a5fa",     // Lighter Blue (Tailwind blue-400) - for borders or subtle highlights
  backgroundColor: "#f7fafd", // Very light blue-gray, subtle cool tone
  headingFontFamily: "sans-serif",
  sectionHeadingColor: "black",
  bulletStyle: "circle",
  dividerColor: "blue",
};

export const elegantGrayTheme: GenericTheme = {
  fontSize: "13.5px",
  fontFamily: "'Montserrat', 'Optima', 'Segoe UI', sans-serif",
  textColor: "#2d3748",       // Dark Slate Gray (Tailwind gray-800 variant)
  primaryColor: "#1a202c",    // Almost Black (Tailwind gray-900 variant) - for section titles
  sectionSpacing: "1rem",
  headerColor: "#000000",     // Pure Black - for the main name for strong emphasis
  accentColor: "#718096",     // Medium Gray (Tailwind gray-600 variant) - for borders/lines
  backgroundColor: "#f2f4f7", // Light cool gray
  headingFontFamily: "sans-serif",
  sectionHeadingColor: "black",
  bulletStyle: "circle",
  dividerColor: "blue",
};


export const useThemeStore = create(
  persist<{
    theme: GenericTheme;
    setTheme: (theme: GenericTheme) => void;
    loadTheme: (theme: GenericTheme) => void;
  }>(
    (set) => ({
      theme: defaultModerntheme ,
      setTheme: (theme) => set({ theme }),
      loadTheme: (data: GenericTheme) => set({ theme: { ...data } }),
    }),
    {
      name: 'modernlook-theme-store', // name of the item in localStorage
    }
  )
);

export const modernLookStore = useThemeStore;