"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Activity, AlertCircle } from "lucide-react";
import { Segment } from "@/app/dashboard/data";

interface SegmentSidebarProps {
  segments: Segment[];
  selectedId: number;
  onSelect: (id: number) => void;
}

function scoreColor(score: number) {
  if (score < 40) return "text-[#C0392B] bg-[#C0392B]/10";
  if (score < 60) return "text-[#D6C3AB] bg-[#D6C3AB]/10";
  if (score < 75) return "text-[#20B2AA] bg-[#20B2AA]/10";
  return "text-[#686710] bg-[#686710]/10";
}

function priorityColor(p: string) {
  if (p === "Critical") return "text-[#C0392B] border-[#C0392B]/30";
  if (p === "High")     return "text-[#D6C3AB] border-[#D6C3AB]/30";
  if (p === "Medium")   return "text-[#20B2AA] border-[#20B2AA]/30";
  return "text-[#928677] border-[#928677]/30";
}

const FILTERS = ["All", "Critical", "Poor", "Fair", "Good"] as const;

export default function SegmentSidebar({ segments, selectedId, onSelect }: SegmentSidebarProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const visible = segments.filter(s => {
    const q = query.toLowerCase();
    const match = s.name.toLowerCase().includes(q) || s.kmRange.toLowerCase().includes(q);
    if (!match) return false;
    if (filter === "Critical") return s.comfortScore < 40;
    if (filter === "Poor")     return s.comfortScore >= 40 && s.comfortScore < 60;
    if (filter === "Fair")     return s.comfortScore >= 60 && s.comfortScore < 75;
    if (filter === "Good")     return s.comfortScore >= 75;
    return true;
  });

  return (
    <div className="w-[340px] xl:w-[380px] flex-shrink-0 border-r border-[#1a1a1a] flex flex-col bg-[#080808]" style={{ height: "calc(100vh - 164px)" }}>
      {/* Sticky header */}
      <div className="flex-shrink-0 p-4 border-b border-[#1a1a1a] space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#928677]" />
          <input
            type="text"
            placeholder="Search by name or KM…"
            className="w-full bg-[#111] border border-[#222] pl-9 pr-4 py-2 text-[11px] text-white outline-none focus:border-[#686710] transition-all placeholder:text-[#444]"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-1 text-[8px] uppercase tracking-widest font-bold border transition-all ${
                filter === f
                  ? "bg-[#686710] border-[#686710] text-white"
                  : "border-[#222] text-[#928677] hover:border-[#444]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="text-[8px] text-[#928677] uppercase tracking-widest">
          {visible.length} of {segments.length} segments
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence initial={false}>
          {visible.map(seg => (
            <motion.button
              key={seg.id}
              onClick={() => onSelect(seg.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`w-full text-left px-4 py-4 border-b border-[#111] relative transition-colors group ${
                selectedId === seg.id ? "bg-[#111]" : "hover:bg-[#0f0f0f]"
              }`}
            >
              {/* Active indicator */}
              {selectedId === seg.id && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#686710]" />
              )}
              {/* Critical pulse */}
              {seg.comfortScore < 40 && (
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute right-4 top-4 w-1.5 h-1.5 rounded-full bg-[#C0392B]"
                />
              )}

              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-[8px] text-[#928677] uppercase tracking-widest font-bold mb-0.5">{seg.kmRange}</div>
                  <div className={`text-sm font-display uppercase tracking-wide leading-tight group-hover:text-[#686710] transition-colors ${
                    selectedId === seg.id ? "text-white" : "text-[#ccc]"
                  }`}>
                    {seg.name}
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-sm ml-2 flex-shrink-0 ${scoreColor(seg.comfortScore)}`}>
                  {seg.comfortScore}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 text-[#928677]" />
                  <span className="text-[8px] text-[#928677] font-bold uppercase">{seg.wrms} m/s²</span>
                </div>
                {seg.potholes > 0 && (
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5 text-[#C0392B]" />
                    <span className="text-[8px] text-[#C0392B] font-bold uppercase">{seg.potholes} potholes</span>
                  </div>
                )}
                <div className={`ml-auto px-1.5 py-0.5 border text-[7px] uppercase tracking-wider font-bold ${priorityColor(seg.priority)}`}>
                  {seg.priority}
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1.5">
                <div className="text-[7px] text-[#444] uppercase tracking-wider">{seg.zone}</div>
                <div className="text-[7px] text-[#333]">·</div>
                <div className={`text-[7px] uppercase tracking-wider font-bold ${
                  seg.reactionTime <= 24 ? "text-[#686710]" :
                  seg.reactionTime <= 72 ? "text-[#D6C3AB]" : "text-[#C0392B]"
                }`}>
                  {seg.reactionTime}h reaction
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
