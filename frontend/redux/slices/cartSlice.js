import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      _id: 'prod_1',
      title: 'Samsung Galaxy S24 Ultra 5G (512GB Titanium Gray)',
      brand: 'Samsung',
      category: 'Mobile Phones',
      price: 134999,
      offerPrice: 124999,
      discountPercentage: 7,
      rating: 4.9,
      reviewCount: 342,
      images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'],
      quantity: 1,
      totalPrice: 124999,
      emiStartingAt: 5899
    },
    {
      _id: 'prod_101',
      title: 'Godrej 244L 3 Star Inverter Frost Free Double Door Refrigerator',
      brand: 'Godrej',
      category: 'Refrigerators',
      price: 31990,
      offerPrice: 24990,
      discountPercentage: 22,
      rating: 4.7,
      reviewCount: 156,
      images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'],
      quantity: 1,
      totalPrice: 24990,
      emiStartingAt: 1199
    }
  ],
  totalQuantity: 2,
  totalAmount: 149989,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.offerPrice || newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * (existingItem.offerPrice || existingItem.price);
      }
      state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.quantity * (existingItem.offerPrice || existingItem.price);
          state.totalQuantity--;
        } else {
          state.items = state.items.filter(item => item._id !== id);
          state.totalQuantity--;
        }
        state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item._id !== id);
        state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

