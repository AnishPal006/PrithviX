"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import RiskMap from "@/components/map/RiskMapClient";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#03070b] text-white">
      <Sidebar />

      <div className="pl-72">
        <TopBar />

        <div className="p-8">
          <div className="mb-8">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Geospatial Intelligence
            </div>

            <h1 className="text-3xl font-bold">
              Landslide Risk Map
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Interactive GIS visualization of regional landslide risk zones.
            </p>
          </div>

          <div className="h-[650px]">
            <RiskMap />
          </div>
        </div>
      </div>
    </main>
  );
}