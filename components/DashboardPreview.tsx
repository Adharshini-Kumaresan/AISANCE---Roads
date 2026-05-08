"use client";

import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <section className="py-32 px-6 md:px-12 bg-asphalt overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-[12px] tracking-[0.4em] text-forest-green uppercase mb-4 block">VISUAL INTELLIGENCE</span>
            <h2 className="font-display text-5xl md:text-7xl text-road-white">THE ROAD HEALTH OPERATING SYSTEM</h2>
            <p className="mt-6 font-sans text-road-white/50 text-lg">
              Built for NHAI, State PWDs, EPC contractors, and Smart City operators.
            </p>
          </div>
        </div>

        {/* Stylized Dashboard Mock */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-forest-green/5 blur-[120px] rounded-full group-hover:bg-forest-green/10 transition-colors duration-1000" />
          
          <div className="relative bg-tarmac border border-crack p-4 md:p-8 rounded-xl shadow-2xl overflow-hidden">
            {/* Mock Header */}
            <div className="flex items-center justify-between mb-12 border-b border-crack pb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-danger-red/40" />
                <div className="w-3 h-3 rounded-full bg-forest-green/40" />
                <div className="w-3 h-3 rounded-full bg-green-verge/40" />
              </div>
              <div className="px-4 py-1 bg-asphalt border border-crack rounded text-[10px] text-road-white/40 tracking-widest uppercase">
                NH 44 - Dindigul Section
              </div>
            </div>

            {/* Mock Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                {/* Heatmap Bar */}
                <div className="space-y-4">
                  <span className="text-[10px] text-road-white/30 tracking-widest uppercase">Segment Comfort Profile</span>
                  <div className="h-12 w-full flex rounded-sm overflow-hidden">
                    <div className="h-full w-[15%] bg-green-verge" />
                    <div className="h-full w-[25%] bg-green-verge/80" />
                    <div className="h-full w-[10%] bg-forest-green" />
                    <div className="h-full w-[5%] bg-danger-red" />
                    <div className="h-full w-[30%] bg-green-verge" />
                    <div className="h-full w-[15%] bg-forest-green/60" />
                  </div>
                </div>

                {/* Timeline Mock */}
                <div className="h-48 w-full border-l border-b border-crack relative">
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_0%,rgba(245,245,240,0.1)_1px,transparent_1px)] bg-[length:40px_100%]" />
                  <svg className="absolute inset-0 w-full h-full overflow-visible">
                    <path
                      d="M 0 100 Q 100 80 200 120 T 400 60 T 600 140 T 800 100"
                      fill="none"
                      stroke="#686710"
                      strokeWidth="2"
                      className="drop-shadow-[0_0_8px_rgba(104,103,16,0.5)]"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-asphalt border border-crack">
                  <span className="text-[10px] text-road-white/30 tracking-widest uppercase block mb-2">Comfort Score</span>
                  <div className="text-5xl font-display text-green-verge">63.4</div>
                  <span className="text-[10px] text-green-verge/50 tracking-widest uppercase block mt-1">+4.2% THIS WEEK</span>
                </div>
                
                <div className="p-6 bg-asphalt border border-crack">
                  <span className="text-[10px] text-road-white/30 tracking-widest uppercase block mb-2">Active Hazards</span>
                  <div className="text-5xl font-display text-danger-red">38</div>
                  <span className="text-[10px] text-danger-red/50 tracking-widest uppercase block mt-1">12 CRITICAL</span>
                </div>

                <div className="p-6 bg-score-blue/10 border border-score-blue/30">
                  <span className="text-[10px] text-score-blue tracking-widest uppercase block mb-2">Predictive Alert</span>
                  <p className="text-xs text-road-white/70 font-sans leading-relaxed">
                    KM 142.5 showing rapid degradation. Estimated failure in 14 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
