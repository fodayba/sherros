import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Trash2, 
  Layers, 
  RotateCcw, 
  Check, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { Product } from '../types';

interface OutfitBuilderProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  onOpenStylistForOutfit: (productNames: string[]) => void;
}

export const OutfitBuilder: React.FC<OutfitBuilderProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenStylistForOutfit
}) => {
  // Slots for the outfit canvas
  const [selectedTop, setSelectedTop] = useState<Product | null>(
    products.find(p => p.id === 'fs-01') || products[0] || null
  );
  const [selectedBottom, setSelectedBottom] = useState<Product | null>(
    products.find(p => p.id === 'fs-02') || products[1] || null
  );
  const [selectedFootwear, setSelectedFootwear] = useState<Product | null>(
    products.find(p => p.id === 'fs-03') || products[2] || null
  );
  const [selectedAccessory, setSelectedAccessory] = useState<Product | null>(
    products.find(p => p.id === 'fs-08') || products[7] || null
  );

  const [activeSlot, setActiveSlot] = useState<'top' | 'bottom' | 'shoes' | 'accessory'>('top');
  const [bundleNotice, setBundleNotice] = useState(false);

  // Group candidate items for each slot
  const tops = products.filter(p => p.category === 'streetwear' || (p.category === 'clothing' && (p.name.includes('Top') || p.name.includes('Hoodie'))) || p.category === 'outerwear');
  const bottoms = products.filter(p => p.name.includes('Trousers') || p.name.includes('Denim') || p.name.includes('Cargo') || p.name.includes('Pants'));
  const shoes = products.filter(p => p.category === 'shoes');
  const accessories = products.filter(p => p.category === 'accessories');

  const outfitList = [selectedTop, selectedBottom, selectedFootwear, selectedAccessory].filter(Boolean) as Product[];
  const outfitPrice = outfitList.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = outfitList.length >= 3 ? outfitPrice * 0.15 : 0;
  const finalPrice = outfitPrice - bundleDiscount;

  const handleAddFullOutfitToBag = () => {
    outfitList.forEach(p => {
      onAddToCart(p, p.sizes[0], p.colors[0], 1);
    });
    setBundleNotice(true);
    setTimeout(() => setBundleNotice(false), 2500);
  };

  const currentCandidates = activeSlot === 'top' 
    ? tops 
    : activeSlot === 'bottom' 
    ? bottoms 
    : activeSlot === 'shoes' 
    ? shoes 
    : accessories;

  const handleSelectSlotItem = (p: Product) => {
    if (activeSlot === 'top') setSelectedTop(p);
    else if (activeSlot === 'bottom') setSelectedBottom(p);
    else if (activeSlot === 'shoes') setSelectedFootwear(p);
    else if (activeSlot === 'accessory') setSelectedAccessory(p);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden my-8">
      {/* Header */}
      <div className="bg-black text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#d4ff00] text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Fit Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-display">
            4 SHERROS OUTFIT CANVAS
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
            Mix and match silhouettes from head to toe. Bundle 3+ items to unlock an instant <strong>15% outfit discount</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenStylistForOutfit(outfitList.map(p => p.name))}
            className="bg-transparent border-2 border-[#d4ff00] text-[#d4ff00] hover:bg-[#d4ff00] hover:text-black font-black text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Rate This Fit</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
        
        {/* Left: The Virtual Look Mannequin Canvas (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-gray-50 flex flex-col items-center justify-center">
          <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
            <span>Click any slot below to swap garments</span>
          </div>

          <div className="w-full max-w-md space-y-3">
            {/* Top slot */}
            <div 
              onClick={() => setActiveSlot('top')}
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 bg-white ${
                activeSlot === 'top' ? 'border-black ring-4 ring-black/10 shadow-md' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img 
                src={selectedTop?.images[0]} 
                alt={selectedTop?.name}
                className="w-16 h-20 object-cover rounded-xl bg-gray-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#2f68ee]">
                  LAYER 1: TOP / OUTERWEAR
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                  {selectedTop?.name}
                </h4>
                <p className="text-xs font-black text-black mt-0.5">
                  ${selectedTop?.price.toFixed(2)}
                </p>
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase">Change →</span>
            </div>

            {/* Bottom slot */}
            <div 
              onClick={() => setActiveSlot('bottom')}
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 bg-white ${
                activeSlot === 'bottom' ? 'border-black ring-4 ring-black/10 shadow-md' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img 
                src={selectedBottom?.images[0]} 
                alt={selectedBottom?.name}
                className="w-16 h-20 object-cover rounded-xl bg-gray-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  LAYER 2: TROUSERS / DENIM
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                  {selectedBottom?.name}
                </h4>
                <p className="text-xs font-black text-black mt-0.5">
                  ${selectedBottom?.price.toFixed(2)}
                </p>
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase">Change →</span>
            </div>

            {/* Footwear slot */}
            <div 
              onClick={() => setActiveSlot('shoes')}
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 bg-white ${
                activeSlot === 'shoes' ? 'border-black ring-4 ring-black/10 shadow-md' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img 
                src={selectedFootwear?.images[0]} 
                alt={selectedFootwear?.name}
                className="w-16 h-20 object-cover rounded-xl bg-gray-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                  LAYER 3: FOOTWEAR & BOOTS
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                  {selectedFootwear?.name}
                </h4>
                <p className="text-xs font-black text-black mt-0.5">
                  ${selectedFootwear?.price.toFixed(2)}
                </p>
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase">Change →</span>
            </div>

            {/* Accessory slot */}
            <div 
              onClick={() => setActiveSlot('accessory')}
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 bg-white ${
                activeSlot === 'accessory' ? 'border-black ring-4 ring-black/10 shadow-md' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img 
                src={selectedAccessory?.images[0]} 
                alt={selectedAccessory?.name}
                className="w-16 h-20 object-cover rounded-xl bg-gray-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">
                  LAYER 4: ACCENTS & JEWELLERY
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                  {selectedAccessory?.name}
                </h4>
                <p className="text-xs font-black text-black mt-0.5">
                  ${selectedAccessory?.price.toFixed(2)}
                </p>
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase">Change →</span>
            </div>
          </div>
        </div>

        {/* Right: Picker Panel & Bundle Checkout (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                Select for: <span className="text-[#2f68ee] uppercase">{activeSlot}</span>
              </h3>
              <div className="flex gap-1">
                {(['top', 'bottom', 'shoes', 'accessory'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setActiveSlot(s)}
                    className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-lg border transition ${
                      activeSlot === s ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Items Carousel */}
            <div className="grid grid-cols-2 gap-3 max-h-[310px] overflow-y-auto pr-1">
              {currentCandidates.map(p => {
                const isSelected = (
                  (activeSlot === 'top' && selectedTop?.id === p.id) ||
                  (activeSlot === 'bottom' && selectedBottom?.id === p.id) ||
                  (activeSlot === 'shoes' && selectedFootwear?.id === p.id) ||
                  (activeSlot === 'accessory' && selectedAccessory?.id === p.id)
                );

                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectSlotItem(p)}
                    className={`p-2.5 rounded-xl border-2 transition cursor-pointer relative group flex flex-col justify-between ${
                      isSelected 
                        ? 'border-black bg-gray-50 ring-2 ring-black/10' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-100 mb-2">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-gray-900 line-clamp-1">{p.name}</h5>
                      <span className="text-xs font-black text-black">${p.price.toFixed(2)}</span>
                    </div>
                    {isSelected && (
                      <span className="absolute top-2 right-2 bg-black text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bundle Summary & CTA */}
          <div className="pt-6 border-t border-gray-200 mt-6 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Items in Look:</span>
                <span className="font-bold text-black">{outfitList.length} items</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Subtotal:</span>
                <span>${outfitPrice.toFixed(2)}</span>
              </div>
              {bundleDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Full Outfit Bundle (-15%):</span>
                  <span>-${bundleDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-black text-black pt-2 border-t border-gray-200">
                <span>Look Total:</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleAddFullOutfitToBag}
              className="w-full py-4 bg-black hover:bg-[#d4ff00] hover:text-black text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2 transform active:scale-95"
            >
              {bundleNotice ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Added {outfitList.length} Items to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Entire Outfit to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
