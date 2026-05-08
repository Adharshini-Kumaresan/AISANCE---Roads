export default function Footer() {
  return (
    <footer className="py-20 px-6 md:px-12 bg-[#1C1C1E] border-t border-[#3A3A3C]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-display text-4xl text-[#ECE4D8] tracking-widest uppercase">AISANCE</span>
          <p className="font-sans text-[10px] text-[#ECE4D8]/30 tracking-[0.4em] uppercase">
            Roads that know themselves.
          </p>
        </div>

        <div className="flex gap-8 font-sans text-[10px] text-[#ECE4D8]/40 tracking-widest uppercase">
          <a href="#" className="hover:text-[#ECE4D8] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#ECE4D8] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#ECE4D8] transition-colors">Contact</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#3A3A3C]/30 flex justify-between items-center">
        <p className="font-sans text-[10px] text-[#ECE4D8]/20 tracking-widest uppercase">
          © 2026 AISANCE. Built for India&apos;s infrastructure.
        </p>
        <div className="flex gap-4">
          {/* Social icons placeholder */}
        </div>
      </div>
    </footer>
  );
}
