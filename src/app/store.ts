import { create } from 'zustand';
import firebase from 'firebase/compat/app';
import Cookies from 'js-cookie';

interface UserState {
  user: firebase.User | null;
  setUser: (user: firebase.User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });

    if (user) {
      // Retrieve the ID token and set it in a cookie with a 1-week expiry
      user.getIdToken().then((idToken) => {
        Cookies.set('accessToken', idToken, { expires: 7 });
      });
    } else {
      // Remove the cookie if the user is null
      Cookies.remove('accessToken');
    }
  },
}));

// Utility function to get the accessToken from cookies
export const getAccessTokenFromCookie = (): string | undefined => {
  return Cookies.get('accessToken');
};
