import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, ShoppingCart, Minus, Plus, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { products as localProducts, Product } from '@/data/products';
import { fetchProducts } from '@/services/stitchApi';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const apiProducts = await fetchProducts();
        setProduct(apiProducts.find((p) => p.id === id));
      } catch (err) {
        console.error('Failed to load from API, using local data', err);
        setProduct(localProducts.find((p) => p.id === id));
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="skeleton aspect-square rounded-2xl" />
          <div className="space-y-4">
            <div className="skeleton h-4 w-24 rounded-full" />
            <div className="skeleton h-8 w-3/4 rounded-full" />
            <div className="skeleton h-6 w-32 rounded-full" />
            <div className="skeleton h-24 w-full rounded-xl" />
            <div className="skeleton h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 gap-4">
        <span className="text-5xl">😕</span>
        <p className="text-lg font-semibold">Product not found</p>
        <Link to="/" className="btn-primary px-6 py-2 text-sm">
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    setIsAdding(true);
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        stockQuantity: product.stockQuantity,
      });
    }
    toast.success(`${qty}x ${product.name} added to cart`);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.round(rating) ? 'star-filled fill-current' : 'star-empty'
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {product.rating} ({product.reviewCount?.toLocaleString()} reviews)
      </span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Image gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3"
        >
          {/* Main image */}
          <div
            className="relative aspect-square overflow-hidden rounded-2xl border bg-card cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            {discount > 0 && (
              <span className="discount-badge text-sm">{discount}% OFF</span>
            )}
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300"
              style={
                isZoomed
                  ? { transform: 'scale(2)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                  : {}
              }
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    i === selectedImage
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-transparent hover:border-muted-foreground/30'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">{product.category}</p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-3">
            {renderStars(product.rating)}
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="rounded-lg bg-green-100 text-green-700 px-2 py-0.5 text-sm font-semibold">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Stock */}
          <div className="mt-3 flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-full ${product.stockQuantity > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-muted-foreground">
              {product.stockQuantity > 0 ? `In stock (${product.stockQuantity} available)` : 'Out of stock'}
            </span>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-xl border overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex h-12 w-12 items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <motion.span
                key={qty}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="w-12 text-center font-semibold text-lg"
              >
                {qty}
              </motion.span>
              <button
                onClick={() => setQty(Math.min(product.stockQuantity, qty + 1))}
                className="flex h-12 w-12 items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button
              onClick={handleAdd}
              className={`h-12 gap-2 text-base btn-ripple rounded-xl font-semibold ${
                isAdding ? 'bg-green-500 text-white' : 'btn-accent'
              }`}
            >
              <ShoppingCart className={`h-5 w-5 ${isAdding ? 'animate-bounce' : ''}`} />
              {isAdding ? 'Added!' : 'Add to Cart'}
            </Button>
            <Button
              onClick={handleAdd}
              className="btn-primary h-12 gap-2 text-base btn-ripple rounded-xl font-semibold"
            >
              <ShoppingBag className="h-5 w-5" />
              Buy Now
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: Truck, label: 'Free Delivery' },
              { icon: Shield, label: '1 Year Warranty' },
              { icon: RotateCcw, label: '30-Day Returns' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;
