import { create } from 'zustand';

export type AuthUser = {
  uid: string;
  email: string | null;
  username?: string;
} | null;

type AuthStore = {
  user: AuthUser;
  setUser: (user: AuthUser) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
