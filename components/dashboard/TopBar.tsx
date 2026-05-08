"use client";

import { motion } from "framer-motion";
import { Bell, ShieldCheck, Clock, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <header className="h-16 bg-[#0A0A0A] border-b border-[#222] flex items-center justify-between px-6 flex-shrink-0 z-50">
      {/* Left: Logo + Route */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 bg-[#686710] flex items-center justify-center rounded-sm">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-xl text-white tracking-widest">
            AISANCE <span className="text-[#686710]">ROADS</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-3 border-l border-[#222] pl-8">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#686710]/10 border border-[#686710]/20 rounded-sm">
            <span className="text-[9px] text-[#686710] font-bold uppercase tracking-widest">NH44</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[9px] text-[#928677] uppercase tracking-widest font-bold">Active Route</span>
            <span className="text-xs text-white font-sans mt-0.5">PSNA College → Madurai City</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#928677]" />
        </div>
      </div>

      {/* Center: Contractor Zones */}
      <div className="hidden xl:flex items-center gap-0 border border-[#222] divide-x divide-[#222]">
        {[
          { label: "Dindigul PWD", range: "KM 0–20" },
          { label: "NHAI Zone IV", range: "KM 0–55" },
          { label: "Madurai Corp", range: "KM 35–74" },
        ].map((z) => (
          <div key={z.label} className="px-4 py-2 flex flex-col leading-none">
            <span className="text-[8px] text-[#928677] uppercase tracking-widest">{z.range}</span>
            <span className="text-[10px] text-white font-bold mt-0.5">{z.label}</span>
          </div>
        ))}
      </div>

      {/* Right: Live Sync + Time + Alerts + User */}
      <div className="flex items-center gap-5">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-[#686710]/20 bg-[#686710]/5 rounded-sm">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 bg-[#686710] rounded-full"
          />
          <span className="text-[9px] text-[#686710] font-bold uppercase tracking-widest">Live Telemetry</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-[#928677]">
          <Clock className="w-3 h-3" />
          <span className="text-[9px] font-sans uppercase tracking-wider">07 MAY 2026 · 12:18</span>
        </div>

        <button className="relative p-2 text-[#928677] hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#C0392B] rounded-full" />
        </button>

        <div className="flex items-center gap-2.5 pl-5 border-l border-[#222]">
          <div className="w-7 h-7 bg-[#686710] rounded-full flex items-center justify-center">
            <span className="text-[9px] text-white font-bold">AK</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-[9px] text-white font-bold uppercase tracking-wider">A. Kumaresan</span>
            <span className="text-[8px] text-[#928677] mt-0.5">Chief Engineer, NHAI</span>
          </div>
        </div>
      </div>
    </header>
  );
}
