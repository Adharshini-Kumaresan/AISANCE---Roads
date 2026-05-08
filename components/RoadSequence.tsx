"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

const FRAME_COUNT = 240;

export default function RoadSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Preload images for canvas
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const frameNumber = i.toString().padStart(3, "0");
        const img = new Image();
        img.src = `/sequence/ezgif-frame-${frameNumber}.png`;
        const promise = new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
        promises.push(promise);
        loadedImages.push(img);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    preloadImages();
  }, []);

  // Draw to canvas
  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const render = () => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(smoothProgress.get() * FRAME_COUNT)
      );

      const img = images[frameIndex];
      if (img) {
        // Center-contain logic
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgAspect;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
      requestAnimationFrame(render);
    };

    // Resize canvas to window
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [images, smoothProgress]);

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-asphalt">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-contain"
        />
        <div className="vignette" />
        
        {/* Scroll indicator - only at start */}
        <ScrollIndicator progress={scrollYProgress} />

        {/* Text Beats */}
        <BeatA progress={scrollYProgress} />
        <BeatB progress={scrollYProgress} />
        <BeatC progress={scrollYProgress} />
        <BeatD progress={scrollYProgress} />
        <BeatE progress={scrollYProgress} />
      </div>
    </div>
  );
}

function ScrollIndicator({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0, 0.08], [1, 0]);
  return (
    <motion.div 
      style={{ opacity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-road-white/40 font-sans text-[10px] tracking-widest z-20"
    >
      <div className="w-px h-12 bg-gradient-to-b from-road-white/20 to-transparent relative overflow-hidden">
        <motion.div 
          animate={{ y: [0, 48] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-1/2 bg-forest-green"
        />
      </div>
      <span>SCROLL TO WITNESS</span>
    </motion.div>
  );
}

function BeatA({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0, 0.02, 0.13, 0.15], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.02, 0.13, 0.15], [30, 0, 0, -30]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center justify-start pt-[15vh] px-6 text-center z-10 pointer-events-none">
      <span className="text-[12px] tracking-[0.4em] text-forest-green uppercase mb-4">INDIA&apos;S ROADS ARE FAILING SILENTLY</span>
      <h2 className="font-display text-7xl md:text-9xl leading-[0.9] text-road-white max-w-4xl">
        5.9 MILLION<br />KILOMETRES.<br />CRUMBLING.
      </h2>
      <p className="mt-8 text-lg font-sans text-road-white/60 max-w-xl">
        Every day, thousands of vehicles drive over damage that no one has measured. No one has scored. No one has reported.
      </p>
    </motion.div>
  );
}

function BeatB({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.20, 0.22, 0.36, 0.38], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.20, 0.22, 0.36, 0.38], [30, 0, 0, -30]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-y-0 left-0 flex flex-col justify-center pl-[10vw] pr-6 z-10 pointer-events-none text-left">
      <span className="text-[12px] tracking-[0.4em] text-forest-green uppercase mb-4">THE PROBLEM</span>
      <h2 className="font-display text-6xl md:text-8xl leading-[0.9] text-road-white max-w-xl uppercase">
        Roads don&apos;t<br />report<br />themselves.
      </h2>
      <p className="mt-6 text-lg font-sans text-road-white/60 max-w-md">
        Inspection vans come once a quarter. Complaints arrive after accidents. By then, the damage is done.
      </p>
    </motion.div>
  );
}

function BeatC({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.42, 0.44, 0.56, 0.58], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.42, 0.44, 0.56, 0.58], [30, 0, 0, -30]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-y-0 right-0 flex flex-col justify-center pr-[10vw] pl-6 z-10 pointer-events-none text-right items-end">
      <span className="text-[12px] tracking-[0.4em] text-danger-red uppercase mb-4">₹2.5 LAKH CRORE</span>
      <h2 className="font-display text-6xl md:text-8xl leading-[0.9] text-road-white max-w-xl uppercase">
        Lost to<br />poor roads<br />every year.
      </h2>
      <p className="mt-6 text-lg font-sans text-road-white/60 max-w-md">
        Accidents. Delays. Vehicle damage. Freight loss. The cost isn&apos;t just economic — it&apos;s human.
      </p>
      
      <div className="mt-8 flex flex-col gap-2 font-sans text-[12px] text-road-white/50 tracking-wider items-end">
        <span>150,000 ROAD ACCIDENT DEATHS ANNUALLY</span>
        <div className="w-12 h-px bg-road-white/20 my-1" />
        <span>40% CAUSED BY POOR ROAD CONDITION</span>
        <div className="w-12 h-px bg-road-white/20 my-1" />
        <span>₹70,000 CR IN VEHICLE DAMAGE ALONE</span>
      </div>
    </motion.div>
  );
}

function BeatD({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.62, 0.64, 0.76, 0.78], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.62, 0.64, 0.76, 0.78], [30, 0, 0, -30]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 pointer-events-none">
      <span className="text-[12px] tracking-[0.4em] text-forest-green uppercase mb-4">INTRODUCING AISANCE</span>
      <h2 className="font-display text-7xl md:text-9xl leading-[0.9] text-road-white max-w-4xl uppercase">
        Every vehicle<br />is a sensor.
      </h2>
      <p className="mt-8 text-xl font-sans text-road-white/80 max-w-2xl">
        AISANCE converts real-world passenger discomfort into live infrastructure intelligence — continuously, passively, at scale.
      </p>
      
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {["🔵 Comfort Score", "🟡 Hazard Detection", "🟢 Predictive Maintenance", "🔴 Reaction Time Tracking"].map((pill) => (
          <span key={pill} className="px-4 py-2 bg-tarmac/80 border border-crack rounded-full text-[12px] font-sans text-road-white tracking-widest uppercase backdrop-blur-sm">
            {pill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function BeatE({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.82, 0.84, 0.96, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.82, 0.84, 0.96, 1], [30, 0, 0, -30]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 pointer-events-none">
      <span className="text-[12px] tracking-[0.4em] text-green-verge uppercase mb-4">THE FUTURE OF INFRASTRUCTURE</span>
      <h2 className="font-display text-7xl md:text-9xl leading-[0.9] text-road-white max-w-4xl uppercase">
        Roads that<br />know<br />they&apos;re broken.
      </h2>
      <p className="mt-8 text-lg font-sans text-road-white/70 max-w-xl">
        A live digital twin of every road segment. Scored. Ranked. Monitored. Repaired — before the next vehicle has to suffer through it.
      </p>
      
      <div className="mt-12 flex flex-col sm:flex-row gap-4 pointer-events-auto">
        <button className="px-8 py-4 bg-score-blue hover:bg-score-blue/90 text-road-white font-sans text-sm tracking-widest uppercase transition-all duration-300 shadow-xl">
          Request Official Access →
        </button>
        <button className="px-8 py-4 border border-road-white/20 hover:bg-road-white/10 text-road-white font-sans text-sm tracking-widest uppercase transition-all duration-300">
          Join the Waitlist
        </button>
      </div>
    </motion.div>
  );
}
