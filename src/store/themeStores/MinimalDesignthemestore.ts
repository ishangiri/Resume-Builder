import { create } from "zustand";

import type { GenericTheme } from '../../types/GenericTheme';

interface theme {
  theme : GenericTheme,
  setTheme : (theme : GenericTheme) => void
}

export const defaultTheme : GenericTheme =  {
  fontSize: "14px",
  lineHeight: "1.25",
  headerColor: "#2563eb", // Tailwind blue-600
  textColor: "#374151", // Tailwind gray-700
  sectionSpacing: "1rem",
  tagText: "#1e40af", // Tailwind blue-800
  backgroundColor : "white",
  nameFontSize : "2rem",
  headingSize : "1rem",
}


export const useMinimalThemeStore = create<theme>((set) =>({
  theme: defaultTheme,
  setTheme: (theme) => set({ theme }),
}));

