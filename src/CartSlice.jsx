import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],        // All items in the cart
    totalQuantity: 0, // Total items across all products
    totalPrice: 0,    // Total price of all items
  },
  reducers: {
    addItem: (state, action) => {
      const { id, name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ id, name, image, cost, quantity: 1 });
      }

      state.totalQuantity++;
      state.totalPrice += parseFloat(cost); // ensure cost is numeric
    },

    removeItem: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.quantity * parseFloat(existingItem.cost);
        state.items = state.items.filter(item => item.id !== id);
      }
      if (state.totalQuantity < 0) state.totalQuantity = 0;
      if (state.totalPrice < 0) state.totalPrice = 0;
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem && quantity > 0) {
        const diff = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += diff;
        state.totalPrice += diff * parseFloat(existingItem.cost);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
