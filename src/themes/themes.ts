import type { ResumeTheme } from '../types/themes';

export const defaultTheme: ResumeTheme = {
  fontSize: "1rem", // text-sm
  fontFamily: "sans-serif",
  textColor: "#1f2937", // gray-900
  backgroundColor: "#ffffff",
  sectionTitleBg: "#d1fae5", // green-100
  sectionTitleTextColor: "#111827", // gray-900
  spacing: "0.75rem", // p-3
  headingSize: "1.25rem", // text-xl
  lineHeight: "1.25",
};

export const elegantDark: ResumeTheme = {
  fontSize: "1rem",
  fontFamily: "Georgia, serif",
  textColor: "#f9fafb",
  backgroundColor: "#1f2937",
  sectionTitleBg: "#374151",
  sectionTitleTextColor: "#facc15",
  spacing: "1rem",
  headingSize: "1.5rem",
  lineHeight: "1.5",
};