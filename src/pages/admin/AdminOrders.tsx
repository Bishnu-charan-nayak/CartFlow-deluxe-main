import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, Search } from 'lucide-react';
import { useOrders, Order } from '@/context/OrderContext';
import { toast } from 'sonner';

const statusOptions: Order['status'][] = ['Processing', 'Shipped', 'Delivered'];

const statusColors: Record<string, string> = {
  Processing: 'bg-amber-100 text-amber-700 border-amber-200',
  Shipped: 'bg-blue-100 text-blue-700 border-blue-200',
  Delivered: 'bg-green-100 text-green-700 border-green-200',
};

const AdminOrders = () => {
  const { orders } = useOrders();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  // Local state for status overrides (since OrderContext doesn't have updateOrder)
  const [statusOverrides, setStatusOverrides] = useState<Record<string, Order['status']>>({});

  const getStatus = (order: Order) => statusOverrides[order.id] || order.status;

  const filtered = useMemo(() => {
    let result = orders;
    if (statusFilter !== 'All') result = result.filter((o) => getStatus(o) === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((o) => o.id.toLowerCase().includes(q) || o.shipping.fullName.toLowerCase().includes(q));
    }
    return result;
  }, [orders, statusFilter, search, statusOverrides]);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setStatusOverrides((prev) => ({ ...prev, [orderId]: newStatus }));
    toast.success(`Order ${orderId} updated to ${newStatus}`);
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Package className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="text-xl font-bold">No orders yet</h2>
        <p className="text-sm text-muted-foreground">Orders will appear here when customers place them.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Orders ({orders.length})</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by order ID or name..." className="w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border px-3 py-2.5 text-sm outline-none bg-card focus:border-primary">
          <option>All</option>
          {statusOptions.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filtered.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-xl border bg-card overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-muted/30">
              <div className="flex items-center gap-4 text-sm">
                <div><span className="text-muted-foreground">Order </span><span className="font-bold">#{order.id}</span></div>
                <span className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={getStatus(order)}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-semibold outline-none cursor-pointer ${statusColors[getStatus(order)]}`}
                >
                  {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="font-bold text-sm">₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-3 mb-3">
                {order.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2 rounded-lg bg-muted/50 p-2 pr-3">
                    <img src={item.image} alt={item.name} className="h-10 w-10 rounded-md object-cover" />
                    <div>
                      <p className="text-xs font-medium truncate max-w-[150px]">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                <span><strong>Customer:</strong> {order.shipping.fullName}</span>
                <span><strong>Phone:</strong> {order.shipping.phone}</span>
                <span><strong>Address:</strong> {order.shipping.address}, {order.shipping.city} - {order.shipping.pincode}</span>
                <span><strong>Payment:</strong> {order.paymentMethod}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
