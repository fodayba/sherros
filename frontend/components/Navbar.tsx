import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  Percent, 
  HelpCircle,
  Truck
} from 'lucide-react';
import { PROMO_BANNERS } from '../constants';

interface NavbarProps {
  gender: 'all' | 'men' | 'women' | 'unisex';
  onSelectGender: (gender: 'all' | 'men' | 'women' | 'unisex') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenStylist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onResetView: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  gender,
  onSelectGender,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenStylist,
  searchQuery,
  onSearchChange,
  onResetView
}) => {
  const [activePromoIndex, setActivePromoIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const currentPromo = PROMO_BANNERS[activePromoIndex];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-gray-200">
      {/* Top Utility Bar (ASOS-like top strip) */}
      <div className="bg-[#2d2d2d] text-white text-[11px] font-medium tracking-wider px-4 py-1.5 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-6">
          <span className="hidden sm:inline-flex items-center text-gray-300 hover:text-white transition">
            <Truck className="w-3 h-3 mr-1.5 text-[#d4ff00]" />
            Free standard delivery on orders over $75
          </span>
          <span className="hidden md:inline-block text-gray-400">|</span>
          <span className="hidden md:inline-flex items-center text-gray-300 hover:text-white">
            <Percent className="w-3 h-3 mr-1 text-[#ff4646]" />
            15% Extra Student Discount
          </span>
        </div>
        <div className="flex items-center space-x-5 ml-auto">
          <button 
            onClick={onOpenStylist} 
            className="flex items-center font-bold text-[#d4ff00] hover:underline cursor-pointer"
          >
            <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
            AI STYLIST CHAT
          </button>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300 hover:text-white cursor-pointer hidden sm:inline">Help & FAQs</span>
          <span className="text-gray-300 hover:text-white cursor-pointer font-bold">USD $</span>
        </div>
      </div>

      {/* Main Brand & Search Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-black focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div 
            onClick={onResetView}
            className="flex items-center space-x-2 cursor-pointer select-none group"
          >
            <div className="bg-black text-white px-2.5 py-1 text-xl sm:text-2xl font-black tracking-tighter italic transform -skew-x-6 group-hover:bg-[#d4ff00] group-hover:text-black transition">
              4S
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-widest leading-none font-display text-black">
                4 SHERROS
              </span>
              <span className="text-[9px] tracking-widest text-gray-500 font-bold uppercase">
                London • New York • Tokyo
              </span>
            </div>
          </div>

          {/* Gender Switcher Tabs (ASOS classic Men / Women / Unisex bar) */}
          <div className="hidden lg:flex items-center space-x-1 border border-gray-200 rounded-full p-1 bg-gray-50">
            <button
              onClick={() => onSelectGender('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                gender === 'all' 
                  ? 'bg-black text-white shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onSelectGender('women')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                gender === 'women' 
                  ? 'bg-black text-white shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => onSelectGender('men')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                gender === 'men' 
                  ? 'bg-black text-white shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => onSelectGender('unisex')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                gender === 'unisex' 
                  ? 'bg-[#d4ff00] text-black shadow-sm font-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Unisex
            </button>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-xl relative">
            <div className={`relative flex items-center w-full transition-all rounded-full ${
              searchFocused ? 'ring-2 ring-black bg-white shadow-sm' : 'bg-gray-100 hover:bg-gray-200/80'
            }`}>
              <Search className="w-4 h-4 ml-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for items, brands, streetwear, hoodies..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full py-2.5 px-3 text-xs sm:text-sm bg-transparent border-none focus:outline-none placeholder-gray-400 text-gray-900"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="mr-3 text-gray-400 hover:text-black p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* User actions: Stylist, Wishlist, Bag */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* AI Stylist shortcut */}
            <button
              onClick={onOpenStylist}
              className="hidden md:flex items-center space-x-1.5 bg-black hover:bg-[#d4ff00] hover:text-black text-white px-3 py-2 rounded-full text-xs font-bold tracking-wide transition transform hover:scale-105 active:scale-95 shadow-sm"
              title="Chat with AI Stylist"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4ff00] group-hover:text-black" />
              <span>STYLING BOT</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#ff4646] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-black text-white hover:bg-gray-800 rounded-full transition shadow-sm"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4ff00] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Rotating High-Street Promo Ticker Bar */}
      <div 
        className={`${currentPromo.bg} py-2 px-4 transition-colors duration-500 flex items-center justify-center text-center cursor-pointer select-none`}
        onClick={() => setActivePromoIndex((prev) => (prev + 1) % PROMO_BANNERS.length)}
      >
        <p className="text-xs sm:text-sm font-black tracking-widest uppercase flex items-center gap-2">
          <span>{currentPromo.title}:</span>
          <span className="font-semibold underline underline-offset-2">{currentPromo.subtitle}</span>
          <span className="hidden md:inline-block bg-white text-black text-[10px] px-2 py-0.5 rounded font-black ml-2">
            CODE: {currentPromo.code}
          </span>
        </p>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-300 px-4 py-4 space-y-4 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-4 gap-2">
            {(['all', 'women', 'men', 'unisex'] as const).map((g) => (
              <button
                key={g}
                onClick={() => {
                  onSelectGender(g);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs font-bold uppercase rounded-lg border text-center transition ${
                  gender === g ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              onOpenStylist();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 bg-[#d4ff00] text-black font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Open 4 SHERROS AI Stylist
          </button>
        </div>
      )}
    </header>
  );
};
