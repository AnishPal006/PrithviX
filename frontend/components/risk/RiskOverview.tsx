"use client";

import { useState } from "react";
import { AlertTriangle, Brain, CheckCircle2, Loader2 } from "lucide-react";

import AnalysisAnimation from "@/components/ai/AnalysisAnimation";
import { analyzeRisk } from "@/services/riskService";
import { mockRiskAnalysis } from "@/mock/risk";
import { RiskAnalysis } from "@/types/risk";

export default function RiskOverview() {
  const [risk, setRisk] = useState<RiskAnalysis>(mockRiskAnalysis);
  const [analyzing, setAnalyzing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setAnalyzing(true);
    setLoading(true);
    setError("");

    try {
      const result = await analyzeRisk({
        latitude: risk.location.latitude,
        longitude: risk.location.longitude,
      });

      setRisk(result);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to the PrithviX AI backend. Please check that the FastAPI server is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#081018] p-6">
      {analyzing && (
        <AnalysisAnimation
          onCompleteAction={() => {
            setTimeout(() => {
              setAnalyzing(false);
            }, 500);
          }}
        />
      )}

      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Live Risk Assessment
            </span>
          </div>

          <h2 className="text-2xl font-bold">
            {risk.location.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {risk.location.state}
          </p>
        </div>

        <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <Brain className="h-4 w-4" />
            AI ENGINE
          </div>

          <div className="mt-1 text-xs text-slate-500">
            Connected
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Risk score */}
        <div className="rounded-xl border border-white/10 bg-black/20 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500">
              Current Risk
            </span>

            <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
              {risk.riskLevel}
            </span>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-6xl font-black tracking-tight">
              {risk.riskScore}
            </span>

            <span className="mb-2 text-xl text-slate-500">
              /100
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-red-500 transition-all duration-700"
              style={{
                width: `${risk.riskScore}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-slate-600">
            <span>Safe</span>
            <span>Moderate</span>
            <span>High</span>
            <span>Critical</span>
          </div>
        </div>

        {/* Confidence */}
        <div className="rounded-xl border border-white/10 bg-black/20 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500">
              Model Confidence
            </span>

            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>

          <div className="text-5xl font-black">
            {risk.confidence}%
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-700"
              style={{
                width: `${risk.confidence}%`,
              }}
            />
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Prediction reliability based on available environmental signals.
          </p>
        </div>
      </div>

      {/* Risk factors */}
      <div className="mt-6">
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Primary Risk Indicators
        </div>

        <div className="space-y-3">
          {risk.factors.map((factor) => (
            <div
              key={factor.name}
              className="rounded-lg border border-white/5 bg-black/20 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-300">
                  {factor.name}
                </span>

                <span className="text-sm font-semibold text-red-400">
                  +{factor.contribution}
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-red-400"
                  style={{
                    width: `${Math.min(
                      factor.contribution * 3,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-5 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

          <div>
            <div className="text-sm font-semibold text-red-400">
              Backend Connection Error
            </div>

            <p className="mt-1 text-xs text-slate-400">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting to AI Engine...
          </>
        ) : (
          <>
            <Brain className="h-4 w-4" />
            Analyze Risk
          </>
        )}
      </button>
    </section>
  );
}