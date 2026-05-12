import { create } from 'zustand';

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

export const usePopupStore = create<PopupStore>((set) => ({
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
}));
