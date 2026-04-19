import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, size?: string, color?: string) => void;
  updateQuantity: (productId: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  totalCount: () => number;
  totalPrice: () => number;
}

const itemKey = (productId: number, size?: string, color?: string) => `${productId}_${size ?? ''}_${color ?? ''}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((s) => {
          const key = itemKey(item.productId, item.size, item.color);
          const exists = s.items.find((i) => itemKey(i.productId, i.size, i.color) === key);
          if (exists) {
            return {
              items: s.items.map((i) => (itemKey(i.productId, i.size, i.color) === key ? { ...i, quantity: i.quantity + item.quantity } : i)),
            };
          }
          return { items: [...s.items, item] };
        }),

      removeItem: (productId, size, color) =>
        set((s) => ({
          items: s.items.filter((i) => itemKey(i.productId, i.size, i.color) !== itemKey(productId, size, color)),
        })),

      updateQuantity: (productId, quantity, size, color) =>
        set((s) => ({
          items: s.items.map((i) =>
            itemKey(i.productId, i.size, i.color) === itemKey(productId, size, color) ? { ...i, quantity: Math.max(1, quantity) } : i,
          ),
        })),

      clearCart: () => set({ items: [] }),

      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'gg-cart' },
  ),
);
