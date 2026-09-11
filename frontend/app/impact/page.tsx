"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import ImpactAssessment from "@/components/impact/ImpactAssessment";

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-[#03070b] text-white">
      <Sidebar />

      <div className="pl-72">
        <TopBar />

        <div className="p-8">
          <div className="mb-8">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Disaster Impact Intelligence
            </div>

            <h1 className="text-3xl font-bold">
              Impact Assessment
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Estimate exposed population and critical infrastructure.
            </p>
          </div>

          <ImpactAssessment />
        </div>
      </div>
    </main>
  );
}