"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import TopBar from "@/components/dashboard/TopBar";
import KPIRow from "@/components/dashboard/KPIRow";
import RouteHeatmap from "@/components/dashboard/RouteHeatmap";
import SegmentSidebar from "@/components/dashboard/SegmentSidebar";
import SegmentDetail from "@/components/dashboard/SegmentDetail";
import { segments } from "./data";

export default function DashboardPage() {
  // Default to Mattuthavani — the most critical segment (id = 56)
  const [selectedId, setSelectedId] = useState(segments.find(s => s.name === "Mattuthavani Bus Terminal")?.id ?? segments[0].id);

  const selected = segments.find(s => s.id === selectedId) ?? segments[0];

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col bg-[#0A0A0A] text-white overflow-hidden">
        {/* Top Bar */}
        <TopBar />

        {/* KPI Row */}
        <KPIRow />

        {/* Route Heatmap */}
        <RouteHeatmap segments={segments} selectedId={selectedId} onSelect={setSelectedId} />

        {/* Main: Sidebar + Detail */}
        <div className="flex flex-1 overflow-hidden">
          <SegmentSidebar
            segments={segments}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex-1 overflow-hidden"
            >
              <SegmentDetail segment={selected} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ProtectedRoute>
  );
}
