"use client";

import { motion } from "framer-motion";
import {
  Activity, Zap, AlertTriangle, ShieldAlert,
  Calendar, User, Clock, ChevronRight,
  CheckCircle2, AlertCircle, TrendingUp, TrendingDown, Minus,
} from "lucide-react";
import { Segment } from "@/app/dashboard/data";

interface Props { segment: Segment }

function scoreColor(s: number) {
  if (s < 40) return "#C0392B";
  if (s < 60) return "#D6C3AB";
  if (s < 75) return "#20B2AA";
  return "#686710";
}

function reactionColor(h: number) {
  if (h <= 24) return "#686710";
  if (h <= 72) return "#D6C3AB";
  return "#C0392B";
}

function MiniHistoryChart({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 40, w = 200;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-10 w-full">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5"
        strokeLinejoin="round" strokeLinecap="round" opacity="0.8" />
      {data.map((v, i) => (
        <circle
          key={i}
          cx={(i / (data.length - 1)) * w}
          cy={h - ((v - min) / range) * h}
          r={i === data.length - 1 ? 3 : 1.5}
          fill={i === data.length - 1 ? color : `${color}60`}
        />
      ))}
    </svg>
  );
}

export default function SegmentDetail({ segment }: Props) {
  const sc = segment.comfortScore;
  const col = scoreColor(sc);
  const rc  = reactionColor(segment.reactionTime);

  const maintenance = sc < 40
    ? { label: "Emergency Structural Intervention", color: "#C0392B", bg: "#C0392B08", border: "#C0392B30", recovery: "+28 pts", confidence: "96.1%" }
    : sc < 60
    ? { label: "Priority Surface Restoration",      color: "#D6C3AB", bg: "#D6C3AB08", border: "#D6C3AB30", recovery: "+22 pts", confidence: "91.4%" }
    : sc < 75
    ? { label: "Preventive Surface Treatment",      color: "#20B2AA", bg: "#20B2AA08", border: "#20B2AA30", recovery: "+14 pts", confidence: "87.2%" }
    : { label: "Routine Infrastructure Monitoring", color: "#686710", bg: "#68671008", border: "#68671030", recovery: "+4 pts",  confidence: "82.0%" };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0A0A0A]" style={{ height: "calc(100vh - 164px)" }}>
      <div className="max-w-4xl mx-auto p-8 space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 pb-8 border-b border-[#1a1a1a]">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] text-[#928677] uppercase tracking-[0.4em] font-bold">{segment.kmRange}</span>
              <motion.div
                animate={{ opacity: sc < 40 ? [1, 0.2, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-2 h-2 rounded-full"
                style={{ background: col }}
              />
              <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: col }}>
                {sc < 40 ? "Critical Alert" : sc < 60 ? "Poor Condition" : sc < 75 ? "Fair Condition" : "Good Condition"}
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-white uppercase leading-none tracking-tight">
              {segment.name}
            </h2>
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 text-[#928677]" />
                <span className="text-[9px] text-[#928677] uppercase font-bold tracking-widest">{segment.contractor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 text-[#928677]" />
                <span className="text-[9px] text-[#928677] uppercase font-bold tracking-widest">Inspected {segment.lastInspected}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-[#928677]" />
                <span className="text-[9px] text-[#928677] uppercase font-bold tracking-widest">{segment.zone}</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-[8px] text-[#928677] uppercase tracking-widest mb-2">Priority Level</div>
            <div className="px-6 py-2 border font-display text-2xl tracking-widest uppercase" style={{
              borderColor: col, color: col, background: `${col}08`
            }}>
              {segment.priority}
            </div>
          </div>
        </div>

        {/* ── 4 KPI Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Comfort Score", value: sc,              unit: "/100",      icon: <Activity className="w-4 h-4" />,    color: col },
            { label: "WRMS",          value: segment.wrms,    unit: " m/s²",     icon: <Zap className="w-4 h-4" />,         color: segment.wrms > 0.6 ? "#C0392B" : "#ECE4D8" },
            { label: "Potholes",      value: segment.potholes,unit: " detected",  icon: <AlertTriangle className="w-4 h-4" />,color: segment.potholes > 5 ? "#C0392B" : "#ECE4D8" },
            { label: "Crack Severity",value: segment.crackSeverity, unit: " /5", icon: <ShieldAlert className="w-4 h-4" />, color: segment.crackSeverity > 3 ? "#C0392B" : "#ECE4D8" },
          ].map((k, i) => (
            <div key={i} className="bg-[#0f0f0f] border border-[#1a1a1a] p-5">
              <div className="flex items-center gap-2 mb-3" style={{ color: k.color + "80" }}>
                {k.icon}
                <span className="text-[8px] uppercase tracking-widest font-bold text-[#928677]">{k.label}</span>
              </div>
              <div className="font-display text-3xl leading-none" style={{ color: k.color }}>
                {k.value}<span className="text-sm text-[#928677]">{k.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Comfort Analytics ── */}
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[9px] text-[#928677] uppercase tracking-[0.3em] font-bold">Comfort Analytics</h3>
            <div className="flex items-center gap-2" style={{ color: col }}>
              {segment.trend === "Improving" ? <TrendingUp className="w-3.5 h-3.5" /> :
               segment.trend === "Stable"    ? <Minus className="w-3.5 h-3.5" /> :
               <TrendingDown className="w-3.5 h-3.5" />}
              <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: col }}>
                {segment.trend}
              </span>
            </div>
          </div>

          {/* Score bar */}
          <div>
            <div className="flex justify-between text-[8px] text-[#928677] uppercase tracking-widest font-bold mb-2">
              <span>Score</span>
              <span>{sc} / 100</span>
            </div>
            <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sc}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: col }}
              />
            </div>
            <div className="flex justify-between text-[7px] text-[#333] mt-1">
              <span>Critical</span>
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
            </div>
          </div>

          {/* History chart */}
          <div>
            <div className="text-[8px] text-[#928677] uppercase tracking-widest font-bold mb-2">12-Week Trend</div>
            <MiniHistoryChart data={segment.history} color={col} />
            <div className="flex justify-between text-[7px] text-[#333] mt-1">
              <span>12 Weeks Ago</span>
              <span>Now</span>
            </div>
          </div>
        </div>

        {/* ── Reaction Time Tracker ── */}
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-6 space-y-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-[9px] text-[#928677] uppercase tracking-[0.3em] font-bold">Official Reaction Time Tracker</h3>
              <p className="text-[8px] text-[#444] mt-1 uppercase tracking-wider">SLA Target: ≤ 24 Hours from Detection</p>
            </div>
            <div className="text-right">
              <div className="font-display text-5xl leading-none" style={{ color: rc }}>
                {segment.reactionTime}H
              </div>
              <div className="text-[8px] uppercase tracking-widest font-bold mt-1" style={{ color: rc }}>
                {segment.reactionTime <= 24 ? "Within SLA" : segment.reactionTime <= 72 ? "Delayed" : "SLA Breached"}
              </div>
            </div>
          </div>

          {/* Gauge track */}
          <div className="space-y-2">
            <div className="relative h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
              {/* Zone bands */}
              <div className="absolute inset-y-0 left-0 w-[14.3%] bg-[#686710]/20" />
              <div className="absolute inset-y-0 left-[14.3%] w-[28.6%] bg-[#D6C3AB]/20" />
              <div className="absolute inset-y-0 left-[42.9%] right-0 bg-[#C0392B]/20" />
              {/* Fill */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((segment.reactionTime / 168) * 100, 100)}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: rc }}
              />
              {/* SLA markers */}
              <div className="absolute top-0 bottom-0 w-px bg-white/30" style={{ left: "14.3%" }} />
              <div className="absolute top-0 bottom-0 w-px bg-white/30" style={{ left: "42.9%" }} />
            </div>
            <div className="flex justify-between text-[7px] text-[#333] uppercase tracking-wider font-bold">
              <span>0H</span>
              <span className="text-[#686710]">24H SLA</span>
              <span className="text-[#D6C3AB]">72H Warning</span>
              <span className="text-[#C0392B]">168H Max</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#1a1a1a]">
            <div>
              <div className="text-[7px] text-[#928677] uppercase tracking-widest font-bold mb-1">SLA Status</div>
              <div className="text-[10px] font-bold uppercase" style={{ color: rc }}>
                {segment.reactionTime <= 24 ? "Compliant" : segment.reactionTime <= 72 ? "Warning" : "Escalated"}
              </div>
            </div>
            <div>
              <div className="text-[7px] text-[#928677] uppercase tracking-widest font-bold mb-1">Escalation</div>
              <div className="text-[10px] font-bold uppercase text-white">
                {segment.reactionTime > 72 ? "Level 2 Active" : "None"}
              </div>
            </div>
            <div>
              <div className="text-[7px] text-[#928677] uppercase tracking-widest font-bold mb-1">Response Trend</div>
              <div className="text-[10px] font-bold uppercase" style={{ color: rc }}>
                {segment.reactionTime > 72 ? "Deteriorating" : "On Track"}
              </div>
            </div>
          </div>
        </div>

        {/* ── Active Hazards ── */}
        <div className="space-y-3">
          <h3 className="text-[9px] text-[#928677] uppercase tracking-[0.3em] font-bold">Active Infrastructure Hazards</h3>
          {segment.hazards.length === 0 ? (
            <div className="py-10 flex flex-col items-center justify-center bg-[#0f0f0f] border border-dashed border-[#1a1a1a]">
              <CheckCircle2 className="w-7 h-7 text-[#686710]/40 mb-3" />
              <span className="text-[9px] text-[#928677] uppercase tracking-widest font-bold">No active hazards detected</span>
            </div>
          ) : (
            segment.hazards.map((h, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="flex items-center gap-4 p-4 bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#C0392B]/30 transition-all group"
              >
                <div className="w-9 h-9 bg-[#C0392B]/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-[#C0392B]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-white font-bold uppercase tracking-wide">{h.type}</div>
                  <div className="text-[8px] text-[#928677] uppercase mt-0.5">{h.timestamp} · {Math.round(h.confidence * 100)}% confidence</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[9px] font-bold uppercase ${
                    h.severity === "Critical" ? "text-[#C0392B]" :
                    h.severity === "High"     ? "text-[#D6C3AB]" : "text-[#928677]"
                  }`}>{h.severity}</span>
                  <span className={`text-[7px] uppercase tracking-wider font-bold px-1.5 py-0.5 border ${
                    h.status === "Active" ? "border-[#C0392B]/30 text-[#C0392B]" : "border-[#928677]/30 text-[#928677]"
                  }`}>{h.status}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#222] group-hover:text-[#444] transition-colors" />
              </motion.div>
            ))
          )}
        </div>

        {/* ── Event Timeline ── */}
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-6">
          <h3 className="text-[9px] text-[#928677] uppercase tracking-[0.3em] font-bold mb-8">Infrastructure Event Log</h3>
          <div className="relative pl-6 space-y-6 before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-px before:bg-[#1a1a1a]">
            {segment.events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative flex justify-between items-start gap-4"
              >
                <div className={`absolute -left-[23px] top-0.5 w-3 h-3 rounded-full border-2 border-[#0f0f0f] flex-shrink-0 z-10 ${
                  ev.status === "completed" ? "bg-[#686710]" :
                  ev.status === "active"    ? "bg-[#D6C3AB]" : "bg-[#222]"
                }`}>
                  {ev.status === "active" && (
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 rounded-full bg-[#D6C3AB]"
                    />
                  )}
                </div>
                <div>
                  <div className="text-[10px] text-white font-bold uppercase tracking-wide">{ev.title}</div>
                  <div className="text-[8px] text-[#928677] uppercase mt-0.5">
                    {ev.status === "completed" ? "Completed" : ev.status === "active" ? "In Progress" : "Pending"}
                  </div>
                </div>
                <span className="text-[8px] text-[#444] font-sans flex-shrink-0">{ev.timestamp}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Maintenance Recommendation ── */}
        <div className="p-6 border" style={{ background: maintenance.bg, borderColor: maintenance.border }}>
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="w-4 h-4" style={{ color: maintenance.color }} />
            <h3 className="text-[9px] uppercase tracking-[0.3em] font-bold text-white">Maintenance Directive</h3>
          </div>
          <div className="font-display text-3xl text-white uppercase leading-tight mb-4">
            {maintenance.label}
          </div>
          <p className="text-[11px] text-[#928677] font-sans leading-relaxed mb-6">
            Based on AISANCE vibration telemetry, WRMS analysis, and pothole detection data for this corridor,
            the infrastructure intelligence engine recommends{" "}
            {sc < 40 ? "immediate closure and emergency structural intervention. Subgrade stability cannot be guaranteed." :
             sc < 60 ? "surface restoration within 72 hours to prevent further degradation and safety risk." :
             sc < 75 ? "scheduled preventive treatment in the next 30 days to maintain current rating." :
             "continued passive monitoring with no immediate maintenance action required."}
          </p>
          <div className="grid grid-cols-3 gap-4 pt-5 border-t" style={{ borderColor: maintenance.border }}>
            {[
              { label: "Expected Recovery",   value: maintenance.recovery  },
              { label: "AI Confidence",        value: maintenance.confidence },
              { label: "Degradation Risk",     value: sc < 40 ? "Severe" : sc < 60 ? "High" : "Moderate" },
            ].map(m => (
              <div key={m.label}>
                <div className="text-[7px] text-[#928677] uppercase tracking-widest font-bold mb-1">{m.label}</div>
                <div className="text-[11px] font-bold uppercase" style={{ color: maintenance.color }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer watermark */}
        <div className="flex justify-between items-center pt-4 border-t border-[#111]">
          <span className="text-[7px] text-[#222] uppercase tracking-[0.4em] font-bold">AISANCE INFRASTRUCTURE INTELLIGENCE ENGINE</span>
          <span className="text-[7px] text-[#222] uppercase tracking-wider">Generated 07 MAY 2026 · 12:18 IST</span>
        </div>
      </div>
    </div>
  );
}
