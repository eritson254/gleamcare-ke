// src/store/wishlist.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WishlistItem = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  image: string;
  priceKes: number;
};

type WishlistState = {
  items: WishlistItem[];
  toggle: (item: WishlistItem) => void;
  has: (id: string) => boolean;
  remove: (id: string) => void;
  clear: () => void;
  count: () => number;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (item) => {
        set((state) => {
          const exists = state.items.some((x) => x.id === item.id);
          if (exists) return { items: state.items.filter((x) => x.id !== item.id) };
          return { items: [...state.items, item] };
        });
      },

      has: (id) => get().items.some((x) => x.id === id),

      remove: (id) => set((state) => ({ items: state.items.filter((x) => x.id !== id) })),

      clear: () => set({ items: [] }),

      count: () => get().items.length,
    }),
    { name: "gleamcare-wishlist-v1" }
  )
);
