import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STUDENT } from "@constants/student";
import { Product } from "@services/productApi";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  totalQuantity: () => number;
  totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const index = state.items.findIndex(
            (i) => i.product.id === product.id,
          );
          if (index > -1) {
            const next = [...state.items];
            next[index].quantity += 1;
            return { items: next };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== id),
        }));
      },
      changeQty: (id, delta) => {
        set((state) => {
          const next = state.items
            .map((i) => {
              if (i.product.id === id) {
                const newQ = i.quantity + delta;
                return newQ > 0 ? { ...i, quantity: newQ } : null;
              }
              return i;
            })
            .filter(Boolean) as CartItem[];
          return { items: next };
        });
      },
      totalQuantity: () =>
        get().items.reduce((acc, cur) => acc + cur.quantity, 0),
      totalAmount: () =>
        get().items.reduce(
          (acc, cur) => acc + cur.product.price * cur.quantity,
          0,
        ),
    }),
    {
      name: `ktxgo-cart-${STUDENT.mssv}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
