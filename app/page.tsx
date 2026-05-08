"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import RoadSequence from "@/components/RoadSequence";
import HowItWorks from "@/components/HowItWorks";
import DashboardPreview from "@/components/DashboardPreview";
import WhoItsFor from "@/components/WhoItsFor";
import KeyMetrics from "@/components/KeyMetrics";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <main className="relative bg-asphalt min-h-screen">
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <RoadSequence />
          <div className="relative z-10">
            <HowItWorks />
            <DashboardPreview />
            <WhoItsFor />
            <KeyMetrics />
            <WaitlistForm />
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}
