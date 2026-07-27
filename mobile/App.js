import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput, Alert, Modal, Dimensions, ActivityIndicator, FlatList, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

// RAZORPAY TEST API KEYS
const RAZORPAY_KEY_ID = 'rzp_test_SUIH6k4l3JewbV';
const RAZORPAY_KEY_SECRET = '13t9eVDEmoEaiZ4zjL03Zcav';

// APP CUSTOM LOGO URL / LOCAL ASSET
const APP_LOGO_URL = 'https://cdn-icons-png.flaticon.com/512/9187/9187532.png';

// 3D REALISTIC PNG ICON ASSET URLS
const icons3D = {
  home: 'https://cdn-icons-png.flaticon.com/512/9187/9187532.png',
  categories: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
  cart: 'https://cdn-icons-png.flaticon.com/512/9187/9187556.png',
  orders: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
  account: 'https://cdn-icons-png.flaticon.com/512/9187/9187622.png',
  mobile: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=250&q=80',
  laptop: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=250&q=80',
  audio: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=250&q=80',
  tv: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=250&q=80',
  appliance: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=250&q=80',
  accessory: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=250&q=80'
};

const topCircleCategories = [
  { id: 'c1', label: 'Mobiles &\nTablets', img: icons3D.mobile, bg: '#EFF6FF', offerTag: 'Up to 40% OFF' },
  { id: 'c2', label: 'Laptops &\nAccessories', img: icons3D.laptop, bg: '#F0F9FF', offerTag: 'Up to 50% OFF' },
  { id: 'c3', label: 'Audio &\nSound', img: icons3D.audio, bg: '#FEF2F2', offerTag: 'Flat 60% OFF' },
  { id: 'c4', label: 'Smart TVs', img: icons3D.tv, bg: '#ECFDF5', offerTag: 'No Cost EMI' },
  { id: 'c5', label: 'Home\nAppliances', img: icons3D.appliance, bg: '#FDF2F8', offerTag: 'Min 30% OFF' },
  { id: 'c6', label: 'View All', isViewAll: true, bg: '#F1F5F9', offerTag: '100+ Brands' }
];

