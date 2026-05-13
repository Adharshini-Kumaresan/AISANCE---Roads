"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const DASHBOARD_EMAILS = ["nh44.roadmonitor@gmail.com", "kcadharshini@gmail.com"];
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ login_hint: "kcadharshini@gmail.com" });

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

      if (DASHBOARD_EMAILS.includes(user.email ?? "")) {
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (DASHBOARD_EMAILS.includes(user.email ?? "")) {
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

        <div className="mt-6 flex items-center gap-3">
          <span className="flex-1 h-px bg-[#928677]/20" />
          <span className="text-[10px] text-[#1C1C1E]/30 tracking-widest uppercase">or</span>
          <span className="flex-1 h-px bg-[#928677]/20" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-3 border border-[#928677]/30 hover:border-[#686710] bg-white hover:bg-[#ECE4D8]/40 text-[#1C1C1E] font-sans text-xs font-bold tracking-widest uppercase py-4 transition-all disabled:opacity-50 shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

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
