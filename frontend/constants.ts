import { Product, LookbookItem, Review } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'fs-01',
    name: '4 SHERROS Oversized Acid Wash Heavyweight Hoodie',
    brand: '4 SHERROS RECLAIMED',
    category: 'streetwear',
    gender: 'unisex',
    price: 68.00,
    originalPrice: 85.00,
    rating: 4.8,
    reviewCount: 142,
    isNew: true,
    isSale: true,
    isTrending: true,
    colors: ['Vintage Charcoal', 'Washed Olive', 'Bone White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Designed exclusively in-house by 4 SHERROS. Crafted from 480GSM loopback French terry with dramatic drop shoulders, distressed hem details, and signature boxy silhouette inspired by 90s London underground culture.',
    details: [
      'Heavyweight 480 GSM 100% organic cotton',
      'Double-lined ergonomic drawstring hood',
      'Kangaroo pouch pocket with reinforced bartacks',
      'Ribbed cuffs and hem with subtle vintage distressing',
      'Pre-shrunk custom garment wash'
    ],
    fit: 'Ultra relaxed oversized fit. Size down for regular silhouette.',
    modelInfo: 'Model is 6\'1" / 185cm wearing size Medium'
  },
  {
    id: 'fs-02',
    name: 'Wide Leg Cargo Parachute Utility Trousers',
    brand: '4 SHERROS STREET',
    category: 'clothing',
    gender: 'unisex',
    price: 54.00,
    originalPrice: 70.00,
    rating: 4.6,
    reviewCount: 98,
    isNew: false,
    isSale: true,
    isTrending: true,
    colors: ['Tactical Khaki', 'Jet Black', 'Slate Grey'],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The defining silhouette of the season. Premium technical ripstop featuring articulated knee darts, bungee toggles at ankles, and 8 deep utility pockets for functional urban storage.',
    details: [
      'Durable matte ripstop nylon blend',
      'Adjustable toggle drawcord cuffs',
      'Elasticated waistband with metal-tipped cords',
      'Deep dual cargo bellow pockets'
    ],
    fit: 'Wide leg balloon parachute drape with cinchable hems.',
    modelInfo: 'Model is 5\'10" / 178cm wearing 30W'
  },
  {
    id: 'fs-03',
    name: 'Sherros Edition Chunky Lug-Sole Chelsea Boot',
    brand: '4 SHERROS FOOTWEAR',
    category: 'shoes',
    gender: 'unisex',
    price: 110.00,
    originalPrice: 135.00,
    rating: 4.9,
    reviewCount: 218,
    isNew: true,
    isSale: false,
    isTrending: true,
    colors: ['Polished Black', 'Oxblood Cherry'],
    sizes: ['UK 6 / US 7', 'UK 7 / US 8', 'UK 8 / US 9', 'UK 9 / US 10', 'UK 10 / US 11', 'UK 11 / US 12'],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Statement footwear engineered for all-day comfort. Thick flared rubber tread with high-density EVA shock absorption and premium full-grain matte vegan leather upper.',
    details: [
      'Water-resistant matte faux leather',
      '60mm statement platform lug sole',
      'Dual elastic stretch side gussets',
      'Embossed 4 SHERROS heel pull tab'
    ],
    fit: 'True to size with generous toe box.',
    modelInfo: 'Fits true to UK/US street sizing.'
  },
  {
    id: 'fs-04',
    name: 'Asymmetric Rib Knit Off-Shoulder Top',
    brand: '4 SHERROS DESIGN',
    category: 'clothing',
    gender: 'women',
    price: 36.00,
    originalPrice: 45.00,
    rating: 4.7,
    reviewCount: 76,
    isNew: true,
    isSale: false,
    isTrending: true,
    colors: ['Espresso Brown', 'Ivory Cream', 'Midnight Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Modern sculptural silhouette with an asymmetric neckline that sits naturally off one shoulder. Ultra soft fine-gauge rib knit with exceptional shape recovery.',
    details: [
      'Super-soft stretch viscose rib knit',
      'Sculptural fold-over neckline',
      'Thumbhole extended cuffs',
      'Flattering form-skimming drape'
    ],
    fit: 'Bodycon contour fit with gentle stretch.',
    modelInfo: 'Model is 5\'8" / 173cm wearing size S'
  },
  {
    id: 'fs-05',
    name: 'Vintage Distressed Faux Leather Biker Jacket',
    brand: '4 SHERROS LUXE',
    category: 'outerwear',
    gender: 'women',
    price: 125.00,
    originalPrice: 160.00,
    rating: 4.9,
    reviewCount: 310,
    isNew: false,
    isSale: true,
    isTrending: true,
    colors: ['Vintage Worn Brown', 'Distressed Onyx'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A cult-favourite wardrobe staple. Hand-buffed cracked leather look with heavyweight metal hardware, buckled collar, and satin quilt lining for premium warmth.',
    details: [
      'Heavyweight tumbled faux leather with patina finish',
      'Silvertone chunky YKK zipper closures',
      'Adjustable waist belt with metal buckle',
      'Quilted diamond interior lining'
    ],
    fit: 'Slightly cropped boxy moto fit.',
    modelInfo: 'Model is 5\'9" / 175cm wearing size Small'
  },
  {
    id: 'fs-06',
    name: 'Retro Athletic Chunky Dad Sneakers',
    brand: '4 SHERROS RUN',
    category: 'shoes',
    gender: 'unisex',
    price: 88.00,
    originalPrice: 110.00,
    rating: 4.7,
    reviewCount: 164,
    isNew: true,
    isSale: false,
    isTrending: false,
    colors: ['Silver Mesh / Cobalt', 'Triple White', 'Pewter / Lime'],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Millennium Y2K running aesthetic updated with modern orthotic foam support. Metallic panel overlays, reflective detailing, and breathable honeycomb mesh.',
    details: [
      'Metallic synthetic leather & mesh upper',
      'Shock-absorbing cushioned EVA midsole',
      'Reflective 3M toe and heel accents',
      'Grippy geometric rubber traction outsole'
    ],
    fit: 'True to standard sneaker sizing.',
    modelInfo: 'Fits regular athletic profile.'
  },
  {
    id: 'fs-07',
    name: 'Cropped Sherpa Fleece Puffer Jacket',
    brand: '4 SHERROS WINTER',
    category: 'outerwear',
    gender: 'women',
    price: 95.00,
    originalPrice: 120.00,
    rating: 4.8,
    reviewCount: 88,
    isNew: true,
    isSale: true,
    isTrending: true,
    colors: ['Oatmeal Teddy', 'Shadow Black', 'Matcha Green'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cloud-like warmth meets high-street style. Ultra-dense curly sherpa shell insulated with thermo-loft fill and high funnel neck collar to block chill winds.',
    details: [
      'High-pile teddy fleece outer',
      'Thermal micro-poly insulation',
      'High stand funnel neckline with snap closure',
      'Internal fleece-lined handwarmer pockets'
    ],
    fit: 'Cropped waist with voluminous body.',
    modelInfo: 'Model is 5\'7" / 170cm wearing size S'
  },
  {
    id: 'fs-08',
    name: 'Silver Chunky Snake Chain & Pendant Set',
    brand: '4 SHERROS JEWELLERY',
    category: 'accessories',
    gender: 'unisex',
    price: 24.00,
    originalPrice: 32.00,
    rating: 4.9,
    reviewCount: 420,
    isNew: false,
    isSale: true,
    isTrending: true,
    colors: ['Antiqued Silver', '24K Gold Plate'],
    sizes: ['One Size (50cm + 5cm extender)'],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591475155-426477a49936?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Layered dual-strand curb and snake chain featuring the engraved 4 SHERROS numbered crest medallion. Waterproof, hypoallergenic, and tarnish-resistant.',
    details: [
      '316L Surgical stainless steel base',
      'PVD sweatproof and showerproof coating',
      'Heavy-duty lobster claw clasp',
      'Dual layered complementary chain widths'
    ],
    fit: 'Adjustable length from 50cm to 55cm.',
    modelInfo: 'Unisex statement piece'
  },
  {
    id: 'fs-09',
    name: 'Relaxed Fit Tailored Double-Breasted Blazer',
    brand: '4 SHERROS STUDIO',
    category: 'outerwear',
    gender: 'men',
    price: 115.00,
    originalPrice: 145.00,
    rating: 4.6,
    reviewCount: 52,
    isNew: true,
    isSale: false,
    isTrending: false,
    colors: ['Charcoal Pinstripe', 'Sandstone Melange', 'Deep Black'],
    sizes: ['36R', '38R', '40R', '42R', '44R'],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Contemporary deconstructed tailoring. Soft shoulder pads, peaked lapels, and fluid poly-wool drape that effortlessly bridges smart dinner wear and casual streetwear pairings.',
    details: [
      'Textured wool-touch twill fabric',
      'Double breasted four-button closure',
      'Dual rear vents for movement ease',
      'Interior passport and phone pockets'
    ],
    fit: 'Modern slouchy tailored fit with room for a knit.',
    modelInfo: 'Model is 6\'2" / 188cm wearing 40R'
  },
  {
    id: 'fs-10',
    name: 'Techwear Crossbody Sling & Modular Clip Bag',
    brand: '4 SHERROS UTILITY',
    category: 'accessories',
    gender: 'unisex',
    price: 38.00,
    originalPrice: 48.00,
    rating: 4.8,
    reviewCount: 133,
    isNew: true,
    isSale: true,
    isTrending: true,
    colors: ['Matte Stealth Black', 'Alpine White', 'Safety Orange'],
    sizes: ['One Size (4.5L capacity)'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for hands-free mobility. Cordura ballistic weave with quick-release magnetic Fidlock-style buckle and detachable earbud case attachment.',
    details: [
      'Waterproof coated 900D Cordura fabric',
      'Magnetic rapid-release center buckle',
      'Mesh zip back compartment for security',
      'Padded adjustable seatbelt webbing strap'
    ],
    fit: 'Can be worn across chest, over shoulder, or around waist.',
    modelInfo: 'Capacity 4.5 Litres'
  },
  {
    id: 'fs-11',
    name: 'Straight Leg Raw Hem Selvedge Denim',
    brand: '4 SHERROS DENIM',
    category: 'clothing',
    gender: 'men',
    price: 72.00,
    originalPrice: 90.00,
    rating: 4.7,
    reviewCount: 185,
    isNew: false,
    isSale: false,
    isTrending: true,
    colors: ['Washed Mid Indigo', 'Vintage Tint Blue', 'Faded Ash Black'],
    sizes: ['28W/30L', '30W/32L', '32W/32L', '34W/32L', '36W/34L'],
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Classic 5-pocket denim inspired by late 90s skater culture. Crafted from authentic 13.5oz non-stretch ring-spun cotton that breaks in beautifully over time.',
    details: [
      '100% Rigid cotton 13.5oz denim',
      'Signature branded copper rivets and donut buttons',
      'Frayed clean cut raw hem detail',
      'Reinforced crotch gusset'
    ],
    fit: 'Straight leg cut from hip to hem with clean stack.',
    modelInfo: 'Model is 6\'0" / 183cm wearing 32W/32L'
  },
  {
    id: 'fs-12',
    name: 'Mesh Gradient Long Sleeve Layering Top',
    brand: '4 SHERROS CLUB',
    category: 'clothing',
    gender: 'women',
    price: 32.00,
    originalPrice: 40.00,
    rating: 4.8,
    reviewCount: 94,
    isNew: true,
    isSale: false,
    isTrending: true,
    colors: ['Sunset Cyber Gradient', 'Acid Green / Smoke', 'Violet Dusk'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Semi-sheer high-stretch printed mesh top with abstract blurred thermal print. Perfect for festival styling, nightlife layering, or under a boxy blazer.',
    details: [
      'Ultra fine sheer stretch mesh',
      'Raw cut edges at neckline and cuffs',
      'All-over bespoke digital gradient artwork',
      'Non-itch flatlock seams'
    ],
    fit: 'Skin-tight second skin fit with maximum stretch.',
    modelInfo: 'Model is 5\'8" / 173cm wearing size S'
  }
];

export const INITIAL_LOOKBOOK: LookbookItem[] = [
  {
    id: 'lb-1',
    creatorHandle: '@london_drip',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    caption: 'Clean proportions: heavyweight hoodie layered under tailored blazer with the chunky lug boots. Unmatched silhouette ⚡',
    likes: 348,
    featuredProductIds: ['fs-01', 'fs-03', 'fs-09'],
    tags: ['#LondonStreetwear', '#4SherrosFit', '#WinterLayers']
  },
  {
    id: 'lb-2',
    creatorHandle: '@kofi_streets',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=900&q=80',
    caption: 'Parachute trousers with raw selvedge tones and the techwear sling. Everyday high-street mobility.',
    likes: 512,
    featuredProductIds: ['fs-02', 'fs-10', 'fs-06'],
    tags: ['#Techwear', '#ParachutePants', '#FitCheck']
  },
  {
    id: 'lb-3',
    creatorHandle: '@maya.vibe',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
    caption: 'Distressed biker leather paired with the snake chain choker. Instant cult classic aesthetic 🔥',
    likes: 429,
    featuredProductIds: ['fs-05', 'fs-08', 'fs-04'],
    tags: ['#BikerLuxe', '#90sGrunge', '#SherrosDrop']
  }
];

export const INITIAL_REVIEWS: Record<string, Review[]> = {
  'fs-01': [
    {
      id: 'rev-1',
      productId: 'fs-01',
      userName: 'Liam B.',
      rating: 5,
      date: '2 days ago',
      title: 'Heaviest, best quality hoodie I own',
      comment: 'The 480GSM fabric is unmatched. Super boxy drape, huge hood that actually covers properly. Went one size down for a cleaner street fit.',
      verified: true,
      fitVote: 'Runs large'
    },
    {
      id: 'rev-2',
      productId: 'fs-01',
      userName: 'Chloe M.',
      rating: 5,
      date: '1 week ago',
      title: 'Amazing acid wash finish',
      comment: 'Color looks even better in person than the studio shots. Wears beautifully with cargo bottoms.',
      verified: true,
      fitVote: 'True to size'
    }
  ],
  'fs-02': [
    {
      id: 'rev-3',
      productId: 'fs-02',
      userName: 'Sam K.',
      rating: 5,
      date: '3 days ago',
      title: 'Balloon fit is perfect',
      comment: 'Ankle bungee toggles let you switch between wide stack or cinched tapered cuffs. Insane value.',
      verified: true,
      fitVote: 'True to size'
    }
  ]
};

export const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'streetwear', label: 'Streetwear' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'shoes', label: 'Shoes & Footwear' },
  { id: 'outerwear', label: 'Jackets & Coats' },
  { id: 'accessories', label: 'Bags & Accessories' }
];

export const PROMO_BANNERS = [
  {
    id: 'sale-banner',
    title: 'THE 4 SHERROS MID-SEASON DROP',
    subtitle: 'UP TO 40% OFF SELECTED STREETWEAR + FOOTWEAR',
    code: 'SHERROS40',
    bg: 'bg-black text-white'
  },
  {
    id: 'student-banner',
    title: 'STUDENTS & YOUTH DISCOUNT',
    subtitle: 'EXTRA 15% OFF WITH UNiDAYS OR STUDENT BEANS',
    code: 'YOUTH15',
    bg: 'bg-[#d4ff00] text-black'
  },
  {
    id: 'shipping-banner',
    title: 'FREE EXPRESS WORLDWIDE DELIVERY',
    subtitle: 'ON ALL ORDERS OVER $75 | UNLIMITED PREMIER FOR $19/YR',
    code: 'FREESHIP',
    bg: 'bg-[#ff4646] text-white'
  }
];
