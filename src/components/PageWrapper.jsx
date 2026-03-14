import { useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * PageWrapper provides a consistent entry/exit animation for page components.
 * It implements a "fade and slide up" effect.
 * It also handles scrolling to top upon mount to ensure seamless transitions.
 */
export default function PageWrapper({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.main>
  );
}
