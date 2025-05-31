import { create } from 'zustand';
import { defaultTheme } from '../themes/themes';
import type { ResumeTheme } from '../types/themes';

export const useThemeStore = create<{theme: ResumeTheme; setTheme: (theme: ResumeTheme) => void;}>((set) => ({
  theme: defaultTheme,
  setTheme: (theme) => set({ theme }),
}));


// export const useThemeStoreq = create(() => ({
//     theme: crateTheme,
//     setTheme : (theme) => 
// }))