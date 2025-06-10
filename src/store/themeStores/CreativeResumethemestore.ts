import { create } from 'zustand';
import type { GenericTheme } from '../../types/GenericTheme';

export const harvardTheme : GenericTheme = {
  backgroundColor: "#f9fafb",
  textColor: "#21243d",
  secondaryTextColor: "#6b7280",
  accentColor: "#a51c30",
  dividerColor: "#e5e7eb",
  fontFamily: "'Merriweather', 'Georgia', serif",
  headingFontFamily: "'Montserrat', 'Arial', sans-serif",
  fontSize: "14px",
  headingSize: "34px",
  subHeadingSize: "22px",
  sectionTitleSize: "16px",
  listItemSize: "14px",
  lineHeight: "1.65",
  padding: "1.5rem",
  sectionSpacing: "1rem",
  gap: "1.5rem",
  itemSpacing: "4px",
};

export const oxfordTheme: GenericTheme = {
  backgroundColor: "#f7f7f9", // light gray
  textColor: "#22223b", // rich navy
  secondaryTextColor: "#4a4e69", // muted purple
  accentColor: "#9a8c98", // Oxford mauve
  dividerColor: "#c9ada7", // soft divider
  fontFamily: "'Lora', 'Georgia', serif",
  headingFontFamily: "'Oswald', 'Arial', sans-serif",
  fontSize: "13px",
  headingSize: "32px",
  subHeadingSize: "20px",
  sectionTitleSize: "15px",
  listItemSize: "13px",
  lineHeight: "1.7",
  padding: "1.3rem",
  sectionSpacing: "1rem",
  gap: "1.7rem",
  itemSpacing: "0.5rem",
};

export const mitTheme: GenericTheme = {
  backgroundColor: "#ffffff", // bright white
  textColor: "#1a202c", // almost black
  secondaryTextColor: "#718096", // slate gray
  accentColor: "#ff6f00", // MIT orange
  dividerColor: "#e2e8f0", // light blue-gray
  fontFamily: "'Roboto', 'Inter', Arial, sans-serif",
  headingFontFamily: "'Barlow Condensed', 'Arial', sans-serif",
  fontSize: "13px",
  headingSize: "30px",
  subHeadingSize: "19px",
  sectionTitleSize: "14px",
  listItemSize: "13px",
  lineHeight: "1.6",
  padding: "1.1rem",
  sectionSpacing: "1rem",
  gap: "1.4rem",
  itemSpacing: "0.5rem",
};

export const cambridgeTheme: GenericTheme = {
  backgroundColor: "#f5f5ef", // parchment white
  textColor: "#22333b", // classic ink
  secondaryTextColor: "#5e6472", // Cambridge blue-gray
  accentColor: "#006d5b", // Cambridge green
  dividerColor: "#b7b7a4", // soft divider
  fontFamily: "'PT Serif', 'Georgia', serif",
  headingFontFamily: "'Raleway', 'Arial', sans-serif",
  fontSize: "13px",
  headingSize: "31px",
  subHeadingSize: "19px",
  sectionTitleSize: "15px",
  listItemSize: "13px",
  lineHeight: "1.65",
  padding: "1.25rem",
  sectionSpacing: "1rem",
  gap: "1.6rem",
  itemSpacing: "0.5rem",
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
