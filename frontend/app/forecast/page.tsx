"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import RiskJourney from "@/components/forecast/RiskJourney";

export default function ForecastPage() {
  return (
    <main className="min-h-screen bg-[#03070b] text-white">
      <Sidebar />

      <div className="pl-72">
        <TopBar />

        <div className="p-8">
          <div className="mb-8">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Predictive Intelligence
            </div>

            <h1 className="text-3xl font-bold">
              Landslide Risk Forecast
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              AI-generated risk trajectory for the next 72 hours.
            </p>
          </div>

          <RiskJourney />
        </div>
      </div>
    </main>
  );
}