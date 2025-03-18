import { create, createStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Category {
  name: string;
  userId: string;
  __v: number;
  _id: string;
}

interface StoreSchema {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addItem: (category: Category) => void;
  deleteItem: (itemId: string) => void;
}

const useCategoryStore = create<StoreSchema>()((set, get) => ({
  categories: [],
  setCategories: (categories) => {
    if (JSON.stringify(get().categories) !== JSON.stringify(categories)) {
      set({ categories: categories });
    }
  },
  addItem: (category) => {
    let current = get().categories;
    let updatedCategories = [...current, category];
    set({ categories: updatedCategories });
    console.log('inside', get().categories);
  },
  deleteItem: (itemId) => {
    const filterItem = get().categories.filter((item) => item._id !== itemId);
    set({ categories: filterItem });
  },
}));

export default useCategoryStore;
