import React, { useState } from 'react';
import { Heart, Tag, Sparkles, ExternalLink, MessageSquare } from 'lucide-react';
import { LookbookItem, Product } from '../types';

interface LookbookGalleryProps {
  lookbooks: LookbookItem[];
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onLikeLook: (lookId: string) => void;
}

export const LookbookGallery: React.FC<LookbookGalleryProps> = ({
  lookbooks,
  allProducts,
  onSelectProduct,
  onLikeLook
}) => {
  const [activeLook, setActiveLook] = useState<LookbookItem | null>(null);

  return (
    <section className="my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="bg-[#d4ff00] text-black text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded inline-block mb-2">
            STREET EDITORIAL // AS SEEN ON YOU
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-display text-black">
            4 SHERROS COMMUNITY LOOKBOOK
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
            See how the 4S collective styles our drops in London, Berlin, and NYC. Tap any look to shop exact garments.
          </p>
        </div>
        <div className="text-xs text-gray-500 font-bold">
          Tag <strong>@4sherros</strong> to be featured
        </div>
      </div>

      {/* Grid of editorial looks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lookbooks.map((look) => {
          const featured = allProducts.filter(p => look.featuredProductIds.includes(p.id));

          return (
            <div 
              key={look.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md flex flex-col group transition hover:shadow-xl"
            >
              {/* Image banner */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={look.imageUrl}
                  alt={look.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Creator badge */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 text-white shadow">
                  <img src={look.creatorAvatar} alt="creator" className="w-5 h-5 rounded-full object-cover" />
                  <span className="text-xs font-bold">{look.creatorHandle}</span>
                </div>

                {/* Like button */}
                <button
                  onClick={() => onLikeLook(look.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-black hover:text-[#ff4646] hover:bg-white shadow transition transform active:scale-90"
                >
                  <Heart className="w-4 h-4 fill-current text-[#ff4646]" />
                </button>

                {/* Likes count */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-1 rounded-md">
                  {look.likes} likes
                </div>
              </div>

              {/* Caption and tags */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-800 font-medium leading-relaxed mb-3">
                    {look.caption}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {look.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Shop the Look Products Preview */}
                <div className="pt-3 border-t border-gray-100">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-2">
                    Shop Items from this drop:
                  </span>
                  <div className="space-y-2">
                    {featured.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => onSelectProduct(p)}
                        className="flex items-center justify-between p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer group/item transition"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={p.images[0]} alt={p.name} className="w-8 h-10 object-cover rounded bg-gray-100 flex-shrink-0" />
                          <span className="text-xs font-bold text-gray-900 truncate group-hover/item:underline">
                            {p.name}
                          </span>
                        </div>
                        <span className="text-xs font-black text-black ml-2 flex-shrink-0">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
