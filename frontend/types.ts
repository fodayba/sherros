export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'clothing' | 'shoes' | 'accessories' | 'streetwear' | 'outerwear';
  gender: 'men' | 'women' | 'unisex';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  isTrending?: boolean;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  details: string[];
  fit: string;
  modelInfo: string;
}

export interface CartItem {
  id: string; // unique cart item id (e.g. productId-size-color)
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  addedAt: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

export interface FilterState {
  gender: 'all' | 'men' | 'women' | 'unisex';
  category: string;
  minPrice: number;
  maxPrice: number;
  sort: 'recommended' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  searchQuery: string;
  onlySale: boolean;
  onlyNew: boolean;
  size?: string;
  color?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fitVote: 'Too small' | 'True to size' | 'Too large';
}
