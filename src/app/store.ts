import { create } from 'zustand';
import firebase from 'firebase/compat/app';

interface UserState {
  user: firebase.User | null;
  setUser: (user: firebase.User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
