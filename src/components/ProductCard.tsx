import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/data/products';
import { toast } from 'sonner';
import { useState } from 'react';

interface Props {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: Props) => {
  const addItem = useCartStore((s) => s.addItem);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      stockQuantity: product.stockQuantity,
    });
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setIsAdding(false), 600);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= Math.round(rating) ? 'star-filled fill-current' : 'star-empty'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">
          ({product.reviewCount?.toLocaleString()})
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="card-elevated overflow-hidden">
          {/* Image container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {/* Discount badge */}
            {discount > 0 && (
              <span className="discount-badge">{discount}% OFF</span>
            )}

            {/* Skeleton while loading */}
            {!imgLoaded && <div className="skeleton absolute inset-0 rounded-none" />}

            <img
              src={product.image}
              alt={product.name}
              className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
            />

            {/* Quick add overlay */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
              <motion.button
                onClick={handleQuickAdd}
                whileTap={{ scale: 0.95 }}
                className={`btn-ripple w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isAdding
                    ? 'bg-green-500 text-white'
                    : 'bg-accent text-white hover:bg-accent/90'
                }`}
              >
                <ShoppingCart className={`h-4 w-4 ${isAdding ? 'animate-bounce' : ''}`} />
                {isAdding ? 'Added!' : 'Add to Cart'}
              </motion.button>
            </div>
          </div>

          {/* Product info */}
          <div className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              {product.category}
            </p>
            <h3 className="mt-1 text-sm font-semibold leading-tight text-foreground line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="mt-2">
              {renderStars(product.rating)}
            </div>

            {/* Price */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-green-600">
                    {discount}% off
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
