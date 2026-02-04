// src/store/cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  image: string;
  priceKes: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotalKes: () => number;
  count: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, qty = 1) => {
        set((state) => {
          const existing = state.items.find((x) => x.id === item.id);
          if (existing) {
            return {
              items: state.items.map((x) =>
                x.id === item.id ? { ...x, qty: x.qty + qty } : x
              ),
            };
          }
          return { items: [...state.items, { ...item, qty }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((x) => x.id !== id) }));
      },

      setQty: (id, qty) => {
        const safeQty = Math.max(1, Math.min(99, Math.floor(qty || 1)));
        set((state) => ({
          items: state.items.map((x) => (x.id === id ? { ...x, qty: safeQty } : x)),
        }));
      },

      clear: () => set({ items: [] }),

      subtotalKes: () => get().items.reduce((sum, x) => sum + x.priceKes * x.qty, 0),

      count: () => get().items.reduce((sum, x) => sum + x.qty, 0),
    }),
    {
      name: "gleamcare-cart-v1",
    }
  )
);
