import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';

const CartDrawer = () => {
  const { items, isDrawerOpen, setDrawerOpen, removeItem, updateQuantity, totalPrice } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop-blur-overlay"
            onClick={() => setDrawerOpen(false)}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="flex items-center justify-center h-6 min-w-[24px] rounded-full bg-primary text-primary-foreground text-xs font-bold px-2">
                    {items.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <ShoppingBag className="h-10 w-10" />
                  </div>
                  <p className="text-sm font-medium">Your cart is empty</p>
                  <p className="text-xs text-center max-w-[200px]">
                    Looks like you haven't added anything yet. Start shopping!
                  </p>
                  <Button
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate('/');
                    }}
                    className="btn-primary mt-2 gap-2"
                  >
                    Browse Products
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0, padding: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mb-3 flex gap-3 rounded-2xl border bg-card p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div>
                          <p className="text-sm font-semibold leading-tight line-clamp-2">{item.name}</p>
                          <p className="text-sm font-bold text-primary mt-0.5">₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center rounded-xl border overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex h-7 w-8 items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <motion.span
                              key={item.quantity}
                              initial={{ scale: 1.3 }}
                              animate={{ scale: 1 }}
                              className="w-8 text-center text-sm font-semibold"
                            >
                              {item.quantity}
                            </motion.span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-7 w-8 items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="border-t bg-card p-5"
              >
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold text-lg">₹{totalPrice().toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Shipping & taxes calculated at checkout</p>
                <Button
                  onClick={handleCheckout}
                  className="btn-accent w-full h-12 text-base gap-2 btn-ripple"
                >
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
