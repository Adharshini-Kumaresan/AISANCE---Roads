"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const totalFrames = 240;

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const incrementProgress = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalFrames) * 100);
      setProgress(currentProgress);

      if (loadedCount === totalFrames) {
        setTimeout(() => {
          onLoadingComplete();
        }, 800);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${frameNumber}.png`;
      img.onload = incrementProgress;
      img.onerror = incrementProgress; // Still increment so we don't get stuck
      images.push(img);
    }
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-asphalt"
    >
      <div className="w-full max-w-md px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl text-road-white mb-2 tracking-widest"
        >
          AISANCE
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-sans text-road-white/40 uppercase tracking-[0.2em] mb-12"
        >
          Loading road intelligence...
        </motion.p>

        {/* Road-styled Progress Bar */}
        <div className="relative w-full h-1 bg-tarmac rounded-full overflow-hidden">
          {/* Lane marking dashes */}
          <div className="absolute inset-0 flex justify-around items-center px-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-[1px] bg-road-white/10" />
            ))}
          </div>
          
          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-forest-green shadow-[0_0_10px_rgba(104,103,16,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <div className="mt-4 flex justify-between items-center font-sans text-[10px] text-road-white/30 tracking-widest">
          <span>SCANNING INFRASTRUCTURE</span>
          <span className="text-forest-green font-bold">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
