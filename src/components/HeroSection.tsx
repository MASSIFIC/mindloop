import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSectionProps {
  avatar1: string;
  avatar2: string;
  avatar3: string;
  onSubscribe: (email: string) => void;
}

export default function HeroSection({ avatar1, avatar2, avatar3, onSubscribe }: HeroSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    onSubscribe(email);
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Autoplaying Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-8 text-center flex flex-col items-center justify-center pt-32">
        
        {/* Avatar Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <div className="flex -space-x-3">
            {[avatar1, avatar2, avatar3].map((av, index) => (
              <img
                key={index}
                src={av}
                alt={`Subscriber avatar ${index + 1}`}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full border-2 border-black object-cover select-none"
              />
            ))}
          </div>
          <span className="text-muted-foreground/90 text-sm font-medium tracking-wide">
            7,000+ people already subscribed
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-sans font-medium tracking-[-2px] leading-[0.95] mb-6 text-foreground text-center"
        >
          Get <span className="font-serif italic font-normal tracking-tight text-white/95">Inspired</span> with Us
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg lg:text-xl font-sans tracking-wide leading-relaxed max-w-2xl mb-12 text-hero-subtitle"
          style={{ color: "hsl(var(--hero-subtitle))" }}
        >
          Join our feed for meaningful updates, news around technology and a shared journey toward depth and direction.
        </motion.p>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full max-w-lg"
        >
          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form 
                key="subscribe-form"
                onSubmit={handleSubmit}
                className="liquid-glass rounded-full p-1.5 flex flex-col sm:flex-row items-center gap-2 overflow-hidden w-full"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email index..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-foreground placeholder:text-muted-foreground/70 outline-none flex-grow text-sm py-3 px-5 w-full sm:w-auto text-left"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-foreground text-background font-sans font-bold text-xs tracking-[1.5px] uppercase rounded-full px-8 py-3.5 hover:bg-neutral-200 transition-colors duration-200 cursor-pointer flex-shrink-0"
                >
                  SUBSCRIBE
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="subscription-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="liquid-glass rounded-full py-4 px-8 flex items-center justify-center border border-accent/40 w-full"
              >
                <p className="text-foreground tracking-wide font-medium text-sm">
                  ✓ Joined the loop. Welcome to the depth.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
