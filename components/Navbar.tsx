"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const navBgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 8]);

  return (
    <motion.nav
      style={{
        backgroundColor: `rgba(28, 28, 30, ${navBgOpacity.get()})`,
        backdropFilter: `blur(${navBlur.get()}px)`,
      }}
      className="fixed top-0 left-0 w-full z-50 h-20 flex items-center px-6 md:px-12 justify-between border-b border-transparent transition-colors duration-300"
    >
      <div className="flex items-center gap-4">
        <Link href="/" className="font-display text-2xl text-road-white tracking-widest uppercase">
          AISANCE
        </Link>
        <div className="hidden md:block w-px h-6 bg-road-white/10" />
        <span className="hidden md:block font-sans text-[10px] text-road-white/40 tracking-[0.3em] uppercase mt-1">
          Road Intelligence OS
        </span>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <button
          onClick={() => scrollTo("how-it-works")}
          className="hidden sm:block font-sans text-[10px] text-road-white/60 hover:text-road-white tracking-widest uppercase transition-colors"
        >
          About
        </button>
        <button
          onClick={() => scrollTo("who-its-for")}
          className="hidden sm:block font-sans text-[10px] text-road-white/60 hover:text-road-white tracking-widest uppercase transition-colors"
        >
          Solutions
        </button>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 border border-road-white/10 hover:border-road-white/30 text-road-white font-sans text-[10px] tracking-widest uppercase transition-all"
          >
            Login
          </Link>
          <Link
            href="/waitlist"
            className="px-4 py-2 bg-forest-green hover:bg-forest-green/90 text-road-white font-sans text-[10px] font-bold tracking-widest uppercase transition-all"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
