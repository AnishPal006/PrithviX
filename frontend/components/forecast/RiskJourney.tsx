"use client";

import { useMemo } from "react";
import { AlertTriangle, Clock3, TrendingUp } from "lucide-react";
import { mockRiskAnalysis } from "@/mock/risk";

export default function RiskJourney() {
  const forecast = mockRiskAnalysis.forecast;

  const peak = useMemo(() => {
    return forecast.reduce((highest, current) =>
      current.riskScore > highest.riskScore ? current : highest
    );
  }, [forecast]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "text-red-400";
      case "HIGH":
        return "text-orange-400";
      case "MODERATE":
        return "text-yellow-400";
      default:
        return "text-emerald-400";
    }
  };

  const getDotColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "bg-red-500";
      case "HIGH":
        return "bg-orange-500";
      case "MODERATE":
        return "bg-yellow-500";
      default:
        return "bg-emerald-500";
    }
  };

  const getBarHeight = (score: number) => {
    return `${Math.max(score, 8)}%`;
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-white/5 p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-cyan-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Risk Forecast
            </span>
          </div>

          <h2 className="mt-2 text-lg font-semibold text-white">
            72-Hour Risk Journey
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            AI-projected landslide probability trajectory
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-cyan-400/10 bg-cyan-400/5 px-3 py-2">
          <TrendingUp className="h-4 w-4 text-cyan-400" />

          <span className="text-[10px] uppercase tracking-wider text-cyan-300">
            AI Forecast
          </span>
        </div>
      </div>

      {/* Forecast Timeline */}
      <div className="p-5">
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[8%] right-[8%] top-5 h-px bg-white/10" />

          <div className="grid grid-cols-4 gap-2">
            {forecast.map((item, index) => (
              <div
                key={item.horizon}
                className="relative flex flex-col items-center"
              >
                {/* Timeline Dot */}
                <div
                  className={`relative z-10 h-3 w-3 rounded-full ${getDotColor(
                    item.riskLevel
                  )} shadow-[0_0_12px_currentColor]`}
                />

                {/* Horizon */}
                <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                  {item.horizon === "NOW"
                    ? "NOW"
                    : item.horizon.replace("H", " H")}
                </div>

                {/* Score */}
                <div
                  className={`mt-2 font-mono text-2xl font-bold ${getRiskColor(
                    item.riskLevel
                  )}`}
                >
                  {item.riskScore}
                </div>

                {/* Risk Level */}
                <div
                  className={`mt-1 text-[9px] font-semibold uppercase tracking-wider ${getRiskColor(
                    item.riskLevel
                  )}`}
                >
                  {item.riskLevel}
                </div>

                {/* Current indicator */}
                {index === 0 && (
                  <div className="mt-3 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-2 py-1 text-[8px] uppercase tracking-wider text-cyan-400">
                    Current
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
              Risk trajectory
            </span>

            <span className="font-mono text-[9px] text-slate-600">
              0 — 100
            </span>
          </div>

          <div className="relative h-44 rounded-xl border border-white/5 bg-[#070c12] p-4">
            {/* Grid */}
            <div className="pointer-events-none absolute inset-4 flex flex-col justify-between">
              {[100, 75, 50, 25, 0].map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-2"
                >
                  <span className="w-6 text-right font-mono text-[8px] text-slate-700">
                    {value}
                  </span>

                  <div className="h-px flex-1 bg-white/[0.04]" />
                </div>
              ))}
            </div>

            {/* Bars */}
            <div className="absolute bottom-4 left-12 right-4 top-4 flex items-end justify-around gap-4">
              {forecast.map((item) => (
                <div
                  key={item.horizon}
                  className="flex h-full flex-1 items-end justify-center"
                >
                  <div
                    className={`w-full max-w-16 rounded-t-lg opacity-80 ${getDotColor(
                      item.riskLevel
                    )}`}
                    style={{
                      height: getBarHeight(item.riskScore),
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Labels */}
            <div className="absolute bottom-1 left-12 right-4 flex justify-around">
              {forecast.map((item) => (
                <span
                  key={item.horizon}
                  className="font-mono text-[8px] text-slate-600"
                >
                  {item.horizon}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Peak Risk Insight */}
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-orange-500/10 bg-orange-500/5 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />

          <div>
            <div className="text-xs font-semibold text-orange-300">
              Peak risk expected at {peak.horizon === "NOW" ? "current time" : peak.horizon.replace("H", " hours")}
            </div>

            <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
              Forecast models indicate a projected risk score of{" "}
              <span className="font-semibold text-orange-300">
                {peak.riskScore}/100
              </span>
              . Increased monitoring is recommended during this period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}