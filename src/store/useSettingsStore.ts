import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export type Language = 'fr' | 'en';

// Sur web, utiliser localStorage (AsyncStorage peut fail)
const storage =
  Platform.OS === 'web'
    ? {
        getItem: (name: string) =>
          Promise.resolve(localStorage.getItem(name) ?? null),
        setItem: (name: string, value: string) =>
          Promise.resolve(localStorage.setItem(name, value)),
        removeItem: (name: string) =>
          Promise.resolve(localStorage.removeItem(name)),
      }
    : AsyncStorage;

interface SettingsState {
  notificationsEnabled: boolean;
  darkMode: boolean;
  language: Language;

  setNotifications: (enabled: boolean) => void;
  setDarkMode: (enabled: boolean) => void;
  setLanguage: (lang: Language) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notificationsEnabled: true,
      darkMode: false,
      language: 'fr',

      setNotifications: (enabled) => set({ notificationsEnabled: enabled }),
      setDarkMode: (enabled) => set({ darkMode: enabled }),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'nobroke-settings',
      storage: createJSONStorage(() => storage),
    }
  )
);
