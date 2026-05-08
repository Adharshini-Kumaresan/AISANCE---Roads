"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Segment } from "@/app/dashboard/data";

interface RouteHeatmapProps {
  segments: Segment[];
  selectedId: number;
  onSelect: (id: number) => void;
}

function scoreColor(score: number): string {
  if (score < 40) return "#C0392B";
  if (score < 60) return "#D6C3AB";
  if (score < 75) return "#20B2AA";
  return "#686710";
}

function scoreBg(score: number): string {
  if (score < 40) return "bg-[#C0392B]";
  if (score < 60) return "bg-[#D6C3AB]";
  if (score < 75) return "bg-[#20B2AA]";
  return "bg-[#686710]";
}

export default function RouteHeatmap({ segments, selectedId, onSelect }: RouteHeatmapProps) {
  const [hovered, setHovered] = useState<Segment | null>(null);
  const [tooltipX, setTooltipX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-6 py-4 border-b border-[#222] bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[9px] text-[#928677] uppercase tracking-[0.3em] font-bold">
            NH44 Route Heatmap — 74 km Corridor
          </span>
        </div>
        <div className="flex items-center gap-5">
          {[
            { label: "Critical <40",  color: "#C0392B" },
            { label: "Poor 40–60",    color: "#D6C3AB" },
            { label: "Fair 60–75",    color: "#20B2AA" },
            { label: "Good >75",      color: "#686710" },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span className="text-[8px] text-[#928677] uppercase tracking-wider font-bold">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar */}
      <div ref={containerRef} className="relative">
        <div className="flex w-full h-10 gap-px">
          {segments.map((seg, idx) => {
            const isSelected = seg.id === selectedId;
            return (
              <motion.button
                key={seg.id}
                onClick={() => onSelect(seg.id)}
                onMouseEnter={(e) => {
                  setHovered(seg);
                  const rect = containerRef.current?.getBoundingClientRect();
                  const btnRect = (e.target as HTMLElement).getBoundingClientRect();
                  setTooltipX(btnRect.left - (rect?.left ?? 0) + btnRect.width / 2);
                }}
                onMouseLeave={() => setHovered(null)}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.2, delay: idx * 0.004 }}
                className={`
                  flex-1 ${scoreBg(seg.comfortScore)} relative cursor-pointer
                  transition-all duration-150
                  ${isSelected ? "opacity-100 ring-1 ring-white/60 z-10" : "opacity-70 hover:opacity-100"}
                `}
                style={{
                  transformOrigin: "bottom",
                  boxShadow: isSelected ? `0 0 0 1px white` : undefined,
                }}
              />
            );
          })}
        </div>

        {/* Tooltip */}
        {hovered && (
          <div
            className="absolute bottom-full mb-3 z-50 pointer-events-none"
            style={{ left: tooltipX, transform: "translateX(-50%)" }}
          >
            <div className="bg-[#1C1C1E] border border-[#3A3A3C] px-4 py-3 shadow-2xl min-w-[160px]">
              <div className="text-[8px] text-[#928677] uppercase tracking-widest mb-1">{hovered.kmRange}</div>
              <div className="text-sm font-display text-white uppercase mb-2 leading-tight">{hovered.name}</div>
              <div className="flex gap-4 border-t border-[#3A3A3C] pt-2">
                <div className="flex flex-col">
                  <span className="text-[7px] text-[#928677] uppercase">Score</span>
                  <span className="text-xs font-bold" style={{ color: scoreColor(hovered.comfortScore) }}>
                    {hovered.comfortScore}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] text-[#928677] uppercase">WRMS</span>
                  <span className="text-xs font-bold text-white">{hovered.wrms}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] text-[#928677] uppercase">Hazards</span>
                  <span className="text-xs font-bold text-white">{hovered.hazards.length}</span>
                </div>
              </div>
            </div>
            {/* Arrow */}
            <div className="w-2 h-2 bg-[#1C1C1E] border-r border-b border-[#3A3A3C] rotate-45 mx-auto -mt-1" />
          </div>
        )}

        {/* KM Labels */}
        <div className="flex justify-between mt-2 text-[8px] text-[#928677] uppercase tracking-[0.3em] font-bold">
          <span>PSNA · KM 0</span>
          <span>KM 37</span>
          <span>Madurai · KM 74</span>
        </div>
      </div>
    </div>
  );
}
