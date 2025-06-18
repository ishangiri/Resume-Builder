import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GenericTheme } from '../../types/GenericTheme';

interface theme {
  theme : GenericTheme,
  setTheme : (theme : GenericTheme) => void
  loadTheme : (theme : GenericTheme) => void
}

export const defaultTheme : GenericTheme =  {
  fontFamily: "sans-serif",
  fontSize: "12px",
  lineHeight: "1.4",
  backgroundColor: "#ffffff",
  headerColor: "#0d47a1",
  nameFontSize: "24px",
  headingSize: "16px",
  textColor: "#333333",
  sectionSpacing: "2px",
  bulletStyle: "disc"
}

export const softGreenTheme: GenericTheme = {
  fontFamily: "'Segoe UI', 'Arial', sans-serif",
  fontSize: "13px",
  lineHeight: "1.4",
  backgroundColor: "#f4fbf6",
  headerColor: "#388e3c",         // Deep green
  nameFontSize: "26px",
  headingSize: "17px",
  textColor: "#2e473b",           // Muted green-black
  sectionSpacing: "2px",
  bulletStyle: "circle"
};

export const warmSandTheme: GenericTheme = {
  fontFamily: "'Roboto', 'Verdana', sans-serif",
  fontSize: "13px",
  lineHeight: "1.4",
  backgroundColor: "#f9f6f2",
  headerColor: "#b08968",         // Warm brown
  nameFontSize: "25px",
  headingSize: "16px",
  textColor: "#5c4327",           // Rich brown
  sectionSpacing: "2px",
  bulletStyle: "square"
};

export const elegantNightTheme: GenericTheme = {
  fontFamily: "'Merriweather', 'Georgia', serif",
  fontSize: "12px",
  lineHeight: "1.4",
  backgroundColor: "#23272f",
  headerColor: "#fbc02d",         // Gold
  nameFontSize: "24px",
  headingSize: "16px",
  textColor: "#e0e0e0",           // Soft light gray
  sectionSpacing: "2px",
  bulletStyle: "disc"
};


export const useMinimalThemeStore = create<theme>()(
  persist(
    (set) => ({
      theme: defaultTheme,
      setTheme: (theme) => set({ theme }),
      loadTheme: (data) => set({ theme: { ...data } }),
    }),
    {
      name: 'minimal-theme-store', // key in localStorage
    }
  )
);

export const minimalDesignStore = useMinimalThemeStore;