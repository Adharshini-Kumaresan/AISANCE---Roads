export interface Hazard {
  type: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  timestamp: string;
  confidence: number;
  status: "Active" | "Resolved" | "Monitoring";
}

export interface SegmentEvent {
  title: string;
  timestamp: string;
  status: "completed" | "pending" | "active";
}

export interface Segment {
  id: number;
  kmRange: string;
  name: string;
  zone: string;
  comfortScore: number;
  wrms: number;
  potholes: number;
  crackSeverity: number;
  hazards: Hazard[];
  reactionTime: number;
  contractor: string;
  lastInspected: string;
  trend: "Stable" | "Declining" | "Critical" | "Improving";
  priority: "Critical" | "High" | "Medium" | "Low";
  events: SegmentEvent[];
  history: number[];
}

// Deterministic pseudo-random using seed (no Math.random() to avoid hydration issues)
function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const REALISTIC_NAMES: Record<number, string> = {
  3:  "Oddanchatram Bypass Junction",
  7:  "Vedasandur Town Entry",
  12: "Dindigul Ring Road Junction",
  17: "Natham Bypass",
  20: "Silaiman Hills Approach",
  25: "Sathyamangalam Crossing",
  32: "Sholavandan Town",
  37: "Madurai Bypass Merge",
  43: "Thirumangalam Overpass",
  50: "Nagamalai Pudukottai",
  55: "Mattuthavani Bus Terminal",
  62: "Kappalur Industrial Zone",
  68: "Madurai North Entry",
  73: "Madurai City Terminus",
};

const PINNED_DATA: Record<number, Partial<Segment>> = {
  3:  { comfortScore: 31, wrms: 0.95, potholes: 8,  reactionTime: 92,  priority: "Critical", trend: "Critical",
        hazards: [
          { type: "Waterlogging", severity: "Critical", timestamp: "3h ago", confidence: 0.97, status: "Active" },
          { type: "Subsidence",   severity: "High",     timestamp: "5h ago", confidence: 0.91, status: "Active" },
        ] },
  32: { comfortScore: 36, wrms: 0.86, potholes: 5,  reactionTime: 84,  priority: "High",     trend: "Declining",
        hazards: [
          { type: "Suspected Subgrade Failure", severity: "Critical", timestamp: "1h ago", confidence: 0.94, status: "Active" },
          { type: "Surface Breakup",            severity: "High",     timestamp: "4h ago", confidence: 0.88, status: "Active" },
        ] },
  37: { comfortScore: 34, wrms: 0.89, potholes: 6,  reactionTime: 156, priority: "High",     trend: "Declining",
        hazards: [
          { type: "Pothole Cluster",       severity: "High",   timestamp: "2h ago", confidence: 0.96, status: "Active" },
          { type: "Uneven Patching",       severity: "Medium", timestamp: "8h ago", confidence: 0.82, status: "Monitoring" },
          { type: "Contractor Dispute",    severity: "High",   timestamp: "12h ago", confidence: 0.99, status: "Active" },
        ] },
  25: { comfortScore: 80, wrms: 0.25, potholes: 0,  reactionTime: 12,  priority: "Low",      trend: "Stable",   hazards: [] },
  50: { comfortScore: 82, wrms: 0.22, potholes: 0,  reactionTime: 8,   priority: "Low",      trend: "Improving",hazards: [] },
  55: { comfortScore: 33, wrms: 0.92, potholes: 12, reactionTime: 136, priority: "Critical", trend: "Critical",
        hazards: [
          { type: "Pothole Cluster",             severity: "Critical", timestamp: "1h ago",  confidence: 0.99, status: "Active" },
          { type: "Steel Plate Deployment Zone", severity: "High",     timestamp: "6h ago",  confidence: 0.95, status: "Monitoring" },
          { type: "Surface Breakup",             severity: "High",     timestamp: "10h ago", confidence: 0.87, status: "Active" },
        ] },
};

