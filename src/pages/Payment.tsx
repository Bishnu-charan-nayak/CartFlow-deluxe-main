import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Banknote, Shield, CheckCircle, Loader2 } from 'lucide-react';
import { useOrders } from '@/context/OrderContext';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

type PaymentMethod = 'upi' | 'card' | 'cod';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { placeOrder } = useOrders();
  const clearCart = useCartStore((s) => s.clearCart);
  const state = location.state as { shipping: any; items: any[]; subtotal: number; tax: number; shippingFee: number; total: number } | null;

  const [method, setMethod] = useState<PaymentMethod>('upi');
  const [processing, setProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!state) {
    navigate('/checkout');
    return null;
  }

  const { shipping, items, subtotal, tax, shippingFee, total } = state;

  const handlePlaceOrder = async () => {
    // Validate payment details
    if (method === 'upi' && !upiId.includes('@')) {
      toast.error('Enter a valid UPI ID (e.g., name@upi)');
      return;
    }
    if (method === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) { toast.error('Enter a valid card number'); return; }
      if (!cardExpiry) { toast.error('Enter card expiry'); return; }
      if (cardCvv.length < 3) { toast.error('Enter valid CVV'); return; }
    }

    setProcessing(true);

    // Mock processing delay
    await new Promise((r) => setTimeout(r, 2500));

    // Place order in context
    placeOrder({
      items: items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
      shipping,
      paymentMethod: method === 'upi' ? 'UPI' : method === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery',
      subtotal,
      tax,
      shippingFee,
      total,
    });

    clearCart();
    toast.success('Order placed successfully! 🎉');
    navigate('/order-success');
  };

  const paymentMethods: { id: PaymentMethod; label: string; icon: any; desc: string }[] = [
    { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Pay using GPay, PhonePe, Paytm' },
    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Progress - Step 3 */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[{ num: 1, label: 'Cart Review' }, { num: 2, label: 'Shipping' }, { num: 3, label: 'Payment' }].map(({ num, label }) => (
          <div key={num} className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${num <= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {num < 3 ? <CheckCircle className="h-4 w-4" /> : num}
            </div>
            <span className="hidden sm:inline text-sm font-medium text-muted-foreground">{label}</span>
            {num < 3 && <div className="w-8 sm:w-16 h-0.5 bg-primary" />}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left - Payment Method */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Payment Method</h2>

          <div className="space-y-3">
            {paymentMethods.map(({ id, label, icon: Icon, desc }) => (
              <button key={id} onClick={() => setMethod(id)} className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${method === id ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border hover:border-muted-foreground/30'}`}>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${method === id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <div className={`ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center ${method === id ? 'border-primary' : 'border-muted-foreground/30'}`}>
                  {method === id && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                </div>
              </button>
            ))}
          </div>

          {/* Payment fields */}
          <AnimatePresence mode="wait">
            {method === 'upi' && (
              <motion.div key="upi" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="rounded-xl border bg-card p-5">
                <label className="block text-sm font-medium mb-2">UPI ID</label>
                <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@upi" className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </motion.div>
            )}
            {method === 'card' && (
              <motion.div key="card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="rounded-xl border bg-card p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim())} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry</label>
                    <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/YY" maxLength={5} className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="•••" maxLength={4} className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
              </motion.div>
            )}
            {method === 'cod' && (
              <motion.div key="cod" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center gap-3">
                <Banknote className="h-5 w-5 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-700">Pay <strong>₹{total.toLocaleString('en-IN')}</strong> in cash when your order is delivered.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right - Order Summary */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card p-6 sticky top-28">
            <h3 className="font-bold mb-4">Order Summary</h3>
            <div className="max-h-48 overflow-y-auto space-y-2 mb-4">
              {items.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="h-10 w-10 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm border-t pt-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className={shippingFee === 0 ? 'text-green-600' : ''}>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-3"><span>Total</span><span className="text-primary">₹{total.toLocaleString('en-IN')}</span></div>
            </div>

            <motion.button whileTap={{ scale: 0.97 }} disabled={processing} onClick={handlePlaceOrder} className="btn-primary btn-ripple w-full h-12 mt-6 flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-60">
              {processing ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</>
              ) : (
                <><Shield className="h-4 w-4" /> Place Order — ₹{total.toLocaleString('en-IN')}</>
              )}
            </motion.button>

            {/* Shipping to */}
            <div className="mt-4 rounded-lg bg-muted p-3">
              <p className="text-xs font-semibold mb-1">Delivering to:</p>
              <p className="text-xs text-muted-foreground">{shipping.fullName}, {shipping.address}, {shipping.city}, {shipping.state} - {shipping.pincode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
