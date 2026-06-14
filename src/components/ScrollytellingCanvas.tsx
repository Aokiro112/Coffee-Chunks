"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowDown, Cpu, Compass, Award } from "lucide-react";

const FRAME_COUNT = 120;

export default function ScrollytellingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Loading states
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress to avoid jitter and scroll wheel step increments
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Preloading all 120 images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Load WebP frames from public/sequence
      img.src = `/sequence/frame_${i}.webp`;
      
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === FRAME_COUNT) {
          setImages(loadedImages);
          // Small timeout for visual grace before showing the site
          setTimeout(() => {
            setIsLoading(false);
          }, 800);
        }
      };

      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
        loaded++;
        setLoadedCount(loaded);
        if (loaded === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoading(false);
        }
      };

      loadedImages.push(img);
    }
  }, []);

  // Drawing current frame on the canvas based on smooth scroll progress
  useEffect(() => {
    if (isLoading || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const renderFrame = (latestProgress: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      // Adjust canvas resolution for high-DPI screens
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Determine frame index: map 0-1 scroll progress to 0-119 index
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(latestProgress * FRAME_COUNT))
      );

      const currentImage = images[frameIndex];

      if (currentImage) {
        // Source aspect ratio (480x270 = 16:9)
        const imgW = 480;
        const imgH = 270;
        const imgRatio = imgW / imgH;
        const screenRatio = width / height;

        let drawW, drawH, drawX, drawY;

        // Contain fit logic
        if (screenRatio > imgRatio) {
          // Screen is wider than image (fit height)
          drawH = height;
          drawW = height * imgRatio;
          drawX = (width - drawW) / 2;
          drawY = 0;
        } else {
          // Screen is narrower/taller than image (fit width)
          drawW = width;
          drawH = width / imgRatio;
          drawX = 0;
          drawY = (height - drawH) / 2;
        }

        // Clear canvas
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        // Draw image frame
        ctx.drawImage(currentImage, drawX, drawY, drawW, drawH);
      }

      ctx.restore();
    };

    // Listen to scroll progress changes and trigger canvas render
    const unsubscribe = smoothProgress.on("change", (latest) => {
      animationFrameId = requestAnimationFrame(() => renderFrame(latest));
    });

    // Handle initial render
    renderFrame(smoothProgress.get());

    // Handle window resize
    const handleResize = () => {
      renderFrame(smoothProgress.get());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoading, images, smoothProgress]);

  // Compute loading percentage
  const loadingPercentage = Math.floor((loadedCount / FRAME_COUNT) * 100);

  // Helper function to generate smooth animations for text beats
  const createBeatTransforms = (start: number, end: number) => {
    const duration = end - start;
    const fadeInEnd = start + duration * 0.1;
    const fadeOutStart = end - duration * 0.1;

    // Mapping opacity: [0, 1, 1, 0]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const opacity = useTransform(
      scrollYProgress,
      [start, fadeInEnd, fadeOutStart, end],
      [0, 1, 1, 0]
    );

    // Mapping vertical position: [20px, 0px, 0px, -20px]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const y = useTransform(
      scrollYProgress,
      [start, fadeInEnd, fadeOutStart, end],
      [20, 0, 0, -20]
    );

    return { opacity, y };
  };

  // Scrollytelling Beats setup
  const beatA = createBeatTransforms(0.0, 0.2);   // 0% - 20%
  const beatB = createBeatTransforms(0.25, 0.45); // 25% - 45%
  const beatC = createBeatTransforms(0.5, 0.7);   // 50% - 70%
  const beatD = createBeatTransforms(0.75, 0.95); // 75% - 95%

  // Scroll indicator transforms (visible at 0%, fades out by 10%)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.0, 0.1], [1, 0]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0.0, 0.1], [0, 15]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none"
          >
            <div className="relative flex flex-col items-center max-w-md w-full px-6">
              {/* Luxury Tech Logo / Graphic */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-8 flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md"
              >
                <Compass className="w-8 h-8 text-white/80 animate-[spin_8s_linear_infinite]" />
              </motion.div>

              {/* Title */}
              <h2 className="text-xs font-semibold tracking-[0.3em] text-white/80 uppercase mb-4">
                AETHER CALIBER 119
              </h2>
              
              {/* Spinner & Progress Bar */}
              <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden mb-3 relative">
                <motion.div 
                  className="h-full bg-white/80"
                  style={{ width: `${loadingPercentage}%` }}
                />
              </div>

              {/* Loading progress readout */}
              <div className="flex justify-between w-full text-[10px] tracking-widest text-white/40 font-mono">
                <span>PRELOADING ASSETS</span>
                <span>{loadingPercentage}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        <canvas ref={canvasRef} className="block pointer-events-none" />

        {/* Text Overlays - Scrollytelling Beats */}
        
        {/* Beat A (0-20%): Hero Introduction */}
        <motion.div
          style={{ opacity: beatA.opacity, y: beatA.y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-10"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/40 mb-3 sm:mb-4">
            Horological Breakthrough
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-normal tracking-tighter text-white/95 leading-none max-w-4xl font-sans select-none">
            AETHER CALIBER 119
          </h1>
          <p className="text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase text-white/60 mt-4 sm:mt-6 max-w-lg font-light">
            Micro-mechanics engineered to defy gravity.
          </p>
        </motion.div>

        {/* Beat B (25-45%): Design Detail */}
        <motion.div
          style={{ opacity: beatB.opacity, y: beatB.y }}
          className="absolute inset-y-0 left-0 md:left-24 flex items-center justify-start text-left px-6 sm:px-12 md:px-0 pointer-events-none z-10 max-w-xl"
        >
          <div className="backdrop-blur-[2px] bg-black/10 p-4 sm:p-8 rounded-2xl border border-white/[0.03]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono">
                Component Architecture
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white/90 leading-tight mb-3 sm:mb-4">
              120 Interlocking Elements
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
              Every gear, spring, and bridge is carved from high-grade carbon-composite titanium, achieving perfect balance and near-zero inertia.
            </p>
          </div>
        </motion.div>

        {/* Beat C (50-70%): Engineering / Feature */}
        <motion.div
          style={{ opacity: beatC.opacity, y: beatC.y }}
          className="absolute inset-y-0 right-0 md:right-24 flex items-center justify-end text-right px-6 sm:px-12 md:px-0 pointer-events-none z-10 max-w-xl"
        >
          <div className="backdrop-blur-[2px] bg-black/10 p-4 sm:p-8 rounded-2xl border border-white/[0.03] flex flex-col items-end">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono">
                Oscillator Performance
              </span>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white/90 leading-tight mb-3 sm:mb-4">
              18,800 BPH Tourbillon
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
              Suspended in a rotating dual-axis cage, the escapement negates earth’s gravitational pull, securing unmatched rate stability.
            </p>
          </div>
        </motion.div>

        {/* Beat D (75-95%): CTA / Wrap Up */}
        <motion.div
          style={{ opacity: beatD.opacity, y: beatD.y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/40 mb-3 sm:mb-4">
            Limited Release
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tighter text-white/95 leading-none max-w-3xl mb-6">
            OWN THE HOROLOGY
          </h2>
          <p className="text-sm sm:text-base text-white/60 max-w-md font-light mb-8">
            Caliber 119 is limited to 119 individually numbered custom builds. Hand-assembled by master watchmakers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pointer-events-auto">
            <a 
              href="#reserve" 
              className="px-8 py-3.5 rounded-full bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
            >
              Reserve Caliber 119
            </a>
            <a 
              href="#specifications" 
              className="px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.02] text-white text-xs font-semibold tracking-widest uppercase hover:bg-white/5 hover:border-white/25 transition-all duration-300"
            >
              Specifications
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator (Scroll to Explore) */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 font-light">
            Scroll to Explore
          </span>
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/30"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
