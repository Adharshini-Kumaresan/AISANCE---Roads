"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "240+", label: "Segments", subLabel: "Monitored" },
  { value: "1,482", label: "Active Hazards", subLabel: "Detected" },
  { value: "74 km", label: "First Route", subLabel: "(NH 44)" },
  { value: "81/100", label: "Best Comfort", subLabel: "Score Achieved" },
];

export default function KeyMetrics() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#1C1C1E]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-[#3A3A3C] pt-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="font-display text-5xl md:text-7xl text-[#686710] mb-2">{metric.value}</div>
              <div className="font-sans text-[10px] text-[#ECE4D8]/60 tracking-[0.3em] uppercase block font-bold mb-1">
                {metric.label}
              </div>
              <div className="font-sans text-[10px] text-[#ECE4D8]/30 tracking-[0.3em] uppercase block">
                {metric.subLabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