const homepageCategoryGrid = [
  { id: 'cat1', label: 'Mobiles & 5G', count: '128 Items', offerTag: 'Up to 40% OFF', offerBg: '#EF4444', img: icons3D.mobile, bg: '#EFF6FF' },
  { id: 'cat2', label: 'Laptops & PCs', count: '96 Items', offerTag: 'Up to 50% OFF', offerBg: '#2563EB', img: icons3D.laptop, bg: '#F0F9FF' },
  { id: 'cat3', label: 'Audio & Music', count: '75 Items', offerTag: 'Flat 60% OFF', offerBg: '#D97706', img: icons3D.audio, bg: '#FEF2F2' },
  { id: 'cat4', label: 'Smart 4K TVs', count: '52 Items', offerTag: 'No Cost EMI', offerBg: '#059669', img: icons3D.tv, bg: '#ECFDF5' },
  { id: 'cat5', label: 'Appliances', count: '88 Items', offerTag: 'Min 30% OFF', offerBg: '#7C3AED', img: icons3D.appliance, bg: '#FDF2F8' },
  { id: 'cat6', label: 'Accessories', count: '112 Items', offerTag: 'Starting ₹199', offerBg: '#0284C7', img: icons3D.accessory, bg: '#FFFBEB' },
  { id: 'cat7', label: 'Smartwatches', count: '45 Items', offerTag: 'Extra 10% Off', offerBg: '#EC4899', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=250&q=80', bg: '#F5F3FF' },
  { id: 'cat8', label: 'Gaming & Gear', count: '34 Items', offerTag: 'New Tech', offerBg: '#F59E0B', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=250&q=80', bg: '#EFF6FF' }
];

const categoryDetailedList = [
  { id: 'cat_mobiles', title: 'Mobiles & Smartphones', sub: 'Latest 5G smartphones and feature phones', count: '128 Products', img: icons3D.mobile },
  { id: 'cat_laptops', title: 'Laptops & Accessories', sub: 'Best laptops for work, study and gaming', count: '96 Products', img: icons3D.laptop },
  { id: 'cat_audio', title: 'Audio & Headphones', sub: 'Wireless earbuds, headphones, soundbars', count: '75 Products', img: icons3D.audio },
  { id: 'cat_tvs', title: 'Smart TVs & Home Cinema', sub: '4K OLED, QLED, Android TVs & Monitors', count: '52 Products', img: icons3D.tv },
  { id: 'cat_appliances', title: 'Home Appliances', sub: 'Refrigerators, ACs, Washing Machines', count: '88 Products', img: icons3D.appliance },
  { id: 'cat_accessories', title: 'Mobile & PC Accessories', sub: 'Fast Chargers, Cables, Powerbanks, Cases', count: '112 Products', img: icons3D.accessory },
  { id: 'cat_wearables', title: 'Smartwatches & Fitness', sub: 'Smartwatches, Fitness Bands & Trackers', count: '45 Products', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=250&q=80' }
];

const topDealsProducts = [
  { id: 'd1', discount: '-25%', title: 'iPhone 14 (128GB - Starlight)', brand: 'Apple', price: 59999, mrp: 79999, rating: 4.6, ratingStr: '★ 4.6', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80' },
  { id: 'd2', discount: '-30%', title: 'Dell Inspiron 15 i5 12th Gen', brand: 'Dell', price: 45990, mrp: 65590, rating: 4.5, ratingStr: '★ 4.5', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80' },
  { id: 'd3', discount: '-40%', title: 'boAt Rockerz 450 Wireless', brand: 'boAt', price: 1499, mrp: 2499, rating: 4.4, ratingStr: '★ 4.4', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
  { id: 'd4', discount: '-20%', title: 'Samsung 55" 4K Smart TV', brand: 'Samsung', price: 41999, mrp: 52999, rating: 4.7, ratingStr: '★ 4.7', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80' },
  { id: 'd5', discount: '-15%', title: 'Sony WH-1000XM5 ANC Headphones', brand: 'Sony', price: 24990, mrp: 29490, rating: 4.8, ratingStr: '★ 4.8', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
  { id: 'd6', discount: '-18%', title: 'Apple Watch Series 9 GPS', brand: 'Apple', price: 34990, mrp: 41900, rating: 4.7, ratingStr: '★ 4.7', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80' },
  { id: 'd7', discount: '-32%', title: 'Samsung Galaxy Tab S9 FE', brand: 'Samsung', price: 29999, mrp: 44999, rating: 4.5, ratingStr: '★ 4.5', img: icons3D.mobile },
  { id: 'd8', discount: '-22%', title: 'HP Pavilion 15 Ryzen 7', brand: 'HP', price: 58990, mrp: 74990, rating: 4.6, ratingStr: '★ 4.6', img: icons3D.laptop }
];

const bestsellersProducts = [
  { id: 'bs1', discount: '-12%', title: 'Samsung Galaxy S24 Ultra 5G', brand: 'Samsung', price: 129999, mrp: 147999, rating: 4.8, ratingStr: '★ 4.8', badge: '🔥 #1 Bestseller', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80' },
  { id: 'bs2', discount: '-28%', title: 'Apple MacBook Air M2 13.6"', brand: 'Apple', price: 89990, mrp: 124900, rating: 4.9, ratingStr: '★ 4.9', badge: '⚡ Trending', img: icons3D.laptop },
  { id: 'bs3', discount: '-18%', title: 'OnePlus 12 5G (256GB)', brand: 'OnePlus', price: 64999, mrp: 79999, rating: 4.5, ratingStr: '★ 4.5', badge: '🔥 Top Rated', img: icons3D.mobile },
  { id: 'bs4', discount: '-35%', title: 'Sony Bravia 65" 4K Google TV', brand: 'Sony', price: 74990, mrp: 114900, rating: 4.8, ratingStr: '★ 4.8', badge: '👑 Premium', img: icons3D.tv },
  { id: 'bs5', discount: '-30%', title: 'Apple AirPods Pro (2nd Gen)', brand: 'Apple', price: 18990, mrp: 26900, rating: 4.8, ratingStr: '★ 4.8', badge: '⚡ Customer Choice', img: icons3D.audio },
  { id: 'bs6', discount: '-25%', title: 'LG 9 Kg 5-Star Washer Dryer', brand: 'LG', price: 34990, mrp: 46990, rating: 4.6, ratingStr: '★ 4.6', badge: '🌟 Top Pick', img: icons3D.appliance }
];

const budgetStoreProducts = [
  { id: 'bg1', discount: '-50%', title: 'boAt Airdopes 141 TWS', brand: 'boAt', price: 999, mrp: 1999, rating: 4.1, ratingStr: '★ 4.1', img: icons3D.audio },
  { id: 'bg2', discount: '-60%', title: 'Noise ColorFit Pulse 2 Max', brand: 'Noise', price: 1499, mrp: 3999, rating: 4.3, ratingStr: '★ 4.3', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80' },
  { id: 'bg3', discount: '-45%', title: 'Realme 20000mAh Powerbank', brand: 'Realme', price: 1299, mrp: 2499, rating: 4.4, ratingStr: '★ 4.4', img: icons3D.accessory },
  { id: 'bg4', discount: '-40%', title: 'Portronics SoundDrum Speaker', brand: 'Portronics', price: 1699, mrp: 2999, rating: 4.2, ratingStr: '★ 4.2', img: icons3D.audio },
  { id: 'bg5', discount: '-35%', title: 'SanDisk 128GB Dual Drive', brand: 'SanDisk', price: 899, mrp: 1399, rating: 4.5, ratingStr: '★ 4.5', img: icons3D.accessory },
  { id: 'bg6', discount: '-30%', title: 'TP-Link AC1200 WiFi Router', brand: 'TP-Link', price: 1899, mrp: 2699, rating: 4.4, ratingStr: '★ 4.4', img: icons3D.accessory }
];

// ALL SEARCHABLE PRODUCTS (combined for search/filter)
const allProducts = [
  ...topDealsProducts,
  ...bestsellersProducts,
  ...budgetStoreProducts,
  { id: 'p7', discount: '-22%', title: 'HP Pavilion 14 Laptop', brand: 'HP', price: 52990, mrp: 67990, rating: 4.3, ratingStr: '★ 4.3', img: icons3D.laptop },
  { id: 'p8', discount: '-35%', title: 'Samsung Galaxy Buds FE', brand: 'Samsung', price: 4999, mrp: 7699, rating: 4.2, ratingStr: '★ 4.2', img: icons3D.audio },
  { id: 'p9', discount: '-10%', title: 'LG 43" 4K Smart TV', brand: 'LG', price: 29990, mrp: 33490, rating: 4.4, ratingStr: '★ 4.4', img: icons3D.tv }
];

const ALL_BRANDS = ['Apple', 'Samsung', 'Sony', 'Dell', 'boAt', 'OnePlus', 'HP', 'LG', 'Noise', 'Realme'];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

  // MULTI-STEP CHECKOUT MODAL & STEP STATES
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);

  // RAZORPAY GATEWAY MODAL & PROCESSING STATES
  const [razorpayModalVisible, setRazorpayModalVisible] = useState(false);
  const [isRazorpayProcessing, setIsRazorpayProcessing] = useState(false);
  const [razorpayTab, setRazorpayTab] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '4111 1111 1111 1111', expiry: '12/28', cvv: '123', name: 'Rahul Kumar' });

  // SAVED ADDRESSES STATE
  const [savedAddresses, setSavedAddresses] = useState([
    { id: 'addr_1', type: 'HOME', name: 'Rahul Kumar', phone: '+91 98765 43210', house: 'Parsauni Chowk', area: 'Near Central Bank', city: 'Sitamarhi', state: 'Bihar', pincode: '843316' },
    { id: 'addr_2', type: 'OFFICE', name: 'Rahul Kumar', phone: '+91 98765 43210', house: 'Plot 42', area: 'BKC Commercial Complex, Bandra East', city: 'Mumbai', state: 'Maharashtra', pincode: '400051' }
  ]);
  const [selectedAddrId, setSelectedAddrId] = useState('addr_1');

  // PAYMENT SELECTION STATES
  const [upiVpa, setUpiVpa] = useState('rahul.kumar@email.com');

  // MODAL STATES
  const [codOtpModalVisible, setCodOtpModalVisible] = useState(false);
  const [receiptModalVisible, setReceiptModalVisible] = useState(false);
  const [placedReceiptOrder, setPlacedReceiptOrder] = useState(null);

  // PDP States
  const [pdpModalVisible, setPdpModalVisible] = useState(false);
  const [selectedPdpProduct, setSelectedPdpProduct] = useState(null);

  // ========== PHASE 1: SEARCH & FILTER STATES ==========
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['iPhone 14', 'Samsung Galaxy', 'boAt headphones', 'Dell laptop', 'Sony TV']);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  // Filter states
  const [filterPriceMin, setFilterPriceMin] = useState(0);
  const [filterPriceMax, setFilterPriceMax] = useState(500000);
  const [filterBrands, setFilterBrands] = useState([]);
  const [filterMinRating, setFilterMinRating] = useState(0);
  const [filterInStockOnly, setFilterInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ========== PHASE 1: PROFILE SUB-SCREEN MODALS ==========
  const [personalInfoModalVisible, setPersonalInfoModalVisible] = useState(false);
  const [addressManagerModalVisible, setAddressManagerModalVisible] = useState(false);
  const [addAddressModalVisible, setAddAddressModalVisible] = useState(false);
  const [paymentMethodsModalVisible, setPaymentMethodsModalVisible] = useState(false);
  const [wishlistModalVisible, setWishlistModalVisible] = useState(false);
  const [recentlyViewedModalVisible, setRecentlyViewedModalVisible] = useState(false);
  const [coinsModalVisible, setCoinsModalVisible] = useState(false);
  const [helpCenterModalVisible, setHelpCenterModalVisible] = useState(false);
  const [contactUsModalVisible, setContactUsModalVisible] = useState(false);
  const [rateAppModalVisible, setRateAppModalVisible] = useState(false);
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);

  // Profile editable fields
  const [profileName, setProfileName] = useState('Rahul Kumar');
  const [profileEmail, setProfileEmail] = useState('rahul.kumar@email.com');
  const [profilePhone, setProfilePhone] = useState('+91 98765 43210');
  const [profileDob, setProfileDob] = useState('15/08/1998');
  const [profileGender, setProfileGender] = useState('Male');

  // New address form
  const [newAddr, setNewAddr] = useState({ type: 'HOME', name: '', phone: '', house: '', area: '', city: '', state: '', pincode: '' });

  // Wishlist
  const [wishlistItems, setWishlistItems] = useState([
    { id: 'w1', title: 'Apple AirPods Pro 2', price: 24900, img: icons3D.audio },
    { id: 'w2', title: 'Samsung Galaxy Watch 6', price: 28999, img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=250&q=80' },
    { id: 'w3', title: 'OnePlus 12 5G', price: 64999, img: icons3D.mobile },
  ]);

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState([
    { id: 'rv1', title: 'iPhone 14 (128GB)', price: 59999, img: topDealsProducts[0].img },
    { id: 'rv2', title: 'Dell Inspiron 15', price: 45990, img: topDealsProducts[1].img },
    { id: 'rv3', title: 'boAt Rockerz 450', price: 1499, img: topDealsProducts[2].img },
    { id: 'rv4', title: 'Sony WH-1000XM5', price: 24990, img: topDealsProducts[4].img },
  ]);

  // Coins
  const [coinsBalance] = useState(450);
  const [coinsHistory] = useState([
    { id: 'ch1', desc: 'Order #ORD-98412 Cashback', amount: '+50', date: '26 Jul 2026', type: 'credit' },
    { id: 'ch2', desc: 'Referral Bonus (Priya)', amount: '+200', date: '20 Jul 2026', type: 'credit' },
    { id: 'ch3', desc: 'Redeemed on Order #ORD-97201', amount: '-100', date: '15 Jul 2026', type: 'debit' },
    { id: 'ch4', desc: 'Sign-up Welcome Bonus', amount: '+300', date: '01 Jul 2026', type: 'credit' },
  ]);

  // Rating
  const [appRating, setAppRating] = useState(0);

  // Contact form
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Help center FAQ
  const [helpExpandedIdx, setHelpExpandedIdx] = useState(null);

  // Notifications
  const [notifications] = useState([
    { id: 'n1', title: 'Order Delivered! 📦', body: 'Your order #ORD-98412 has been delivered successfully.', time: '2 hours ago', read: false },
    { id: 'n2', title: 'Flash Sale Live! ⚡', body: 'Up to 60% OFF on Smartphones. Hurry, limited time!', time: '5 hours ago', read: false },
    { id: 'n3', title: 'Welcome Bonus! 🎁', body: 'You earned 300 ElectroMart Coins as welcome reward.', time: '1 day ago', read: true },
  ]);

  // Saved payment methods
  const [savedCards] = useState([
    { id: 'card1', type: 'VISA', last4: '4242', name: 'Rahul Kumar', expiry: '12/28' },
    { id: 'card2', type: 'Mastercard', last4: '8888', name: 'Rahul Kumar', expiry: '06/27' },
  ]);
  const [savedUpi] = useState([
    { id: 'upi1', vpa: 'rahul@oksbi', bank: 'SBI' },
    { id: 'upi2', vpa: 'rahul@okicici', bank: 'ICICI' },
  ]);

  const [cartItems, setCartItems] = useState([
    {
      _id: 'prod_1',
      title: 'Samsung Galaxy S24 Ultra 5G',
      brand: 'Samsung',
      price: 134999,
      offerPrice: 124999,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80'
    }
  ]);

  const [ordersList, setOrdersList] = useState([
    {
      id: 'ORD-98412',
      date: '26 July 2026',
      status: 'DELIVERED',
      statusColor: '#059669',
      stageIndex: 5,
      totalAmount: 124999,
      paymentMode: 'Razorpay (Key: rzp_test)',
      address: 'Parsauni Chowk, Near Central Bank, Sitamarhi, Bihar - 843316',
      items: [
        { title: 'Samsung Galaxy S24 Ultra 5G (512GB)', price: 124999, qty: 1, img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80' }
      ]
    }
  ]);

  const openProductPDP = (product) => {
    setSelectedPdpProduct(product);
    setPdpModalVisible(true);
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const exists = prev.find(r => r.title === (product.title || '').replace('\n', ' '));
      if (exists) return prev;
      return [{ id: `rv_${Date.now()}`, title: (product.title || '').replace('\n', ' '), price: product.price, img: product.img }, ...prev].slice(0, 10);
    });
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.title === product.title.replace('\n', ' '));
      if (existing) {
        return prev.map(item => item.title === product.title.replace('\n', ' ') ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, {
        _id: `prod_${Date.now()}_${Math.random()}`,
        title: product.title.replace('\n', ' '),
        brand: product.brand || 'ElectroMart',
        price: product.mrp || product.price,
        offerPrice: product.price,
        qty: 1,
        image: product.img
      }];
    });
    Alert.alert('Added to Bag 🛒', `${product.title.replace('\n', ' ')} has been added!`);
  };

  const removeCartItem = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(w => w.title === (product.title || '').replace('\n', ' '));
      if (exists) {
        return prev.filter(w => w.title !== (product.title || '').replace('\n', ' '));
      }
      return [...prev, { id: `w_${Date.now()}`, title: (product.title || '').replace('\n', ' '), price: product.price || product.offerPrice, img: product.img || product.image }];
    });
  };

  const isInWishlist = (title) => {
    return wishlistItems.some(w => w.title === (title || '').replace('\n', ' '));
  };

  // Cart Calculations
  const cartOfferTotal = cartItems.reduce((acc, item) => acc + (item.offerPrice * item.qty), 0);
  const deliveryFee = cartOfferTotal > 499 || cartItems.length === 0 ? 0 : 99;
  const finalPayable = Math.max(0, cartOfferTotal + deliveryFee);

  // DIRECT RAZORPAY GATEWAY TRIGGER
  const openDirectRazorpayModal = () => {
    if (cartItems.length === 0) {
      Alert.alert('Bag Empty 🛒', 'Please add products to your bag before paying!');
      return;
    }
    setRazorpayModalVisible(true);
  };

  const openMultiStepCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Bag Empty', 'Your shopping bag is empty!');
      return;
    }
    setCheckoutStep(1);
    setCheckoutModalVisible(true);
  };

  // ORDER PLACEMENT EXECUTION
  const triggerOrderPlacement = (paidMethodLabel) => {
    const targetAddrObj = savedAddresses.find(a => a.id === selectedAddrId) || savedAddresses[0];
    const fullAddrString = `${targetAddrObj.house}, ${targetAddrObj.area}, ${targetAddrObj.city}, ${targetAddrObj.state} - ${targetAddrObj.pincode}`;

    const newOrderObj = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'PROCESSING',
      statusColor: '#D97706',
      stageIndex: 1,
      totalAmount: finalPayable,
      paymentMode: paidMethodLabel,
      address: fullAddrString,
      items: cartItems.map(i => ({
        title: i.title,
        price: i.offerPrice,
        qty: i.qty,
        img: i.image
      }))
    };

    setOrdersList(prev => [newOrderObj, ...prev]);
    setPlacedReceiptOrder(newOrderObj);
    setCartItems([]);
    setCodOtpModalVisible(false);
    setRazorpayModalVisible(false);
    setCheckoutModalVisible(false);
    setReceiptModalVisible(true);
  };

  const executeRazorpayPayment = () => {
    if (razorpayTab === 'card' && (!cardDetails.number || cardDetails.number.length < 12)) {
      Alert.alert('Invalid Card Number', 'Please enter a valid 16-digit Test Card number.');
      return;
    }

    setIsRazorpayProcessing(true);
    setTimeout(() => {
      setIsRazorpayProcessing(false);
      Alert.alert(
        'Razorpay Payment Verified! 💳',
        `Payment ID: pay_rzp_${Date.now()}\nKey ID: ${RAZORPAY_KEY_ID}\nAmount Paid: ₹${finalPayable.toLocaleString('en-IN')}\nMerchant: ElectroMart Sitamarhi`,
        [
          {
            text: 'View Order Receipt 🧾',
            onPress: () => triggerOrderPlacement(`Razorpay Gateway (${razorpayTab.toUpperCase()} - Key: ${RAZORPAY_KEY_ID})`)
          }
        ]
      );
    }, 1200);
  };

  // ========== SEARCH & FILTER LOGIC ==========
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    setShowSearchSuggestions(text.length > 0);
  };

  const getSearchSuggestions = () => {
    if (!searchQuery.trim()) return [];
    return allProducts.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  };

  const executeSearch = (query) => {
    const q = query || searchQuery;
    if (!q.trim()) return;
    setShowSearchSuggestions(false);
    // Add to recent
    setRecentSearches(prev => {
      const updated = [q, ...prev.filter(s => s.toLowerCase() !== q.toLowerCase())].slice(0, 5);
      return updated;
    });
    // Apply filters
    applyFiltersAndSort(q);
    setSearchResultsVisible(true);
  };

  const applyFiltersAndSort = (query) => {
    let results = [...allProducts];
    // Text search
    if (query && query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(p =>
        p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    // Price range
    results = results.filter(p => p.price >= filterPriceMin && p.price <= filterPriceMax);
    // Brand filter
    if (filterBrands.length > 0) {
      results = results.filter(p => filterBrands.includes(p.brand));
    }
    // Rating filter
    if (filterMinRating > 0) {
      results = results.filter(p => p.rating >= filterMinRating);
    }
    // Sort
    switch (sortBy) {
      case 'price_low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        results.reverse();
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default: // popularity
        break;
    }
    setFilteredProducts(results);
  };

  const toggleBrandFilter = (brand) => {
    setFilterBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const clearAllFilters = () => {
    setFilterPriceMin(0);
    setFilterPriceMax(500000);
    setFilterBrands([]);
    setFilterMinRating(0);
    setFilterInStockOnly(false);
    setSortBy('popularity');
  };

  // Address management
  const addNewAddress = () => {
    if (!newAddr.name || !newAddr.phone || !newAddr.house || !newAddr.city || !newAddr.pincode) {
      Alert.alert('Missing Fields', 'Please fill all required fields');
      return;
    }
    const addr = { ...newAddr, id: `addr_${Date.now()}` };
    setSavedAddresses(prev => [...prev, addr]);
    setNewAddr({ type: 'HOME', name: '', phone: '', house: '', area: '', city: '', state: '', pincode: '' });
    setAddAddressModalVisible(false);
    Alert.alert('Address Added ✅', 'New address saved successfully!');
  };

  const deleteAddress = (id) => {
    Alert.alert('Delete Address', 'Are you sure you want to remove this address?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        setSavedAddresses(prev => prev.filter(a => a.id !== id));
        if (selectedAddrId === id && savedAddresses.length > 1) {
          setSelectedAddrId(savedAddresses.find(a => a.id !== id)?.id || '');
        }
      }}
    ]);
  };

  // ========== RENDER HELPER: MODAL HEADER ==========
  const renderModalHeader = (title, onClose) => (
    <View style={s.modalHeader}>
      <TouchableOpacity onPress={onClose} style={s.modalBackBtn}>
        <Text style={{ fontSize: 18, color: '#0F172A', fontWeight: 'bold' }}>←</Text>
      </TouchableOpacity>
      <Text style={s.modalHeaderTitle}>{title}</Text>
      <View style={{ width: 36 }} />
    </View>
  );

  return (
    <SafeAreaView style={[s.container, { backgroundColor: isDarkMode ? '#0F172A' : '#FAFAFA' }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      {/* TOP LOGO & BRAND HEADER ROW */}
      <View style={[s.topHeaderRow, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF', borderBottomWidth: isDarkMode ? 1 : 0, borderBottomColor: '#334155' }]}>
        <View style={s.topHeaderLeft}>
          <TouchableOpacity onPress={() => setDrawerVisible(true)}>
            <Text style={{ fontSize: 22, color: isDarkMode ? '#F8FAFC' : '#1E293B', marginRight: 10 }}>☰</Text>
          </TouchableOpacity>
          <View style={s.brandLogoBox}>
            <Image source={{ uri: APP_LOGO_URL }} style={s.brandLogoImage} />
            <View>
              <Text style={[s.brandTitleText, { color: isDarkMode ? '#F8FAFC' : '#0F172A' }]}>ElectroMart</Text>
              <Text style={[s.brandTaglineText, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>Smart Technology, Better Life</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {/* DARK / LIGHT MODE TOGGLE BUTTON */}
          <TouchableOpacity style={s.themeToggleHeaderBtn} onPress={() => setIsDarkMode(prev => !prev)}>
            <Text style={{ fontSize: 18 }}>{isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.iconWithBadgeBtn} onPress={() => setNotificationsModalVisible(true)}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
            <View style={s.redBadgeNotif}>
              <Text style={s.badgeText}>{notifications.filter(n => !n.read).length}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={s.iconWithBadgeBtn} onPress={() => setActiveTab('cart')}>
            <Text style={{ fontSize: 20 }}>🛒</Text>
            {cartItems.length > 0 && (
              <View style={s.blueBadgeCart}>
                <Text style={s.badgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH BAR WITH FILTER & SORT */}
      <View style={[s.searchBarContainer, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' }]}>
        <View style={[s.searchBarBox, { backgroundColor: isDarkMode ? '#0F172A' : '#F1F5F9', borderWidth: isDarkMode ? 1 : 0, borderColor: '#334155' }]}>
          <Text style={{ fontSize: 16, marginRight: 8, color: '#64748B' }}>🔍</Text>
          <TextInput
            style={[s.searchInputText, { color: isDarkMode ? '#F8FAFC' : '#0F172A' }]}
            placeholder="Search for products, brands and more..."
            placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
            value={searchQuery}
            onChangeText={handleSearchChange}
            onSubmitEditing={() => executeSearch()}
            onFocus={() => setShowSearchSuggestions(searchQuery.length > 0)}
          />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={{ marginRight: 8 }}>
            <Text style={{ fontSize: 16, color: '#2563EB' }}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortModalVisible(true)}>
            <Text style={{ fontSize: 16, color: isDarkMode ? '#94A3B8' : '#64748B' }}>⇅</Text>
          </TouchableOpacity>
        </View>

        {/* SEARCH SUGGESTIONS DROPDOWN */}
        {showSearchSuggestions && (
          <View style={[s.searchDropdown, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF', borderColor: isDarkMode ? '#334155' : '#E2E8F0' }]}>
            {searchQuery.length > 0 && getSearchSuggestions().length > 0 && (
              <>
                <Text style={s.dropdownSectionLabel}>Suggestions</Text>
                {getSearchSuggestions().map((item) => (
                  <TouchableOpacity key={item.id} style={s.suggestionRow} onPress={() => { setSearchQuery(item.title); executeSearch(item.title); }}>
                    <Text style={{ fontSize: 12, color: '#64748B', marginRight: 8 }}>🔍</Text>
                    <Text style={[s.suggestionText, { color: isDarkMode ? '#F8FAFC' : '#0F172A' }]} numberOfLines={1}>{item.title}</Text>
                    <Text style={s.suggestionPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
            {recentSearches.length > 0 && (
              <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <Text style={s.dropdownSectionLabel}>Recent Searches</Text>
                  <TouchableOpacity onPress={() => setRecentSearches([])}>
                    <Text style={{ fontSize: 9, color: '#EF4444', fontWeight: 'bold' }}>Clear All</Text>
                  </TouchableOpacity>
                </View>
                {recentSearches.map((rs, idx) => (
                  <TouchableOpacity key={idx} style={s.suggestionRow} onPress={() => { setSearchQuery(rs); executeSearch(rs); }}>
                    <Text style={{ fontSize: 12, color: '#94A3B8', marginRight: 8 }}>🕐</Text>
                    <Text style={[s.suggestionText, { color: isDarkMode ? '#F8FAFC' : '#0F172A' }]}>{rs}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        )}
      </View>

      {/* DELIVER TO LOCATION BAR WITH CHANGE BUTTON */}
      <View style={[s.locationBarRow, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF', borderBottomColor: isDarkMode ? '#334155' : '#F1F5F9' }]}>
        <Text style={{ fontSize: 16, color: '#2563EB', marginRight: 6 }}>📍</Text>
        <Text style={[s.deliverToLabel, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
          Deliver to: <Text style={[s.deliverToAddress, { color: isDarkMode ? '#F8FAFC' : '#0F172A' }]}>Parsauni Chowk, Sitamarhi, Bihar  843316 ⌵</Text>
        </Text>
        <TouchableOpacity style={s.changeLocBtn} onPress={() => setAddressManagerModalVisible(true)}>
          <Text style={s.changeLocBtnText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* MAIN SCREEN BODY */}
      <ScrollView style={s.scrollArea} showsVerticalScrollIndicator={false} onScrollBeginDrag={() => setShowSearchSuggestions(false)}>

        {/* ===== SEARCH RESULTS VIEW ===== */}
        {searchResultsVisible && activeTab === 'home' && (
          <View style={{ paddingTop: 4, gap: 10, marginBottom: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={s.pageTitleHeader}>Search Results ({filteredProducts.length})</Text>
              <TouchableOpacity onPress={() => { setSearchResultsVisible(false); setSearchQuery(''); }}>
                <Text style={{ fontSize: 12, color: '#EF4444', fontWeight: 'bold' }}>✕ Clear</Text>
              </TouchableOpacity>
            </View>
            {/* Active filters strip */}
            {(filterBrands.length > 0 || filterMinRating > 0 || filterPriceMax < 500000) && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
                {filterBrands.map(b => (
                  <View key={b} style={s.activeFilterPill}>
                    <Text style={s.activeFilterText}>{b}</Text>
                    <TouchableOpacity onPress={() => { toggleBrandFilter(b); applyFiltersAndSort(searchQuery); }}>
                      <Text style={{ color: '#2563EB', fontWeight: 'bold', marginLeft: 4 }}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                {filterMinRating > 0 && (
                  <View style={s.activeFilterPill}>
                    <Text style={s.activeFilterText}>{filterMinRating}★ & above</Text>
                  </View>
                )}
                {filterPriceMax < 500000 && (
                  <View style={s.activeFilterPill}>
                    <Text style={s.activeFilterText}>Under ₹{filterPriceMax.toLocaleString('en-IN')}</Text>
                  </View>
                )}
              </ScrollView>
            )}

            {filteredProducts.length === 0 ? (
              <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                <Text style={{ fontSize: 40, marginBottom: 10 }}>🔍</Text>
                <Text style={{ fontSize: 14, fontWeight: '900', color: '#0F172A' }}>No results found</Text>
                <Text style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Try adjusting your search or filters</Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {filteredProducts.map(p => (
                  <TouchableOpacity key={p.id} style={s.searchResultCard} onPress={() => openProductPDP(p)}>
                    <TouchableOpacity style={s.wishlistHeartBtn} onPress={() => toggleWishlist(p)}>
                      <Text style={{ fontSize: 16 }}>{isInWishlist(p.title) ? '❤️' : '🤍'}</Text>
                    </TouchableOpacity>
                    <Image source={{ uri: p.img }} style={s.searchResultImg} />
                    <Text style={s.searchResultTitle} numberOfLines={2}>{p.title}</Text>
                    <Text style={s.searchResultBrand}>{p.brand}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      <Text style={s.searchResultPrice}>₹{p.price.toLocaleString('en-IN')}</Text>
                      <Text style={s.searchResultMrp}>₹{p.mrp.toLocaleString('en-IN')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                      <View style={s.ratingPillSmall}>
                        <Text style={s.ratingPillText}>{p.ratingStr}</Text>
                      </View>
                      <TouchableOpacity style={s.addToCartMiniBtn} onPress={() => addToCart(p)}>
                        <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>🛒 Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        {/* ==================== 1. HOMEPAGE TAB ==================== */}
        {activeTab === 'home' && !searchResultsVisible && (
          <View style={{ paddingTop: 4, gap: 14 }}>
            
            {/* HERO SALE BANNER CARD - SAME TO SAME LUXURY 3D PODIUM DESIGN */}
            <View style={[s.homeNavyHeroBannerCard, !isDarkMode && s.homeHeroBannerCardLight]}>
              {/* Top Left Tag Badge */}
              <View style={[s.bigSaleBadgePill, !isDarkMode && s.bigSaleBadgePillLight]}>
                <Text style={[s.bigSaleBadgeText, !isDarkMode && { color: '#92400E' }]}>⚡ BIG SALE</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                {/* Left Text & CTA */}
                <View style={{ flex: 1, paddingRight: 6 }}>
                  <Text style={[s.homeHeroTitle, !isDarkMode && { color: '#0F172A' }]}>
                    Upgrade Your{'\n'}
                    <Text style={{ color: isDarkMode ? '#00D2FE' : '#2563EB', fontWeight: '900' }}>Digital </Text>
                    <Text style={{ color: isDarkMode ? '#A855F7' : '#7C3AED', fontWeight: '900' }}>Experience</Text>
                  </Text>
                  <Text style={[s.homeHeroSub, !isDarkMode && { color: '#475569' }]}>
                    Best Deals on Mobiles,{'\n'}Laptops, Audio, Smart TVs & More.
                  </Text>

                  <TouchableOpacity style={[s.homeShopNowBtn, !isDarkMode && s.homeShopNowBtnLight]} onPress={() => setActiveTab('categories')}>
                    <Text style={[s.homeShopNowBtnText, !isDarkMode && { color: '#FFFFFF' }]}>Shop Now</Text>
                    <View style={[s.blueCircleArrow, !isDarkMode && { backgroundColor: '#FFFFFF' }]}>
                      <Text style={{ color: !isDarkMode ? '#2563EB' : '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>➔</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Right Side: 3D Oval Podium + 4 Gadgets Showcase + Yellow 60% OFF Badge */}
                <View style={{ position: 'relative', width: 145, height: 135, justifyContent: 'center', alignItems: 'center' }}>
                  {/* 3D Oval Pedestal Base at Bottom */}
                  <View style={[s.podiumBaseOval, !isDarkMode && { backgroundColor: '#DBEAFE', borderColor: '#93C5FD' }]}>
                    <View style={s.podiumGlowRing} />
                  </View>

                  {/* Gadget 1: Gaming Laptop in Background */}
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80' }}
                    style={{ width: 110, height: 75, resizeMode: 'contain', position: 'absolute', top: 4, zIndex: 1 }}
                  />

                  {/* Gadget 2: iPhone 14 Pro on Front-Left */}
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=200&q=80' }}
                    style={{ width: 42, height: 62, resizeMode: 'contain', position: 'absolute', bottom: 18, left: 2, zIndex: 3 }}
                  />

                  {/* Gadget 3: Wireless Headphones on Front-Right */}
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80' }}
                    style={{ width: 48, height: 48, resizeMode: 'contain', position: 'absolute', bottom: 20, right: 2, zIndex: 3 }}
                  />

                  {/* Gadget 4: Smartwatch in Center-Front */}
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=200&q=80' }}
                    style={{ width: 30, height: 30, resizeMode: 'contain', position: 'absolute', bottom: 12, left: 48, zIndex: 4 }}
                  />

                  {/* Yellow 60% OFF Circular Badge Top Right */}
                  <View style={s.yellow60CircleBadge}>
                    <Text style={s.yellow60BadgeText}>UP TO{'\n'}<Text style={{ fontSize: 13, fontWeight: '900' }}>60%</Text>{'\n'}OFF</Text>
                  </View>
                </View>
              </View>

              {/* Bottom Pagination Dots */}
              <View style={s.carouselDotsRow}>
                <View style={[s.cDot, s.cDotActive]} />
                <View style={[s.cDot, !isDarkMode && { backgroundColor: '#CBD5E1' }]} />
                <View style={[s.cDot, !isDarkMode && { backgroundColor: '#CBD5E1' }]} />
              </View>
            </View>

            {/* 7-CIRCLE CATEGORY STRIP BAR (EXACT MATCH TO SCREENSHOT) */}
            <View style={[s.sevenCircleBarCard, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF', borderColor: isDarkMode ? '#334155' : '#E2E8F0' }]}>
              {[
                { name: 'Mobiles', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=150&q=80', bg: '#E0F2FE' },
                { name: 'Laptops', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=150&q=80', bg: '#F3E8FF' },
                { name: 'Audio', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80', bg: '#E0F2FE' },
                { name: 'TVs', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=150&q=80', bg: '#E0F2FE' },
                { name: 'Wearables', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=150&q=80', bg: '#FCE7F3' },
                { name: 'Accessories', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=150&q=80', bg: '#F3E8FF' },
                { name: 'View All', icon: '⊞', bg: '#F1F5F9', action: () => setActiveTab('categories') }
              ].map((cat, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={s.sevenCircleItem}
                  onPress={() => {
                    if (cat.action) {
                      cat.action();
                    } else {
                      setSearchQuery(cat.name);
                      executeSearch(cat.name);
                    }
                  }}
                >
                  <View style={[s.sevenCircleIconBox, { backgroundColor: cat.bg }]}>
                    {cat.img ? (
                      <Image source={{ uri: cat.img }} style={s.sevenCircleImg} />
                    ) : (
                      <Text style={{ fontSize: 18, color: '#475569', fontWeight: 'bold' }}>{cat.icon}</Text>
                    )}
                  </View>
                  <Text style={[s.sevenCircleLabel, { color: isDarkMode ? '#F8FAFC' : '#0F172A' }]} numberOfLines={1}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* SHOP BY CATEGORY (ENHANCED 8 CATEGORY GRID WITH OFFER BADGES) */}
            <View style={s.accSectionCard}>
              <View style={s.accSectionHeaderRow}>
                <View>
                  <Text style={s.accSectionHeading}>Shop by Category 📂</Text>
                  <Text style={{ fontSize: 9, color: '#64748B', marginTop: 1 }}>Top electronics curated for you</Text>
                </View>
                <TouchableOpacity onPress={() => setActiveTab('categories')}>
                  <Text style={s.accViewAllBlueLink}>View All (7) ›</Text>
                </TouchableOpacity>
              </View>

              <View style={s.eightCategoryGridRow}>
                {homepageCategoryGrid.map((item) => (
                  <TouchableOpacity key={item.id} style={s.enhancedCatCard} onPress={() => { setSearchQuery(item.label.replace('\n', ' ')); executeSearch(item.label.replace('\n', ' ')); }}>
                    <View style={[s.enhancedCatImgBox, { backgroundColor: item.bg }]}>
                      <Image source={{ uri: item.img }} style={s.enhancedCatImg} />
                      <View style={[s.catOfferPillBadge, { backgroundColor: item.offerBg }]}>
                        <Text style={s.catOfferPillText}>{item.offerTag}</Text>
                      </View>
                    </View>
                    <Text style={s.enhancedCatLabel} numberOfLines={1}>{item.label}</Text>
                    <Text style={s.enhancedCatCount}>{item.count}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* HORIZONTAL TRUST & BENEFITS BAR */}
            <View style={s.trustStripFourBox}>
              {[
                { icon: '🚚', color: '#2563EB', title: 'Free Delivery', sub: 'On Orders Above ₹499' },
                { icon: '🛡️', color: '#059669', title: '1 Year Warranty', sub: 'Brand Warranty Assured' },
                { icon: '🏷️', color: '#7C3AED', title: 'Best Price Guarantee', sub: 'Get the Best Deals' },
                { icon: '🎧', color: '#EF4444', title: '24x7 Support', sub: 'We are Here to Help You' }
              ].map((t, idx) => (
                <View key={idx} style={s.trustStripCol}>
                  <Text style={{ fontSize: 18, color: t.color, marginRight: 6 }}>{t.icon}</Text>
                  <View>
                    <Text style={s.trustStripTitle}>{t.title}</Text>
                    <Text style={s.trustStripSub}>{t.sub}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* 3 FINANCIAL PROMO CARDS */}
            <View style={s.threePromoRow}>
              <View style={[s.promoCardBox, { backgroundColor: '#EFF6FF' }]}>
                <Text style={{ fontSize: 11, fontWeight: '900', color: '#1E40AF' }}>No Cost EMI</Text>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1E3A8A' }}>Up to 12 Months</Text>
                <Text style={{ fontSize: 7, color: '#3B82F6', marginTop: 2, marginBottom: 8 }}>Easy EMI Options on Credit Cards</Text>
                <TouchableOpacity style={s.promoShopPillBtn} onPress={() => Alert.alert('No Cost EMI', '0% EMI options available on all major banks')}>
                  <Text style={s.promoShopPillText}>Shop Now ›</Text>
                </TouchableOpacity>
              </View>

              <View style={[s.promoCardBox, { backgroundColor: '#F0F9FF' }]}>
                <Text style={{ fontSize: 11, fontWeight: '900', color: '#0369A1' }}>Exchange Offer</Text>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#0C4A6E' }}>Up to ₹15,000 Off</Text>
                <Text style={{ fontSize: 7, color: '#0284C7', marginTop: 2, marginBottom: 8 }}>Exchange your old device for a new one</Text>
                <TouchableOpacity style={s.promoShopPillBtn} onPress={() => Alert.alert('Exchange Offer', 'Get instant discount by exchanging old phone/laptop')}>
                  <Text style={s.promoShopPillText}>Exchange Now ›</Text>
                </TouchableOpacity>
              </View>

              <View style={[s.promoCardBox, { backgroundColor: '#EEF2FF' }]}>
                <Text style={{ fontSize: 11, fontWeight: '900', color: '#3730A3' }}>Bank Offers</Text>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1E1B4B' }}>Up to 10% Instant</Text>
                <Text style={{ fontSize: 7, color: '#4F46E5', marginTop: 2, marginBottom: 8 }}>On Select Credit & Debit Cards</Text>
                <TouchableOpacity style={s.promoShopPillBtn} onPress={() => Alert.alert('Bank Offers', '10% Instant Discount on HDFC, ICICI, SBI Cards')}>
                  <Text style={s.promoShopPillText}>View Offers ›</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* TOP DEALS OF THE DAY */}
            <View style={s.accSectionCard}>
              <View style={s.accSectionHeaderRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={s.accSectionHeading}>Top Deals of the Day</Text>
                  <View style={s.pinkTimerPill}>
                    <Text style={s.pinkTimerText}>⏱️ 12 : 45 : 30</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setActiveTab('categories')}>
                  <Text style={s.accViewAllBlueLink}>View All ›</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingVertical: 4 }}>
                {topDealsProducts.map((p) => (
                  <TouchableOpacity key={p.id} style={s.topDealProductCard} onPress={() => openProductPDP(p)}>
                    <View style={s.redDiscountBadge}>
                      <Text style={s.redDiscountText}>{p.discount}</Text>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', top: 6, right: 6, zIndex: 2 }} onPress={() => toggleWishlist(p)}>
                      <Text style={{ fontSize: 14 }}>{isInWishlist(p.title) ? '❤️' : '🤍'}</Text>
                    </TouchableOpacity>
                    <Image source={{ uri: p.img }} style={s.topDealImg} />
                    <Text style={s.topDealTitle} numberOfLines={2}>{p.title}</Text>
                    <Text style={s.topDealPrice}>₹{p.price.toLocaleString('en-IN')}</Text>
                    <Text style={s.topDealMrp}>₹{p.mrp.toLocaleString('en-IN')}</Text>

                    <TouchableOpacity style={s.blueCartSmallBtn} onPress={() => addToCart(p)}>
                      <Text style={{ color: '#FFFFFF', fontSize: 12 }}>🛒</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* 🔥 TRENDING BESTSELLERS (2-COLUMN GRID SECTION) */}
            <View style={s.accSectionCard}>
              <View style={s.accSectionHeaderRow}>
                <View>
                  <Text style={s.accSectionHeading}>🔥 Trending Bestsellers</Text>
                  <Text style={{ fontSize: 9, color: '#64748B', marginTop: 1 }}>Most loved products by our customers</Text>
                </View>
                <TouchableOpacity onPress={() => setActiveTab('categories')}>
                  <Text style={s.accViewAllBlueLink}>View All ›</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 6 }}>
                {bestsellersProducts.map((p) => (
                  <TouchableOpacity key={p.id} style={s.bestsellerCard} onPress={() => openProductPDP(p)}>
                    <View style={s.bestsellerTopBadgePill}>
                      <Text style={s.bestsellerTopBadgeText}>{p.badge}</Text>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', top: 6, right: 6, zIndex: 2 }} onPress={() => toggleWishlist(p)}>
                      <Text style={{ fontSize: 14 }}>{isInWishlist(p.title) ? '❤️' : '🤍'}</Text>
                    </TouchableOpacity>
                    <Image source={{ uri: p.img }} style={s.bestsellerImg} />
                    <Text style={s.bestsellerTitle} numberOfLines={2}>{p.title}</Text>
                    <Text style={s.bestsellerBrand}>{p.brand}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                      <Text style={s.bestsellerPrice}>₹{p.price.toLocaleString('en-IN')}</Text>
                      <Text style={s.bestsellerMrp}>₹{p.mrp.toLocaleString('en-IN')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                      <View style={s.ratingPillSmall}>
                        <Text style={s.ratingPillText}>{p.ratingStr}</Text>
                      </View>
                      <TouchableOpacity style={s.addToCartMiniBtn} onPress={() => addToCart(p)}>
                        <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>🛒 Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* ⚡ BUDGET STORE (DEALS UNDER ₹4,999 - HORIZONTAL SCROLL) */}
            <View style={s.accSectionCard}>
              <View style={s.accSectionHeaderRow}>
                <View>
                  <Text style={s.accSectionHeading}>⚡ Budget Store (Deals Under ₹4,999)</Text>
                  <Text style={{ fontSize: 9, color: '#059669', fontWeight: 'bold', marginTop: 1 }}>High quality tech at pocket-friendly prices</Text>
                </View>
                <TouchableOpacity onPress={() => setActiveTab('categories')}>
                  <Text style={s.accViewAllBlueLink}>View All ›</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingVertical: 4 }}>
                {budgetStoreProducts.map((p) => (
                  <TouchableOpacity key={p.id} style={s.budgetStoreCard} onPress={() => openProductPDP(p)}>
                    <View style={s.greenDiscountBadge}>
                      <Text style={s.greenDiscountText}>{p.discount}</Text>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', top: 6, right: 6, zIndex: 2 }} onPress={() => toggleWishlist(p)}>
                      <Text style={{ fontSize: 14 }}>{isInWishlist(p.title) ? '❤️' : '🤍'}</Text>
                    </TouchableOpacity>
                    <Image source={{ uri: p.img }} style={s.budgetStoreImg} />
                    <Text style={s.budgetStoreTitle} numberOfLines={2}>{p.title}</Text>
                    <Text style={s.budgetStorePrice}>₹{p.price.toLocaleString('en-IN')}</Text>
                    <Text style={s.budgetStoreMrp}>₹{p.mrp.toLocaleString('en-IN')}</Text>
                    <TouchableOpacity style={s.blueCartSmallBtn} onPress={() => addToCart(p)}>
                      <Text style={{ color: '#FFFFFF', fontSize: 12 }}>🛒</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* LONG BLUE NO COST EMI BANNER */}
            <View style={s.noCostEmiLongBanner}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={s.yellowPercentTag}>
                  <Text style={{ fontSize: 18 }}>🏷️</Text>
                </View>
                <View style={{ paddingLeft: 10 }}>
                  <Text style={s.noCostEmiTitle}>No Cost EMI</Text>
                  <Text style={s.noCostEmiSub}>Up to 12 Months on Credit Cards</Text>
                </View>
              </View>
              <TouchableOpacity style={s.exploreOffersWhiteBtn} onPress={() => Alert.alert('No Cost EMI', 'Explore 0% interest EMI options')}>
                <Text style={s.exploreOffersBtnText}>Explore Offers ›</Text>
              </TouchableOpacity>
            </View>

            {/* WHY CHOOSE ELECTROMART? */}
            <View style={s.accSectionCard}>
              <Text style={s.accSectionHeading}>Why Choose ElectroMart?</Text>
              <View style={s.whyChooseGrid6}>
                {[
                  { icon: '📦', title: '100% Original Products', sub: 'Sourced directly from brands & authorized sellers' },
                  { icon: '🏷️', title: 'Best Price Guarantee', sub: 'We ensure you get the best prices always' },
                  { icon: '💳', title: 'Secure Payments', sub: 'Multiple secure payment options available' },
                  { icon: '🚚', title: 'Fast Delivery', sub: 'Quick & reliable delivery at your doorstep' },
                  { icon: '🔄', title: 'Easy Returns', sub: 'Hassle-free returns within 7 days of delivery' },
                  { icon: '🎧', title: '24x7 Customer Support', sub: 'We are here to help you anytime, anywhere' }
                ].map((w, idx) => (
                  <View key={idx} style={s.whyChooseColItem}>
                    <Text style={{ fontSize: 20, marginBottom: 4 }}>{w.icon}</Text>
                    <Text style={s.whyChooseTitleText}>{w.title}</Text>
                    <Text style={s.whyChooseSubText}>{w.sub}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* CUSTOMER TESTIMONIALS */}
            <View style={s.accSectionCard}>
              <View style={s.accSectionHeaderRow}>
                <Text style={s.accSectionHeading}>What Our Customers Say</Text>
                <TouchableOpacity onPress={() => Alert.alert('Customer Reviews', 'Viewing 1,240 verified reviews')}>
                  <Text style={s.accViewAllBlueLink}>View All Reviews ›</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                {[
                  { name: 'Rahul Sharma', review: 'ElectroMart has the best collection of products with unbeatable prices. Delivery was super fast and packaging was premium.' },
                  { name: 'Priya Verma', review: 'Amazing shopping experience! The product quality is top-notch and customer support is very responsive.' },
                  { name: 'Vikram Singh', review: 'I got the best deal on my laptop. Highly recommended ElectroMart for all tech lovers!' }
                ].map((t, idx) => (
                  <View key={idx} style={s.testimonialCardBox}>
                    <Text style={{ color: '#2563EB', fontSize: 16, fontWeight: 'bold' }}>"</Text>
                    <Text style={{ color: '#D97706', fontSize: 11, marginVertical: 2 }}>★★★★★</Text>
                    <Text style={s.testimonialReviewText}>{t.review}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                      <View style={s.reviewerAvatarCircle}>
                        <Text style={{ fontSize: 10, color: '#2563EB', fontWeight: 'bold' }}>👤</Text>
                      </View>
                      <View style={{ marginLeft: 6 }}>
                        <Text style={s.reviewerNameText}>{t.name}</Text>
                        <Text style={{ fontSize: 8, color: '#059669', fontWeight: 'bold' }}>Verified Buyer ✓</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* TOP BRANDS */}
            <View style={s.accSectionCard}>
              <Text style={s.accSectionHeading}>Top Brands You Can Trust</Text>
              <View style={s.topBrandsRowGrid}>
                {['🍏 Apple', 'SAMSUNG', 'DELL', 'hp', 'SONY', 'LG', 'boAt', 'ONEPLUS'].map((b) => (
                  <TouchableOpacity key={b} style={s.brandBoxLogoCard} onPress={() => { setSearchQuery(b.replace('🍏 ', '')); executeSearch(b.replace('🍏 ', '')); }}>
                    <Text style={s.brandTextLogo}>{b}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* FAQ */}
            <View style={s.accSectionCard}>
              <Text style={s.accSectionHeading}>Frequently Asked Questions</Text>
              {[
                { q: 'How can I place an order?', a: 'Browse products, add to bag, and click Pay Immediately via Razorpay or Checkout.' },
                { q: 'What is your return policy?', a: 'We offer 7-day hassle-free returns on all products with free doorstep pickup.' },
                { q: 'What payment methods are available?', a: 'Razorpay (Cards, UPI, Netbanking), COD with OTP, and 0% No Cost EMI.' },
                { q: 'How long does delivery take?', a: 'Standard delivery takes 2-4 business days. Express delivery in Sitamarhi takes 24 hours.' }
              ].map((faq, idx) => (
                <TouchableOpacity key={idx} style={s.faqAccordionRow} onPress={() => setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx)}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={s.faqQuestionText}>{faq.q}</Text>
                    <Text style={{ fontSize: 16, color: '#64748B', fontWeight: 'bold' }}>{expandedFaqIndex === idx ? '−' : '+'}</Text>
                  </View>
                  {expandedFaqIndex === idx && (
                    <Text style={s.faqAnswerText}>{faq.a}</Text>
                  )}
                </TouchableOpacity>
              ))}

              <View style={s.stillQuestionsCard}>
                <Text style={{ fontSize: 24, marginRight: 10 }}>🎧</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.stillQuestionsTitle}>Still Have Questions?</Text>
                  <Text style={s.stillQuestionsSub}>Our support team is here to help you 24x7</Text>
                </View>
                <TouchableOpacity style={s.contactSupportPillBtn} onPress={() => setContactUsModalVisible(true)}>
                  <Text style={s.contactSupportBtnText}>Contact Support ›</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        )}

        {/* 2. CATEGORY TAB UI */}
        {activeTab === 'categories' && (
          <View style={{ paddingTop: 4, gap: 14 }}>
            <View>
              <Text style={s.catPageMainTitle}>All Categories</Text>
              <Text style={s.catPageSubTitle}>Explore our wide range of products</Text>
            </View>

            <View style={s.catPurpleBannerCard}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={s.catBannerTitle}>Special Offers on{'\n'}Smart Electronics!</Text>
                <Text style={s.catBannerSub}>Up to 60% OFF on Bestsellers</Text>
                <TouchableOpacity style={s.catBannerShopBtn} onPress={() => Alert.alert('Smart Electronics', '60% OFF Bestsellers sale active!')}>
                  <Text style={s.catBannerShopBtnText}>Shop Now  ›</Text>
                </TouchableOpacity>
              </View>
              <View style={{ position: 'relative', alignItems: 'center' }}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=350&q=80' }} style={s.catBannerImg} />
                <View style={s.purple60Badge}>
                  <Text style={s.purple60BadgeText}>UP TO{'\n'}<Text style={{ fontSize: 13, fontWeight: '900' }}>60%</Text>{'\n'}OFF</Text>
                </View>
              </View>
            </View>

            <View style={s.topCirclesGridRow}>
              {topCircleCategories.map((c) => (
                <TouchableOpacity key={c.id} style={s.circleCatItem} onPress={() => { setSearchQuery(c.label.replace('\n', ' ')); executeSearch(c.label.replace('\n', ' ')); }}>
                  <View style={[s.circleIconBox, { backgroundColor: c.bg }]}>
                    {c.isViewAll ? (
                      <Text style={{ fontSize: 24, color: '#2563EB' }}>🔲</Text>
                    ) : (
                      <Image source={{ uri: c.img }} style={s.circleCatImg} />
                    )}
                  </View>
                  <Text style={s.circleCatLabel}>{c.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={s.accSectionCard}>
              <View style={s.accSectionHeaderRow}>
                <Text style={s.accSectionHeading}>Shop by Category</Text>
                <TouchableOpacity onPress={() => Alert.alert('All Categories', 'Viewing full catalog')}>
                  <Text style={s.accViewAllBlueLink}>View All ›</Text>
                </TouchableOpacity>
              </View>

              {categoryDetailedList.map((cat) => (
                <TouchableOpacity key={cat.id} style={s.catDetailedRowItem} onPress={() => { setSearchQuery(cat.title); executeSearch(cat.title); setActiveTab('home'); }}>
                  <View style={s.catSquareIconBox}>
                    <Image source={{ uri: cat.img }} style={s.catSquareImg} />
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 12 }}>
                    <Text style={s.catRowTitleText}>{cat.title}</Text>
                    <Text style={s.catRowSubText}>{cat.sub}</Text>
                  </View>
                  <View style={s.countBadgePill}>
                    <Text style={s.countBadgePillText}>{cat.count}</Text>
                  </View>
                  <Text style={{ fontSize: 16, color: '#94A3B8', marginLeft: 6 }}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* 3. CART TAB */}
        {activeTab === 'cart' && (
          <View style={{ paddingTop: 4 }}>
            <Text style={s.pageTitleHeader}>My Shopping Bag 🛒 ({cartItems.length})</Text>

            {cartItems.length === 0 ? (
              <View style={s.emptyCartBox}>
                <Text style={{ fontSize: 50, marginBottom: 10 }}>🛒</Text>
                <Text style={s.emptyCartTitle}>Your Bag is Empty</Text>
                <TouchableOpacity style={s.startShoppingBtn} onPress={() => setActiveTab('home')}>
                  <Text style={s.startShoppingBtnText}>Start Shopping ›</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {cartItems.map((item) => (
                  <View key={item._id} style={s.cartItemCard}>
                    <Image source={{ uri: item.image }} style={s.cartItemImg} />
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                      <Text style={s.cartItemTitle}>{item.title}</Text>
                      <Text style={s.cartOfferPrice}>₹{(item.offerPrice * item.qty).toLocaleString('en-IN')}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 }}>
                        <TouchableOpacity style={s.qtyBtn} onPress={() => setCartItems(prev => prev.map(i => i._id === item._id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))}>
                          <Text style={s.qtyBtnText}>−</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12, fontWeight: '900', color: '#0F172A' }}>{item.qty}</Text>
                        <TouchableOpacity style={s.qtyBtn} onPress={() => setCartItems(prev => prev.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i))}>
                          <Text style={s.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => removeCartItem(item._id)}>
                      <Text style={{ fontSize: 16, color: '#EF4444' }}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={s.billSummaryCard}>
                  <Text style={s.billTitle}>Price Breakdown</Text>
                  <View style={[s.billRow, { marginBottom: 6 }]}>
                    <Text style={{ fontSize: 11, color: '#64748B' }}>Items Total ({cartItems.reduce((a, i) => a + i.qty, 0)})</Text>
                    <Text style={{ fontSize: 11, color: '#0F172A', fontWeight: 'bold' }}>₹{cartOfferTotal.toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={[s.billRow, { marginBottom: 6 }]}>
                    <Text style={{ fontSize: 11, color: '#64748B' }}>Delivery Fee</Text>
                    <Text style={{ fontSize: 11, color: '#059669', fontWeight: 'bold' }}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</Text>
                  </View>
                  <View style={{ height: 1, backgroundColor: '#F1F5F9', marginVertical: 8 }} />
                  <View style={s.billRow}>
                    <Text style={s.billTotalLabel}>Total Payable Amount</Text>
                    <Text style={s.billTotalValue}>₹{finalPayable.toLocaleString('en-IN')}</Text>
                  </View>
                </View>

                <TouchableOpacity style={s.razorpayDirectBtn} onPress={openDirectRazorpayModal}>
                  <Text style={s.razorpayDirectBtnText}>Pay Immediately via Razorpay Gateway 💳  ›</Text>
                  <Text style={{ color: '#DBEAFE', fontSize: 9, marginTop: 2 }}>Connected Key ID: {RAZORPAY_KEY_ID}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.checkoutSecondaryBtn} onPress={openMultiStepCheckout}>
                  <Text style={s.checkoutSecondaryBtnText}>Full Multi-Step Checkout (Address → Summary → Payment) 🔐</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* 4. ORDERS TAB */}
        {activeTab === 'orders' && (
          <View style={{ paddingTop: 4 }}>
            <Text style={s.pageTitleHeader}>My Orders 📦 ({ordersList.length})</Text>

            {ordersList.map((order) => (
              <View key={order.id} style={s.orderHistoryCard}>
                <View style={s.orderHeaderRow}>
                  <View>
                    <Text style={s.orderIdText}>{order.id}</Text>
                    <Text style={s.orderDateText}>Placed on {order.date} | {order.paymentMode}</Text>
                  </View>
                  <View style={[s.orderStatusPill, { backgroundColor: order.statusColor }]}>
                    <Text style={s.orderStatusPillText}>{order.status}</Text>
                  </View>
                </View>

                <View style={s.orderDivider} />

                {order.items.map((item, idx) => (
                  <View key={idx} style={s.orderItemRow}>
                    <Image source={{ uri: item.img }} style={s.orderItemImg} />
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                      <Text style={s.orderItemTitle} numberOfLines={2}>{item.title}</Text>
                      <Text style={s.orderItemPrice}>₹{item.price.toLocaleString('en-IN')} x {item.qty}</Text>
                    </View>
                  </View>
                ))}

                {/* Order Tracking Timeline */}
                <View style={s.orderDivider} />
                <Text style={{ fontSize: 11, fontWeight: '900', color: '#0F172A', marginBottom: 8 }}>📍 Tracking Timeline</Text>
                {['Order Placed', 'Packed', 'Dispatched', 'In Transit', 'Delivered'].map((stage, idx) => (
                  <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: idx < (order.stageIndex || 1) ? '#059669' : '#E2E8F0', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                      <Text style={{ color: idx < (order.stageIndex || 1) ? '#FFFFFF' : '#94A3B8', fontSize: 8, fontWeight: 'bold' }}>✓</Text>
                    </View>
                    <Text style={{ fontSize: 10, color: idx < (order.stageIndex || 1) ? '#059669' : '#94A3B8', fontWeight: idx < (order.stageIndex || 1) ? 'bold' : 'normal' }}>{stage}</Text>
                  </View>
                ))}

                <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
                  <TouchableOpacity style={s.orderActionBtn} onPress={() => Alert.alert('Invoice', `Tax Invoice for ${order.id}\nGST: 18%\nTotal: ₹${order.totalAmount.toLocaleString('en-IN')}`)}>
                    <Text style={s.orderActionBtnText}>🧾 Invoice</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[s.orderActionBtn, { borderColor: '#FCA5A5' }]} onPress={() => Alert.alert('Return/Replace', 'Select reason for return:\n1. Defective product\n2. Wrong item received\n3. Damaged in transit\n4. Not needed anymore')}>
                    <Text style={[s.orderActionBtnText, { color: '#EF4444' }]}>🔁 Return</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* 5. MODERN PREMIUM ACCOUNT SETTINGS TAB UI */}
        {activeTab === 'account' && (
          <View style={{ paddingTop: 6, gap: 14 }}>
            {/* HERO PROFILE CARD */}
            <View style={s.accProfileHeroCard}>
              <View style={s.accProfileTopRow}>
                <View style={s.accAvatarBox}>
                  <View style={s.accAvatarCircle}>
                    <Text style={{ fontSize: 34, color: '#2563EB' }}>👤</Text>
                  </View>
                  <TouchableOpacity style={s.accCameraBadge} onPress={() => Alert.alert('Update Photo', 'Choose profile photo from gallery or camera')}>
                    <Text style={{ fontSize: 10 }}>📷</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1, paddingLeft: 14 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={s.accUserNameText}>{profileName}</Text>
                    <View style={s.blueCheckCircle}>
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>✓</Text>
                    </View>
                  </View>
                  <Text style={s.accUserEmailText}>{profileEmail}</Text>
                  <Text style={s.accUserPhoneText}>📞 {profilePhone}</Text>
                </View>

                <TouchableOpacity style={s.editProfilePillBtn} onPress={() => setPersonalInfoModalVisible(true)}>
                  <Text style={s.editProfilePillText}>✎ Edit ›</Text>
                </TouchableOpacity>
              </View>

              <View style={s.accCardDivider} />

              <View style={s.accFourStatsRow}>
                <TouchableOpacity style={s.accStatCol} onPress={() => setActiveTab('orders')}>
                  <Text style={s.accStatLabel}>Orders</Text>
                  <Text style={s.accStatNumber}>{ordersList.length}</Text>
                  <Text style={s.accStatLinkText}>View all</Text>
                </TouchableOpacity>
                <View style={s.accStatVerticalLine} />
                <TouchableOpacity style={s.accStatCol} onPress={() => setWishlistModalVisible(true)}>
                  <Text style={s.accStatLabel}>Wishlist</Text>
                  <Text style={s.accStatNumber}>{wishlistItems.length}</Text>
                  <Text style={s.accStatLinkText}>View all</Text>
                </TouchableOpacity>
                <View style={s.accStatVerticalLine} />
                <TouchableOpacity style={s.accStatCol} onPress={() => setAddressManagerModalVisible(true)}>
                  <Text style={s.accStatLabel}>Addresses</Text>
                  <Text style={s.accStatNumber}>{savedAddresses.length}</Text>
                  <Text style={s.accStatLinkText}>Manage</Text>
                </TouchableOpacity>
                <View style={s.accStatVerticalLine} />
                <TouchableOpacity style={s.accStatCol} onPress={() => setCoinsModalVisible(true)}>
                  <Text style={s.accStatLabel}>Coins</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Text style={{ fontSize: 14 }}>🪙</Text>
                    <Text style={s.accStatNumber}>{coinsBalance}</Text>
                  </View>
                  <Text style={s.accStatLinkText}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ELECTROMART PRIME VIP BANNER CARD */}
            <View style={s.primeCardContainer}>
              <View style={s.primeTopRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={s.crownCircle}>
                    <Text style={{ fontSize: 18 }}>👑</Text>
                  </View>
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={s.primeCardTitle}>ElectroMart Prime VIP</Text>
                      <View style={s.primeActiveBadge}>
                        <Text style={s.primeActiveText}>⚡ Active Member</Text>
                      </View>
                    </View>
                    <Text style={s.primeCardSub}>Free Express Delivery & Early Access Enabled</Text>
                  </View>
                </View>
                <TouchableOpacity style={s.viewBenefitsBtn} onPress={() => Alert.alert('Prime VIP Perks 👑', '✅ Free Express Delivery (24 Hours)\n✅ Exclusive Member Discounts (Up to 15% Extra)\n✅ Early Access to Sales & New Tech Launches\n✅ Dedicated 24x7 Priority Support Line\n✅ 5% Extra Cashback in Wallet')}>
                  <Text style={s.viewBenefitsBtnText}>Perks ›</Text>
                </TouchableOpacity>
              </View>
              <View style={s.primeFeaturesStrip}>
                <View style={s.primeFeatureItem}>
                  <Text style={{ fontSize: 16, marginRight: 6 }}>🚚</Text>
                  <View>
                    <Text style={s.primeFeatureTitle}>Free Delivery</Text>
                    <Text style={s.primeFeatureSub}>On all orders</Text>
                  </View>
                </View>
                <View style={s.primeFeatureItem}>
                  <Text style={{ fontSize: 16, marginRight: 6 }}>⚡</Text>
                  <View>
                    <Text style={s.primeFeatureTitle}>Priority Support</Text>
                    <Text style={s.primeFeatureSub}>24x7 Helpline</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* CATEGORY 1: ACCOUNT & SHOPPING */}
            <View style={s.accSectionCard}>
              <Text style={s.accSectionGroupHeader}>🛍️ ACCOUNT & SHOPPING</Text>
              {[
                { icon: '👤', title: 'Personal Information', sub: 'Manage name, email, phone & gender', bg: '#EFF6FF', onPress: () => setPersonalInfoModalVisible(true) },
                { icon: '📍', title: 'Saved Addresses', sub: `${savedAddresses.length} saved delivery locations`, bg: '#EFF6FF', onPress: () => setAddressManagerModalVisible(true) },
                { icon: '💳', title: 'Payment Methods', sub: `${savedCards.length} Cards, ${savedUpi.length} UPI IDs saved`, bg: '#EFF6FF', onPress: () => setPaymentMethodsModalVisible(true) },
                { icon: '💙', title: 'My Wishlist', sub: `${wishlistItems.length} items saved for later`, bg: '#EFF6FF', onPress: () => setWishlistModalVisible(true) },
                { icon: '🕐', title: 'Recently Viewed', sub: `${recentlyViewed.length} products viewed recently`, bg: '#F0F9FF', onPress: () => setRecentlyViewedModalVisible(true) },
                { icon: '🪙', title: 'ElectroMart Coins & Wallet', sub: 'Check coin balance & cashback log', bg: '#FEF3C7', badge: `🪙 ${coinsBalance}`, onPress: () => setCoinsModalVisible(true) }
              ].map((row, idx) => (
                <TouchableOpacity key={idx} style={s.accListRowItem} onPress={row.onPress}>
                  <View style={[s.accListIconCircle, { backgroundColor: row.bg }]}>
                    <Text style={{ fontSize: 18 }}>{row.icon}</Text>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 12 }}>
                    <Text style={s.accListRowTitle}>{row.title}</Text>
                    <Text style={s.accListRowSub}>{row.sub}</Text>
                  </View>
                  {row.badge && (
                    <View style={{ backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, marginRight: 6 }}>
                      <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#92400E' }}>{row.badge}</Text>
                    </View>
                  )}
                  <Text style={{ fontSize: 16, color: '#94A3B8' }}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* CATEGORY 2: APP PREFERENCES & SETTINGS */}
            <View style={s.accSectionCard}>
              <Text style={s.accSectionGroupHeader}>⚙️ APP PREFERENCES</Text>
              
              <View style={s.accListRowItem}>
                <View style={[s.accListIconCircle, { backgroundColor: '#F0FDF4' }]}>
                  <Text style={{ fontSize: 18 }}>🌐</Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 12 }}>
                  <Text style={s.accListRowTitle}>App Language</Text>
                  <Text style={s.accListRowSub}>English (India)</Text>
                </View>
                <TouchableOpacity style={s.changeLocBtn} onPress={() => Alert.alert('Language', 'Language set to English (IN). Hindi coming soon!')}>
                  <Text style={s.changeLocBtnText}>Change</Text>
                </TouchableOpacity>
              </View>

              <View style={s.accListRowItem}>
                <View style={[s.accListIconCircle, { backgroundColor: '#EFF6FF' }]}>
                  <Text style={{ fontSize: 18 }}>🔔</Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 12 }}>
                  <Text style={s.accListRowTitle}>Push Notifications</Text>
                  <Text style={s.accListRowSub}>Order updates, deals & cashback alerts</Text>
                </View>
                <Switch value={true} onValueChange={() => Alert.alert('Notifications', 'Notification preferences updated')} trackColor={{ true: '#2563EB' }} />
              </View>

              <View style={s.accListRowItem}>
                <View style={[s.accListIconCircle, { backgroundColor: '#F5F3FF' }]}>
                  <Text style={{ fontSize: 18 }}>{isDarkMode ? '☀️' : '🌙'}</Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 12 }}>
                  <Text style={s.accListRowTitle}>Dark Mode</Text>
                  <Text style={s.accListRowSub}>{isDarkMode ? 'Sleek dark theme active' : 'Sleek dark theme for night browsing'}</Text>
                </View>
                <Switch value={isDarkMode} onValueChange={setIsDarkMode} trackColor={{ true: '#2563EB' }} />
              </View>
            </View>

            {/* CATEGORY 3: SECURITY & PRIVACY */}
            <View style={s.accSectionCard}>
              <Text style={s.accSectionGroupHeader}>🔒 SECURITY & PRIVACY</Text>
              {[
                { icon: '🔑', title: 'Change Password', sub: 'Update account password', bg: '#EFF6FF', onPress: () => Alert.alert('Change Password', 'OTP sent to your registered phone number') },
                { icon: '📱', title: 'Login Devices & 2FA', sub: 'Manage logged-in devices & security', bg: '#EFF6FF', onPress: () => Alert.alert('Security', 'Your account is secured with 2-Factor Authentication') },
                { icon: '📜', title: 'Terms of Service & Privacy', sub: 'Read our terms, conditions and privacy policy', bg: '#F8FAFC', onPress: () => Alert.alert('Terms & Privacy', 'ElectroMart Privacy Policy & Terms of Service v2.0') }
              ].map((row, idx) => (
                <TouchableOpacity key={idx} style={s.accListRowItem} onPress={row.onPress}>
                  <View style={[s.accListIconCircle, { backgroundColor: row.bg }]}>
                    <Text style={{ fontSize: 18 }}>{row.icon}</Text>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 12 }}>
                    <Text style={s.accListRowTitle}>{row.title}</Text>
                    <Text style={s.accListRowSub}>{row.sub}</Text>
                  </View>
                  <Text style={{ fontSize: 16, color: '#94A3B8' }}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* CATEGORY 4: HELP & SUPPORT */}
            <View style={s.accSectionCard}>
              <Text style={s.accSectionGroupHeader}>🎧 SUPPORT & HELP</Text>
              {[
                { icon: '❓', title: 'Help Center & FAQs', sub: 'Instant answers to common questions', bg: '#EFF6FF', onPress: () => setHelpCenterModalVisible(true) },
                { icon: '📞', title: 'Contact Support 24x7', sub: 'Call, Email or WhatsApp our team', bg: '#ECFDF5', onPress: () => setContactUsModalVisible(true) },
                { icon: '⭐', title: 'Rate ElectroMart', sub: 'Share your feedback on Play Store', bg: '#FEF3C7', onPress: () => setRateAppModalVisible(true) },
              ].map((row, idx) => (
                <TouchableOpacity key={idx} style={s.accListRowItem} onPress={row.onPress}>
                  <View style={[s.accListIconCircle, { backgroundColor: row.bg }]}>
                    <Text style={{ fontSize: 18 }}>{row.icon}</Text>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 12 }}>
                    <Text style={s.accListRowTitle}>{row.title}</Text>
                    <Text style={s.accListRowSub}>{row.sub}</Text>
                  </View>
                  <Text style={{ fontSize: 16, color: '#94A3B8' }}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={s.accLogoutBtn} onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?', [{ text: 'Cancel', style: 'cancel' }, { text: 'Logout', style: 'destructive', onPress: () => Alert.alert('Logged Out', 'You have been logged out successfully') }])}>
              <Text style={s.accLogoutBtnText}>🚪  Logout Account</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* ===================================================================================== */}
      {/* =========================== ALL MODALS SECTION ============================= */}
      {/* ===================================================================================== */}

      {/* ☰ SIDEBAR DRAWER MODAL */}
      <Modal visible={drawerVisible} transparent animationType="fade" onRequestClose={() => setDrawerVisible(false)}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={s.drawerContainer}>
            <SafeAreaView style={{ flex: 1 }}>
              {/* Drawer Header */}
              <View style={s.drawerHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={{ uri: APP_LOGO_URL }} style={{ width: 36, height: 36, resizeMode: 'contain', marginRight: 10 }} />
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: '900', color: '#FFFFFF' }}>ElectroMart</Text>
                    <Text style={{ fontSize: 9, color: '#93C5FD' }}>Smart Technology, Better Life</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setDrawerVisible(false)}>
                  <Text style={{ fontSize: 22, color: '#FFFFFF', fontWeight: 'bold' }}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* User Card */}
              <View style={s.drawerUserCard}>
                <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 24, color: '#2563EB' }}>👤</Text>
                </View>
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={{ fontSize: 14, fontWeight: '900', color: '#0F172A' }}>{profileName}</Text>
                    <Text style={{ color: '#2563EB', fontSize: 12, fontWeight: 'bold' }}>✓</Text>
                  </View>
                  <Text style={{ fontSize: 10, color: '#64748B' }}>{profileEmail}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <View style={{ backgroundColor: '#FEF3C7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 }}>
                      <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#92400E' }}>🪙 {coinsBalance} Coins</Text>
                    </View>
                    <View style={{ backgroundColor: '#059669', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 }}>
                      <Text style={{ fontSize: 8, color: '#FFFFFF', fontWeight: 'bold' }}>⚡ Prime</Text>
                    </View>
                  </View>
                </View>
              </View>

              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {[
                  { header: '🛍️ Shop & Explore' },
                  { icon: '🏠', label: 'Home', tab: 'home' },
                  { icon: '📂', label: 'All Categories', tab: 'categories' },
                  { icon: '⚡', label: 'Flash Deals & Offers', action: () => { setActiveTab('home'); } },
                  { icon: '👑', label: 'ElectroMart Prime Zone', action: () => { setActiveTab('account'); } },

                  { header: '📦 Orders & Wallet' },
                  { icon: '📦', label: 'My Orders & Tracking', tab: 'orders', badge: ordersList.length },
                  { icon: '💙', label: 'My Wishlist', action: () => setWishlistModalVisible(true), badge: wishlistItems.length },
                  { icon: '🛒', label: 'Shopping Bag', tab: 'cart', badge: cartItems.length },
                  { icon: '🪙', label: 'ElectroMart Coins & Wallet', action: () => setCoinsModalVisible(true), badge: coinsBalance },
                  { icon: '📍', label: 'Saved Addresses', action: () => setAddressManagerModalVisible(true), badge: savedAddresses.length },
                  { icon: '💳', label: 'Saved Payment Methods', action: () => setPaymentMethodsModalVisible(true) },

                  { header: '🎁 Rewards & Offers' },
                  { icon: '🎁', label: 'Refer & Earn (Get ₹200)', action: () => Alert.alert('Refer & Earn 🎁', 'Share referral code "ELECTRO200" with friends!\nGet ₹200 wallet cashback when they order.') },
                  { icon: '🎟️', label: 'Coupons & Promo Codes', action: () => Alert.alert('Active Coupons 🎟️', '1. FIRST100 — Flat ₹100 Off\n2. ELECTROMART10 — 10% Instant Discount\n3. NOCOST3 — 0% EMI Available') },

                  { header: '⚙️ Support & Account' },
                  { icon: '🔔', label: 'Notifications', action: () => setNotificationsModalVisible(true), badge: notifications.filter(n => !n.read).length },
                  { icon: '❓', label: 'Help Center & FAQs', action: () => setHelpCenterModalVisible(true) },
                  { icon: '📞', label: 'Contact Us & Support', action: () => setContactUsModalVisible(true) },
                  { icon: isDarkMode ? '☀️' : '🌙', label: isDarkMode ? 'Light Theme Mode' : 'Dark Theme Mode', action: () => setIsDarkMode(prev => !prev) },
                  { icon: '👤', label: 'Account Settings', tab: 'account' },
                ].map((item, idx) => {
                  if (item.header) {
                    return (
                      <View key={idx} style={{ paddingHorizontal: 18, paddingTop: 14, paddingBottom: 4 }}>
                        <Text style={{ fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 0.5 }}>{item.header.toUpperCase()}</Text>
                      </View>
                    );
                  }
                  return (
                    <TouchableOpacity key={idx} style={s.drawerNavItem} onPress={() => { setDrawerVisible(false); if (item.tab) setActiveTab(item.tab); if (item.action) item.action(); }}>
                      <Text style={{ fontSize: 18, marginRight: 14 }}>{item.icon}</Text>
                      <Text style={s.drawerNavLabel}>{item.label}</Text>
                      {item.badge !== undefined && item.badge > 0 && (
                        <View style={s.drawerBadge}>
                          <Text style={s.drawerBadgeText}>{item.badge}</Text>
                        </View>
                      )}
                      <Text style={{ fontSize: 14, color: '#CBD5E1', marginLeft: 'auto' }}>›</Text>
                    </TouchableOpacity>
                  );
                })}

                <TouchableOpacity style={{ marginHorizontal: 16, marginVertical: 16, backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FCA5A5', borderRadius: 12, paddingVertical: 10, alignItems: 'center' }}
                  onPress={() => { setDrawerVisible(false); Alert.alert('Logout', 'Are you sure you want to logout?', [{ text: 'Cancel', style: 'cancel' }, { text: 'Logout', style: 'destructive', onPress: () => Alert.alert('Logged Out', 'You have been logged out.') }]); }}>
                  <Text style={{ color: '#EF4444', fontSize: 12, fontWeight: 'bold' }}>🚪  Logout Account</Text>
                </TouchableOpacity>
              </ScrollView>

              {/* Drawer Footer */}
              <View style={s.drawerFooter}>
                <Text style={{ fontSize: 9, color: '#94A3B8', textAlign: 'center' }}>ElectroMart v2.0.0 | © 2026 Jaiswal Mobile Sitamarhi</Text>
              </View>
            </SafeAreaView>
          </View>
          <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} activeOpacity={1} onPress={() => setDrawerVisible(false)} />
        </View>
      </Modal>

      {/* 💳 RAZORPAY PAYMENT GATEWAY MODAL */}
      <Modal visible={razorpayModalVisible} transparent animationType="slide" onRequestClose={() => setRazorpayModalVisible(false)}>
        <View style={s.modalOverlayBg}>
          <View style={s.razorpayModalContainer}>
            <View style={s.razorpayHeaderBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: APP_LOGO_URL }} style={{ width: 24, height: 24, marginRight: 8, resizeMode: 'contain' }} />
                <Text style={{ fontSize: 20, color: '#0B72E7', fontWeight: '900', marginRight: 6 }}>Razorpay</Text>
                <View style={{ backgroundColor: '#DBEAFE', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                  <Text style={{ color: '#1E40AF', fontSize: 9, fontWeight: 'bold' }}>TEST GATEWAY</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setRazorpayModalVisible(false)}>
                <Text style={{ fontSize: 20, color: '#64748B', fontWeight: 'bold' }}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Payment mode tabs */}
            <View style={{ flexDirection: 'row', marginVertical: 12, gap: 6 }}>
              {[{ key: 'card', label: '💳 Card' }, { key: 'upi', label: '📱 UPI' }, { key: 'netbanking', label: '🏦 Bank' }].map(tab => (
                <TouchableOpacity key={tab.key} style={[s.rzpTabBtn, razorpayTab === tab.key && s.rzpTabBtnActive]} onPress={() => setRazorpayTab(tab.key)}>
                  <Text style={[s.rzpTabBtnText, razorpayTab === tab.key && s.rzpTabBtnTextActive]}>{tab.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {razorpayTab === 'card' && (
              <View style={{ gap: 8 }}>
                <TextInput style={s.rzpInput} placeholder="Card Number" value={cardDetails.number} onChangeText={t => setCardDetails(p => ({ ...p, number: t }))} />
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TextInput style={[s.rzpInput, { flex: 1 }]} placeholder="MM/YY" value={cardDetails.expiry} onChangeText={t => setCardDetails(p => ({ ...p, expiry: t }))} />
                  <TextInput style={[s.rzpInput, { flex: 1 }]} placeholder="CVV" value={cardDetails.cvv} secureTextEntry onChangeText={t => setCardDetails(p => ({ ...p, cvv: t }))} />
                </View>
                <TextInput style={s.rzpInput} placeholder="Cardholder Name" value={cardDetails.name} onChangeText={t => setCardDetails(p => ({ ...p, name: t }))} />
              </View>
            )}
            {razorpayTab === 'upi' && (
              <View style={{ gap: 8 }}>
                <TextInput style={s.rzpInput} placeholder="Enter UPI ID (e.g. name@upi)" value={upiVpa} onChangeText={setUpiVpa} />
                <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
                  {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                    <TouchableOpacity key={app} style={s.upiAppPill}>
                      <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1E40AF' }}>{app}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            {razorpayTab === 'netbanking' && (
              <View style={{ gap: 6 }}>
                {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'].map(bank => (
                  <TouchableOpacity key={bank} style={s.bankRow}>
                    <Text style={{ fontSize: 12, color: '#0F172A', fontWeight: 'bold' }}>{bank}</Text>
                    <Text style={{ fontSize: 14, color: '#94A3B8' }}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={{ backgroundColor: '#F8FAFC', borderRadius: 10, padding: 10, marginTop: 12 }}>
              <Text style={{ fontSize: 9, color: '#64748B' }}>Merchant: ElectroMart | Key: {RAZORPAY_KEY_ID}</Text>
              <Text style={{ fontSize: 14, fontWeight: '900', color: '#0F172A', marginTop: 2 }}>₹{finalPayable.toLocaleString('en-IN')}</Text>
            </View>

            <TouchableOpacity style={s.razorpayPayBtn} onPress={executeRazorpayPayment} disabled={isRazorpayProcessing}>
              {isRazorpayProcessing ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={s.razorpayPayBtnText}>Pay ₹{finalPayable.toLocaleString('en-IN')} via Razorpay Gateway 🔐</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🎉 ORDER RECEIPT MODAL */}
      <Modal visible={receiptModalVisible} animationType="slide" onRequestClose={() => setReceiptModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          <View style={s.receiptTopHeader}>
            <Text style={{ fontSize: 16, fontWeight: '900', color: '#059669' }}>🎉 Order Placed Successfully!</Text>
            <TouchableOpacity onPress={() => setReceiptModalVisible(false)}>
              <Text style={{ fontSize: 20, color: '#0F172A', fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>
          </View>

          {placedReceiptOrder && (
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 12 }}>
              <View style={s.receiptBannerCard}>
                <Image source={{ uri: APP_LOGO_URL }} style={{ width: 48, height: 48, marginBottom: 8, resizeMode: 'contain' }} />
                <Text style={{ fontSize: 18, fontWeight: '900', color: '#FFFFFF' }}>{placedReceiptOrder.id}</Text>
                <Text style={{ fontSize: 11, color: '#A7F3D0', marginTop: 4 }}>Amount: ₹{placedReceiptOrder.totalAmount.toLocaleString('en-IN')}</Text>
              </View>

              {/* Items summary */}
              <View style={s.accSectionCard}>
                <Text style={{ fontSize: 12, fontWeight: '900', color: '#0F172A', marginBottom: 8 }}>Items Ordered</Text>
                {placedReceiptOrder.items.map((item, idx) => (
                  <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    <Image source={{ uri: item.img }} style={{ width: 36, height: 36, resizeMode: 'contain', marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0F172A' }}>{item.title}</Text>
                      <Text style={{ fontSize: 9, color: '#64748B' }}>₹{item.price.toLocaleString('en-IN')} × {item.qty}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={s.checkoutPrimaryBtn} onPress={() => { setReceiptModalVisible(false); setActiveTab('orders'); }}>
                <Text style={s.checkoutPrimaryBtnText}>Track Shipment Status 📍  ›</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>

      {/* ===== FILTER MODAL ===== */}
      <Modal visible={filterModalVisible} transparent animationType="slide" onRequestClose={() => setFilterModalVisible(false)}>
        <View style={s.modalOverlayBg}>
          <View style={[s.razorpayModalContainer, { maxHeight: '80%' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: '900', color: '#0F172A' }}>⚙️ Filters</Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity onPress={clearAllFilters}>
                  <Text style={{ fontSize: 11, color: '#EF4444', fontWeight: 'bold' }}>Clear All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                  <Text style={{ fontSize: 20, color: '#64748B', fontWeight: 'bold' }}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Price Range */}
              <Text style={s.filterSectionTitle}>💰 Price Range</Text>
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
                {[
                  { label: 'Under ₹5K', min: 0, max: 5000 },
                  { label: '₹5K-25K', min: 5000, max: 25000 },
                  { label: '₹25K-50K', min: 25000, max: 50000 },
                  { label: '₹50K-1L', min: 50000, max: 100000 },
                  { label: '₹1L+', min: 100000, max: 500000 },
                ].map((range, idx) => (
                  <TouchableOpacity key={idx} style={[s.filterChip, filterPriceMin === range.min && filterPriceMax === range.max && s.filterChipActive]}
                    onPress={() => { setFilterPriceMin(range.min); setFilterPriceMax(range.max); }}>
                    <Text style={[s.filterChipText, filterPriceMin === range.min && filterPriceMax === range.max && s.filterChipTextActive]}>{range.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Brands */}
              <Text style={s.filterSectionTitle}>🏷️ Brands</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                {ALL_BRANDS.map(brand => (
                  <TouchableOpacity key={brand} style={[s.filterChip, filterBrands.includes(brand) && s.filterChipActive]} onPress={() => toggleBrandFilter(brand)}>
                    <Text style={[s.filterChipText, filterBrands.includes(brand) && s.filterChipTextActive]}>{brand}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Star Rating */}
              <Text style={s.filterSectionTitle}>⭐ Customer Rating</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
                {[4, 3, 2].map(r => (
                  <TouchableOpacity key={r} style={[s.filterChip, filterMinRating === r && s.filterChipActive]} onPress={() => setFilterMinRating(filterMinRating === r ? 0 : r)}>
                    <Text style={[s.filterChipText, filterMinRating === r && s.filterChipTextActive]}>{r}★ & above</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* In Stock */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={s.filterSectionTitle}>📦 In Stock Only</Text>
                <Switch value={filterInStockOnly} onValueChange={setFilterInStockOnly} trackColor={{ true: '#2563EB' }} />
              </View>
            </ScrollView>

            <TouchableOpacity style={s.razorpayPayBtn} onPress={() => { setFilterModalVisible(false); applyFiltersAndSort(searchQuery); setSearchResultsVisible(true); }}>
              <Text style={s.razorpayPayBtnText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ===== SORT MODAL ===== */}
      <Modal visible={sortModalVisible} transparent animationType="slide" onRequestClose={() => setSortModalVisible(false)}>
        <View style={s.modalOverlayBg}>
          <View style={s.razorpayModalContainer}>
            <Text style={{ fontSize: 16, fontWeight: '900', color: '#0F172A', marginBottom: 16 }}>⇅ Sort By</Text>
            {[
              { key: 'popularity', label: '🔥 Popularity' },
              { key: 'price_low', label: '💰 Price: Low to High' },
              { key: 'price_high', label: '💎 Price: High to Low' },
              { key: 'rating', label: '⭐ Customer Rating' },
              { key: 'newest', label: '🆕 Newest First' },
            ].map(opt => (
              <TouchableOpacity key={opt.key} style={[s.sortOptionRow, sortBy === opt.key && { backgroundColor: '#EFF6FF' }]}
                onPress={() => { setSortBy(opt.key); setSortModalVisible(false); applyFiltersAndSort(searchQuery); setSearchResultsVisible(true); }}>
                <Text style={[s.sortOptionText, sortBy === opt.key && { color: '#2563EB' }]}>{opt.label}</Text>
                {sortBy === opt.key && <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* ===== PERSONAL INFORMATION MODAL ===== */}
      <Modal visible={personalInfoModalVisible} animationType="slide" onRequestClose={() => setPersonalInfoModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          {renderModalHeader('Personal Information', () => setPersonalInfoModalVisible(false))}
          <ScrollView style={{ padding: 16 }}>
            <View style={s.accSectionCard}>
              <View style={{ alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 36, color: '#2563EB' }}>👤</Text>
                </View>
                <TouchableOpacity style={{ marginTop: 8, backgroundColor: '#EFF6FF', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#BFDBFE' }}>
                  <Text style={{ fontSize: 10, color: '#2563EB', fontWeight: 'bold' }}>📷 Change Photo</Text>
                </TouchableOpacity>
              </View>

              {[
                { label: 'Full Name', value: profileName, setter: setProfileName, icon: '👤' },
                { label: 'Email Address', value: profileEmail, setter: setProfileEmail, icon: '📧' },
                { label: 'Phone Number', value: profilePhone, setter: setProfilePhone, icon: '📞' },
                { label: 'Date of Birth', value: profileDob, setter: setProfileDob, icon: '🎂' },
              ].map((field, idx) => (
                <View key={idx} style={{ marginBottom: 14 }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#64748B', marginBottom: 4 }}>{field.icon} {field.label}</Text>
                  <TextInput style={s.profileInput} value={field.value} onChangeText={field.setter} placeholder={field.label} />
                </View>
              ))}

              <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#64748B', marginBottom: 4 }}>⚥ Gender</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
                {['Male', 'Female', 'Other'].map(g => (
                  <TouchableOpacity key={g} style={[s.filterChip, profileGender === g && s.filterChipActive]} onPress={() => setProfileGender(g)}>
                    <Text style={[s.filterChipText, profileGender === g && s.filterChipTextActive]}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={[s.razorpayPayBtn, { marginTop: 16 }]} onPress={() => { setPersonalInfoModalVisible(false); Alert.alert('Profile Updated ✅', 'Your personal information has been saved.'); }}>
              <Text style={s.razorpayPayBtnText}>Save Changes</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ===== ADDRESS MANAGER MODAL ===== */}
      <Modal visible={addressManagerModalVisible} animationType="slide" onRequestClose={() => setAddressManagerModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          {renderModalHeader('Saved Addresses', () => setAddressManagerModalVisible(false))}
          <ScrollView style={{ padding: 16 }}>
            <TouchableOpacity style={s.addNewAddrBtn} onPress={() => setAddAddressModalVisible(true)}>
              <Text style={{ fontSize: 18, marginRight: 8 }}>➕</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2563EB' }}>Add New Address</Text>
            </TouchableOpacity>

            {savedAddresses.map(addr => (
              <View key={addr.id} style={[s.accSectionCard, { marginBottom: 12 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={[s.addrTypePill, { backgroundColor: addr.type === 'HOME' ? '#ECFDF5' : '#EFF6FF' }]}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: addr.type === 'HOME' ? '#059669' : '#2563EB' }}>{addr.type === 'HOME' ? '🏠' : '🏢'} {addr.type}</Text>
                  </View>
                  {selectedAddrId === addr.id && (
                    <View style={{ backgroundColor: '#059669', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, marginLeft: 8 }}>
                      <Text style={{ fontSize: 8, color: '#FFFFFF', fontWeight: 'bold' }}>DEFAULT</Text>
                    </View>
                  )}
                </View>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#0F172A' }}>{addr.name}</Text>
                <Text style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>{addr.house}, {addr.area}</Text>
                <Text style={{ fontSize: 10, color: '#64748B' }}>{addr.city}, {addr.state} - {addr.pincode}</Text>
                <Text style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>📞 {addr.phone}</Text>
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
                  <TouchableOpacity style={s.orderActionBtn} onPress={() => setSelectedAddrId(addr.id)}>
                    <Text style={s.orderActionBtnText}>✓ Set Default</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[s.orderActionBtn, { borderColor: '#FCA5A5' }]} onPress={() => deleteAddress(addr.id)}>
                    <Text style={[s.orderActionBtnText, { color: '#EF4444' }]}>🗑 Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ===== ADD ADDRESS MODAL ===== */}
      <Modal visible={addAddressModalVisible} animationType="slide" onRequestClose={() => setAddAddressModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          {renderModalHeader('Add New Address', () => setAddAddressModalVisible(false))}
          <ScrollView style={{ padding: 16 }}>
            <View style={s.accSectionCard}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#64748B', marginBottom: 6 }}>Address Type</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
                {['HOME', 'OFFICE'].map(t => (
                  <TouchableOpacity key={t} style={[s.filterChip, newAddr.type === t && s.filterChipActive]} onPress={() => setNewAddr(p => ({ ...p, type: t }))}>
                    <Text style={[s.filterChipText, newAddr.type === t && s.filterChipTextActive]}>{t === 'HOME' ? '🏠' : '🏢'} {t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {[
                { key: 'name', label: 'Full Name', icon: '👤' },
                { key: 'phone', label: 'Phone Number', icon: '📞' },
                { key: 'house', label: 'House/Flat/Building', icon: '🏠' },
                { key: 'area', label: 'Area/Landmark', icon: '📍' },
                { key: 'city', label: 'City', icon: '🏙️' },
                { key: 'state', label: 'State', icon: '🗺️' },
                { key: 'pincode', label: 'Pincode', icon: '📮' },
              ].map((f, idx) => (
                <View key={idx} style={{ marginBottom: 12 }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#64748B', marginBottom: 4 }}>{f.icon} {f.label}</Text>
                  <TextInput style={s.profileInput} value={newAddr[f.key]} onChangeText={t => setNewAddr(p => ({ ...p, [f.key]: t }))} placeholder={f.label} />
                </View>
              ))}
            </View>
            <TouchableOpacity style={[s.razorpayPayBtn, { marginTop: 16 }]} onPress={addNewAddress}>
              <Text style={s.razorpayPayBtnText}>Save Address</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ===== PAYMENT METHODS MODAL ===== */}
      <Modal visible={paymentMethodsModalVisible} animationType="slide" onRequestClose={() => setPaymentMethodsModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          {renderModalHeader('Payment Methods', () => setPaymentMethodsModalVisible(false))}
          <ScrollView style={{ padding: 16 }}>
            <View style={s.accSectionCard}>
              <Text style={s.accSectionHeading}>💳 Saved Cards</Text>
              {savedCards.map(card => (
                <View key={card.id} style={s.accListRowItem}>
                  <View style={[s.accListIconCircle, { backgroundColor: '#EFF6FF' }]}>
                    <Text style={{ fontSize: 16 }}>💳</Text>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 12 }}>
                    <Text style={s.accListRowTitle}>{card.type} •••• {card.last4}</Text>
                    <Text style={s.accListRowSub}>{card.name} | Expires {card.expiry}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={[s.accSectionCard, { marginTop: 12 }]}>
              <Text style={s.accSectionHeading}>📱 Saved UPI</Text>
              {savedUpi.map(upi => (
                <View key={upi.id} style={s.accListRowItem}>
                  <View style={[s.accListIconCircle, { backgroundColor: '#ECFDF5' }]}>
                    <Text style={{ fontSize: 16 }}>📱</Text>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 12 }}>
                    <Text style={s.accListRowTitle}>{upi.vpa}</Text>
                    <Text style={s.accListRowSub}>{upi.bank} Bank</Text>
                  </View>
                </View>
              ))}
            </View>
            <TouchableOpacity style={s.addNewAddrBtn} onPress={() => Alert.alert('Add Payment', 'Add new card or UPI ID')}>
              <Text style={{ fontSize: 18, marginRight: 8 }}>➕</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2563EB' }}>Add New Payment Method</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ===== WISHLIST MODAL ===== */}
      <Modal visible={wishlistModalVisible} animationType="slide" onRequestClose={() => setWishlistModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          {renderModalHeader(`My Wishlist (${wishlistItems.length})`, () => setWishlistModalVisible(false))}
          <ScrollView style={{ padding: 16 }}>
            {wishlistItems.length === 0 ? (
              <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                <Text style={{ fontSize: 50, marginBottom: 10 }}>💙</Text>
                <Text style={{ fontSize: 14, fontWeight: '900', color: '#0F172A' }}>Your Wishlist is Empty</Text>
                <TouchableOpacity style={[s.startShoppingBtn, { marginTop: 14 }]} onPress={() => { setWishlistModalVisible(false); setActiveTab('home'); }}>
                  <Text style={s.startShoppingBtnText}>Explore Products ›</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {wishlistItems.map(item => (
                  <View key={item.id} style={s.searchResultCard}>
                    <TouchableOpacity style={s.wishlistHeartBtn} onPress={() => toggleWishlist(item)}>
                      <Text style={{ fontSize: 16 }}>❤️</Text>
                    </TouchableOpacity>
                    <Image source={{ uri: item.img }} style={s.searchResultImg} />
                    <Text style={s.searchResultTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={s.searchResultPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
                    <TouchableOpacity style={[s.addToCartMiniBtn, { marginTop: 8 }]} onPress={() => { addToCart({ title: item.title, price: item.price, img: item.img, brand: 'ElectroMart' }); }}>
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>🛒 Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ===== RECENTLY VIEWED MODAL ===== */}
      <Modal visible={recentlyViewedModalVisible} animationType="slide" onRequestClose={() => setRecentlyViewedModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          {renderModalHeader(`Recently Viewed (${recentlyViewed.length})`, () => setRecentlyViewedModalVisible(false))}
          <ScrollView style={{ padding: 16 }}>
            {recentlyViewed.map(item => (
              <View key={item.id} style={[s.cartItemCard, { marginBottom: 10 }]}>
                <Image source={{ uri: item.img }} style={s.cartItemImg} />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text style={s.cartItemTitle}>{item.title}</Text>
                  <Text style={s.cartOfferPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
                </View>
                <TouchableOpacity style={s.addToCartMiniBtn} onPress={() => addToCart({ title: item.title, price: item.price, img: item.img, brand: 'ElectroMart' })}>
                  <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>🛒</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ===== COINS MODAL ===== */}
      <Modal visible={coinsModalVisible} animationType="slide" onRequestClose={() => setCoinsModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          {renderModalHeader('ElectroMart Coins', () => setCoinsModalVisible(false))}
          <ScrollView style={{ padding: 16 }}>
            <View style={[s.accSectionCard, { alignItems: 'center', paddingVertical: 24 }]}>
              <Text style={{ fontSize: 40 }}>🪙</Text>
              <Text style={{ fontSize: 32, fontWeight: '900', color: '#0F172A', marginTop: 8 }}>{coinsBalance}</Text>
              <Text style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Available Coins Balance</Text>
              <View style={{ backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginTop: 10 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#92400E' }}>1 Coin = ₹1 discount</Text>
              </View>
            </View>

            <View style={[s.accSectionCard, { marginTop: 12 }]}>
              <Text style={s.accSectionHeading}>Transaction History</Text>
              {coinsHistory.map(tx => (
                <View key={tx.id} style={[s.accListRowItem, { borderBottomColor: '#F8FAFC' }]}>
                  <View style={[s.accListIconCircle, { backgroundColor: tx.type === 'credit' ? '#ECFDF5' : '#FEF2F2' }]}>
                    <Text style={{ fontSize: 16 }}>{tx.type === 'credit' ? '⬆️' : '⬇️'}</Text>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 12 }}>
                    <Text style={s.accListRowTitle}>{tx.desc}</Text>
                    <Text style={s.accListRowSub}>{tx.date}</Text>
                  </View>
                  <Text style={{ fontSize: 13, fontWeight: '900', color: tx.type === 'credit' ? '#059669' : '#EF4444' }}>{tx.amount}</Text>
                </View>
              ))}
            </View>

            <View style={[s.accSectionCard, { marginTop: 12 }]}>
              <Text style={s.accSectionHeading}>How to Earn Coins 🎯</Text>
              {['Place orders & earn 5% cashback', 'Refer friends & earn 200 coins each', 'Write product reviews for 10 coins', 'Complete profile for 50 coins'].map((tip, idx) => (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontSize: 14, color: '#059669', marginRight: 8 }}>✓</Text>
                  <Text style={{ fontSize: 11, color: '#334155' }}>{tip}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ===== MODERN ULTRA-PREMIUM HELP CENTER MODAL ===== */}
      <Modal visible={helpCenterModalVisible} animationType="slide" onRequestClose={() => setHelpCenterModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          {renderModalHeader('Help & Support Center 🎧', () => setHelpCenterModalVisible(false))}
          <ScrollView style={{ padding: 16 }} showsVerticalScrollIndicator={false}>
            {/* HERO HERO BANNER CARD */}
            <View style={s.helpHeroCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={s.helpHeadsetCircle}>
                  <Text style={{ fontSize: 26 }}>🎧</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.helpHeroTitle}>How can we help you?</Text>
                  <Text style={s.helpHeroSub}>Search answers or select a topic below</Text>
                </View>
              </View>

              <View style={s.helpSearchBox}>
                <Text style={{ fontSize: 14, color: '#64748B', marginRight: 8 }}>🔍</Text>
                <TextInput style={s.helpSearchInput} placeholder="Search FAQs, topics or keywords..." placeholderTextColor="#94A3B8" />
              </View>
            </View>

            {/* QUICK TOPIC CHIPS */}
            <Text style={s.accSectionGroupHeader}>💡 POPULAR HELP TOPICS</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              {[
                { icon: '📦', label: 'Orders & Tracking', bg: '#EFF6FF' },
                { icon: '🔁', label: 'Returns & Refunds', bg: '#FEF2F2' },
                { icon: '💳', label: 'Payments & EMI', bg: '#ECFDF5' },
                { icon: '👑', label: 'Prime & Coins', bg: '#FEF3C7' },
              ].map((topic, idx) => (
                <TouchableOpacity key={idx} style={[s.helpTopicChip, { backgroundColor: topic.bg }]} onPress={() => Alert.alert(topic.label, `Viewing guides for ${topic.label}`)}>
                  <Text style={{ fontSize: 14, marginRight: 6 }}>{topic.icon}</Text>
                  <Text style={s.helpTopicChipText}>{topic.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* EXPANDABLE FAQS */}
            <View style={s.accSectionCard}>
              <Text style={s.accSectionHeading}>Frequently Asked Questions</Text>
              {[
                { q: 'How do I track my order live?', a: 'Go to My Orders tab and click on any order to see the live tracking timeline with 5 stages: Placed → Packed → Dispatched → In Transit → Delivered.' },
                { q: 'What is your 7-day return policy?', a: 'Within 7 days of delivery, go to My Orders, select the order, and tap "Return". Choose a reason and upload a photo if the product is defective. Free doorstep pickup!' },
                { q: 'How do I earn and use ElectroMart Coins?', a: 'Earn 5% coins cashback on every order, 200 coins per referral, and 50 coins on completing profile. 1 Coin = ₹1 discount on checkout!' },
                { q: 'What payment methods are supported?', a: 'We accept Razorpay (Credit/Debit Cards, UPI, Net Banking), Cash on Delivery (COD with OTP), and 0% No Cost EMI up to 12 months.' },
                { q: 'How do I change my delivery address?', a: 'Go to Account → Saved Addresses. You can add, edit, or delete saved addresses anytime. You can also pick address during checkout.' },
                { q: 'How do I claim GST Tax Invoice?', a: 'Every order receipt includes official GST 18% tax breakdown. Tap "🧾 Invoice" in My Orders to view and download tax invoice.' },
              ].map((faq, idx) => (
                <TouchableOpacity key={idx} style={s.faqAccordionRow} onPress={() => setHelpExpandedIdx(helpExpandedIdx === idx ? null : idx)}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={s.faqQuestionText}>{faq.q}</Text>
                    <Text style={{ fontSize: 16, color: '#64748B', fontWeight: 'bold' }}>{helpExpandedIdx === idx ? '−' : '+'}</Text>
                  </View>
                  {helpExpandedIdx === idx && (
                    <View style={{ marginTop: 8 }}>
                      <Text style={s.faqAnswerText}>{faq.a}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F1F5F9' }}>
                        <Text style={{ fontSize: 9, color: '#94A3B8' }}>Was this helpful?</Text>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                          <TouchableOpacity style={s.helpfulBtn} onPress={() => Alert.alert('Thank you! 👍', 'Glad we could help!')}>
                            <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#059669' }}>👍 Yes</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={s.helpfulBtn} onPress={() => setContactUsModalVisible(true)}>
                            <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#EF4444' }}>👎 No</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* LIVE CHAT CARD */}
            <View style={s.liveChatBannerCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 24, marginRight: 10 }}>💬</Text>
                <View>
                  <Text style={s.liveChatTitle}>Still need help?</Text>
                  <Text style={s.liveChatSub}>Talk to our customer support team 24x7</Text>
                </View>
              </View>
              <TouchableOpacity style={s.startChatBtn} onPress={() => setContactUsModalVisible(true)}>
                <Text style={s.startChatBtnText}>Contact Us ›</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ===== MODERN ULTRA-PREMIUM CONTACT US SUPPORT MODAL ===== */}
      <Modal visible={contactUsModalVisible} animationType="slide" onRequestClose={() => setContactUsModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          {renderModalHeader('Contact Support 24x7 📞', () => setContactUsModalVisible(false))}
          <ScrollView style={{ padding: 16 }} showsVerticalScrollIndicator={false}>
            {/* HERO BANNER */}
            <View style={s.contactHeroCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={{ uri: APP_LOGO_URL }} style={{ width: 34, height: 34, resizeMode: 'contain' }} />
                <View>
                  <Text style={s.contactHeroTitle}>We're Here for You 24x7</Text>
                  <Text style={s.contactHeroSub}>Direct support from Sitamarhi Headquarters</Text>
                </View>
              </View>
            </View>

            {/* 3 INTERACTIVE CONTACT CARDS */}
            <Text style={s.accSectionGroupHeader}>📱 DIRECT CONNECT OPTIONS</Text>
            <View style={{ gap: 10, marginBottom: 14 }}>
              {/* CALL US */}
              <TouchableOpacity style={s.contactActionCard} onPress={() => Alert.alert('Call Toll-Free 📞', 'Connecting to 1800-123-4567\nAvailable 24 Hours, 7 Days a week.')}>
                <View style={[s.contactIconBox, { backgroundColor: '#EFF6FF' }]}>
                  <Text style={{ fontSize: 22 }}>📞</Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 12 }}>
                  <Text style={s.contactCardTitle}>Call Toll-Free Support</Text>
                  <Text style={s.contactCardDetail}>1800-123-4567 (24x7 Helpline)</Text>
                  <Text style={s.contactCardSub}>Zero waiting time for Prime users</Text>
                </View>
                <View style={s.contactActionPill}>
                  <Text style={s.contactActionPillText}>Call ➔</Text>
                </View>
              </TouchableOpacity>

              {/* EMAIL US */}
              <TouchableOpacity style={s.contactActionCard} onPress={() => Alert.alert('Email Support 📧', 'Opening mail to support@electromart.in\nAverage response time: 2 hours.')}>
                <View style={[s.contactIconBox, { backgroundColor: '#ECFDF5' }]}>
                  <Text style={{ fontSize: 22 }}>📧</Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 12 }}>
                  <Text style={s.contactCardTitle}>Email Customer Support</Text>
                  <Text style={s.contactCardDetail}>support@electromart.in</Text>
                  <Text style={s.contactCardSub}>Response guaranteed within 2 hours</Text>
                </View>
                <View style={[s.contactActionPill, { backgroundColor: '#059669' }]}>
                  <Text style={s.contactActionPillText}>Mail ➔</Text>
                </View>
              </TouchableOpacity>

              {/* WHATSAPP CHAT */}
              <TouchableOpacity style={s.contactActionCard} onPress={() => Alert.alert('WhatsApp Support 💬', 'Opening WhatsApp Chat with +91 98765 43210')}>
                <View style={[s.contactIconBox, { backgroundColor: '#F0FDF4' }]}>
                  <Text style={{ fontSize: 22 }}>💬</Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 12 }}>
                  <Text style={s.contactCardTitle}>WhatsApp Live Chat</Text>
                  <Text style={s.contactCardDetail}>+91 98765 43210</Text>
                  <Text style={s.contactCardSub}>Instant chat with support assistant</Text>
                </View>
                <View style={[s.contactActionPill, { backgroundColor: '#16A34A' }]}>
                  <Text style={s.contactActionPillText}>Chat ➔</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* TICKET FORM */}
            <View style={s.accSectionCard}>
              <Text style={s.accSectionHeading}>📝 Send Support Ticket</Text>
              
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#64748B', marginTop: 10, marginBottom: 4 }}>Select Topic</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {['Order Delivery', 'Return/Exchange', 'Payment Failed', 'General Query'].map((topic, idx) => (
                  <TouchableOpacity key={idx} style={[s.filterChip, contactSubject === topic && s.filterChipActive]} onPress={() => setContactSubject(topic)}>
                    <Text style={[s.filterChipText, contactSubject === topic && s.filterChipTextActive]}>{topic}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#64748B', marginBottom: 4 }}>Message Details</Text>
                <TextInput style={[s.profileInput, { height: 100, textAlignVertical: 'top' }]} value={contactMessage} onChangeText={setContactMessage} placeholder="Describe your issue or order question in detail..." multiline maxLength={500} />
                <Text style={{ fontSize: 9, color: '#94A3B8', textAlign: 'right', marginTop: 2 }}>{contactMessage.length}/500</Text>
              </View>

              <TouchableOpacity style={s.attachBtn} onPress={() => Alert.alert('Attach Proof', 'Choose image from gallery')}>
                <Text style={{ fontSize: 14, marginRight: 6 }}>📷</Text>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#2563EB' }}>Attach Photo / Defect Proof (Optional)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[s.razorpayPayBtn, { marginTop: 14 }]} onPress={() => { Alert.alert('Ticket Submitted ✅', 'Ticket #TCK-' + Math.floor(10000 + Math.random() * 90000) + ' created!\nOur support team will contact you shortly.'); setContactSubject(''); setContactMessage(''); setContactUsModalVisible(false); }}>
                <Text style={s.razorpayPayBtnText}>Submit Support Ticket 🚀</Text>
              </TouchableOpacity>
            </View>

            {/* FLAGSHIP STORE LOCATION CARD */}
            <View style={[s.accSectionCard, { marginTop: 12, marginBottom: 20 }]}>
              <Text style={s.accSectionHeading}>🏢 Flagship Experience Store</Text>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F172A', marginTop: 4 }}>Jaiswal Mobile / ElectroMart Sitamarhi</Text>
              <Text style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>📍 Parsauni Chowk, Near Central Bank, Sitamarhi, Bihar - 843316</Text>
              <Text style={{ fontSize: 10, color: '#059669', fontWeight: 'bold', marginTop: 4 }}>🕐 Store Hours: 9:00 AM — 9:00 PM (Everyday)</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ===== RATE APP MODAL ===== */}
      <Modal visible={rateAppModalVisible} transparent animationType="fade" onRequestClose={() => setRateAppModalVisible(false)}>
        <View style={[s.modalOverlayBg, { justifyContent: 'center', alignItems: 'center' }]}>
          <View style={[s.accSectionCard, { width: width - 60, alignItems: 'center', padding: 24 }]}>
            <Text style={{ fontSize: 40, marginBottom: 8 }}>⭐</Text>
            <Text style={{ fontSize: 16, fontWeight: '900', color: '#0F172A', marginBottom: 4 }}>Rate ElectroMart</Text>
            <Text style={{ fontSize: 11, color: '#64748B', marginBottom: 16, textAlign: 'center' }}>How would you rate your experience?</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20 }}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => setAppRating(star)}>
                  <Text style={{ fontSize: 32, color: star <= appRating ? '#F59E0B' : '#E2E8F0' }}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
            {appRating > 0 && <Text style={{ fontSize: 12, color: '#059669', fontWeight: 'bold', marginBottom: 12 }}>{appRating >= 4 ? 'Thank you! ❤️' : appRating >= 3 ? 'We appreciate your feedback!' : 'We\'ll improve! 🙏'}</Text>}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={[s.orderActionBtn, { paddingHorizontal: 20 }]} onPress={() => setRateAppModalVisible(false)}>
                <Text style={s.orderActionBtnText}>Later</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.razorpayPayBtn, { paddingHorizontal: 20, marginTop: 0 }]} onPress={() => { setRateAppModalVisible(false); Alert.alert('Thanks! ⭐', `You rated ElectroMart ${appRating}/5 stars.`); }}>
                <Text style={s.razorpayPayBtnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ===== NOTIFICATIONS MODAL ===== */}
      <Modal visible={notificationsModalVisible} animationType="slide" onRequestClose={() => setNotificationsModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          {renderModalHeader('Notifications', () => setNotificationsModalVisible(false))}
          <ScrollView style={{ padding: 16 }}>
            {notifications.map(n => (
              <View key={n.id} style={[s.accSectionCard, { marginBottom: 10, borderLeftWidth: 3, borderLeftColor: n.read ? '#E2E8F0' : '#2563EB' }]}>
                <Text style={{ fontSize: 12, fontWeight: '900', color: '#0F172A' }}>{n.title}</Text>
                <Text style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>{n.body}</Text>
                <Text style={{ fontSize: 9, color: '#94A3B8', marginTop: 6 }}>{n.time}</Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ULTRA-MODERN FLOATING CAPSULE BOTTOM NAV BAR */}
      <View style={[s.floatingCapsuleTabBar, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF', borderColor: isDarkMode ? '#334155' : '#E2E8F0' }]}>
        {[
          { id: 'home', label: 'Home', icon: '🏠', icon3D: icons3D.home },
          { id: 'categories', label: 'Categories', icon: '📂', icon3D: icons3D.categories },
          { id: 'cart', label: 'Cart', icon: '🛒', icon3D: icons3D.cart, badge: cartItems.length },
          { id: 'orders', label: 'Orders', icon: '📦', icon3D: icons3D.orders, badge: ordersList.length },
          { id: 'account', label: 'Account', icon: '👤', icon3D: icons3D.account }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity key={tab.id} style={s.navCapsuleTabItem} activeOpacity={0.7} onPress={() => { setActiveTab(tab.id); setSearchResultsVisible(false); }}>
              <View style={[s.navActivePillBox, isActive && (isDarkMode ? s.navActivePillDark : s.navActivePillLight)]}>
                <View style={{ position: 'relative' }}>
                  <Image source={{ uri: tab.icon3D }} style={[s.nav3DIcon, tab.id === 'cart' && s.cartNavIconBig, isActive && s.nav3DIconActive]} />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <View style={s.tabNavBadgePill}>
                      <Text style={s.tabNavBadgeText}>{tab.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={[s.navTabLabel, { color: isActive ? '#2563EB' : (isDarkMode ? '#94A3B8' : '#64748B') }, isActive && s.navTabLabelActive]}>
                  {tab.label}
                </Text>
              </View>
              {isActive && <View style={s.activeTabGlowingDot} />}
            </TouchableOpacity>
          );
        })}
      </View>

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  topHeaderRow: { paddingTop: 38, paddingHorizontal: 14, paddingBottom: 8, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  brandLogoBox: { flexDirection: 'row', alignItems: 'center' },
  brandLogoImage: { width: 30, height: 30, resizeMode: 'contain', marginRight: 8 },
  brandTitleText: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  brandTaglineText: { fontSize: 9, color: '#64748B' },
  iconWithBadgeBtn: { position: 'relative' },
  redBadgeNotif: { position: 'absolute', top: -4, right: -4, backgroundColor: '#EF4444', borderRadius: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  blueBadgeCart: { position: 'absolute', top: -4, right: -4, backgroundColor: '#2563EB', borderRadius: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '900' },
  searchBarContainer: { paddingHorizontal: 14, backgroundColor: '#FFFFFF', paddingBottom: 8, zIndex: 10 },
  searchBarBox: { backgroundColor: '#F1F5F9', borderRadius: 8, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: 42 },
  searchInputText: { flex: 1, fontSize: 11, color: '#0F172A' },
  locationBarRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9', marginBottom: 8 },
  deliverToLabel: { fontSize: 10, color: '#64748B', flex: 1 },
  deliverToAddress: { fontSize: 10, fontWeight: 'bold', color: '#0F172A' },
  changeLocBtn: { backgroundColor: '#EFF6FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#BFDBFE' },
  changeLocBtnText: { fontSize: 10, fontWeight: 'bold', color: '#2563EB' },
  scrollArea: { flex: 1, paddingHorizontal: 14 },
  pageTitleHeader: { fontSize: 18, fontWeight: '900', color: '#0F172A' },

  // SEARCH DROPDOWN
  searchDropdown: { position: 'absolute', top: 50, left: 14, right: 14, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, elevation: 8, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, zIndex: 100, borderWidth: 1, borderColor: '#E2E8F0' },
  dropdownSectionLabel: { fontSize: 10, fontWeight: '900', color: '#64748B', marginBottom: 6 },
  suggestionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  suggestionText: { flex: 1, fontSize: 11, color: '#0F172A', fontWeight: '600' },
  suggestionPrice: { fontSize: 10, fontWeight: 'bold', color: '#2563EB' },

  // SEARCH RESULTS
  searchResultCard: { width: (width - 38) / 2, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 10, borderWidth: 1, borderColor: '#F1F5F9', marginBottom: 10, position: 'relative' },
  searchResultImg: { width: '100%', height: 90, resizeMode: 'contain', marginVertical: 4 },
  searchResultTitle: { fontSize: 10, fontWeight: 'bold', color: '#0F172A' },
  searchResultBrand: { fontSize: 9, color: '#64748B' },
  searchResultPrice: { fontSize: 13, fontWeight: '900', color: '#0F172A' },
  searchResultMrp: { fontSize: 9, color: '#94A3B8', textDecorationLine: 'line-through' },
  wishlistHeartBtn: { position: 'absolute', top: 8, right: 8, zIndex: 2 },
  ratingPillSmall: { backgroundColor: '#ECFDF5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  ratingPillText: { fontSize: 9, fontWeight: 'bold', color: '#059669' },
  addToCartMiniBtn: { backgroundColor: '#2563EB', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  activeFilterPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14, borderWidth: 1, borderColor: '#BFDBFE' },
  activeFilterText: { fontSize: 10, color: '#2563EB', fontWeight: 'bold' },

  // FILTER & SORT
  filterSectionTitle: { fontSize: 12, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
  filterChip: { backgroundColor: '#F1F5F9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  filterChipActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  filterChipText: { fontSize: 10, fontWeight: 'bold', color: '#475569' },
  filterChipTextActive: { color: '#FFFFFF' },
  sortOptionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, marginBottom: 4 },
  sortOptionText: { fontSize: 13, fontWeight: 'bold', color: '#0F172A' },

  // HOMEPAGE STYLES
  homeNavyHeroBannerCard: { backgroundColor: '#0B132B', borderRadius: 16, padding: 16, overflow: 'hidden' },
  homeHeroBannerCardLight: { backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#BFDBFE' },
  bigSaleBadgePill: { backgroundColor: '#1E293B', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 8, borderWidth: 1, borderColor: '#334155' },
  bigSaleBadgePillLight: { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' },
  bigSaleBadgeText: { color: '#F59E0B', fontSize: 9, fontWeight: '900' },
  homeHeroTitle: { fontSize: 19, fontWeight: '900', color: '#FFFFFF', lineHeight: 24 },
  homeHeroSub: { fontSize: 10, color: '#94A3B8', marginTop: 4, marginBottom: 14 },
  homeShopNowBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start' },
  homeShopNowBtnLight: { backgroundColor: '#2563EB', elevation: 2 },
  homeShopNowBtnText: { color: '#0B132B', fontSize: 11, fontWeight: 'bold' },
  blueCircleArrow: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  homeHeroGadgetsImg: { width: 130, height: 110, resizeMode: 'contain' },
  yellow60CircleBadge: { position: 'absolute', top: -6, right: -6, width: 48, height: 48, borderRadius: 24, backgroundColor: '#F59E0B', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFFFFF', zIndex: 10, elevation: 4 },
  yellow60BadgeText: { color: '#0F172A', fontSize: 7, fontWeight: 'bold', textAlign: 'center' },
  podiumBaseOval: { position: 'absolute', bottom: 4, width: 130, height: 32, borderRadius: 16, backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: '#00D2FE', justifyContent: 'center', alignItems: 'center', zIndex: 0 },
  podiumGlowRing: { width: 110, height: 20, borderRadius: 10, backgroundColor: 'rgba(0, 210, 254, 0.2)' },
  carouselDotsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 10 },
  cDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#475569' },
  cDotActive: { backgroundColor: '#2563EB', width: 16 },

  // 7-CIRCLE CATEGORY BAR STYLES
  sevenCircleBarCard: { borderRadius: 20, paddingVertical: 12, paddingHorizontal: 6, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6 },
  sevenCircleItem: { alignItems: 'center', flex: 1 },
  sevenCircleIconBox: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  sevenCircleImg: { width: 28, height: 28, resizeMode: 'contain' },
  sevenCircleLabel: { fontSize: 9, fontWeight: 'bold', textAlign: 'center' },

  sixSquareCatGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 8 },
  squareCatItemCard: { width: (width - 68) / 3, alignItems: 'center', marginBottom: 12 },
  squareCatImgBox: { width: 60, height: 60, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 4, borderWidth: 1, borderColor: '#E2E8F0' },
  squareCatImg: { width: 44, height: 44, resizeMode: 'contain' },
  squareCatLabelText: { fontSize: 10, fontWeight: 'bold', color: '#0F172A' },

  // ENHANCED 8 CATEGORY GRID STYLES
  eightCategoryGridRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 8 },
  enhancedCatCard: { width: (width - 76) / 4, alignItems: 'center', marginBottom: 14 },
  enhancedCatImgBox: { width: 58, height: 58, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 6, borderWidth: 1, borderColor: '#E2E8F0', position: 'relative' },
  enhancedCatImg: { width: 38, height: 38, resizeMode: 'contain' },
  catOfferPillBadge: { position: 'absolute', bottom: -6, paddingHorizontal: 4, paddingVertical: 1, borderRadius: 6 },
  catOfferPillText: { color: '#FFFFFF', fontSize: 6, fontWeight: '900', textAlign: 'center' },
  enhancedCatLabel: { fontSize: 9, fontWeight: 'bold', color: '#0F172A', textAlign: 'center', marginTop: 2 },
  enhancedCatCount: { fontSize: 7, color: '#64748B', textAlign: 'center' },

  // BESTSELLERS GRID STYLES
  bestsellerCard: { width: (width - 68) / 2, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 10, borderWidth: 1, borderColor: '#F1F5F9', marginBottom: 12, position: 'relative' },
  bestsellerTopBadgePill: { backgroundColor: '#FEF3C7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 4, borderWidth: 1, borderColor: '#FDE68A' },
  bestsellerTopBadgeText: { color: '#B45309', fontSize: 8, fontWeight: '900' },
  bestsellerImg: { width: '100%', height: 95, resizeMode: 'contain', marginVertical: 4 },
  bestsellerTitle: { fontSize: 10, fontWeight: 'bold', color: '#0F172A' },
  bestsellerBrand: { fontSize: 8, color: '#64748B', marginTop: 1 },
  bestsellerPrice: { fontSize: 12, fontWeight: '900', color: '#0F172A' },
  bestsellerMrp: { fontSize: 9, color: '#94A3B8', textDecorationLine: 'line-through' },

  // BUDGET STORE STYLES
  budgetStoreCard: { width: 140, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 8, borderWidth: 1, borderColor: '#E2E8F0', position: 'relative' },
  greenDiscountBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: '#059669', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, zIndex: 1 },
  greenDiscountText: { color: '#FFFFFF', fontSize: 8, fontWeight: '900' },
  budgetStoreImg: { width: '100%', height: 80, resizeMode: 'contain', marginVertical: 4 },
  budgetStoreTitle: { fontSize: 10, fontWeight: 'bold', color: '#0F172A' },
  budgetStorePrice: { fontSize: 12, fontWeight: '900', color: '#059669', marginTop: 2 },
  budgetStoreMrp: { fontSize: 9, color: '#94A3B8', textDecorationLine: 'line-through' },

  threePromoRow: { flexDirection: 'row', gap: 8 },
  promoCardBox: { flex: 1, borderRadius: 12, padding: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  promoShopPillBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', borderWidth: 1, borderColor: '#CBD5E1' },
  promoShopPillText: { fontSize: 8, fontWeight: 'bold', color: '#1E293B' },

  pinkTimerPill: { backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, borderWidth: 1, borderColor: '#FCA5A5' },
  pinkTimerText: { color: '#EF4444', fontSize: 9, fontWeight: '900' },

  topDealProductCard: { width: 135, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 8, borderWidth: 1, borderColor: '#F1F5F9', position: 'relative' },
  redDiscountBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: '#EF4444', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, zIndex: 1 },
  redDiscountText: { color: '#FFFFFF', fontSize: 8, fontWeight: '900' },
  topDealImg: { width: '100%', height: 80, resizeMode: 'contain', marginVertical: 4 },
  topDealTitle: { fontSize: 10, fontWeight: 'bold', color: '#0F172A' },
  topDealPrice: { fontSize: 12, fontWeight: '900', color: '#0F172A', marginTop: 2 },
  topDealMrp: { fontSize: 9, color: '#94A3B8', textDecorationLine: 'line-through' },
  blueCartSmallBtn: { position: 'absolute', bottom: 8, right: 8, backgroundColor: '#2563EB', width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },

  noCostEmiLongBanner: { backgroundColor: '#2563EB', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  yellowPercentTag: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F59E0B', alignItems: 'center', justifyContent: 'center' },
  noCostEmiTitle: { fontSize: 14, fontWeight: '900', color: '#FFFFFF' },
  noCostEmiSub: { fontSize: 9, color: '#DBEAFE', marginTop: 1 },
  exploreOffersWhiteBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  exploreOffersBtnText: { color: '#2563EB', fontSize: 10, fontWeight: 'bold' },

  whyChooseGrid6: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  whyChooseColItem: { width: (width - 78) / 2, backgroundColor: '#F8FAFC', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  whyChooseTitleText: { fontSize: 10, fontWeight: 'bold', color: '#0F172A' },
  whyChooseSubText: { fontSize: 8, color: '#64748B', marginTop: 2 },

  testimonialCardBox: { width: 220, backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  testimonialReviewText: { fontSize: 9, color: '#334155', fontStyle: 'italic', lineHeight: 13 },
  reviewerAvatarCircle: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' },
  reviewerNameText: { fontSize: 10, fontWeight: 'bold', color: '#0F172A' },

  topBrandsRowGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  brandBoxLogoCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  brandTextLogo: { fontSize: 11, fontWeight: '900', color: '#0F172A' },

  faqAccordionRow: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingVertical: 10 },
  faqQuestionText: { fontSize: 11, fontWeight: 'bold', color: '#0F172A', flex: 1, marginRight: 8 },
  faqAnswerText: { fontSize: 10, color: '#64748B', marginTop: 4, lineHeight: 14 },
  stillQuestionsCard: { backgroundColor: '#EFF6FF', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', marginTop: 12, borderWidth: 1, borderColor: '#BFDBFE' },
  stillQuestionsTitle: { fontSize: 11, fontWeight: '900', color: '#1E40AF' },
  stillQuestionsSub: { fontSize: 8, color: '#1E3A8A', marginTop: 1 },
  contactSupportPillBtn: { backgroundColor: '#2563EB', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14 },
  contactSupportBtnText: { color: '#FFFFFF', fontSize: 9, fontWeight: 'bold' },

  // CATEGORY
  catPageMainTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  catPageSubTitle: { fontSize: 11, color: '#64748B', marginTop: 1 },
  catPurpleBannerCard: { backgroundColor: '#EEF2FF', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
  catBannerTitle: { fontSize: 17, fontWeight: '900', color: '#1E1B4B', lineHeight: 22 },
  catBannerSub: { fontSize: 10, color: '#4338CA', marginTop: 4, marginBottom: 12, fontWeight: 'bold' },
  catBannerShopBtn: { backgroundColor: '#0F172A', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, alignSelf: 'flex-start' },
  catBannerShopBtnText: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },
  catBannerImg: { width: 110, height: 100, resizeMode: 'contain' },
  purple60Badge: { position: 'absolute', top: -4, right: -4, width: 48, height: 48, borderRadius: 24, backgroundColor: '#6366F1', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#818CF8' },
  purple60BadgeText: { color: '#FFFFFF', fontSize: 7, fontWeight: 'bold', textAlign: 'center' },

  topCirclesGridRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 6 },
  circleCatItem: { width: (width - 44) / 6, alignItems: 'center', marginBottom: 10 },
  circleIconBox: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 4, borderWidth: 1, borderColor: '#F1F5F9' },
  circleCatImg: { width: 32, height: 32, resizeMode: 'contain' },
  circleCatLabel: { fontSize: 9, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', lineHeight: 12 },

  accSectionCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0', elevation: 1 },
  accSectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  accSectionHeading: { fontSize: 14, fontWeight: '900', color: '#0F172A' },
  accViewAllBlueLink: { fontSize: 11, color: '#2563EB', fontWeight: 'bold' },

  catDetailedRowItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  catSquareIconBox: { width: 44, height: 44, borderRadius: 10, backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  catSquareImg: { width: 34, height: 34, resizeMode: 'contain' },
  catRowTitleText: { fontSize: 12, fontWeight: 'bold', color: '#0F172A' },
  catRowSubText: { fontSize: 9, color: '#64748B', marginTop: 2 },
  countBadgePill: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  countBadgePillText: { fontSize: 9, fontWeight: 'bold', color: '#475569' },

  trustStripFourBox: { backgroundColor: '#F8FAFC', borderRadius: 14, padding: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 6, borderWidth: 1, borderColor: '#E2E8F0' },
  trustStripCol: { width: (width - 64) / 2, flexDirection: 'row', alignItems: 'center' },
  trustStripTitle: { fontSize: 10, fontWeight: 'bold', color: '#0F172A' },
  trustStripSub: { fontSize: 8, color: '#64748B' },

  // ACCOUNT
  accProfileCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  accProfileTopRow: { flexDirection: 'row', alignItems: 'center' },
  accAvatarBox: { position: 'relative' },
  accAvatarCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' },
  accCameraBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FFFFFF', width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#CBD5E1' },
  accUserNameText: { fontSize: 17, fontWeight: '900', color: '#0F172A' },
  blueCheckCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  accUserEmailText: { fontSize: 11, color: '#64748B', marginTop: 2 },
  accUserPhoneText: { fontSize: 11, color: '#475569', marginTop: 2 },
  editProfilePillBtn: { backgroundColor: '#EFF6FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#BFDBFE' },
  editProfilePillText: { color: '#2563EB', fontSize: 10, fontWeight: 'bold' },
  accCardDivider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 14 },
  accFourStatsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  accStatCol: { flex: 1, alignItems: 'center' },
  accStatLabel: { fontSize: 9, color: '#64748B', fontWeight: '600' },
  accStatNumber: { fontSize: 16, fontWeight: '900', color: '#0F172A', marginTop: 2 },
  accStatLinkText: { fontSize: 9, color: '#2563EB', fontWeight: 'bold', marginTop: 2 },
  accStatVerticalLine: { width: 1, height: 28, backgroundColor: '#E2E8F0' },

  primeCardContainer: { backgroundColor: '#1E40AF', borderRadius: 16, padding: 16 },
  primeTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  crownCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  primeCardTitle: { fontSize: 14, fontWeight: '900', color: '#FFFFFF' },
  primeActiveBadge: { backgroundColor: '#059669', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  primeActiveText: { color: '#FFFFFF', fontSize: 8, fontWeight: 'bold' },
  primeCardSub: { fontSize: 9, color: '#BFDBFE', marginTop: 2 },
  viewBenefitsBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  viewBenefitsBtnText: { color: '#1E40AF', fontSize: 10, fontWeight: 'bold' },
  primeFeaturesStrip: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 10, flexDirection: 'row', gap: 6 },
  primeFeatureItem: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  primeFeatureTitle: { fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' },
  primeFeatureSub: { fontSize: 8, color: '#DBEAFE' },

  accListRowItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  accListIconCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  accListRowTitle: { fontSize: 11, fontWeight: 'bold', color: '#0F172A' },
  accListRowSub: { fontSize: 9, color: '#64748B', marginTop: 1 },
  accLogoutBtn: { backgroundColor: '#FFFFFF', borderRadius: 14, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: '#FCA5A5', marginTop: 4, marginBottom: 10 },
  accLogoutBtnText: { color: '#EF4444', fontSize: 12, fontWeight: 'bold' },

  // CART
  emptyCartBox: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 30, alignItems: 'center', marginTop: 10 },
  emptyCartTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 6 },
  startShoppingBtn: { backgroundColor: '#2563EB', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  startShoppingBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  cartItemCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  cartItemImg: { width: 65, height: 65, resizeMode: 'contain' },
  cartItemTitle: { fontSize: 11, fontWeight: 'bold', color: '#0F172A' },
  cartOfferPrice: { fontSize: 13, fontWeight: '900', color: '#0F172A', marginTop: 4 },
  qtyBtn: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  qtyBtnText: { fontSize: 14, fontWeight: '900', color: '#0F172A' },
  billSummaryCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: '#F1F5F9' },
  billTitle: { fontSize: 13, fontWeight: '900', color: '#0F172A', marginBottom: 10 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between' },
  billTotalLabel: { fontSize: 13, fontWeight: '900', color: '#0F172A' },
  billTotalValue: { fontSize: 15, fontWeight: '900', color: '#2563EB' },
  razorpayDirectBtn: { backgroundColor: '#0B72E7', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 12, marginBottom: 8 },
  razorpayDirectBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  checkoutSecondaryBtn: { backgroundColor: '#F1F5F9', borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#CBD5E1' },
  checkoutSecondaryBtnText: { color: '#0F172A', fontSize: 11, fontWeight: 'bold' },

  // ORDERS
  orderHistoryCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  orderHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderIdText: { fontSize: 12, fontWeight: '900', color: '#0F172A' },
  orderDateText: { fontSize: 9, color: '#64748B', marginTop: 2 },
  orderStatusPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  orderStatusPillText: { color: '#FFFFFF', fontSize: 9, fontWeight: '900' },
  orderDivider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 8 },
  orderItemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  orderItemImg: { width: 40, height: 40, resizeMode: 'contain' },
  orderItemTitle: { fontSize: 10, fontWeight: 'bold', color: '#0F172A' },
  orderItemPrice: { fontSize: 9, color: '#64748B', marginTop: 2 },
  orderActionBtn: { flex: 1, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  orderActionBtnText: { fontSize: 10, fontWeight: 'bold', color: '#475569' },

  // MODALS SHARED
  modalOverlayBg: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
  razorpayModalContainer: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  razorpayHeaderBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingBottom: 10 },
  razorpayPayBtn: { backgroundColor: '#0B72E7', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  razorpayPayBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  rzpTabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8, backgroundColor: '#F1F5F9' },
  rzpTabBtnActive: { backgroundColor: '#2563EB' },
  rzpTabBtnText: { fontSize: 11, fontWeight: 'bold', color: '#475569' },
  rzpTabBtnTextActive: { color: '#FFFFFF' },
  rzpInput: { backgroundColor: '#F8FAFC', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 12, color: '#0F172A', borderWidth: 1, borderColor: '#E2E8F0' },
  upiAppPill: { backgroundColor: '#EFF6FF', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 14, borderWidth: 1, borderColor: '#BFDBFE' },
  bankRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  receiptTopHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  receiptBannerCard: { backgroundColor: '#059669', borderRadius: 14, padding: 20, alignItems: 'center', marginBottom: 14 },
  checkoutPrimaryBtn: { backgroundColor: '#059669', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 12, marginBottom: 20 },
  checkoutPrimaryBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },

  // DRAWER
  drawerContainer: { width: width * 0.78, backgroundColor: '#FFFFFF', elevation: 10 },
  drawerHeader: { backgroundColor: '#1E40AF', paddingHorizontal: 16, paddingTop: 40, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  drawerUserCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  drawerNavItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 18 },
  drawerNavLabel: { fontSize: 13, fontWeight: '600', color: '#1E293B', flex: 1 },
  drawerBadge: { backgroundColor: '#EF4444', borderRadius: 10, minWidth: 20, paddingHorizontal: 6, paddingVertical: 2, alignItems: 'center' },
  drawerBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '900' },
  drawerFooter: { padding: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },

  // PROFILE MODALS
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingTop: 40 },
  modalBackBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  modalHeaderTitle: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  profileInput: { backgroundColor: '#F8FAFC', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 12, color: '#0F172A', borderWidth: 1, borderColor: '#E2E8F0' },
  addNewAddrBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12, borderWidth: 2, borderColor: '#BFDBFE', borderStyle: 'dashed', marginBottom: 14, backgroundColor: '#FAFAFA' },
  addrTypePill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },

  themeToggleHeaderBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },

  // ACCOUNT HERO & GROUP STYLES
  accProfileHeroCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0', elevation: 2 },
  accSectionGroupHeader: { fontSize: 10, fontWeight: '900', color: '#64748B', letterSpacing: 0.5, marginBottom: 8, marginTop: 4 },

  // HELP CENTER PREMIUM STYLES
  helpHeroCard: { backgroundColor: '#0F172A', borderRadius: 16, padding: 16, marginBottom: 14 },
  helpHeadsetCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  helpHeroTitle: { fontSize: 18, fontWeight: '900', color: '#FFFFFF' },
  helpHeroSub: { fontSize: 10, color: '#94A3B8', marginTop: 2 },
  helpSearchBox: { backgroundColor: '#1E293B', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, height: 40, marginTop: 12, borderWidth: 1, borderColor: '#334155' },
  helpSearchInput: { flex: 1, fontSize: 11, color: '#FFFFFF' },
  helpTopicChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  helpTopicChipText: { fontSize: 11, fontWeight: 'bold', color: '#0F172A' },
  helpfulBtn: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1' },
  liveChatBannerCard: { backgroundColor: '#2563EB', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginBottom: 20 },
  liveChatTitle: { fontSize: 13, fontWeight: '900', color: '#FFFFFF' },
  liveChatSub: { fontSize: 9, color: '#DBEAFE', marginTop: 1 },
  startChatBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  startChatBtnText: { color: '#2563EB', fontSize: 10, fontWeight: 'bold' },

  // CONTACT US SUPPORT PREMIUM STYLES
  contactHeroCard: { backgroundColor: '#065F46', borderRadius: 16, padding: 16, marginBottom: 14 },
  contactHeroTitle: { fontSize: 17, fontWeight: '900', color: '#FFFFFF' },
  contactHeroSub: { fontSize: 10, color: '#A7F3D0', marginTop: 2 },
  contactActionCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  contactIconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  contactCardTitle: { fontSize: 12, fontWeight: '900', color: '#0F172A' },
  contactCardDetail: { fontSize: 10, fontWeight: 'bold', color: '#2563EB', marginTop: 2 },
  contactCardSub: { fontSize: 8, color: '#64748B', marginTop: 1 },
  contactActionPill: { backgroundColor: '#2563EB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  contactActionPillText: { color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' },
  attachBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#BFDBFE', backgroundColor: '#EFF6FF' },

  // ULTRA-MODERN FLOATING CAPSULE BOTTOM NAV BAR STYLES
  floatingCapsuleTabBar: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    right: 14,
    height: 64,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    elevation: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    paddingHorizontal: 6
  },
  navCapsuleTabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' },
  navActivePillBox: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  navActivePillLight: { backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#BFDBFE' },
  navActivePillDark: { backgroundColor: 'rgba(37, 99, 235, 0.25)', borderWidth: 1, borderColor: '#1E40AF' },
  nav3DIcon: { width: 26, height: 26, resizeMode: 'contain', opacity: 0.7 },
  cartNavIconBig: { width: 33, height: 33, opacity: 1 },
  nav3DIconActive: { opacity: 1, transform: [{ scale: 1.18 }] },
  navTabLabel: { fontSize: 9, fontWeight: 'bold', marginTop: 2 },
  navTabLabelActive: { color: '#2563EB', fontWeight: '900' },
  activeTabGlowingDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#2563EB', marginTop: 2 },
  tabNavBadgePill: { position: 'absolute', top: -4, right: -8, backgroundColor: '#EF4444', borderRadius: 8, minWidth: 14, height: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3, borderWidth: 1, borderColor: '#FFFFFF' },
  tabNavBadgeText: { color: '#FFFFFF', fontSize: 7, fontWeight: '900' }
});
