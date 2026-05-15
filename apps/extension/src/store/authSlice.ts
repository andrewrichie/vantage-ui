import { create } from 'zustand';

import { usePopupStore } from './popup-store';

type AuthStateStatus = 'unauthenticated' | 'loading' | 'authenticated';

interface AuthState {
  authState: AuthStateStatus
  user: { email: string } | null
  error: string | null
}

interface AuthActions {
  /**
   * Mocks login: loading state for 1500ms, then authenticated.
   * @param email The email address to log in with
   */
  mockLogin: (email: string) => Promise<void>

  /**
   * Mocks signup: loading for 1500ms, then authenticated + credits.
   * @param email The email address to sign up with
   */
  mockSignup: (email: string) => Promise<void>

  /**
   * Logs the user out by resetting state to unauthenticated.
   */
  mockLogout: () => void
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  authState: 'unauthenticated',
  user: null,
  error: null,

  mockLogin: async (email: string) => {
    set({ authState: 'loading', error: null });

    // Simulate API call delay
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1500);
    });

    set({ authState: 'authenticated', user: { email } });

    // Also sync the old popup store for backwards compatibility / top bar if needed
    usePopupStore.getState().setAuthState('authenticated');
    usePopupStore.getState().setUserEmail(email);
  },

  mockSignup: async (email: string) => {
    set({ authState: 'loading', error: null });

    // Simulate API call delay
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1500);
    });

    set({ authState: 'authenticated', user: { email } });

    // Seed initial credit balance
    usePopupStore.getState().setCreditBalance(5);

    // Sync with popup store
    usePopupStore.getState().setAuthState('authenticated');
    usePopupStore.getState().setUserEmail(email);
  },

  mockLogout: () => {
    set({ authState: 'unauthenticated', user: null, error: null });

    // Sync with popup store
    usePopupStore.getState().setAuthState('unauthenticated');
    usePopupStore.getState().setUserEmail(null);
  },
}));
