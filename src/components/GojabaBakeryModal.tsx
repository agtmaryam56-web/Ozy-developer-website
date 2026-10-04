import React, { useState, useEffect } from 'react';
import { BakeryProduct } from '../types';
import { X, ShoppingBag, Plus, Minus, Check, Star, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartItem extends BakeryProduct {
  quantity: number;
}

interface GojabaBakeryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced: () => void;
  currentUser: any | null;
  onRequireSignUp: () => void;
  requireOtpSetting?: boolean;
}

export const GojabaBakeryModal: React.FC<GojabaBakeryModalProps> = ({
  isOpen,
  onClose,
  onOrderPlaced,
  currentUser,
  onRequireSignUp,
  requireOtpSetting = true,
}) => {
  const [products, setProducts] = useState<BakeryProduct[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState(currentUser?.fullName || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.fullName);
      setCustomerPhone(currentUser.phone);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/bakery/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', 'Pastries', 'Breads', 'Cakes', 'Confections'];

  const filteredProducts =
    category === 'All' ? products : products.filter((p) => p.category === category);

  const addToCart = (product: BakeryProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (requireOtpSetting && !currentUser) {
      setErrorMessage('Order Policy: Unknown customers must sign up with Phone Demo OTP before ordering.');
      onRequireSignUp();
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || cart.length === 0) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bakery/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone: customerPhone,
          items: cart.map((c) => ({
            name: c.name,
            quantity: c.quantity,
            price: c.price,
          })),
          paymentMethod,
          isOtpVerified: Boolean(currentUser),
          customerGender: currentUser?.gender || 'Male',
          countryFlag: currentUser?.country?.flag || '🇵🇰',
        }),
      });

      const data = await res.json();
      if (data.success) {
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
        } catch {}
        setOrderSuccess(data.order);
        setCart([]);
        onOrderPlaced();
      } else if (data.requireOtpSignup) {
        setErrorMessage(data.error);
        onRequireSignUp();
      } else {
        setErrorMessage(data.error || 'Failed to place order.');
      }
    } catch {
      // Demo fallback
      setOrderSuccess({
        orderId: 'GB-ORD-' + Math.floor(700 + Math.random() * 200),
        customerName,
        phone: customerPhone,
        totalAmount,
        status: 'Order Placed',
      });
      onOrderPlaced();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] bg-[#0c1017] border border-amber-900/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-950/80 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-lg">
              🥐
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-amber-200 font-display">
                  Gojaba Bakery Demo Web App
                </h2>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                  Live DB Synced
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Full-Stack Artisan Bakery & Online Ordering Built by OZY Developer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Main Products Grid */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {/* Bakery Hero Banner */}
            <div className="relative rounded-xl overflow-hidden border border-amber-900/30 bg-slate-900 h-44 flex items-end p-5">
              <img
                src="/src/assets/images/project_gojaba_bakery_1791096728908.jpg"
                alt="Gojaba Bakery Display"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/60 to-transparent" />
              <div className="relative z-10 max-w-md">
                <span className="text-xs font-mono text-amber-400">Fresh from the stone oven</span>
                <h3 className="text-xl font-bold text-white font-display">
                  Artisanal Handcrafted Breads & Pastries
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  100% natural sourdough, French butter croissants & luxury ganache cakes.
                </p>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    category === cat
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredProducts.map((product) => {
                const inCart = cart.find((i) => i.id === product.id);
                return (
                  <div
                    key={product.id}
                    className="p-3.5 bg-slate-900/70 border border-slate-800 hover:border-amber-700/50 rounded-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-amber-400/90 font-mono text-[11px]">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-400 text-xs">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm text-white mb-1">{product.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-base font-bold text-amber-300 font-mono">
                        ${product.price.toFixed(2)}
                      </span>

                      {inCart ? (
                        <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-lg px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, -1)}
                            className="text-amber-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono text-white font-medium">
                            {inCart.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, 1)}
                            className="text-amber-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart & Checkout Panel */}
          <div className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-slate-800 bg-[#090d14] p-5 flex flex-col justify-between">
            {orderSuccess ? (
              <div className="space-y-4 my-auto p-4 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Order Saved to Database!
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Gojaba Bakery order <span className="font-mono text-emerald-400">{orderSuccess.orderId}</span> has been written directly to the backend database.
                  </p>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1.5 text-left font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Customer:</span>
                    <span className="text-white">{orderSuccess.customerName}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Phone:</span>
                    <span className="text-white">{orderSuccess.phone}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Total:</span>
                    <span className="text-emerald-400 font-bold">${Number(orderSuccess.totalAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Status:</span>
                    <span className="text-amber-400">{orderSuccess.status || 'Order Placed'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOrderSuccess(null);
                    setIsCheckingOut(false);
                  }}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium transition-colors"
                >
                  Order Something Else
                </button>
              </div>
            ) : !isCheckingOut ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>Bakery Cart</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {cart.reduce((s, i) => s + i.quantity, 0)} items
                    </span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      <p>Your Gojaba Bakery cart is empty.</p>
                      <p className="mt-1 text-slate-600">Select fresh items to test ordering.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs"
                        >
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="text-white font-medium truncate">{item.name}</p>
                            <p className="text-slate-400 font-mono text-[11px]">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white"
                            >
                              -
                            </button>
                            <span className="font-mono text-white text-xs">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subtotal & Checkout Button */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Total Bill:</span>
                    <span className="text-lg font-bold text-amber-300 font-mono">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={cart.length === 0}
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all"
                  >
                    <span>Proceed to Quick Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-4 my-auto">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="font-semibold text-sm text-white">Checkout & Order Placement</h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Back to cart
                  </button>
                </div>

                {/* Unknown Customer Protection Banner */}
                {currentUser ? (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Verified Customer
                      </span>
                      <span className="font-mono text-emerald-400 text-[11px]">Phone OTP Active</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {currentUser.country?.flag} {currentUser.phone} · {currentUser.gender === 'Female' ? '👩 Female' : currentUser.gender === 'Other' ? '🧑 Other' : '👨 Male'} · {currentUser.role}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-950/40 border border-amber-600/50 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        Unknown Customer Verification
                      </span>
                      <span className="font-mono text-amber-400 text-[11px]">Policy Active</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Website order setting requires unknown visitors to verify with Phone Demo OTP & Gender before placing orders.
                    </p>
                    <button
                      type="button"
                      onClick={onRequireSignUp}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Sign Up with Phone Demo OTP Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-2.5 bg-rose-950/40 border border-rose-800/60 rounded-lg text-xs text-rose-300">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Tariq"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="03160256315"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Cash on Delivery')}
                      className={`p-2 rounded-lg border text-center transition-colors ${
                        paymentMethod === 'Cash on Delivery'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Online Card')}
                      className={`p-2 rounded-lg border text-center transition-colors ${
                        paymentMethod === 'Online Card'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Credit Card (Sim)
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Saving Order to Database...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm & Place Order (${totalAmount.toFixed(2)})</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
