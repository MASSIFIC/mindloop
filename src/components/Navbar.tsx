import { motion } from 'framer-motion';

export default function Navbar() {
  const navLinks = ["Home", "Philosophy", "Use Cases"];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-28 py-6 bg-transparent"
    >
      {/* Left: Logo */}
      <a href="#home" className="flex items-center gap-3 group">
        <div className="relative w-7 h-7 border-2 border-foreground/60 group-hover:border-foreground rounded-full flex items-center justify-center transition-colors duration-300">
          <div className="w-3 h-3 border border-foreground/60 group-hover:border-foreground rounded-full transition-colors duration-300" />
        </div>
        <span className="font-sans font-bold text-lg tracking-tight uppercase">Mindloop</span>
      </a>

      {/* Center-left: Nav links */}
      <div className="hidden md:flex items-center gap-4 text-sm font-medium">
        {navLinks.map((link, idx) => {
          const sectionId = link.toLowerCase().replace(/\s+/g, '-');
          return (
            <div key={link} className="flex items-center">
              <a 
                href={`#${sectionId}`} 
                className="text-muted-foreground hover:text-foreground tracking-wide transition-colors duration-200"
              >
                {link}
              </a>
              {idx < navLinks.length - 1 && (
                <span className="mx-3 text-[10px] text-muted-foreground/30">•</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Right: COD Hardware Drop Button */}
      <div className="flex items-center gap-3">
        <motion.a
          href="#ray-ban-drop"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById('ray-ban-drop');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="liquid-glass px-5 py-2.5 rounded-full text-foreground hover:text-white text-xs font-sans font-bold tracking-[1.5px] uppercase border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          RESERVE DROP (COD)
        </motion.a>
      </div>
    </motion.nav>
  );
}
