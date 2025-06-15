import { create } from 'zustand';
import type { GenericTheme } from '../../types/GenericTheme';

export const harvardTheme: GenericTheme = {
  backgroundColor: "#f9fafb",
  textColor: "#21243d",
  secondaryTextColor: "#6b7280",
  accentColor: "#a51c30", // Harvard crimson
  dividerColor: "#e5e7eb",
  fontFamily: "'Merriweather', 'Georgia', serif",
  headingFontFamily: "'Montserrat', 'Arial', sans-serif",
  fontSize: "13px",
  headingSize: "34px",
  sectionTitleSize: "16px",
  lineHeight: "1.65",
  padding: "1.5rem",
  sectionSpacing: "1rem",
  gap: "1.5rem",
  itemSpacing: "4px",
};

export const oxfordTheme: GenericTheme = {
  backgroundColor: "#f7f7f9",
  textColor: "#1e1e2f",
  secondaryTextColor: "#5c5470",
  accentColor: "#002147", // Oxford blue
  dividerColor: "#d1d5db",
  fontFamily: "'Lora', 'Georgia', serif",
  headingFontFamily: "'Oswald', 'Arial', sans-serif",
  fontSize: "13px",
  headingSize: "32px",
  sectionTitleSize: "15px",
  lineHeight: "1.7",
  padding: "1.3rem",
  sectionSpacing: "0.9rem",
  gap: "1.3rem",
  itemSpacing: "6px",
};

export const mitTheme: GenericTheme = {
  backgroundColor: "#ffffff",
  textColor: "#1a1a1a",
  secondaryTextColor: "#4a5568",
  accentColor: "#ff6f00", // MIT orange
  dividerColor: "#d6d6d6",
  fontFamily: "'Roboto', 'Helvetica Neue', sans-serif",
  headingFontFamily: "'Barlow Condensed', 'Arial', sans-serif",
  fontSize: "13px",
  headingSize: "30px",
  sectionTitleSize: "14px",
  lineHeight: "1.6",
  padding: "1.1rem",
  sectionSpacing: "0.8rem",
  gap: "1.4rem",
  itemSpacing: "5px",
};

export const cambridgeTheme: GenericTheme = {
  backgroundColor: "#f0f4f8",
  textColor: "#22333b",
  secondaryTextColor: "#5e6472",
  accentColor: "#006d5b", // Cambridge green
  dividerColor: "#cbd5e1",
  fontFamily: "'PT Serif', 'Georgia', serif",
  headingFontFamily: "'Raleway', 'Arial', sans-serif",
  fontSize: "13px",
  headingSize: "31px",
  sectionTitleSize: "15px",
  lineHeight: "1.65",
  padding: "1.25rem",
  sectionSpacing: "1rem",
  gap: "1.6rem",
  itemSpacing: "5px",
};

export const useThemeStore = create<{
  theme: GenericTheme;
  setTheme: (theme: GenericTheme) => void;
  loadTheme: (theme: GenericTheme) => void;
}>((set) => ({
  theme: harvardTheme,
  setTheme: (theme) => set({ theme }),
  loadTheme: (data: GenericTheme) => set({
    theme: { ...data }
  })
}));

export const resumeThemeStore = useThemeStore;
