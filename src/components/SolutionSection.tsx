import { motion } from 'framer-motion';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function SolutionSection() {
  const features = [
    {
      title: "Curated Feed",
      description: "A personalized, chronological feed of content curated by thinkers you trust. No dark patterns, no algorithmic traps, just depth."
    },
    {
      title: "Writer Tools",
      description: "Distribute your words with minimal layout clutter. Elegant markdown editors, direct subscriber reach, and transparent monetization."
    },
    {
      title: "Community",
      description: "Interact directly with readers through inline conversations. A space where feedback builds insight rather than toxic noise."
    },
    {
      title: "Distribution",
      description: "Seamless synchronization across newsletter networks, web archives, and custom audio interfaces for listeners on the go."
    }
  ];

  return (
    <section id="use-cases" className="relative bg-black text-left px-8 md:px-28 py-32 md:py-44 border-t border-border/30 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Label & Header */}
        <div>
          <motion.span 
            {...fadeUp(0.1)}
            className="block text-xs font-mono tracking-[3px] uppercase text-muted-foreground mb-4"
          >
            SOLUTION
          </motion.span>
          <motion.h2 
            {...fadeUp(0.2)}
            className="text-4xl md:text-6xl font-sans tracking-tight text-foreground"
          >
            The platform for <span className="font-serif italic font-normal text-white">meaningful</span> content
          </motion.h2>
        </div>

        {/* 3:1 Ratio Wide Loop Video */}
        <motion.div 
          {...fadeUp(0.3)}
          className="relative w-full aspect-[2.8/1] sm:aspect-[3/1] rounded-2xl overflow-hidden border border-white/5 bg-neutral-950 flex items-center justify-center mb-6"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-full object-cover opacity-75 select-none pointer-events-none"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
              type="video/mp4"
            />
          </video>
          {/* Edge shadow overlay */}
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
        </motion.div>

        {/* 4-column feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              {...fadeUp(0.15 * idx + 0.45)}
              className="flex flex-col gap-3 group"
            >
              <div className="w-8 h-px bg-white/20 group-hover:w-12 transition-all duration-300" />
              <h3 className="font-sans font-semibold text-lg text-foreground tracking-wide mt-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm tracking-wide leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
