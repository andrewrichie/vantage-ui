import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthState = 'authenticated' | 'unauthenticated';

interface PopupStore {
  authState: AuthState
  creditBalance: number
  userEmail: string | null
  setAuthState: (state: AuthState) => void
  setCreditBalance: (balance: number) => void
  setUserEmail: (email: string | null) => void
  toggleAuth: () => void
}

const chromeStorage = {
  getItem: async (name: string) => {
    const result = await chrome.storage.local.get(name);
    return result[name] ?? null;
  },
  setItem: async (name: string, value: string) => {
    await chrome.storage.local.set({ [name]: value });
  },
  removeItem: async (name: string) => {
    await chrome.storage.local.remove(name);
  },
};

export const usePopupStore = create<PopupStore>()(
  persist(
    (set) => ({
      authState: 'unauthenticated',
      creditBalance: 10,
      userEmail: null,
      setAuthState: (authState) => set({ authState }),
      setCreditBalance: (creditBalance) => set({ creditBalance }),
      setUserEmail: (userEmail) => set({ userEmail }),
      toggleAuth: () => set((state) => ({
        authState:
            state.authState === 'authenticated'
              ? 'unauthenticated'
              : 'authenticated',
        userEmail:
            state.authState === 'unauthenticated' ? 'user@example.com' : null,
        creditBalance: state.authState === 'unauthenticated' ? 10 : 10,
      })),
    }),
    {
      name: 'vantageui-auth',
      storage: chromeStorage,
    },
  ),
);
