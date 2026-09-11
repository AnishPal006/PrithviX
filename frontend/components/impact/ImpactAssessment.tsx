"use client";

import {
  Building2,
  GraduationCap,
  HeartPulse,
  Map,
  Users,
  AlertTriangle,
} from "lucide-react";

import { mockRiskAnalysis } from "@/mock/risk";

const impactItems = [
  {
    key: "population",
    label: "Population Exposed",
    shortLabel: "People",
    icon: Users,
    unit: "people",
  },
  {
    key: "roads",
    label: "Road Corridors",
    shortLabel: "Roads",
    icon: Map,
    unit: "corridors",
  },
  {
    key: "villages",
    label: "Villages",
    shortLabel: "Villages",
    icon: Building2,
    unit: "settlements",
  },
  {
    key: "hospitals",
    label: "Hospitals",
    shortLabel: "Hospitals",
    icon: HeartPulse,
    unit: "facilities",
  },
  {
    key: "schools",
    label: "Schools",
    shortLabel: "Schools",
    icon: GraduationCap,
    unit: "facilities",
  },
] as const;

export default function ImpactAssessment() {
  const impact = mockRiskAnalysis.impact;

  const values = {
    population: impact.population,
    roads: impact.roads,
    villages: impact.villages,
    hospitals: impact.hospitals,
    schools: impact.schools,
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-white/5 p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-400">
              Exposure Intelligence
            </span>
          </div>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Impact Assessment
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Estimated infrastructure and population exposure within the
            identified risk zone.
          </p>
        </div>

        <div className="rounded-lg border border-orange-400/10 bg-orange-400/5 px-3 py-2">
          <div className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
            Risk Zone
          </div>

          <div className="mt-1 font-mono text-xs text-orange-300">
            {mockRiskAnalysis.location.name}
          </div>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-5">
        {impactItems.map((item, index) => {
          const Icon = item.icon;
          const value = values[item.key];

          return (
            <div
              key={item.key}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] p-4 transition duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]"
            >
              {/* Decorative glow */}
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan-400/5 blur-2xl transition group-hover:bg-cyan-400/10" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                    <Icon className="h-4 w-4 text-cyan-400" />
                  </div>

                  <span className="font-mono text-[9px] text-slate-700">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="font-mono text-2xl font-bold text-white">
                    {value.toLocaleString()}
                  </div>

                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {item.shortLabel}
                  </div>

                  <div className="mt-1 text-[9px] text-slate-600">
                    {item.label}
                  </div>
                </div>

                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-cyan-400/50"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(20, (value / 25000) * 100)
                      )}%`,
                    }}
                  />
                </div>

                <div className="mt-2 text-[8px] uppercase tracking-wider text-slate-700">
                  Estimated exposure
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decision Intelligence */}
      <div className="mx-5 mb-5 rounded-xl border border-red-500/10 bg-red-500/[0.03] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </div>

          <div>
            <div className="text-xs font-semibold text-red-300">
              Priority exposure detected
            </div>

            <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
              Approximately{" "}
              <span className="font-semibold text-slate-300">
                {impact.population.toLocaleString()} people
              </span>{" "}
              are within the assessed exposure area, alongside{" "}
              <span className="font-semibold text-slate-300">
                {impact.roads} road corridors
              </span>
              ,{" "}
              <span className="font-semibold text-slate-300">
                {impact.villages} villages
              </span>
              ,{" "}
              <span className="font-semibold text-slate-300">
                {impact.hospitals} hospitals
              </span>
              , and{" "}
              <span className="font-semibold text-slate-300">
                {impact.schools} schools
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}