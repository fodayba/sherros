import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Star, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ShoppingBag,
  Ruler,
  MessageSquare,
  ThumbsUp,
  Send
} from 'lucide-react';
import { Product, Review } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  onAskStylistAboutThis: (product: Product) => void;
  productReviews: Review[];
  onAddReview: (productId: string, newReview: Omit<Review, 'id' | 'productId' | 'date' | 'verified'>) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onAskStylistAboutThis,
  productReviews,
  onAddReview
}) => {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Default');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // New review form states
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newFitVote, setNewFitVote] = useState<'Runs small' | 'True to size' | 'Runs large'>('True to size');
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !newTitle.trim()) return;

    onAddReview(product.id, {
      userName: newReviewerName.trim() || 'Anonymous Streetwear Lover',
      rating: newRating,
      title: newTitle.trim(),
      comment: newComment.trim(),
      fitVote: newFitVote
    });

    setNewTitle('');
    setNewComment('');
    setNewReviewerName('');
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-black hover:text-white shadow-md transition text-gray-700"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Gallery */}
        <div className="md:w-1/2 bg-gray-50 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto">
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white shadow-inner mb-4">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.isSale && (
              <span className="absolute top-3 left-3 bg-[#ff4646] text-white text-xs font-black uppercase px-2.5 py-1 rounded">
                SALE -{discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition ${
                    activeImageIndex === idx ? 'border-black ring-2 ring-black/20' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information, Reviews & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
              <span>{product.brand}</span>
              <div 
                onClick={() => setActiveTab('reviews')}
                className="flex items-center text-amber-500 cursor-pointer hover:underline"
              >
                <Star className="w-4 h-4 fill-current mr-1" />
                <span className="text-gray-900 font-bold">{product.rating}</span>
                <span className="text-gray-400 ml-1">({productReviews.length || product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-black leading-snug mb-3">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl sm:text-3xl font-black text-black">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.isSale && (
                <span className="text-xs font-bold text-[#ff4646] ml-auto">
                  SAVE ${(product.originalPrice! - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Tabs Selector: Details vs Customer Reviews */}
            <div className="flex border-b border-gray-200 mb-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 px-3 uppercase tracking-wider transition border-b-2 ${
                  activeTab === 'details' ? 'border-black text-black font-black' : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                Garment Specs & Fit
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 px-3 uppercase tracking-wider transition border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'reviews' ? 'border-black text-black font-black' : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Reviews ({productReviews.length || product.reviewCount})</span>
              </button>
            </div>

            {activeTab === 'details' ? (
              <>
                {/* AI Stylist Hook */}
                <div className="mb-5 p-3 rounded-xl bg-gradient-to-r from-gray-900 to-black text-white flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#d4ff00]" />
                    <span className="text-xs font-medium">How would you style this piece?</span>
                  </div>
                  <button
                    onClick={() => onAskStylistAboutThis(product)}
                    className="text-xs bg-[#d4ff00] text-black font-black px-3 py-1 rounded-md hover:bg-white transition"
                  >
                    Ask Stylist
                  </button>
                </div>

                {/* Color selection */}
                <div className="mb-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Color: <span className="text-black font-black">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                          selectedColor === color
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size selection */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                      Select Size: <span className="text-black font-black">{selectedSize}</span>
                    </label>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-xs text-gray-500 hover:text-black underline flex items-center gap-1"
                    >
                      <Ruler className="w-3 h-3" />
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-black rounded-lg border text-center transition ${
                          selectedSize === size
                            ? 'bg-black text-white border-black ring-2 ring-black/20'
                            : 'bg-white text-gray-800 border-gray-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {showSizeGuide && (
                    <div className="mt-3 p-3 bg-gray-100 rounded-lg text-xs text-gray-700 animate-in fade-in">
                      <p className="font-bold mb-1">4 SHERROS Fit Recommendation:</p>
                      <p>{product.fit} | {product.modelInfo}</p>
                    </div>
                  )}
                </div>

                {/* Add to Bag and Wishlist Controls */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-black text-white hover:bg-[#d4ff00] hover:text-black font-black py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition transform active:scale-95 uppercase tracking-wider text-sm"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3.5 rounded-xl border transition ${
                      isWishlisted
                        ? 'bg-[#ff4646] text-white border-[#ff4646]'
                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Description & Details */}
                <div className="space-y-4 border-t border-gray-200 pt-4 text-xs text-gray-600">
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-gray-900 mb-1">Product Details</h4>
                    <p className="leading-relaxed">{product.description}</p>
                  </div>

                  <ul className="list-disc pl-4 space-y-1 text-gray-700">
                    {product.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>

                  {/* Service Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-black" />
                      <span>Free Returns</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5 text-black" />
                      <span>28 Day Trial</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-black" />
                      <span>Authentic 4S</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Reviews Tab */
              <div className="space-y-6 text-xs animate-in fade-in">
                {/* Submit New Review Form */}
                <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                  <h4 className="font-black text-black uppercase tracking-wider text-xs">Write a Customer Review</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Your Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Jordan S."
                        value={newReviewerName}
                        onChange={(e) => setNewReviewerName(e.target.value)}
                        className="w-full p-2 border rounded text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Rating</label>
                      <select
                        value={newRating}
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        className="w-full p-2 border rounded text-xs bg-white font-bold"
                      >
                        <option value={5}>★★★★★ (5/5)</option>
                        <option value={4}>★★★★☆ (4/5)</option>
                        <option value={3}>★★★☆☆ (3/5)</option>
                        <option value={2}>★★☆☆☆ (2/5)</option>
                        <option value={1}>★☆☆☆☆ (1/5)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Headline</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Best streetwear drop this season"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full p-2 border rounded text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Your Thoughts on Fabric & Fit</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Tell the 4S collective how it fits, material feel, washes, etc..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full p-2 border rounded text-xs bg-white"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Fit:</span>
                      {(['Runs small', 'True to size', 'Runs large'] as const).map(f => (
                        <button
                          type="button"
                          key={f}
                          onClick={() => setNewFitVote(f)}
                          className={`text-[10px] px-2 py-0.5 rounded border transition ${
                            newFitVote === f ? 'bg-black text-white border-black font-bold' : 'bg-white text-gray-700'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="bg-black hover:bg-[#d4ff00] hover:text-black text-white font-black text-xs px-4 py-2 rounded-lg transition"
                    >
                      Post Review
                    </button>
                  </div>

                  {showReviewSuccess && (
                    <p className="text-[11px] text-green-600 font-bold">Review posted! Thank you for the fit feedback.</p>
                  )}
                </form>

                {/* Existing Reviews List */}
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  {productReviews.length === 0 ? (
                    <p className="text-gray-400 italic">No reviews yet for this piece. Be the first to review!</p>
                  ) : (
                    productReviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400">{rev.date}</span>
                        </div>
                        <h5 className="font-bold text-gray-900 text-xs">{rev.title}</h5>
                        <p className="text-gray-600 text-xs leading-relaxed">{rev.comment}</p>
                        <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                          <span className="font-semibold text-gray-700">{rev.userName} {rev.verified && '• Verified Purchase'}</span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">Fit: {rev.fitVote}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
