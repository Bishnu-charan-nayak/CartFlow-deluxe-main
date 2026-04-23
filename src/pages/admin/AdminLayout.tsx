import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShopMartLogo from '@/components/ShopMartLogo';

const navItems = [
  { to: '/bishnu-admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/bishnu-admin/products', icon: Package, label: 'Products', end: false },
  { to: '/bishnu-admin/orders', icon: ShoppingCart, label: 'Orders', end: false },
];

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-card">
        <div className="p-4 border-b">
          <ShopMartLogo size="sm" animate={false} className="text-foreground [&_span]:!bg-clip-text [&_span]:!text-transparent [&_span:first-child]:!bg-gradient-to-r [&_span:first-child]:!from-primary [&_span:first-child]:!to-blue-600 [&_span:last-child]:!bg-gradient-to-r [&_span:last-child]:!from-orange-500 [&_span:last-child]:!to-amber-500" />
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
            <ArrowLeft className="h-4 w-4" /> Back to Store
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-card border-b px-4 py-2">
        <div className="flex items-center gap-4 overflow-x-auto">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                }`
              }
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </NavLink>
          ))}
          <Link to="/" className="ml-auto text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 lg:p-6 p-4 pt-14 lg:pt-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
