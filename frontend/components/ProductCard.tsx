import React, { useState } from 'react';
import { Heart, Star, Sparkles, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isSale && discountPercent > 0 && (
            <span className="bg-[#ff4646] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
              -{discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-black text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
              NEW
            </span>
          )}
          {product.isTrending && (
            <span className="bg-[#d4ff00] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
              TRENDING
            </span>
          )}
        </div>

        {/* Wishlist Button (Always accessible top right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full transition-transform active:scale-90 ${
            isWishlisted 
              ? 'bg-[#ff4646] text-white shadow-md' 
              : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:text-black hover:bg-white shadow'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="w-full bg-white text-black hover:bg-[#d4ff00] text-xs font-black py-2 rounded-lg shadow-lg flex items-center justify-center gap-1.5 transition uppercase tracking-wider"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            <span>{product.brand}</span>
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-current mr-0.5" />
              <span className="text-gray-700 font-semibold">{product.rating}</span>
              <span className="text-gray-400 ml-1">({product.reviewCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 hover:underline cursor-pointer mb-2"
          >
            {product.name}
          </h3>
        </div>

        {/* Price and Quick Add */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-black">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Quick Add size selector */}
          <div className="flex items-center space-x-1">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="text-[11px] bg-gray-100 border border-gray-200 rounded px-1.5 py-1 text-gray-800 font-medium focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              {product.sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(product, selectedSize);
              }}
              className="p-1.5 bg-black text-white hover:bg-[#d4ff00] hover:text-black rounded transition"
              title="Add to bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
