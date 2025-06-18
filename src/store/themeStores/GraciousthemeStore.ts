import { create } from 'zustand';

import  type { GenericTheme } from '../../types/GenericTheme';
import { persist } from 'zustand/middleware';

// Base Themes
export const defaultGraciousTheme: GenericTheme = {
  fontSize: "1rem",
  fontFamily: "sans-serif",
  textColor: "#1f2937",
  backgroundColor: "#ffffff",
  sectionTitleBg: "#d1fae5",
  sectionTitleTextColor: "#111827",
  spacing: "0.75rem",
  headingSize: "1.25rem",
  lineHeight: "1.4",
  sectionSpacing: "0.5rem",
  alignment: "center",
  titleWeight: "bold",
  titleCase: "uppercase",
  bulletStyle: "disc",
  certificationBulletStyle: "disc",
  projectNameColor: "#0f172a",
  educationTitleColor: "#1f2937",
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
  lineHeight: "1.4",
  sectionSpacing: "0.5rem",
  alignment: "center",
  titleWeight: "bold",
  titleCase: "uppercase",
  bulletStyle: "circle",
  certificationBulletStyle: "circle",
  projectNameColor: "#38bdf8",
  educationTitleColor: "#f9fafb",
};

export const minimalCleanLight: GenericTheme = {
  fontSize: "0.95rem",
  fontFamily: "Arial, sans-serif",
  textColor: "#111827",
  backgroundColor: "#f9fafb",
  sectionTitleBg: "#e5e7eb",
  sectionTitleTextColor: "#111827",
  spacing: "0.75rem",
  headingSize: "1.125rem",
  lineHeight: "1.4",
  sectionSpacing: "0.5rem",
  alignment: "left",
  titleWeight: "600",
  titleCase: "none",
  bulletStyle: "square",
  certificationBulletStyle: "square",
  projectNameColor: "#1d4ed8",
  educationTitleColor: "#111827",
};

export const vibrantModern: GenericTheme = {
  fontSize: "1rem",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  textColor: "#0f172a",
  backgroundColor: "#f0f9ff",
  sectionTitleBg: "#e0f2fe",
  sectionTitleTextColor: "#0ea5e9",
  spacing: "0.75rem",
  headingSize: "1.25rem",
  lineHeight: "1.4",
  sectionSpacing: "0.25rem",
  alignment: "center",
  titleWeight: "bold",
  titleCase: "uppercase",
  bulletStyle: "disc",
  certificationBulletStyle: "disc",
  projectNameColor: "#0ea5e9",
  educationTitleColor: "#1e3a8a",
};
export const useThemeStore = create(
  persist<{
    theme: GenericTheme;
    setTheme: (theme: GenericTheme) => void;
    loadTheme: (theme: GenericTheme) => void;
  }>(
    (set) => ({
      theme: defaultGraciousTheme,
      setTheme: (theme) => set({ theme }),
      loadTheme: (data: GenericTheme) => set({ theme: { ...data } }),
    }),
    {
      name: 'gracious-theme-store', // name of the item in localStorage
    }
  )
);

export const graciousStore = useThemeStore;