function getEvents(score: number): SegmentEvent[] {
  if (score < 40) {
    return [
      { title: "Hazard detected by AISANCE sensors",  timestamp: "07:12",    status: "completed" },
      { title: "AI verification completed (94.2%)",   timestamp: "07:18",    status: "completed" },
      { title: "Authority notification dispatched",   timestamp: "07:30",    status: "completed" },
      { title: "NHAI Zone IV alerted",                timestamp: "08:00",    status: "completed" },
      { title: "Official response received",          timestamp: "Pending",  status: "active"    },
      { title: "Inspection scheduled",                timestamp: "Tomorrow", status: "pending"   },
      { title: "Repair initiated",                    timestamp: "TBD",      status: "pending"   },
    ];
  }
  if (score < 60) {
    return [
      { title: "Hazard detected by AISANCE sensors", timestamp: "Yesterday 14:00", status: "completed" },
      { title: "AI verification completed (87.1%)",  timestamp: "Yesterday 14:20", status: "completed" },
      { title: "Authority notified",                 timestamp: "Yesterday 15:00", status: "completed" },
      { title: "Official response received",         timestamp: "Today 09:00",     status: "completed" },
      { title: "Inspection scheduled",               timestamp: "Today 14:00",     status: "active"    },
      { title: "Repair initiated",                   timestamp: "TBD",             status: "pending"   },
    ];
  }
  return [
    { title: "Routine sensor scan completed",   timestamp: "05:00", status: "completed" },
    { title: "Score verified — within SLA",     timestamp: "05:15", status: "completed" },
    { title: "Preventive monitoring active",    timestamp: "06:00", status: "completed" },
    { title: "Next inspection scheduled",       timestamp: "30 Days", status: "pending" },
  ];
}

function getHistory(score: number, seed: number): number[] {
  return Array.from({ length: 12 }, (_, i) => {
    const variance = (seededRand(seed * 13 + i) - 0.5) * 8;
    return Math.max(10, Math.min(100, Math.round(score + variance)));
  });
}

function buildSegment(i: number): Segment {
  const pinned = PINNED_DATA[i];

  // Deterministic defaults
  const baseScore = pinned?.comfortScore ?? Math.round(seededRand(i * 7 + 1) * 38 + 62); // 62–100
  const score = pinned?.comfortScore ?? baseScore;
  const wrms  = pinned?.wrms  ?? parseFloat((seededRand(i * 3 + 2) * 0.35 + 0.18).toFixed(2));
  const potholes = pinned?.potholes ?? Math.round(seededRand(i * 11 + 4) * 2);
  const reaction  = pinned?.reactionTime ?? Math.round(seededRand(i * 5 + 6) * 36 + 8);
  const crackSev  = Math.round(seededRand(i * 9 + 3) * 4);

  const zone = i < 20 ? "Dindigul PWD" : i < 55 ? "NHAI Zone IV" : "Madurai Corporation";
  const contractor = zone;

  let priority: Segment["priority"] = "Low";
  if (score < 40) priority = "Critical";
  else if (score < 60) priority = "High";
  else if (score < 75) priority = "Medium";

  let trend: Segment["trend"] = "Stable";
  if (score < 40) trend = "Critical";
  else if (score < 55) trend = "Declining";
  else if (score > 78) trend = seededRand(i * 17) > 0.5 ? "Improving" : "Stable";

  const hazards: Hazard[] = pinned?.hazards ?? (score < 50 ? [
    { type: "Pothole Cluster", severity: "High",   timestamp: "2h ago", confidence: 0.98, status: "Active"   },
    { type: "Crack Propagation", severity: "Medium", timestamp: "5h ago", confidence: 0.85, status: "Monitoring" },
  ] : []);

  return {
    id: i + 1,
    kmRange: `KM ${i}–${i + 1}`,
    name: REALISTIC_NAMES[i] ?? `NH44 Segment ${i + 1}`,
    zone,
    comfortScore: score,
    wrms,
    potholes,
    crackSeverity: crackSev,
    hazards,
    reactionTime: reaction,
    contractor,
    lastInspected: i % 7 === 0 ? "2026-05-01" : i % 5 === 0 ? "2026-04-22" : "2026-04-15",
    trend: pinned?.trend ?? trend,
    priority: pinned?.priority ?? priority,
    events: getEvents(score),
    history: getHistory(score, i),
  };
}

export const segments: Segment[] = Array.from({ length: 74 }, (_, i) => buildSegment(i));
