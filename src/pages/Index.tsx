import { useState, useMemo, useEffect, useCallback, lazy, Suspense } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Gift, Truck, Shield } from 'lucide-react';
import { products as localProducts, categories, categoryIcons, Product } from '@/data/products';
import { fetchProducts } from '@/services/stitchApi';
import ProductCard from '@/components/ProductCard';
import SkeletonCard from '@/components/SkeletonCard';

const bannerSlides = [
  {
    id: 1,
    title: 'Mega Electronics Sale',
    subtitle: 'Up to 60% off on top brands',
    cta: 'Shop Now',
    category: 'Electronics',
    gradient: 'from-blue-600 via-indigo-600 to-purple-700',
    emoji: '⚡',
  },
  {
    id: 2,
    title: 'Fashion Week Deals',
    subtitle: 'New arrivals starting at ₹799',
    cta: 'Explore',
    category: 'Fashion',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
    emoji: '👗',
  },
  {
    id: 3,
    title: 'Sneaker Drop',
    subtitle: 'Latest collection just landed',
    cta: 'Get Yours',
    category: 'Shoes',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    emoji: '👟',
  },
  {
    id: 4,
    title: 'Home & Living',
    subtitle: 'Transform your space — 40% off',
    cta: 'Discover',
    category: 'Home',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    emoji: '🏠',
  },
];

const trustBadges = [
  { icon: Truck, label: 'Free Shipping', sub: 'On orders ₹999+' },
  { icon: Shield, label: 'Secure Checkout', sub: '256-bit SSL' },
  { icon: Gift, label: 'Easy Returns', sub: '30-day policy' },
  { icon: Zap, label: 'Fast Delivery', sub: '2-5 business days' },
];

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const apiProducts = await fetchProducts();
        setProducts(apiProducts);
        setError(null);
      } catch (err) {
        console.error('Failed to load from API, using local data', err);
        setProducts(localProducts);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Auto-slide banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, products, searchQuery]);

  const setCategory = (cat: string) => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner Slider */}
      <section className="relative overflow-hidden">
        <div className="relative h-[280px] sm:h-[340px] lg:h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className={`absolute inset-0 bg-gradient-to-r ${bannerSlides[currentSlide].gradient}`}
            >
              <div className="container mx-auto flex h-full items-center px-6 sm:px-8">
                <div className="max-w-xl text-white">
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl sm:text-6xl"
                  >
                    {bannerSlides[currentSlide].emoji}
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {bannerSlides[currentSlide].title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-2 text-lg text-white/80 sm:text-xl"
                  >
                    {bannerSlides[currentSlide].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Link
                      to={`/?category=${bannerSlides[currentSlide].category}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-gray-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                    >
                      {bannerSlides[currentSlide].cta}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute -right-20 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -right-10 -bottom-20 h-[200px] w-[200px] rounded-full bg-white/5" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {bannerSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b bg-card">
        <div className="container mx-auto grid grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-4">
          {trustBadges.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl px-3 py-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{label}</p>
                <p className="text-[11px] text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Cards */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCategory(cat)}
              className={`category-chip ${
                activeCategory === cat ? 'border-primary bg-primary/5 shadow-md' : ''
              }`}
            >
              <span className="text-2xl sm:text-3xl">{categoryIcons[cat]}</span>
              <span className="text-xs sm:text-sm font-medium">{cat}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            {activeCategory === 'All' ? 'All Products' : activeCategory}
            {searchQuery && ` — "${searchQuery}"`}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl bg-destructive/10 p-4 text-center text-destructive text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-lg font-semibold text-foreground">No products found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try a different category or search term
            </p>
            <button
              onClick={() => setSearchParams({})}
              className="mt-4 btn-primary px-6 py-2 text-sm"
            >
              View All Products
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            <AnimatePresence>
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Index;
