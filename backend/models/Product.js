const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, lowercase: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 25 },
  emiAvailable: { type: Boolean, default: true },
  emiStartingAt: { type: Number, default: 999 },
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 124 },
  images: [{ type: String }],
  videoUrl: { type: String, default: '' },
  description: { type: String, required: true },
  features: [{ type: String }],
  warranty: { type: String, default: '1 Year Manufacturer Warranty' },
  specifications: {
    color: String,
    ram: String,
    storage: String,
    capacity: String,
    weight: String,
    dimensions: String,
    display: String,
    processor: String,
    battery: String
  },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isTodayDeal: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
