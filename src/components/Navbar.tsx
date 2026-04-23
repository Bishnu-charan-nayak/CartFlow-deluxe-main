import { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, ChevronDown, LogOut, Package, Shield } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/context/AuthContext';
import { categories, categoryIcons } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import ShopMartLogo from '@/components/ShopMartLogo';
import ThemeToggle from '@/components/ThemeToggle';

const Navbar = () => {
  const totalItems = useCartStore((s) => s.totalItems());
  const toggleDrawer = useCartStore((s) => s.toggleDrawer);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <header className="sticky top-0 z-30">
      <nav className="nav-gradient text-white">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          {/* Mobile menu toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 lg:hidden hover:bg-white/10 rounded-lg transition-colors" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <ShopMartLogo size="sm" animate={false} />
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-2xl mx-4">
            <div className="flex w-full rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 focus-within:bg-white/20 focus-within:border-white/40 transition-all duration-200">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for products, brands and more..." className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none" />
              <button type="submit" className="px-4 hover:bg-white/10 transition-colors" aria-label="Search">
                <Search className="h-4 w-4 text-white/70" />
              </button>
            </div>
          </form>

          {/* Right section */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            {/* Dark mode toggle */}
            <ThemeToggle />

            {/* User / Login */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors">
                  <User className="h-4 w-4" />
                  <span className="max-w-[100px] truncate">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-xl border bg-card shadow-xl p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b mb-1">
                        <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-foreground rounded-lg hover:bg-muted transition-colors">
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-foreground rounded-lg hover:bg-muted transition-colors">
                        <Package className="h-4 w-4" /> My Orders
                      </Link>
                      {isAdmin && (
                        <Link to="/bishnu-admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-foreground rounded-lg hover:bg-muted transition-colors">
                          <Shield className="h-4 w-4 text-primary" /> Admin Panel
                        </Link>
                      )}
                      <button onClick={() => { logout(); setUserMenuOpen(false); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive rounded-lg hover:bg-destructive/10 transition-colors">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors">
                <User className="h-4 w-4" /><span>Login</span>
              </Link>
            )}

            {/* Cart */}
            <button onClick={toggleDrawer} className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Open cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">Cart</span>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span key={totalItems} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center rounded-full text-xs font-bold bg-accent text-white">
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="flex">
            <div className="flex w-full rounded-xl overflow-hidden bg-white/10 border border-white/20">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/50 outline-none" />
              <button type="submit" className="px-3" aria-label="Search"><Search className="h-4 w-4 text-white/70" /></button>
            </div>
          </form>
        </div>
      </nav>

      {/* Categories bar */}
      <div className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            <Link to="/" className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${activeCategory === 'All' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
              🏪 All
            </Link>
            {categories.map((cat) => (
              <Link key={cat} to={`/?category=${cat}`} className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                {categoryIcons[cat]} {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed left-0 top-0 h-full w-72 bg-card z-50 shadow-2xl lg:hidden">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>🛍️ Shop Mart</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1"><X className="h-5 w-5" /></button>
                </div>
              </div>
              <div className="p-4 space-y-1">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-3 rounded-lg bg-muted mb-2">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                      <User className="h-5 w-5 text-muted-foreground" /> My Profile
                    </Link>
                    {isAdmin && (
                      <Link to="/bishnu-admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                        <Shield className="h-5 w-5 text-primary" /> Admin Panel
                      </Link>
                    )}
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                      <LogOut className="h-5 w-5" /> Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted transition-colors">
                    <User className="h-5 w-5 text-muted-foreground" /> Login / Sign Up
                  </Link>
                )}
                <div className="border-t my-3" />
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Categories</p>
                {categories.map((cat) => (
                  <Link key={cat} to={`/?category=${cat}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                    <span className="text-lg">{categoryIcons[cat]}</span> {cat}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
