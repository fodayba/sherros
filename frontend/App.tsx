import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  getDocs,
  writeBatch 
} from 'firebase/firestore';
import { db, initAuthSession } from './services/firebase';
import { Product, CartItem, FilterState, Review, LookbookItem } from './types';
import { INITIAL_PRODUCTS, INITIAL_LOOKBOOK, INITIAL_REVIEWS } from './constants';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { StylistModal } from './components/StylistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OutfitBuilder } from './components/OutfitBuilder';
import { LookbookGallery } from './components/LookbookGallery';
import { Sparkles, ArrowRight, ShieldCheck, RotateCcw, Truck, Instagram, Twitter, Youtube, Layers, Camera } from 'lucide-react';

export default function App() {
  // State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lookbooks, setLookbooks] = useState<LookbookItem[]>(INITIAL_LOOKBOOK);
  const [reviews, setReviews] = useState<Record<string, Review[]>>(INITIAL_REVIEWS);
  
  // Drawer & modal visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [stylistContextProduct, setStylistContextProduct] = useState<Product | undefined>(undefined);

  // Section references for smooth scrolling
  const outfitBuilderRef = useRef<HTMLDivElement>(null);
  const lookbookRef = useRef<HTMLDivElement>(null);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    gender: 'all',
    category: 'all',
    minPrice: 0,
    maxPrice: 300,
    sort: 'recommended',
    searchQuery: '',
    onlySale: false,
    onlyNew: false
  });

  // Initialize Firebase and seed products/lookbook if needed
  useEffect(() => {
    let unsubscribeCart: () => void = () => {};
    let unsubscribeWishlist: () => void = () => {};

    initAuthSession().then(async (user) => {
      // 1. Sync or listen to products from Firestore
      try {
        const prodColRef = collection(db, 'products');
        const prodSnap = await getDocs(prodColRef);
        
        if (prodSnap.empty) {
          const batch = writeBatch(db);
          INITIAL_PRODUCTS.forEach((p) => {
            const ref = doc(db, 'products', p.id);
            batch.set(ref, p);
          });
          await batch.commit();
          setProducts(INITIAL_PRODUCTS);
        } else {
          const loaded: Product[] = [];
          prodSnap.forEach((d) => loaded.push(d.data() as Product));
          setProducts(loaded);
        }
      } catch (err) {
        console.warn('Using local catalog fallback:', err);
        setProducts(INITIAL_PRODUCTS);
      }

      // 2. Realtime listener for User Cart
      try {
        const cartRef = collection(db, 'users', user.uid, 'cart');
        unsubscribeCart = onSnapshot(cartRef, (snapshot) => {
          const items: CartItem[] = [];
          snapshot.forEach((d) => items.push(d.data() as CartItem));
          setCart(items);
        }, (err) => {
          console.warn('Cart listener fallback:', err);
        });
      } catch (e) {
        console.warn('Error setting cart listener:', e);
      }

      // 3. Realtime listener for User Wishlist
      try {
        const wishlistRef = collection(db, 'users', user.uid, 'wishlist');
        unsubscribeWishlist = onSnapshot(wishlistRef, (snapshot) => {
          const ids: string[] = [];
          snapshot.forEach((d) => ids.push(d.id));
          setWishlistIds(ids);
        }, (err) => {
          console.warn('Wishlist listener fallback:', err);
        });
      } catch (e) {
        console.warn('Error setting wishlist listener:', e);
      }
    }).catch((err) => {
      console.error('Firebase Auth Init Error:', err);
    });

    return () => {
      unsubscribeCart();
      unsubscribeWishlist();
    };
  }, []);

  // Cart operations
  const handleAddToCart = async (product: Product, size: string, color: string, qty: number = 1) => {
    const cartItemId = `${product.id}-${size}-${color.replace(/\s+/g, '')}`;
    const existing = cart.find((i) => i.id === cartItemId);
    const newQuantity = existing ? existing.quantity + qty : qty;

    const newItem: CartItem = {
      id: cartItemId,
      productId: product.id,
      product,
      size,
      color,
      quantity: newQuantity,
      addedAt: Date.now()
    };

    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === cartItemId);
      if (idx >= 0) {
        const clone = [...prev];
        clone[idx] = newItem;
        return clone;
      }
      return [...prev, newItem];
    });

    try {
      const user = await initAuthSession();
      await setDoc(doc(db, 'users', user.uid, 'cart', cartItemId), newItem);
    } catch (err) {
      console.warn('Could not persist cart item to Firestore:', err);
    }
  };

  const handleUpdateCartQuantity = async (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((i) => (i.id === cartItemId ? { ...i, quantity: newQty } : i))
    );

    try {
      const user = await initAuthSession();
      const target = cart.find((i) => i.id === cartItemId);
      if (target) {
        await setDoc(doc(db, 'users', user.uid, 'cart', cartItemId), {
          ...target,
          quantity: newQty
        });
      }
    } catch (err) {
      console.warn('Could not update cart quantity:', err);
    }
  };

  const handleRemoveCartItem = async (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    try {
      const user = await initAuthSession();
      const { deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'users', user.uid, 'cart', cartItemId));
    } catch (err) {
      console.warn('Could not delete cart item:', err);
    }
  };

  // Wishlist operations
  const handleToggleWishlist = async (product: Product) => {
    const isSaved = wishlistIds.includes(product.id);
    const newIds = isSaved 
      ? wishlistIds.filter((id) => id !== product.id)
      : [...wishlistIds, product.id];

    setWishlistIds(newIds);

    try {
      const user = await initAuthSession();
      const { deleteDoc } = await import('firebase/firestore');
      const docRef = doc(db, 'users', user.uid, 'wishlist', product.id);
      if (isSaved) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { productId: product.id, addedAt: Date.now() });
      }
    } catch (err) {
      console.warn('Could not persist wishlist:', err);
    }
  };

  // Review operations
  const handleAddReview = (productId: string, newReview: Omit<Review, 'id' | 'productId' | 'date' | 'verified'>) => {
    const created: Review = {
      id: `rev-${Date.now()}`,
      productId,
      date: 'Just now',
      verified: true,
      ...newReview
    };

    setReviews(prev => ({
      ...prev,
      [productId]: [created, ...(prev[productId] || [])]
    }));
  };

  // Lookbook likes
  const handleLikeLook = (lookId: string) => {
    setLookbooks(prev => 
      prev.map(l => l.id === lookId ? { ...l, likes: l.likes + 1 } : l)
    );
  };

  const wishlistProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filters.gender !== 'all') {
        if (p.gender !== filters.gender && p.gender !== 'unisex') return false;
      }
      if (filters.category !== 'all') {
        if (p.category !== filters.category) return false;
      }
      if (filters.onlySale && !p.isSale) return false;
      if (filters.onlyNew && !p.isNew) return false;
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sort === 'price-asc') return a.price - b.price;
      if (filters.sort === 'price-desc') return b.price - a.price;
      if (filters.sort === 'rating') return b.rating - a.rating;
      if (filters.sort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-black selection:text-[#d4ff00]">
      {/* Top Navigation */}
      <Navbar
        gender={filters.gender}
        onSelectGender={(g) => setFilters((prev) => ({ ...prev, gender: g }))}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenStylist={() => {
          setStylistContextProduct(undefined);
          setIsStylistOpen(true);
        }}
        onScrollToOutfitBuilder={() => outfitBuilderRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onScrollToLookbook={() => lookbookRef.current?.scrollIntoView({ behavior: 'smooth' })}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
        onResetView={() => setFilters({
          gender: 'all',
          category: 'all',
          minPrice: 0,
          maxPrice: 300,
          sort: 'recommended',
          searchQuery: '',
          onlySale: false,
          onlyNew: false
        })}
      />

      {/* Hero Banner Section (ASOS high-impact editorial drop banner) */}
      {!filters.searchQuery && filters.category === 'all' && (
        <section className="relative bg-black text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=80" 
              alt="4 Sherros Editorial Campaign"
              className="w-full h-full object-cover object-top filter contrast-125"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-start justify-center">
            <span className="bg-[#d4ff00] text-black text-xs font-black tracking-widest uppercase px-3 py-1 rounded mb-4">
              NEW SEASON // DROP 04
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none font-display max-w-2xl mb-4">
              THIS IS 4 SHERROS.
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-lg mb-8 font-medium">
              Oversized silhouettes, heavy cottons, futuristic utility & deconstructed London street fashion.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilters((prev) => ({ ...prev, category: 'streetwear' }))}
                className="bg-white text-black hover:bg-[#d4ff00] hover:text-black font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider transition transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
              >
                <span>Shop Streetwear</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => outfitBuilderRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#2f68ee] hover:bg-blue-600 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider transition flex items-center gap-2 shadow-lg"
              >
                <Layers className="w-4 h-4" />
                <span>Outfit Builder</span>
              </button>
              <button
                onClick={() => {
                  setStylistContextProduct(undefined);
                  setIsStylistOpen(true);
                }}
                className="bg-transparent border-2 border-white hover:border-[#d4ff00] hover:text-[#d4ff00] text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#d4ff00]" />
                <span>Ask AI Stylist</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Filter and Category Ribbon */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        totalResults={filteredProducts.length}
      />

      {/* Main Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-md mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No items found</h3>
            <p className="text-xs text-gray-500 mb-6">
              We couldn't find matches for your current filter options. Try clearing filters or searching for something else.
            </p>
            <button
              onClick={() => setFilters({
                gender: 'all',
                category: 'all',
                minPrice: 0,
                maxPrice: 300,
                sort: 'recommended',
                searchQuery: '',
                onlySale: false,
                onlyNew: false
              })}
              className="bg-black text-white hover:bg-[#d4ff00] hover:text-black font-black text-xs uppercase px-6 py-3 rounded-lg transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onSelectProduct={setSelectedProduct}
                onQuickAdd={(p, size) => handleAddToCart(p, size, p.colors[0], 1)}
              />
            ))}
          </div>
        )}

        {/* Feature 1: Interactive Outfit Canvas / Fit Builder */}
        <div ref={outfitBuilderRef} className="pt-8">
          <OutfitBuilder
            products={products}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onOpenStylistForOutfit={(names) => {
              setStylistContextProduct(undefined);
              setIsStylistOpen(true);
            }}
          />
        </div>

        {/* Feature 2: Community Lookbook & As Seen On You */}
        <div ref={lookbookRef} className="pt-4">
          <LookbookGallery
            lookbooks={lookbooks}
            allProducts={products}
            onSelectProduct={setSelectedProduct}
            onLikeLook={handleLikeLook}
          />
        </div>
      </main>

      {/* High-Street Value Props Banner */}
      <section className="bg-white border-t border-gray-200 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Truck className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-black text-xs uppercase tracking-wider mb-1">Fast Worldwide Shipping</h4>
              <p className="text-xs text-gray-500 max-w-xs">Free standard delivery on orders over $75. Tracked door to door.</p>
            </div>
            <div className="p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <RotateCcw className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-black text-xs uppercase tracking-wider mb-1">Hassle-Free Returns</h4>
              <p className="text-xs text-gray-500 max-w-xs">28-day return policy. Instant drop-offs at thousands of locations.</p>
            </div>
            <div className="p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-black text-xs uppercase tracking-wider mb-1">100% Authentic Fashion</h4>
              <p className="text-xs text-gray-500 max-w-xs">Every 4 SHERROS garment is ethically made with verified fabrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-12 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-xs">
            <div>
              <h5 className="font-black uppercase tracking-wider text-white mb-4">HELP & INFORMATION</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Help & FAQs</li>
                <li className="hover:text-white cursor-pointer">Track Order</li>
                <li className="hover:text-white cursor-pointer">Delivery & Returns</li>
                <li className="hover:text-white cursor-pointer">10% Student Discount</li>
              </ul>
            </div>
            <div>
              <h5 className="font-black uppercase tracking-wider text-white mb-4">ABOUT 4 SHERROS</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Careers at 4S</li>
                <li className="hover:text-white cursor-pointer">Corporate Responsibility</li>
                <li className="hover:text-white cursor-pointer">Investors Site</li>
              </ul>
            </div>
            <div>
              <h5 className="font-black uppercase tracking-wider text-white mb-4">MORE FROM 4S</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Outfit Canvas Studio</li>
                <li className="hover:text-white cursor-pointer">Community Lookbook</li>
                <li className="hover:text-white cursor-pointer">4 SHERROS Premier</li>
                <li className="hover:text-white cursor-pointer">Black Friday Deals</li>
              </ul>
            </div>
            <div>
              <h5 className="font-black uppercase tracking-wider text-white mb-4">CONNECT WITH US</h5>
              <p className="text-gray-400 mb-3">Tag @4sherros to be featured on our social lookbooks.</p>
              <div className="flex space-x-3 text-gray-300">
                <Instagram className="w-5 h-5 hover:text-[#d4ff00] cursor-pointer" />
                <Twitter className="w-5 h-5 hover:text-[#d4ff00] cursor-pointer" />
                <Youtube className="w-5 h-5 hover:text-[#d4ff00] cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500">
            <p>© 2026 4 SHERROS LTD. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <span className="hover:underline cursor-pointer">Privacy & Cookies</span>
              <span className="hover:underline cursor-pointer">Ts&Cs</span>
              <span className="hover:underline cursor-pointer">Accessibility</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals and Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onAskStylistAboutThis={(prod) => {
          setSelectedProduct(null);
          setStylistContextProduct(prod);
          setIsStylistOpen(true);
        }}
        productReviews={selectedProduct ? (reviews[selectedProduct.id] || []) : []}
        onAddReview={handleAddReview}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToBag={(prod) => {
          handleAddToCart(prod, prod.sizes[0], prod.colors[0], 1);
          handleToggleWishlist(prod);
        }}
        onSelectProduct={setSelectedProduct}
      />

      <StylistModal
        isOpen={isStylistOpen}
        onClose={() => setIsStylistOpen(false)}
        currentProduct={stylistContextProduct}
        onSelectProduct={setSelectedProduct}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderComplete={() => {
          setCart([]);
          initAuthSession().then(async (user) => {
            try {
              const { deleteDoc } = await import('firebase/firestore');
              cart.forEach((i) => {
                deleteDoc(doc(db, 'users', user.uid, 'cart', i.id));
              });
            } catch (e) {
              console.warn('Error clearing cart:', e);
            }
          });
        }}
      />
    </div>
  );
}
