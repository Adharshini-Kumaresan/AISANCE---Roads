"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Landmark, HardHat, Building2, ArrowLeft } from "lucide-react";

const sectors = [
  {
    title: "Government Authorities",
    icon: <Landmark className="w-6 h-6 text-[#686710]" />,
    entities: "NHAI · State PWDs · Smart Cities · MoRTH",
    description: "Identify deteriorating roads before accidents happen. Monitor contractors. Audit road quality at scale.",
    backTitle: "How AISANCE Helps Government",
    backPoints: [
      "Real-time road health scoring across entire highway networks — no manual inspection needed.",
      "Contractor accountability: compare reported work vs. actual WRMS-verified road quality.",
      "Dashboards built for NHAI divisions, State PWDs, and Smart City operators out of the box.",
      "SLA compliance tracking: measure how fast officials respond to infrastructure alerts.",
    ],
    stat: { value: "74 km", label: "First Pilot — NH44" },
  },
  {
    title: "EPC Contractors",
    icon: <HardHat className="w-6 h-6 text-[#686710]" />,
    entities: "L&T · Dilip Buildcon · IRB Infra",
    description: "Manage maintenance cycles efficiently. Prove quality compliance to authorities with real-world data.",
    backTitle: "How AISANCE Helps Contractors",
    backPoints: [
      "Objective, sensor-verified road quality data replaces subjective authority inspections.",
      "Prioritize maintenance budgets: WRMS heatmaps show exactly which km needs urgent repair.",
      "Defend quality claims with timestamped, AI-verified AISANCE comfort score certificates.",
      "Reduce dispute resolution time — data speaks louder than contractor reports.",
      "Early degradation alerts let you act before SLA penalties trigger.",
    ],
    stat: { value: "81/100", label: "Best Score Achieved" },
  },
  {
    title: "Mobility & Logistics",
    icon: <Building2 className="w-6 h-6 text-[#686710]" />,
    entities: "Fleet Operators · Logistics Hubs",
    description: "Route optimization based on road health. Reduce vehicle wear and tear by avoiding critical failure segments.",
    backTitle: "How AISANCE Helps Fleets",
    backPoints: [
      "Dynamic route planning using live road comfort scores — avoid critical segments automatically.",
      "Reduce vehicle maintenance costs by up to 18% through smarter route selection.",
      "Driver comfort scoring: monitor which routes cause excessive vibration and fatigue.",
      "Fleet-wide sensor data passively contributes to AISANCE's road intelligence network.",
      "Insurance-grade telemetry reports for risk assessment and fleet compliance.",
    ],
    stat: { value: "1,482", label: "Active Hazards Detected" },
  },
];

function SectorCard({ sector }: { sector: typeof sectors[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative"
      style={{ perspective: "1200px", height: "420px" }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        {/* ── Front Face ── */}
        <div
          className="absolute inset-0 p-10 border border-[#1C1C1E]/10 bg-white/60 flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-6">{sector.icon}</div>
          <h3 className="font-display text-3xl text-[#1C1C1E] mb-2 tracking-widest">{sector.title}</h3>
          <p className="text-[10px] font-sans text-[#686710] uppercase tracking-[0.3em] mb-6 font-bold">
            {sector.entities}
          </p>
          <p className="font-sans text-[#1C1C1E]/70 text-sm leading-relaxed flex-1">
            {sector.description}
          </p>
          <button
            onClick={() => setFlipped(true)}
            className="mt-8 text-[10px] font-sans text-[#1C1C1E] uppercase tracking-widest border-b border-[#1C1C1E] pb-1 w-fit hover:text-[#686710] hover:border-[#686710] transition-colors"
          >
            Learn Use Case →
          </button>
        </div>

        {/* ── Back Face ── */}
        <div
          className="absolute inset-0 p-8 bg-[#1C1C1E] flex flex-col overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl text-white uppercase tracking-wide leading-tight">
              {sector.backTitle}
            </h3>
            <button
              onClick={() => setFlipped(false)}
              className="p-1.5 border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all flex-shrink-0 ml-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <ul className="space-y-3 flex-1">
            {sector.backPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-[#686710] mt-2 flex-shrink-0" />
                <span className="text-[11px] font-sans text-white/60 leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[8px] text-white/30 uppercase tracking-widest font-bold mb-0.5">{sector.stat.label}</div>
              <div className="font-display text-2xl text-[#686710]">{sector.stat.value}</div>
            </div>
            <button
              onClick={() => setFlipped(false)}
              className="text-[9px] font-sans text-white/40 uppercase tracking-widest hover:text-white/70 transition-colors border-b border-white/10 hover:border-white/30 pb-0.5"
            >
              ← Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WhoItsFor() {
  return (
    <section id="who-its-for" className="py-32 px-6 md:px-12 bg-[#ECE4D8]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-[12px] tracking-[0.4em] text-[#686710] uppercase mb-4 block font-bold">ADOPTION</span>
          <h2 className="font-display text-5xl md:text-7xl text-[#1C1C1E]">WHO IT&apos;S FOR</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SectorCard sector={sector} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
