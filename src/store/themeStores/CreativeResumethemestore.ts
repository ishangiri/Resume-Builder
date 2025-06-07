import { create } from 'zustand';
import type { GenericTheme } from '../../types/GenericTheme';

export const defaultResumeTheme: GenericTheme = {
  fontSize: "12px",
  fontFamily: "sans-serif",
  textColor: "#374151",
  backgroundColor: "#f3f4f6",
  secondaryTextColor: "#6b7280",
  accentColor: "#047857",
  spacing: "1rem",
  headingSize: "1.25rem",
  lineHeight: "1.4",
  sectionSpacing: "1rem",
  headingFontFamily: "sans-serif",
  sectionHeadingColor: "#065f46",
  bulletStyle: "disc",
  dividerColor: "#d1d5db",
  sectionTitleTextColor: "#ffffff",
  subtleTextColor: "#e0f2fe",
  mediumTextColor: "#f0f9ff"
};

export const modernGreenTheme: GenericTheme = {
  fontSize: "13px",
  fontFamily: "'Inter', sans-serif",
  textColor: "#1f2937",
  backgroundColor: "#ffffff",
  secondaryTextColor: "#6b7280",
  accentColor: "#059669",
  spacing: "1.25rem",
  headingSize: "1.375rem",
  lineHeight: "1.5",
  sectionSpacing: "1.25rem",
  headingFontFamily: "'Inter', sans-serif",
  sectionHeadingColor: "#047857",
  bulletStyle: "circle",
  dividerColor: "#e5e7eb",
  sectionTitleTextColor: "#ffffff",
  subtleTextColor: "#d1fae5",
  mediumTextColor: "#ecfdf5"
};

export const elegantForestTheme: GenericTheme = {
  fontSize: "12px",
  fontFamily: "'Georgia', serif",
  textColor: "#374151",
  backgroundColor: "#f9fafb",
  secondaryTextColor: "#6b7280",
  accentColor: "#064e3b",
  spacing: "1rem",
  headingSize: "1.25rem",
  lineHeight: "1.4",
  sectionSpacing: "1rem",
  headingFontFamily: "'Georgia', serif",
  sectionHeadingColor: "#022c22",
  bulletStyle: "disc",
  dividerColor: "#d1d5db",
  sectionTitleTextColor: "#ffffff",
  subtleTextColor: "#a7f3d0",
  mediumTextColor: "#d1fae5"
};

export const vibrantTealTheme: GenericTheme = {
  fontSize: "12px",
  fontFamily: "'Roboto', sans-serif",
  textColor: "#1f2937",
  backgroundColor: "#f8fafc",
  secondaryTextColor: "#64748b",
  accentColor: "#0d9488",
  spacing: "1rem",
  headingSize: "1.25rem",
  lineHeight: "1.4",
  sectionSpacing: "1rem",
  headingFontFamily: "'Roboto', sans-serif",
  sectionHeadingColor: "#0f766e",
  bulletStyle: "square",
  dividerColor: "#cbd5e1",
  sectionTitleTextColor: "#ffffff",
  subtleTextColor: "#ccfbf1",
  mediumTextColor: "#f0fdfa"
};

export const useThemeStore = create<{
  theme: GenericTheme;
  setTheme: (theme: GenericTheme) => void;
  loadTheme: (theme: GenericTheme) => void;
}>((set) => ({
  theme: defaultResumeTheme,
  setTheme: (theme) => set({ theme }),
  loadTheme: (data: GenericTheme) => set({
    theme: { ...data }
  })
}));

export const resumeThemeStore = useThemeStore;
