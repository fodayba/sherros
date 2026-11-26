import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, CreditCard, ShoppingBag, ArrowLeft, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Sherro',
    email: 'alex.sherro@example.com',
    address: '44 Oxford Street',
    city: 'London',
    postalCode: 'W1D 1BS',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvv: '989'
  });
  const [processing, setProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal >= 75 ? subtotal : subtotal + 5.99;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep('success');
      onOrderComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        
        {step === 'details' ? (
          <div>
            <div className="bg-black text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#d4ff00]" />
                <h3 className="font-black text-sm uppercase tracking-wider">
                  4 SHERROS Secure Checkout
                </h3>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">1. Delivery Address</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="p-2 border rounded text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="p-2 border rounded text-xs"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="p-2 border rounded text-xs col-span-2"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="p-2 border rounded text-xs col-span-2"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="p-2 border rounded text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="p-2 border rounded text-xs"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">2. Payment Method</p>
                <div className="p-3 border rounded-xl bg-gray-50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-black" />
                      Credit / Debit Card
                    </span>
                    <span className="text-[10px] text-gray-500">256-bit Encrypted</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full p-2 border rounded bg-white text-xs font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      className="p-2 border rounded bg-white text-xs font-mono"
                    />
                    <input
                      type="text"
                      required
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="p-2 border rounded bg-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm font-black">
                <span>Total to Pay:</span>
                <span className="text-lg">${total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full py-3.5 bg-black hover:bg-[#d4ff00] hover:text-black text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2"
              >
                {processing ? 'Processing payment...' : `Pay $${total.toFixed(2)} & Place Order`}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#d4ff00] text-black rounded-full mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-black">Order Confirmed!</h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              Thank you for shopping with <strong>4 SHERROS</strong>! We've sent your receipt and tracking link to <strong>{formData.email}</strong>.
            </p>
            <div className="bg-gray-100 p-4 rounded-xl text-left text-xs space-y-1">
              <p><strong>Order #:</strong> 4S-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p><strong>Estimated Delivery:</strong> 2 - 3 business days</p>
              <p><strong>Shipping Carrier:</strong> DPD Express Worldwide</p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#d4ff00] hover:text-black transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
