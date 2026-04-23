import { motion } from 'framer-motion';
import { User, Mail, Calendar, Package, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useOrders, Order } from '@/context/OrderContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();

  if (!user) return null;

  const statusColor: Record<string, string> = {
    Processing: 'bg-amber-100 text-amber-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Delivered: 'bg-green-100 text-green-700',
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* User info card */}
        <div className="glass-card p-6 sm:p-8 bg-card/80 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{user.name}</h1>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" />{user.email}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Member since {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 border-t pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{orders.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">₹{orders.reduce((s, o) => s + o.total, 0).toLocaleString('en-IN')}</p>
              <p className="text-xs text-muted-foreground mt-1">Total Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{orders.reduce((s, o) => s + o.items.length, 0)}</p>
              <p className="text-xs text-muted-foreground mt-1">Items Ordered</p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="flex items-center gap-2 mb-4">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Order History</h2>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 rounded-xl border bg-card">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No orders yet. Start shopping!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: Order) => (
              <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/50">
                  <div className="flex items-center gap-4 text-sm">
                    <div><span className="text-muted-foreground">Order</span> <span className="font-semibold">#{order.id}</span></div>
                    <div className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[order.status]}`}>{order.status}</span>
                    <span className="font-bold text-sm">₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-2 pr-4">
                        <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover" />
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    <span className="font-medium">Paid via:</span> {order.paymentMethod} • <span className="font-medium">Ship to:</span> {order.shipping.fullName}, {order.shipping.city}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
