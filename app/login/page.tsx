"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email === "nh44.roadmonitor@gmail.com") {
        router.push("/dashboard");
      } else {
        router.push("/waitlist");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#ECE4D8] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-[#928677]/20 p-10 shadow-2xl rounded-sm"
      >
        <div className="mb-12 text-center">
          <Link href="/" className="font-display text-4xl text-[#1C1C1E] tracking-widest uppercase mb-4 block">
            AISANCE
          </Link>
          <span className="text-[10px] text-[#686710] tracking-[0.4em] uppercase font-bold">
            Authorized Access Only
          </span>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#ECE4D8]/30 border border-[#928677]/20 px-4 py-3 text-[#1C1C1E] font-sans focus:border-[#686710] outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#ECE4D8]/30 border border-[#928677]/20 px-4 py-3 text-[#1C1C1E] font-sans focus:border-[#686710] outline-none transition-all"
              required
            />
          </div>

          {error && (
            <p className="text-danger-red text-[10px] uppercase tracking-widest bg-danger-red/10 p-3 border border-danger-red/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#686710] hover:bg-[#686710]/90 text-white font-sans text-xs font-bold tracking-widest uppercase py-4 transition-all disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "LOGIN →"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-[#ECE4D8] text-center space-y-4">
          <p className="text-[10px] text-[#1C1C1E]/40 tracking-widest uppercase">
            Don&apos;t have an account?
          </p>
          <Link
            href="/waitlist"
            className="block w-full border border-[#1C1C1E]/10 hover:border-[#1C1C1E]/30 text-[#1C1C1E] font-sans text-xs tracking-widest uppercase py-4 transition-all"
          >
            Join the Waitlist
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
