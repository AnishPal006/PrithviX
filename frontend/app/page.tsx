"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import RiskMap from "@/components/map/RiskMapClient";
import RiskOverview from "@/components/risk/RiskOverview";
import RiskJourney from "@/components/forecast/RiskJourney";
import ImpactAssessment from "@/components/impact/ImpactAssessment";
import ExplainableAI from "@/components/ai/ExplainableAI";
import RecommendationPanel from "@/components/recommendations/RecommendationPanel";
import AlertCenter from "@/components/alerts/AlertCenter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05090f] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />

          <section className="flex-1 overflow-auto p-4 lg:p-6">
            <div className="mx-auto max-w-[1800px]">
              {/* Header */}
              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400">
                    Mission Control
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      Landslide Risk Intelligence
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm text-slate-500">
                      AI-powered early warning and geospatial monitoring
                      across the North Eastern Region.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <div className="text-[9px] uppercase tracking-wider text-slate-600">
                        Monitoring
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                        <span className="font-mono text-xs text-emerald-400">
                          LIVE
                        </span>
                      </div>
                    </div>

                    <div className="hidden rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 sm:block">
                      <div className="text-[9px] uppercase tracking-wider text-slate-600">
                        Data Mode
                      </div>

                      <div className="mt-1 font-mono text-xs text-cyan-400">
                        DEMO
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Intelligence Grid */}
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
                {/* Map */}
                <div className="min-h-[560px]">
                  <RiskMap />
                </div>

                {/* Risk intelligence */}
                <div>
                  <RiskOverview />
                </div>
              </div>
              <div className="mt-5">
  <RiskJourney />
</div>
<div className="mt-5">
  <ImpactAssessment />
  <ExplainableAI />
  <RecommendationPanel />
  <AlertCenter />
</div>
              {/* Bottom telemetry */}
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                <Telemetry
                  label="AI ENGINE"
                  value="READY"
                  status="Operational"
                />

                <Telemetry
                  label="WEATHER"
                  value="LIVE"
                  status="Data stream active"
                />

                <Telemetry
                  label="SATELLITE"
                  value="ONLINE"
                  status="Latest imagery available"
                />

                <Telemetry
                  label="GIS ENGINE"
                  value="ACTIVE"
                  status="Spatial layers loaded"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Telemetry({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-600">
          {label}
        </span>

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </div>

      <div className="mt-2 font-mono text-sm text-cyan-400">
        {value}
      </div>

      <div className="mt-1 text-[10px] text-slate-600">
        {status}
      </div>
    </div>
  );
}