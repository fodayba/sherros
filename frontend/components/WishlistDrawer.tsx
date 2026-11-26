import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToBag: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToBag,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between bg-black text-white">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-[#ff4646] fill-current" />
              <h2 className="text-base sm:text-lg font-black uppercase tracking-wider">
                Saved Items ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-white transition"
              aria-label="Close saved items"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-gray-100">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                <Heart className="w-16 h-16 text-gray-300 mb-4 stroke-1" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">You haven't saved any items yet</h3>
                <p className="text-xs text-gray-500 mb-6 max-w-xs">
                  Hit the heart icon on any product to save it here for later. Don't let your favourites sell out!
                </p>
                <button
                  onClick={onClose}
                  className="bg-black text-white hover:bg-[#d4ff00] hover:text-black font-black text-xs uppercase px-6 py-3 rounded-lg transition"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-20 h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0 cursor-pointer hover:opacity-90"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 
                          onClick={() => {
                            onSelectProduct(product);
                            onClose();
                          }}
                          className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 cursor-pointer hover:underline"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-gray-400 hover:text-red-500 p-1 transition"
                          title="Remove from saved items"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs font-black text-black mt-1">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => onMoveToBag(product)}
                      className="mt-3 w-full bg-black hover:bg-[#d4ff00] hover:text-black text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-[11px] text-gray-500 text-center">
                Items in your saved list aren't reserved. Add them to bag before they go out of stock!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
