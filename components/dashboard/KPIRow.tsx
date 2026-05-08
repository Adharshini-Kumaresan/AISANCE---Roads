"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { segments } from "@/app/dashboard/data";

const criticalCount = segments.filter(s => s.comfortScore < 40).length;
const activeHazards  = segments.reduce((acc, s) => acc + s.hazards.filter(h => h.status === "Active").length, 0);
const avgReaction    = Math.round(segments.reduce((acc, s) => acc + s.reactionTime, 0) / segments.length);
const degrading      = segments.filter(s => s.trend === "Declining" || s.trend === "Critical").length;
const routeScore     = Math.round(segments.reduce((acc, s) => acc + s.comfortScore, 0) / segments.length);

const KPIS = [
  {
    label:  "Route Comfort Score",
    value:  routeScore,
    suffix: "",
    trend:  +2.4,
    color:  "#20B2AA",
    spark:  [62,65,63,68,70,67,71,68,72,69,74,routeScore],
  },
  {
    label:  "Active Hazards",
    value:  activeHazards,
    suffix: "",
    trend:  -3,
    color:  "#D6C3AB",
    spark:  [20,18,22,19,17,21,16,18,14,16,15,activeHazards],
  },
  {
    label:  "Critical Segments",
    value:  criticalCount,
    suffix: "",
    trend:  +1,
    color:  "#C0392B",
    spark:  [2,3,3,4,4,3,5,4,3,4,5,criticalCount],
  },
  {
    label:  "Avg Reaction Time",
    value:  avgReaction,
    suffix: "H",
    trend:  -4.2,
    color:  "#686710",
    spark:  [28,26,24,27,22,25,20,24,22,21,19,avgReaction],
  },
  {
    label:  "Degrading Segments",
    value:  degrading,
    suffix: "",
    trend:  +2,
    color:  "#D6C3AB",
    spark:  [6,7,8,7,9,8,10,9,11,10,9,degrading],
  },
  {
    label:  "Resolved (30 Days)",
    value:  128,
    suffix: "",
    trend:  +12,
    color:  "#686710",
    spark:  [80,88,95,100,105,110,112,116,118,122,125,128],
  },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 28;
  const w = 80;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle
        cx={(data.length - 1) / (data.length - 1) * w}
        cy={h - ((data[data.length - 1] - min) / range) * h}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const start = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(ease * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target]);
  return <>{display}{suffix}</>;
}

export default function KPIRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-px bg-[#1a1a1a] border-b border-[#222]">
      {KPIS.map((kpi, i) => {
        const up = kpi.trend > 0;
        const neutral = kpi.trend === 0;
        const goodWhenDown = i === 1 || i === 2 || i === 3 || i === 4;
        const positive = goodWhenDown ? !up : up;
        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="bg-[#0A0A0A] px-6 py-5 flex flex-col gap-3 relative group hover:bg-[#111] transition-colors"
          >
            <span className="text-[9px] text-[#928677] uppercase tracking-[0.3em] font-bold leading-none">
              {kpi.label}
            </span>

            <div className="flex items-end justify-between">
              <span className="font-display text-4xl leading-none" style={{ color: kpi.color }}>
                <AnimatedNumber target={kpi.value} suffix={kpi.suffix} />
              </span>
              <Sparkline data={kpi.spark} color={kpi.color} />
            </div>

            <div className="flex items-center gap-1.5">
              {neutral ? <Minus className="w-3 h-3 text-[#928677]" /> :
               up ? <TrendingUp className="w-3 h-3" style={{ color: positive ? kpi.color : "#C0392B" }} />
                  : <TrendingDown className="w-3 h-3" style={{ color: positive ? kpi.color : "#C0392B" }} />
              }
              <span className="text-[9px] font-bold" style={{ color: positive ? kpi.color : "#C0392B" }}>
                {up ? "+" : ""}{kpi.trend} vs last week
              </span>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: kpi.color }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
