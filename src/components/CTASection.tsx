import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Hls from 'hls.js';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function CTASection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log("HLS backdrop play was blocked:", e));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS support
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log("Safari backdrop play was blocked:", e));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  const handleScrollToHome = () => {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToDrop = () => {
    const dropSection = document.getElementById('ray-ban-drop');
    if (dropSection) {
       dropSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[600px] w-full flex items-center justify-center border-t border-border/30 overflow-hidden bg-black text-center">
      
      {/* Background Mux HLS Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none select-none z-0"
      />

      {/* Dark overlay to balance contrast */}
      <div className="absolute inset-0 bg-black/75 z-[1] pointer-events-none" />

      {/* Centered Content */}
      <div className="relative z-10 max-w-2xl px-8 flex flex-col items-center justify-center">
        
        {/* Concentric circles logo icon */}
        <motion.div 
          {...fadeUp(0.1)}
          className="relative w-10 h-10 border-2 border-foreground/60 rounded-full flex items-center justify-center mb-6"
        >
          <div className="w-5 h-5 border border-foreground/60 rounded-full" />
        </motion.div>

        {/* Heading */}
        <motion.h2 
          {...fadeUp(0.2)}
          className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-foreground mb-4"
        >
          Start Your <span className="font-serif italic font-normal text-white">Journey</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          {...fadeUp(0.35)}
          className="text-muted-foreground text-sm sm:text-base tracking-wide leading-relaxed max-w-md mb-10"
        >
          Subscribe to our deep tech publication loop, or secure one of our curated smart hardware drops directly.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          {...fadeUp(0.5)}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Subscribe Scroll Button */}
          <motion.button
            onClick={handleScrollToHome}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-foreground text-background font-sans font-bold text-xs tracking-[1.5px] uppercase rounded-full px-8 py-4 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Subscribe Now
          </motion.button>

          {/* Liquid Glass Shopping Button */}
          <motion.button
            onClick={handleScrollToDrop}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="liquid-glass w-full sm:w-auto text-foreground font-sans font-bold text-xs tracking-[1.5px] uppercase rounded-full px-8 py-4 border border-white/15 cursor-pointer hover:bg-white/5 transition-colors"
          >
            Reserve Ray-Ban Drop
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
