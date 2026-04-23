import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingCart, IndianRupee, Package, TrendingUp, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { products as allProducts, categories } from '@/data/products';
import { useOrders } from '@/context/OrderContext';

// Mock data generators
const monthlyData = [
  { month: 'Jan', sales: 45000 }, { month: 'Feb', sales: 63000 }, { month: 'Mar', sales: 78000 },
  { month: 'Apr', sales: 55000 }, { month: 'May', sales: 91000 }, { month: 'Jun', sales: 120000 },
  { month: 'Jul', sales: 98000 }, { month: 'Aug', sales: 115000 }, { month: 'Sep', sales: 142000 },
  { month: 'Oct', sales: 168000 }, { month: 'Nov', sales: 210000 }, { month: 'Dec', sales: 185000 },
];

const COLORS = ['#3b82f6', '#f97316', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#eab308', '#ef4444'];

// Animated counter hook
const useCounter = (target: number, duration = 1500) => {
  return target; // simplified - Framer Motion handles the animation
};

const AdminDashboard = () => {
  const { orders } = useOrders();

  const totalRevenue = useMemo(() => orders.reduce((s, o) => s + o.total, 0), [orders]);
  const totalUsers = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('shopmart_users') || '[]').length; } catch { return 0; }
  }, []);

  const categoryData = useMemo(() =>
    categories.map((cat) => ({
      name: cat,
      value: allProducts.filter((p) => p.category === cat).length,
    })), []);

  const orderStatusData = useMemo(() => {
    const counts = { Processing: 0, Shipped: 0, Delivered: 0 };
    orders.forEach((o) => { counts[o.status] = (counts[o.status] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value: value || Math.floor(Math.random() * 30) + 5 }));
  }, [orders]);

  const stats = [
    { label: 'Total Users', value: totalUsers || 12, icon: Users, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { label: 'Total Orders', value: orders.length || 47, icon: ShoppingCart, color: 'from-orange-500 to-amber-500', change: '+8%' },
    { label: 'Revenue (₹)', value: totalRevenue || 245000, icon: IndianRupee, color: 'from-green-500 to-emerald-500', change: '+23%', isCurrency: true },
    { label: 'Products', value: allProducts.length, icon: Package, color: 'from-purple-500 to-pink-500', change: '+5' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, Admin. Here's your store overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, change, isCurrency }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border bg-card p-5 relative overflow-hidden group hover:shadow-lg transition-shadow"
          >
            <div className={`absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                <ArrowUpRight className="h-3 w-3" />{change}
              </span>
            </div>
            <motion.p
              className="text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              {isCurrency ? `₹${value.toLocaleString('en-IN')}` : value.toLocaleString('en-IN')}
            </motion.p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border bg-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-bold">Sales Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Sales']} />
              <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border bg-card p-5"
        >
          <h3 className="font-bold mb-4">Product Categories</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Orders by Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border bg-card p-5 lg:col-span-2"
        >
          <h3 className="font-bold mb-4">Orders Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={orderStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Orders" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
