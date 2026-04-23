import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Trash2, Minus, Plus, MapPin, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

// Moved OUTSIDE the component to prevent re-mounting on every keystroke
const InputField = ({
  label, field, placeholder, type = 'text', value, error, onChange,
}: {
  label: string; field: string; placeholder: string; type?: string;
  value: string; error?: string; onChange: (field: string, value: string) => void;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1.5">{label} <span className="text-destructive">*</span></label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/20 ${error ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'}`}
    />
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);

const Checkout = () => {
  const { items, removeItem, updateQuantity } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Shipping form state
  const [shipping, setShipping] = useState({
    fullName: '', phone: '', address: '', city: '', state: '', pincode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const shippingFee = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shippingFee + tax;

  const updateShipping = (field: string, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateShipping = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!shipping.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shipping.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(shipping.phone.trim())) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!shipping.address.trim()) newErrors.address = 'Address is required';
    if (!shipping.city.trim()) newErrors.city = 'City is required';
    if (!shipping.state.trim()) newErrors.state = 'State is required';
    if (!shipping.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(shipping.pincode.trim())) newErrors.pincode = 'Enter a valid 6-digit pincode';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (items.length === 0) { toast.error('Your cart is empty!'); return; }
      setStep(2);
    } else if (step === 2) {
      if (!validateShipping()) { toast.error('Please fill all shipping details'); return; }
      navigate('/payment', { state: { shipping, items, subtotal, tax, shippingFee, total } });
    }
  };

  if (items.length === 0 && step === 1) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 gap-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some products to checkout</p>
        <Link to="/" className="btn-primary px-6 py-2.5 text-sm mt-2">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Progress steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[
          { num: 1, label: 'Cart Review' },
          { num: 2, label: 'Shipping' },
          { num: 3, label: 'Payment' },
        ].map(({ num, label }) => (
          <div key={num} className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {num}
            </div>
            <span className="hidden sm:inline text-sm font-medium text-muted-foreground">{label}</span>
            {num < 3 && <div className={`w-8 sm:w-16 h-0.5 ${step > num ? 'bg-primary' : 'bg-muted'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Cart Review */}
        {step === 1 && (
          <motion.div key="cart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>Review Your Cart</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-xl border p-4 bg-card">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                    <p className="text-primary font-bold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg border">
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded-l-lg"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded-r-lg"><Plus className="h-3 w-3" /></button>
                  </div>
                  <p className="font-bold text-sm w-24 text-right">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  <button onClick={() => removeItem(item.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 rounded-xl border bg-card p-6">
              <h3 className="font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal ({items.length} items)</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className={shippingFee === 0 ? 'text-green-600 font-medium' : ''}>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3"><span>Total</span><span className="text-primary">₹{total.toLocaleString('en-IN')}</span></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Shipping Address */}
        {step === 2 && (
          <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Shipping Address</h2>
            </div>
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <InputField label="Full Name" field="fullName" placeholder="Enter your full name" value={shipping.fullName} error={errors.fullName} onChange={updateShipping} />
              <InputField label="Phone Number" field="phone" placeholder="10-digit mobile number" type="tel" value={shipping.phone} error={errors.phone} onChange={updateShipping} />
              <InputField label="Address" field="address" placeholder="House no, Building, Street, Area" value={shipping.address} error={errors.address} onChange={updateShipping} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField label="City" field="city" placeholder="City" value={shipping.city} error={errors.city} onChange={updateShipping} />
                <InputField label="State" field="state" placeholder="State" value={shipping.state} error={errors.state} onChange={updateShipping} />
                <InputField label="Pincode" field="pincode" placeholder="6-digit pincode" value={shipping.pincode} error={errors.pincode} onChange={updateShipping} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8">
        <button onClick={() => step === 1 ? navigate('/') : setStep(step - 1)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {step === 1 ? 'Continue Shopping' : 'Back'}
        </button>
        <motion.button whileTap={{ scale: 0.97 }} onClick={handleNext} className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm font-semibold">
          {step === 2 ? 'Proceed to Payment' : 'Continue'}
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default Checkout;
