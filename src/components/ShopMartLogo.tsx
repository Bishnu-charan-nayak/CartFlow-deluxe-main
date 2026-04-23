import { motion } from 'framer-motion';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 'text-xl', text: 'text-lg' },
  md: { icon: 'text-2xl', text: 'text-xl' },
  lg: { icon: 'text-5xl', text: 'text-4xl' },
};

/**
 * Animated Shop Mart logo with floating + glow effects.
 */
const ShopMartLogo = ({ size = 'md', animate = true, className = '' }: Props) => {
  const s = sizes[size];

  const container = animate
    ? {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, ease: 'easeOut' as const },
      }
    : {};

  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={animate ? { duration: 0.6 } : undefined}
      className={`flex items-center gap-2 select-none ${className}`}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {/* Animated shopping bag icon */}
      <motion.span
        className={`${s.icon} drop-shadow-lg`}
        animate={animate ? {
          y: [0, -4, 0],
          rotate: [0, -5, 5, 0],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🛍️
      </motion.span>

      {/* Text with gradient */}
      <span className={`${s.text} font-extrabold tracking-tight`}>
        <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-sm">
          Shop
        </span>{' '}
        <motion.span
          className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-sm"
          animate={animate ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        >
          Mart
        </motion.span>
      </span>

      {/* Glow effect */}
      {animate && (
        <motion.div
          className="absolute -inset-2 rounded-full bg-primary/10 blur-xl -z-10"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
};

/** Dark-friendly version for non-navbar contexts */
export const ShopMartLogoDark = ({ size = 'lg', animate = true, className = '' }: Props) => {
  const s = sizes[size];
  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.8 } : {}}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-3 select-none ${className}`}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <motion.span
        className={`${s.icon}`}
        animate={animate ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🛍️
      </motion.span>
      <span className={`${s.text} font-extrabold tracking-tight`}>
        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Shop</span>{' '}
        <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Mart</span>
      </span>
    </motion.div>
  );
};

export default ShopMartLogo;
