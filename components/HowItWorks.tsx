"use client";

import { motion } from "framer-motion";
import { Radio, ShieldCheck, BarChart3 } from "lucide-react";

const steps = [
  {
    title: "SENSE",
    icon: <Radio className="w-8 h-8 text-[#ECE4D8]" />,
    description: "Vehicles passively collect vibration data via onboard sensors — no hardware installation needed."
  },
  {
    title: "VERIFY",
    icon: <ShieldCheck className="w-8 h-8 text-[#ECE4D8]" />,
    description: "Our ML engine filters ambient noise to isolate real structural distress and pothole signatures."
  },
  {
    title: "SCORE",
    icon: <BarChart3 className="w-8 h-8 text-[#ECE4D8]" />,
    description: "Roads are scored on a 0-100 index, enabling predictive maintenance before failure occurs."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 md:px-12 bg-[#686710]"> {/* Olive Background */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-[12px] tracking-[0.4em] text-[#ECE4D8]/60 uppercase mb-4 block">THE PROCESS</span>
          <h2 className="font-display text-5xl md:text-7xl text-[#ECE4D8]">HOW IT WORKS</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1C1C1E]/10 p-10 border border-[#ECE4D8]/10 group hover:border-[#ECE4D8]/30 transition-all"
            >
              <div className="mb-8 p-4 bg-[#ECE4D8]/5 w-fit rounded-sm group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="font-display text-3xl text-[#ECE4D8] mb-4 tracking-widest">{step.title}</h3>
              <p className="font-sans text-[#ECE4D8]/70 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
