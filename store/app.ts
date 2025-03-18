import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface User {
  _id: string;
  username: string;
  email: string;
  userId: string;
  isOnboarded: boolean;
  bio: string;
  fullname: string;
  __v: number;
}

export interface Category {
  name: string;
  userId: string;
  __v: number;
  _id: string;
}

interface StoreSchema {
  user: User;
  setUser: (param: User) => void;
  selectedCategory: string;
  setSelectedCategory: (param: string) => void;
  divisionCode: string;
  setDivisionCode: (param: string) => void;
}

const useStore = create<StoreSchema>()(
  persist(
    (set, get) => ({
      user: {} as User,
      setUser: (user) => set({ user: user }),
      selectedCategory: '',
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      divisionCode: '',
      setDivisionCode: (divisionCode) => set({ divisionCode: divisionCode }),
    }),
    {
      name: 'main-math-mentor-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useStore;
