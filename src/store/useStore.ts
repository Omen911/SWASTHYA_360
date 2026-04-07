import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Dosha = 'Vata' | 'Pitta' | 'Kapha' | null;

interface UserState {
  isAuthenticated: boolean;
  name: string;
  dosha: Dosha;
  login: (name: string) => void;
  logout: () => void;
  setDosha: (dosha: Dosha) => void;
}

interface CalorieEntry {
  id: string;
  food: string;
  calories: number;
  date: string;
}

interface CalorieState {
  targetCalories: number;
  entries: CalorieEntry[];
  setTargetCalories: (calories: number) => void;
  addEntry: (entry: Omit<CalorieEntry, 'id' | 'date'>) => void;
  removeEntry: (id: string) => void;
  getTodayCalories: () => number;
}

interface FavoriteRemedy {
  id: string;
  name: string;
  benefits: string;
}

interface AppState {
  favorites: FavoriteRemedy[];
  addFavorite: (remedy: FavoriteRemedy) => void;
  removeFavorite: (id: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      name: '',
      dosha: null,
      login: (name) => set({ isAuthenticated: true, name }),
      logout: () => set({ isAuthenticated: false, name: '', dosha: null }),
      setDosha: (dosha) => set({ dosha }),
    }),
    { name: 'swasthya-user-storage' }
  )
);

export const useCalorieStore = create<CalorieState>()(
  persist(
    (set, get) => ({
      targetCalories: 2000,
      entries: [],
      setTargetCalories: (calories) => set({ targetCalories: calories }),
      addEntry: (entry) => set((state) => ({
        entries: [...state.entries, { ...entry, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] }]
      })),
      removeEntry: (id) => set((state) => ({
        entries: state.entries.filter(e => e.id !== id)
      })),
      getTodayCalories: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().entries
          .filter(e => e.date === today)
          .reduce((sum, e) => sum + e.calories, 0);
      }
    }),
    { name: 'swasthya-calorie-storage' }
  )
);

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (remedy) => set((state) => ({
        favorites: state.favorites.some(f => f.id === remedy.id) 
          ? state.favorites 
          : [...state.favorites, remedy]
      })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter(f => f.id !== id)
      })),
    }),
    { name: 'swasthya-app-storage' }
  )
);
