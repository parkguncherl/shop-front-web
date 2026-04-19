import { create } from 'zustand';

interface FilterStore {
  category: string;
  sort: string;
  minPrice: number | null;
  maxPrice: number | null;
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  category: '',
  sort: '',
  minPrice: null,
  maxPrice: null,
  setCategory: (category) => set({ category }),
  setSort: (sort) => set({ sort }),
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  reset: () => set({ category: '', sort: '', minPrice: null, maxPrice: null }),
}));
