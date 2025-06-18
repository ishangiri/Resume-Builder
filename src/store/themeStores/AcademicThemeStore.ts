import { create } from "zustand";
import type { GenericTheme } from "../../types/GenericTheme";
import { persist } from "zustand/middleware";
 export const defaultTheme: GenericTheme = {
    backgroundColor: "#ffffff",
    textColor: "#111827",
    secondaryTextColor: "#6b7280",
    accentColor: "#f59e0b",
    dividerColor: "#e5e7eb",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    fontSize: "12px",
    headingSize: "28px",
    subHeadingSize: "20px",
    sectionTitleSize: "14px",
    listItemSize: "12px",
    lineHeight: "1.5",
    padding: "0.5rem",
    sectionSpacing: "1rem",
    gap: "2rem",
    itemSpacing: "1rem"
  };

  export const modernBlueTheme: GenericTheme = {
  backgroundColor: "#f8fafc",             // slate-50
  textColor: "#1e293b",                   // slate-800
  secondaryTextColor: "#64748b",          // slate-500
  accentColor: "#2563eb",                 // blue-600
  dividerColor: "#e2e8f0",                // slate-200
  fontFamily: "'Roboto', 'Inter', Arial, sans-serif",
  fontSize: "12px",
  headingSize: "28px",
  subHeadingSize: "20px",
  sectionTitleSize: "14px",
  listItemSize: "12px",
  lineHeight: "1.6",
  padding: "1rem",
  sectionSpacing: "1.25rem",
  gap: "2rem",
  itemSpacing: "1rem"
};

export const elegantDarkTheme: GenericTheme = {
  backgroundColor: "#18181b",             // zinc-900
  textColor: "#f4f4f5",                   // zinc-100
  secondaryTextColor: "#a1a1aa",          // zinc-400
  accentColor: "#eab308",                 // yellow-500
  dividerColor: "#27272a",                // zinc-800
  fontFamily: "'Merriweather', 'Georgia', serif",
  fontSize: "12px",
  headingSize: "28px",
  subHeadingSize: "20px",
  sectionTitleSize: "14px",
  listItemSize: "12px",
  lineHeight: "1.7",
  padding: "1.25rem",
  sectionSpacing: "1.5rem",
  gap: "2.25rem",
  itemSpacing: "1.1rem"
};

export const minimalistGreenTheme: GenericTheme = {
  backgroundColor: "#f9fafb",             // gray-50
  textColor: "#222c1b",                   // custom deep green
  secondaryTextColor: "#6d7f6d",          // muted green
  accentColor: "#16a34a",                 // green-600
  dividerColor: "#d1fae5",                // green-100
  fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
  fontSize: "12px",
  headingSize: "28px",
  subHeadingSize: "20px",
  sectionTitleSize: "14px",
  listItemSize: "12px",
  lineHeight: "1.5",
  padding: "0.75rem",
  sectionSpacing: "1.25rem",
  gap: "2rem",
  itemSpacing: "0.9rem"
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
      name: 'academic-theme-store', // name of the item in localStorage
    }
  )
);


 export const academicStore = useThemeStore