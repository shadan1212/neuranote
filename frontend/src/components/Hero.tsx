import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center font-mono text-center px-4 py-20 sm:px-6 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-orange-100 text-amber-700 text-sm">
          <Sparkles className="w-4 h-4" />
          AI based Second Brain
        </div>
        <h1 className="mb-4 font-bold leading-tight text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-black to-gray-600 bg-clip-text text-transparent">
          The Interactive AI Second Brain
        </h1>
        <p className="mx-auto mb-8 text-gray-600 max-w-lg md:max-w-2xl text-base md:text-lg">
          Your Second Brain learns how you think, and helps you organize,
          recall, and act on your ideas.
        </p>
        <button className="cursor-pointer rounded-md border border-gray-200 bg-white shadow-md px-5 py-2.5 text-base md:px-6 md:py-3 md:text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1  hover:shadow-emerald-400/50">
          Start Building Today
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
