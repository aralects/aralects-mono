import { useState } from 'react';
import { motion } from 'framer-motion';
import PhoneFrame from './PhoneFrame';
import { DEMO_LAYOUT } from '../../../constants/demo';

const DemoSection = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartDemo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAnimating(true);

    setTimeout(() => {
      window.location.href = 'https://demo.aralects.com';
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: isAnimating ? -100 : 0, 
          opacity: isAnimating ? 0 : 1 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className={DEMO_LAYOUT.PHONE_FRAME.WIDTH.DEFAULT}
      >
        <PhoneFrame onStartDemo={handleStartDemo} />
      </motion.div>
    </div>
  );
};

export default DemoSection; 