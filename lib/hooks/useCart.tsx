import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (_id: string) => void;
  increaseQuantity: (_id: string) => void;
  decreaseQuantity: (_id: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;
        const existingItem = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        );
        if (existingItem) {
          return toast.error("Item already in cart");
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Item added to cart");
      },
      removeItem: (_id: string) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== _id
        );
        set({ cartItems: newCartItems });
        toast.success("Item removed from cart");
      },
      increaseQuantity: (_id: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Item increase");
      },
      decreaseQuantity: (_id: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Item decrease");
      },
      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
