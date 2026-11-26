import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Ticket,
  Check
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const deliveryFee = subtotal >= 75 || subtotal === 0 ? 0 : 5.99;
  const total = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'SHERROS40') {
      setAppliedDiscount(0.40);
      setPromoSuccess('40% discount applied!');
    } else if (code === 'YOUTH15') {
      setAppliedDiscount(0.15);
      setPromoSuccess('15% student discount applied!');
    } else if (code === 'FREESHIP') {
      setAppliedDiscount(0.05);
      setPromoSuccess('Promo code FREESHIP applied!');
    } else {
      setPromoError('Invalid voucher code. Try SHERROS40 or YOUTH15');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between bg-black text-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#d4ff00]" />
              <h2 className="text-base sm:text-lg font-black uppercase tracking-wider">
                My Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-white transition"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress bar to Free Shipping */}
          <div className="bg-gray-100 p-3 text-xs text-center border-b border-gray-200">
            {subtotal >= 75 ? (
              <span className="text-green-600 font-bold flex items-center justify-center gap-1">
                <Check className="w-4 h-4" /> You have unlocked FREE Express Delivery!
              </span>
            ) : (
              <span className="text-gray-700">
                Add <strong className="text-black font-black">${(75 - subtotal).toFixed(2)}</strong> more for <strong>FREE EXPRESS DELIVERY</strong>
              </span>
            )}
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-black h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / 75) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4 stroke-1" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">Your bag is empty</h3>
                <p className="text-xs text-gray-500 mb-6 max-w-xs">
                  Items you add while shopping will appear here. Explore our streetwear drop now!
                </p>
                <button
                  onClick={onClose}
                  className="bg-black text-white hover:bg-[#d4ff00] hover:text-black font-black text-xs uppercase px-6 py-3 rounded-lg transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1 space-x-2">
                        <span>Size: <strong>{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong>{item.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 transition"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 transition"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                      <span className="text-sm font-black text-black">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 space-y-3">
              {/* Promo input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. SHERROS40)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 uppercase font-bold focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-black text-white hover:bg-gray-800 text-xs font-black px-4 py-2 rounded-lg transition"
                >
                  Apply
                </button>
              </div>
              {promoSuccess && <p className="text-[11px] text-green-600 font-bold">{promoSuccess}</p>}
              {promoError && <p className="text-[11px] text-red-600 font-bold">{promoError}</p>}

              {/* Calculations */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-bold">
                    <span>Discount ({(appliedDiscount * 100).toFixed(0)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? <strong className="text-green-600">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-black pt-2 border-t border-gray-200">
                  <span>Total Due</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onCheckout}
                className="w-full bg-[#111111] hover:bg-[#d4ff00] hover:text-black text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition transform active:scale-95 uppercase tracking-wider text-sm shadow-xl"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SSL Encrypted Checkout • Klarna & Apple Pay Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
