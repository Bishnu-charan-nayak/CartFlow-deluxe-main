import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
  useEffect(() => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#e8553a', '#1a2744', '#f5c842'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#e8553a', '#1a2744', '#f5c842'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 10 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10"
        >
          <CheckCircle className="h-10 w-10 text-accent" />
        </motion.div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          Order Confirmed!
        </h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for your purchase. Your order is being processed.
        </p>
        <Link to="/">
          <Button className="btn-accent mt-8 h-12 px-8 text-base">Continue Shopping</Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
