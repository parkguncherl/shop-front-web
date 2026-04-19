import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  ids: number[];
  toggle: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [] as number[], // ← never[] 방지

      toggle: (productId: number) =>
        set((s) => ({
          ids: s.ids.includes(productId) ? s.ids.filter((id) => id !== productId) : [...s.ids, productId],
        })),

      isWishlisted: (productId: number) => get().ids.includes(productId),

      clear: () => set({ ids: [] as number[] }),
    }),
    { name: 'gg-wishlist' },
  ),
);
