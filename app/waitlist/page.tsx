"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "Government Official",
    roadName: "",
    roadLength: "",
    roadLocation: "",
    reason: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await addDoc(collection(db, "waitlist"), {
        ...formData,
        submittedAt: serverTimestamp()
      });
      setStatus("success");
    } catch (err: any) {
      console.error("Firebase Error:", err);
      setErrorMessage(err.message || "Submission failed. Please check your connection.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#ECE4D8] py-20 px-6"> {/* Off-white background for high contrast */}
      <div className="max-w-3xl mx-auto">
        <div className="mb-16 text-center">
          <Link href="/" className="font-display text-5xl text-[#1C1C1E] tracking-widest uppercase mb-4 block">
            AISANCE
          </Link>
          <span className="text-[12px] text-[#686710] tracking-[0.4em] uppercase font-bold">
            Infrastructure Waitlist
          </span>
        </div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#686710]/30 p-16 text-center shadow-2xl rounded-sm"
          >
            <h2 className="font-display text-5xl text-[#1C1C1E] mb-6 uppercase">Application Received.</h2>
            <p className="font-sans text-[#1C1C1E]/60 text-lg mb-10 max-w-md mx-auto">
              Our infrastructure team will review your road monitoring requirements and contact you for a pilot deployment.
            </p>
            <Link href="/" className="inline-block bg-[#686710] text-white px-10 py-4 font-sans text-xs font-bold tracking-widest uppercase hover:bg-[#686710]/90 transition-all">
              Return Home
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#928677]/20 p-8 md:p-12 shadow-2xl rounded-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-[10px] text-[#686710] tracking-[0.3em] uppercase font-bold border-b border-[#ECE4D8] pb-2 mb-6">Contact Information</h3>
                  <div>
                    <label className="block text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase mb-2">Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-[#ECE4D8]/30 border border-[#928677]/20 px-4 py-3 text-[#1C1C1E] font-sans focus:border-[#686710] outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase mb-2">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-[#ECE4D8]/30 border border-[#928677]/20 px-4 py-3 text-[#1C1C1E] font-sans focus:border-[#686710] outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                {/* Organization Info */}
                <div className="space-y-4">
                  <h3 className="text-[10px] text-[#686710] tracking-[0.3em] uppercase font-bold border-b border-[#ECE4D8] pb-2 mb-6">Professional Profile</h3>
                  <div>
                    <label className="block text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase mb-2">Organization</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. NHAI, L&T Construction"
                      className="w-full bg-[#ECE4D8]/30 border border-[#928677]/20 px-4 py-3 text-[#1C1C1E] font-sans focus:border-[#686710] outline-none transition-all placeholder:text-[#1C1C1E]/20"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase mb-2">Official Role</label>
                    <select
                      className="w-full bg-[#ECE4D8]/30 border border-[#928677]/20 px-4 py-3 text-[#1C1C1E] font-sans focus:border-[#686710] outline-none transition-all appearance-none"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option>Government Official</option>
                      <option>Road Contractor</option>
                      <option>EPC Authority</option>
                      <option>Municipal Engineer</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Road Details */}
              <div className="space-y-6 pt-6">
                <h3 className="text-[10px] text-[#686710] tracking-[0.3em] uppercase font-bold border-b border-[#ECE4D8] pb-2 mb-6">Road Monitoring Target</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase mb-2">Road Name / ID</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. NH-44 Dindigul Section"
                      className="w-full bg-[#ECE4D8]/30 border border-[#928677]/20 px-4 py-3 text-[#1C1C1E] font-sans focus:border-[#686710] outline-none transition-all placeholder:text-[#1C1C1E]/20"
                      value={formData.roadName}
                      onChange={(e) => setFormData({...formData, roadName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase mb-2">Total Length (KM)</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-[#ECE4D8]/30 border border-[#928677]/20 px-4 py-3 text-[#1C1C1E] font-sans focus:border-[#686710] outline-none transition-all"
                      value={formData.roadLength}
                      onChange={(e) => setFormData({...formData, roadLength: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase mb-2">Road Location (State/City)</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-[#ECE4D8]/30 border border-[#928677]/20 px-4 py-3 text-[#1C1C1E] font-sans focus:border-[#686710] outline-none transition-all"
                    value={formData.roadLocation}
                    onChange={(e) => setFormData({...formData, roadLocation: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase mb-2">Primary Monitoring Goal</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe why this road segment needs passive intelligence..."
                    className="w-full bg-[#ECE4D8]/30 border border-[#928677]/20 px-4 py-3 text-[#1C1C1E] font-sans focus:border-[#686710] outline-none transition-all resize-none placeholder:text-[#1C1C1E]/20"
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  />
                </div>
              </div>

              {status === "error" && (
                <p className="text-danger-red text-[10px] uppercase tracking-widest bg-danger-red/10 p-3 border border-danger-red/20">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#686710] text-white font-sans text-xs font-bold tracking-widest uppercase py-6 transition-all disabled:opacity-50 hover:bg-[#686710]/90"
              >
                {status === "loading" ? "SUBMITTING APPLICATION..." : "SECURE MY SPOT IN LINE →"}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </main>
  );
}
