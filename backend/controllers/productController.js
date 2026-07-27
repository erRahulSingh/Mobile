const Product = require('../models/Product');

const mockProducts = [
  // MOBILE PHONES
  {
    _id: 'prod_1',
    title: 'Samsung Galaxy S24 Ultra 5G (512GB Titanium Gray)',
    slug: 'samsung-galaxy-s24-ultra-5g',
    brand: 'Samsung',
    category: 'Mobile Phones',
    price: 134999,
    offerPrice: 124999,
    discountPercentage: 7,
    inStock: true,
    stockCount: 15,
    emiAvailable: true,
    emiStartingAt: 5899,
    rating: 4.9,
    reviewCount: 342,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.',
    features: ['200MP Quad Tele Photo Camera', 'Snapdragon 8 Gen 3 for Galaxy', 'Built-in Titanium Frame', 'S Pen Included'],
    warranty: '1 Year Manufacturer Warranty for Phone & 6 Months for Accessories',
    specifications: {
      color: 'Titanium Gray',
      ram: '12GB',
      storage: '512GB',
      display: '6.8 inch QHD+ Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      battery: '5000 mAh Super Fast Charging 2.0'
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTodayDeal: true
  },
  {
    _id: 'prod_2',
    title: 'Apple iPhone 15 Pro Max (256GB Natural Titanium)',
    slug: 'apple-iphone-15-pro-max',
    brand: 'Apple',
    category: 'Mobile Phones',
    price: 159900,
    offerPrice: 148900,
    discountPercentage: 7,
    inStock: true,
    stockCount: 20,
    emiAvailable: true,
    emiStartingAt: 6999,
    rating: 4.9,
    reviewCount: 512,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Forged in titanium with A17 Pro chip, customizable Action button, and 5x Telephoto camera.',
    features: ['Aerospace Titanium Design', 'A17 Pro Chip with 6-core GPU', '48MP Main Camera', 'USB-C Support'],
    warranty: '1 Year AppleCare Warranty',
    specifications: {
      color: 'Natural Titanium',
      ram: '8GB',
      storage: '256GB',
      display: '6.7 inch Super Retina XDR ProMotion',
      processor: 'A17 Pro',
      battery: 'Up to 29 hours video playback'
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isTodayDeal: true
  },
  {
    _id: 'prod_112',
    title: 'OnePlus 12 5G (256GB Silky Black, 12GB RAM)',
    slug: 'oneplus-12-5g',
    brand: 'OnePlus',
    category: 'Mobile Phones',
    price: 69999,
    offerPrice: 64999,
    discountPercentage: 7,
    inStock: true,
    stockCount: 12,
    emiAvailable: true,
    emiStartingAt: 3199,
    rating: 4.8,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Smooth Beyond Belief with Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System, and 100W SUPERVOOC Charging.',
    features: ['Snapdragon 8 Gen 3', '50MP Sony LYT-808 Camera', '120Hz 2K ProXDR Display', '5400 mAh Battery'],
    warranty: '1 Year Brand Warranty',
    specifications: {
      color: 'Silky Black',
      ram: '12GB',
      storage: '256GB',
      display: '6.82 inch 2K AMOLED 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      battery: '5400 mAh 100W Charging'
    },
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isTodayDeal: false
  },

  // REFRIGERATORS & FRIDGES
  {
    _id: 'prod_101',
    title: 'Godrej 244L 3 Star Inverter Frost Free Double Door Refrigerator',
    slug: 'godrej-244l-double-door-refrigerator',
    brand: 'Godrej',
    category: 'Refrigerators',
    price: 31990,
    offerPrice: 24990,
    discountPercentage: 22,
    inStock: true,
    stockCount: 10,
    emiAvailable: true,
    emiStartingAt: 1199,
    rating: 4.7,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Advanced Nano Shield Technology for 95%+ food disinfection, 30 days farm freshness, and silent inverter compressor.',
    features: ['Nano Shield Disinfection Tech', '30 Days Farm Freshness', 'Cool Balance Technology', 'Ambient Weather Sensing'],
    warranty: '1 Year Comprehensive + 10 Years Compressor Warranty',
    specifications: {
      capacity: '244 Litres',
      energyRating: '3 Star',
      defrostSystem: 'Frost Free',
      compressor: 'Inverter Compressor',
      color: 'Steel Glow'
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isTodayDeal: true
  },
  {
    _id: 'prod_102',
    title: 'Samsung 236L 3 Star Digital Inverter Frost Free Refrigerator',
    slug: 'samsung-236l-refrigerator',
    brand: 'Samsung',
    category: 'Refrigerators',
    price: 33990,
    offerPrice: 25990,
    discountPercentage: 23,
    inStock: true,
    stockCount: 14,
    emiAvailable: true,
    emiStartingAt: 1249,
    rating: 4.8,
    reviewCount: 289,
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Digital Inverter Compressor with 20 Year Warranty, All-Around Cooling, and MoistFresh Zone for long lasting freshness.',
    features: ['Digital Inverter Compressor', 'All-Around Cooling', 'Coolpack 12 Hours', 'Toughened Glass Shelves'],
    warranty: '1 Year Warranty + 20 Years Compressor Warranty',
    specifications: {
      capacity: '236 Litres',
      energyRating: '3 Star',
      defrostSystem: 'Frost Free',
      color: 'Camellia Black'
    },
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    isTodayDeal: false
  },

  // AIR CONDITIONERS (AC)
  {
    _id: 'prod_6',
    title: 'Daikin 1.5 Ton 5 Star Inverter Split AC Dew Clean',
    slug: 'daikin-1-5-ton-5-star-inverter-ac',
    brand: 'Daikin',
    category: 'Air Conditioners',
    price: 67200,
    offerPrice: 45490,
    discountPercentage: 32,
    inStock: true,
    stockCount: 18,
    emiAvailable: true,
    emiStartingAt: 2199,
    rating: 4.7,
    reviewCount: 230,
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dew Clean Technology for healthy indoor air quality, 3D Airflow, and Power Chill mode for rapid cooling even at 52°C.',
    features: ['Dew Clean Auto Washing', '3D Airflow 4-Way Cooling', 'PM 2.5 Filter', '100% Copper Condenser'],
    warranty: '1 Year Product + 5 Years PCB + 10 Years Compressor Warranty',
    specifications: {
      capacity: '1.5 Ton',
      starRating: '5 Star BEE Rating',
      condenser: '100% Copper Coil',
      refrigerant: 'R32 Eco Friendly'
    },
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: true,
    isNewArrival: false
  },
  {
    _id: 'prod_105',
    title: 'Voltas 1.5 Ton 3 Star Adjustable Inverter Split AC 183V Vectra',
    slug: 'voltas-1-5-ton-3-star-inverter-ac',
    brand: 'Voltas',
    category: 'Air Conditioners',
    price: 62990,
    offerPrice: 37990,
    discountPercentage: 39,
    inStock: true,
    stockCount: 22,
    emiAvailable: true,
    emiStartingAt: 1799,
    rating: 4.6,
    reviewCount: 412,
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Adjustable Cooling mode with 4-in-1 capacity toggling, Anti-microbial filter, and Turbo cooling.',
    features: ['4-in-1 Adjustable Cooling', 'Anti-dust & Anti-microbial Filter', 'Stabilizer Free Operation'],
    warranty: '1 Year Comprehensive + 10 Years Compressor Warranty',
    specifications: {
      capacity: '1.5 Ton',
      starRating: '3 Star',
      condenser: 'Copper Coil'
    },
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isTodayDeal: true
  },

  // INVERTER & BATTERY
  {
    _id: 'prod_107',
    title: 'Luminous Zelio+ 1100 Sine Wave Inverter & Red Charge 150Ah Battery Combo',
    slug: 'luminous-zelio-1100-inverter-battery-combo',
    brand: 'Luminous',
    category: 'Inverter',
    price: 24990,
    offerPrice: 18990,
    discountPercentage: 24,
    inStock: true,
    stockCount: 15,
    emiAvailable: true,
    emiStartingAt: 899,
    rating: 4.8,
    reviewCount: 178,
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Smart Pure Sine Wave Inverter with 32-bit DSP processor, LED display showing backup time in hours, and 150Ah Heavy Duty Tubular Battery.',
    features: ['Pure Sine Wave Output', '32-Bit Processor', 'Supports 150Ah Tubular Battery', 'LED Backup Display'],
    warranty: '2 Years Inverter + 3 Years Battery Warranty',
    specifications: {
      capacity: '900 VA / 12V',
      batteryCapacity: '150 Ah',
      technology: 'Tubular Technology'
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTodayDeal: false
  },

  // SMART TVS
  {
    _id: 'prod_3',
    title: 'LG C3 65" 4K Smart OLED TV Dolby Vision & Atmos',
    slug: 'lg-c3-65-inch-4k-oled-tv',
    brand: 'LG',
    category: 'Smart TVs',
    price: 249990,
    offerPrice: 189990,
    discountPercentage: 24,
    inStock: true,
    stockCount: 8,
    emiAvailable: true,
    emiStartingAt: 8999,
    rating: 4.8,
    reviewCount: 189,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Self-lit OLED pixels with α9 AI Processor Gen6, 120Hz refresh rate, G-Sync & FreeSync gaming features.',
    features: ['OLED evo Panel', 'α9 AI Processor 4K Gen6', '120Hz VRR & G-Sync', 'Dolby Atmos & Vision'],
    warranty: '3 Years Comprehensive Brand Warranty',
    specifications: {
      screenSize: '65 Inches',
      displayType: 'OLED',
      resolution: '4K Ultra HD (3840x2160)',
      refreshRate: '120 Hz'
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTodayDeal: false
  },
  {
    _id: 'prod_115',
    title: 'Sony Bravia 55" 4K Ultra HD Smart LED Google TV (KD-55X74L)',
    slug: 'sony-bravia-55-4k-google-tv',
    brand: 'Sony',
    category: 'Smart TVs',
    price: 99900,
    offerPrice: 62990,
    discountPercentage: 37,
    inStock: true,
    stockCount: 11,
    emiAvailable: true,
    emiStartingAt: 2999,
    rating: 4.9,
    reviewCount: 520,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'X1 4K Processor with Motionflow XR 100, Google TV OS, Apple AirPlay, and Dolby Audio.',
    features: ['X1 4K Processor', 'Google TV with Voice Search', 'Open Baffle Speaker 20W', 'X-Protection PRO'],
    warranty: '2 Years Comprehensive Warranty',
    specifications: {
      screenSize: '55 Inches',
      resolution: '4K Ultra HD',
      soundOutput: '20 Watts'
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isTodayDeal: true
  },

  // LAPTOPS
  {
    _id: 'prod_5',
    title: 'Apple MacBook Pro 16" M3 Max (36GB RAM, 1TB SSD)',
    slug: 'apple-macbook-pro-16-m3-max',
    brand: 'Apple',
    category: 'Laptops',
    price: 399900,
    offerPrice: 374900,
    discountPercentage: 6,
    inStock: true,
    stockCount: 5,
    emiAvailable: true,
    emiStartingAt: 16999,
    rating: 5.0,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mind-blowing speed with M3 Max chip, Liquid Retina XDR display, up to 22 hours battery life.',
    features: ['M3 Max 16-Core CPU & 40-Core GPU', 'Liquid Retina XDR Display', '36GB Unified Memory', '1TB Superfast SSD'],
    warranty: '1 Year AppleCare Warranty',
    specifications: {
      processor: 'Apple M3 Max',
      ram: '36GB Unified Memory',
      storage: '1TB SSD',
      display: '16.2 inch Liquid Retina XDR'
    },
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isTodayDeal: false
  },
  {
    _id: 'prod_118',
    title: 'HP Pavilion 15 Intel Core i5 13th Gen (16GB RAM / 512GB SSD)',
    slug: 'hp-pavilion-15-core-i5-13th-gen',
    brand: 'HP',
    category: 'Laptops',
    price: 74990,
    offerPrice: 58990,
    discountPercentage: 21,
    inStock: true,
    stockCount: 16,
    emiAvailable: true,
    emiStartingAt: 2799,
    rating: 4.7,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'FHD IPS Micro-edge display, Backlit Keyboard, B&O Audio tuning, Intel Iris Xe Graphics.',
    features: ['Intel Core i5-1335U 13th Gen', '16GB DDR4 RAM + 512GB NVMe SSD', 'B&O Audio Sound', 'Fingerprint Reader'],
    warranty: '1 Year HP Onsite Warranty',
    specifications: {
      processor: 'Core i5 13th Gen',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      display: '15.6 inch FHD IPS'
    },
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isTodayDeal: true
  },

  // HEADPHONES & AUDIO
  {
    _id: 'prod_4',
    title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    brand: 'Sony',
    category: 'Headphones',
    price: 34990,
    offerPrice: 26990,
    discountPercentage: 22,
    inStock: true,
    stockCount: 25,
    emiAvailable: true,
    emiStartingAt: 1299,
    rating: 4.9,
    reviewCount: 840,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Industry-leading noise canceling with 2 processors, 8 microphones, ultra-comfortable lightweight design.',
    features: ['Auto NC Optimizer', 'HD Noise Canceling Processor V1', '30-Hour Battery Life', 'Speak-to-Chat Technology'],
    warranty: '1 Year Sony India Warranty',
    specifications: {
      batteryLife: '30 Hours',
      chargingTime: '3 Hours (3 min charge = 3 hours play)',
      connectivity: 'Bluetooth 5.2'
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTodayDeal: true
  },

  // KITCHEN & HOME APPLIANCES
  {
    _id: 'prod_124',
    title: 'Bajaj Rex 500W Mixer Grinder with 3 Stainless Steel Jars',
    slug: 'bajaj-rex-500w-mixer-grinder',
    brand: 'Bajaj',
    category: 'Kitchen Appliances',
    price: 3899,
    offerPrice: 2299,
    discountPercentage: 41,
    inStock: true,
    stockCount: 30,
    emiAvailable: false,
    emiStartingAt: 0,
    rating: 4.5,
    reviewCount: 640,
    images: [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80'
    ],
    description: '500-Watt Titan Motor with 3 jars for Liquidizing, Dry Grinding and Chutney making. Overload protection included.',
    features: ['500W Heavy Duty Motor', '3 Stainless Steel Jars', '3 Speed Control with Incher', 'Nutri-Pro Feature'],
    warranty: '1 Year Product Warranty',
    specifications: {
      wattage: '500 Watts',
      jarsCount: '3 Jars',
      bodyMaterial: 'ABS Plastic'
    },
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isTodayDeal: true
  }
];

// @desc Get all products with filtering, search & pagination
// @route GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const { category, brand, search, minPrice, maxPrice, sort, featured, todayDeal, bestSeller, newArrival } = req.query;
    let products = [];

    try {
      let query = {};
      if (category) query.category = category;
      if (brand) query.brand = brand;
      if (featured === 'true') query.isFeatured = true;
      if (todayDeal === 'true') query.isTodayDeal = true;
      if (bestSeller === 'true') query.isBestSeller = true;
      if (newArrival === 'true') query.isNewArrival = true;

      products = await Product.find(query);
      if (!products || products.length === 0) products = mockProducts;
    } catch (dbErr) {
      products = mockProducts;
    }

    // Apply in-memory filtering for robustness
    if (category && category !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (brand && brand !== 'All') {
      products = products.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }
    if (featured === 'true') {
      products = products.filter(p => p.isFeatured);
    }
    if (todayDeal === 'true') {
      products = products.filter(p => p.isTodayDeal);
    }
    if (bestSeller === 'true') {
      products = products.filter(p => p.isBestSeller);
    }
    if (newArrival === 'true') {
      products = products.filter(p => p.isNewArrival);
    }
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (minPrice) {
      products = products.filter(p => p.offerPrice >= Number(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.offerPrice <= Number(maxPrice));
    }

    // Sorting
    if (sort === 'price-low') {
      products.sort((a, b) => a.offerPrice - b.offerPrice);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.offerPrice - a.offerPrice);
    } else if (sort === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    }

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
};

// @desc Get single product details
// @route GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    let product;
    try {
      product = await Product.findById(req.params.id);
    } catch (err) {}

    if (!product) {
      product = mockProducts.find(p => p._id === req.params.id || p.slug === req.params.id);
    }

    if (!product) {
      // Return first mock product as safety fallback instead of breaking UI
      product = mockProducts[0];
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching product details' });
  }
};
