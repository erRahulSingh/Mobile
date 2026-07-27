import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [
      {
        _id: 'prod_2',
        title: 'Apple iPhone 15 Pro Max (256GB Natural Titanium)',
        slug: 'apple-iphone-15-pro-max',
        brand: 'Apple',
        category: 'Mobile Phones',
        price: 159900,
        offerPrice: 148900,
        discountPercentage: 7,
        rating: 4.9,
        reviewCount: 512,
        images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'],
        emiAvailable: true,
        emiStartingAt: 6999
      },
      {
        _id: 'prod_3',
        title: 'LG C3 65" 4K Smart OLED TV Dolby Vision & Atmos',
        slug: 'lg-c3-65-inch-4k-oled-tv',
        brand: 'LG',
        category: 'Smart TVs',
        price: 249990,
        offerPrice: 189990,
        discountPercentage: 24,
        rating: 4.8,
        reviewCount: 189,
        images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'],
        emiAvailable: true,
        emiStartingAt: 8999
      },
      {
        _id: 'prod_4',
        title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        slug: 'sony-wh-1000xm5-wireless-headphones',
        brand: 'Sony',
        category: 'Headphones',
        price: 34990,
        offerPrice: 26990,
        discountPercentage: 22,
        rating: 4.9,
        reviewCount: 840,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
        emiAvailable: true,
        emiStartingAt: 1299
      }
    ],
  },
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload;
      const index = state.items.findIndex(item => item._id === product._id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
    },
    removeFromWishlist(state, action) {
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);
    }
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

