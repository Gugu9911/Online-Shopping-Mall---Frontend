import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../../types/Cart";

const initialState: CartState = {
  itemsByUserId: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add the user ID to the addToCart action
    addToCart: (state, action: PayloadAction<{ userId: string, item: CartItem }>) => {
      const { userId, item } = action.payload;
      if (!state.itemsByUserId[userId]) {
        state.itemsByUserId[userId] = [];
      }
      state.itemsByUserId[userId].push({ ...item, quantity: item.quantity });
    },

    // Remove the item from the cart
    removeFromCart: (state, action: PayloadAction<{ userId: string, itemId: number }>) => {
      const { userId, itemId } = action.payload;
      const userCart = state.itemsByUserId[userId];
      if (userCart) {
        const itemIndex = userCart.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
          userCart.splice(itemIndex, 1);
        }
      }
    },

    // Increase the quantity of the item in the cart
    increaseQuantity: (state, action: PayloadAction<{ userId: string, itemId: number }>) => {
      const { userId, itemId } = action.payload;
      const item = state.itemsByUserId[userId]?.find((item) => item.id === itemId);
      if (item) {
        item.quantity++;
      }
    },

    // Decrease the quantity of the item in the cart
    decreaseQuantity: (state, action: PayloadAction<{ userId: string, itemId: number }>) => {
      const { userId, itemId } = action.payload;
      const item = state.itemsByUserId[userId]?.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },

    // Empty the cart
    emptyCart: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      if (state.itemsByUserId[userId]) {
        state.itemsByUserId[userId] = [];
      }
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} = cartSlice.actions;
