import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black py-12 px-8 md:px-28 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
      
      {/* Left */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-muted-foreground text-xs md:text-sm font-sans"
      >
        &copy; 2026 Mindloop. All rights reserved.
      </motion.p>

      {/* Right */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-center gap-6 text-xs md:text-sm text-muted-foreground font-sans"
      >
        <a href="#privacy" className="hover:text-foreground transition-all duration-200">
          Privacy Policy
        </a>
        <a href="#terms" className="hover:text-foreground transition-all duration-200">
          Terms of Service
        </a>
        <a href="mailto:contact@mindloop.ai" className="hover:text-foreground transition-all duration-200">
          Contact Support
        </a>
      </motion.div>

    </footer>
  );
}
