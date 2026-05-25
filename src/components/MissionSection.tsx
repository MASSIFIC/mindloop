import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll on the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const text1 = "We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having.";
  const text2 = "A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved.";

  const words1 = text1.split(" ");
  const words2 = text2.split(" ");

  // We map words1 to scroll range [0.15, 0.45]
  // We map words2 to scroll range [0.5, 0.8]

  // Highlight words checking
  const isHighlight = (word: string) => {
    const cleaned = word.toLowerCase().replace(/[.,—\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    return ["curiosity", "meets", "clarity"].includes(cleaned);
  };

  return (
    <section 
      ref={containerRef}
      id="philosophy" 
      className="relative bg-black text-center px-8 md:px-28 pt-0 pb-32 md:pb-44 overflow-hidden flex flex-col items-center"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Large Centered Video (800x800 style, optimized with max-w-2xl or aspect-square) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-[500px] md:max-w-[650px] aspect-square rounded-full overflow-hidden mb-20 md:mb-28 border border-white/5 bg-neutral-950 flex items-center justify-center shadow-2xl shadow-neutral-900"
        >
          {/* Loop Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-full object-cover opacity-80 select-none pointer-events-none"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle inside glow */}
          <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </motion.div>

        {/* Word Reveal Paragraphs */}
        <div className="max-w-4xl text-left md:text-center select-none flex flex-col gap-12">
          
          {/* Paragraph 1 */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium tracking-[-1px] leading-[1.3] flex flex-wrap justify-start md:justify-center">
            {words1.map((word, index) => {
              // Range for this specific word
              const relativeStep = 0.3 / words1.length;
              const wordStart = 0.12 + index * relativeStep;
              const wordEnd = wordStart + relativeStep;

              // Opacity transform
              const opacity = useTransform(scrollYProgress, [wordStart, wordEnd], [0.15, 1]);
              const highlight = isHighlight(word);

              return (
                <motion.span
                  key={`w1-${index}`}
                  style={{ opacity }}
                  className={`inline-block mr-2.5 mb-1.5 transition-colors duration-200 ${
                    highlight 
                      ? 'text-foreground font-semibold' 
                      : 'text-hero-subtitle/85'
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </p>

          {/* Paragraph 2 */}
          <p className="text-xl md:text-2xl lg:text-3xl font-sans font-medium tracking-[-0.5px] leading-[1.35] mt-6 flex flex-wrap justify-start md:justify-center">
            {words2.map((word, index) => {
              // Range for this specific word
              const relativeStep = 0.3 / words2.length;
              const wordStart = 0.45 + index * relativeStep;
              const wordEnd = wordStart + relativeStep;

              // Opacity transform
              const opacity = useTransform(scrollYProgress, [wordStart, wordEnd], [0.15, 1]);

              return (
                <motion.span
                  key={`w2-${index}`}
                  style={{ opacity }}
                  className="inline-block mr-2.5 mb-1.5 transition-colors duration-200 text-hero-subtitle/82 font-normal"
                >
                  {word}
                </motion.span>
              );
            })}
          </p>

        </div>

      </div>
    </section>
  );
}
