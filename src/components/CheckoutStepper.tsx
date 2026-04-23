import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Props {
  currentStep: number;
  steps: string[];
}

const CheckoutStepper = ({ currentStep, steps }: Props) => {
  return (
    <div className="flex items-center justify-center gap-1 py-6">
      {steps.map((label, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? 'hsl(var(--primary))'
                    : isActive
                    ? 'hsl(var(--accent))'
                    : 'hsl(var(--muted))',
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  color: isCompleted || isActive ? 'hsl(var(--accent-foreground))' : 'hsl(var(--muted-foreground))',
                }}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : i + 1}
              </motion.div>
              <span className={`text-xs font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-2 mb-5 h-0.5 w-10 sm:w-16">
                <motion.div
                  initial={false}
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  className="h-full origin-left bg-primary"
                  style={{ backgroundColor: isCompleted ? 'hsl(var(--primary))' : 'hsl(var(--border))' }}
                />
                {!isCompleted && <div className="h-full -mt-0.5 bg-border" />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutStepper;
