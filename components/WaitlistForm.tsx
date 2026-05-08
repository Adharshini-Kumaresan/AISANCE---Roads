"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    roadName: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await addDoc(collection(db, "waitlist_quick"), {
        ...formData,
        submittedAt: serverTimestamp()
      });
      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Error connecting to intelligence database.");
      setStatus("error");
    }
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-[#D6C3AB]"> {/* Sand Beige Background */}
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="text-[12px] tracking-[0.4em] text-[#686710] uppercase mb-4 block font-bold">EARLY ACCESS NOW OPEN</span>
          <h2 className="font-display text-6xl md:text-8xl text-[#1C1C1E] mb-6 leading-none uppercase">
            BE THE FIRST<br />AUTHORITY TO KNOW.
          </h2>
          <p className="font-sans text-[#1C1C1E]/70 text-lg mb-12 max-w-2xl mx-auto">
            Join other government bodies and contractors already on the AISANCE early access list.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1C1C1E] p-12 text-[#ECE4D8] shadow-2xl"
            >
              <h3 className="font-display text-4xl mb-4 uppercase">SECURED.</h3>
              <p className="font-sans text-[#ECE4D8]/60 mb-6">You&apos;re on the list. We&apos;ll be in touch soon.</p>
              <Link href="/waitlist" className="text-[#686710] font-sans text-[10px] tracking-widest uppercase border-b border-[#686710] pb-1">
                Provide detailed road requirements →
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <label className="text-[10px] text-[#1C1C1E]/50 uppercase tracking-widest pl-2">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white border border-[#1C1C1E]/10 px-6 py-4 font-sans text-[#1C1C1E] placeholder:text-[#1C1C1E]/20 focus:outline-none focus:border-[#686710] transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-[#1C1C1E]/50 uppercase tracking-widest pl-2">Email</label>
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white border border-[#1C1C1E]/10 px-6 py-4 font-sans text-[#1C1C1E] placeholder:text-[#1C1C1E]/20 focus:outline-none focus:border-[#686710] transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-[#1C1C1E]/50 uppercase tracking-widest pl-2">Organization</label>
                <input
                  required
                  type="text"
                  placeholder="Agency Name"
                  className="w-full bg-white border border-[#1C1C1E]/10 px-6 py-4 font-sans text-[#1C1C1E] placeholder:text-[#1C1C1E]/20 focus:outline-none focus:border-[#686710] transition-all"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-[#1C1C1E]/50 uppercase tracking-widest pl-2">Role</label>
                <select
                  required
                  className="w-full bg-white border border-[#1C1C1E]/10 px-6 py-4 font-sans text-[#1C1C1E] focus:outline-none focus:border-[#686710] transition-all appearance-none"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="" disabled>Select Role</option>
                  <option>Government Official</option>
                  <option>Road Contractor</option>
                  <option>Smart City Operator</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] text-[#1C1C1E]/50 uppercase tracking-widest pl-2">Target Asset</label>
                <input
                  required
                  type="text"
                  placeholder="Road ID / Segment to Monitor"
                  className="w-full bg-white border border-[#1C1C1E]/10 px-6 py-4 font-sans text-[#1C1C1E] placeholder:text-[#1C1C1E]/20 focus:outline-none focus:border-[#686710] transition-all"
                  value={formData.roadName}
                  onChange={(e) => setFormData({ ...formData, roadName: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="md:col-span-2 bg-[#1C1C1E] hover:bg-[#1C1C1E]/90 text-white font-sans text-sm tracking-widest uppercase py-6 mt-4 transition-all duration-300 disabled:opacity-50"
              >
                {status === "loading" ? "PROCESSING..." : "SECURE MY SPOT →"}
              </button>

              {status === "error" && (
                <p className="md:col-span-2 text-danger-red text-[10px] uppercase tracking-widest mt-2 text-center">
                  {errorMessage}
                </p>
              )}

              <p className="md:col-span-2 mt-4 font-sans text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase">
                &quot;No spam. No sales calls. Just early access.&quot;
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
