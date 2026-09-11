"use client";

import {
  BrainCircuit,
  CheckCircle2,
  CloudRain,
  Mountain,
  Activity,
  Leaf,
  Droplets,
  Info,
} from "lucide-react";

import { mockRiskAnalysis } from "@/mock/risk";

const factorIcons: Record<string, React.ReactNode> = {
  Rainfall: <CloudRain className="h-4 w-4" />,
  Slope: <Mountain className="h-4 w-4" />,
  "Historical Events": <Activity className="h-4 w-4" />,
  Vegetation: <Leaf className="h-4 w-4" />,
  Soil: <Droplets className="h-4 w-4" />,
};

export default function ExplainableAI() {
  const risk = mockRiskAnalysis;

  const totalContribution = risk.factors.reduce(
    (sum, factor) => sum + factor.contribution,
    0
  );

  return (
    <section className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-cyan-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Explainable AI
            </span>
          </div>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Why is this location at risk?
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            AI-generated explanation of the current landslide risk score
          </p>
        </div>

        <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2">
          <div className="text-[9px] uppercase tracking-wider text-slate-500">
            Model confidence
          </div>

          <div className="mt-1 font-mono text-lg font-bold text-emerald-400">
            {risk.confidence}%
          </div>
        </div>
      </div>

      {/* Main XAI card */}
      <div className="rounded-2xl border border-white/10 bg-[#0a1018] p-5">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Factors */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Risk contribution factors
              </div>

              <div className="text-[10px] text-slate-600">
                Higher contribution = higher influence
              </div>
            </div>

            <div className="space-y-4">
              {risk.factors.map((factor) => {
                const percentage =
                  (factor.contribution / totalContribution) * 100;

                return (
                  <div key={factor.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan-400">
                          {factorIcons[factor.name]}
                        </div>

                        <div>
                          <div className="text-xs font-medium text-slate-200">
                            {factor.name}
                          </div>

                          <div className="mt-0.5 text-[10px] text-slate-600">
                            {factor.description}
                          </div>
                        </div>
                      </div>

                      <div className="font-mono text-sm font-bold text-red-400">
                        +{factor.contribution}
                      </div>
                    </div>

                    <div className="ml-11 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-500/60 to-red-400"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI interpretation */}
          <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.025] p-4">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-cyan-400" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-400">
                AI Interpretation
              </span>
            </div>

            <div className="mt-5">
              <div className="text-3xl font-bold text-white">
                {risk.riskScore}%
              </div>

              <div className="mt-1 text-xs font-semibold text-red-400">
                {risk.riskLevel} LANDSLIDE RISK
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-slate-400">
              The model identifies <span className="text-white">rainfall</span>{" "}
              and <span className="text-white">terrain slope</span> as the
              strongest contributors to the current risk. Historical landslide
              activity further increases susceptibility, while vegetation and
              soil conditions provide additional risk signals.
            </p>

            <div className="mt-5 border-t border-white/5 pt-4">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />

                <span className="text-[10px] leading-relaxed text-slate-500">
                  This explanation is generated from the environmental
                  indicators used by the prediction model.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom confidence */}
        <div className="mt-6 grid gap-3 border-t border-white/5 pt-5 sm:grid-cols-3">
          <Signal
            label="Primary Signal"
            value="Rainfall"
            detail="+31 contribution"
          />

          <Signal
            label="Terrain Signal"
            value="Slope"
            detail="+24 contribution"
          />

          <Signal
            label="Model Reliability"
            value={`${risk.confidence}%`}
            detail="High confidence"
          />
        </div>
      </div>

      {/* Decision explanation */}
      <div className="rounded-xl border border-red-500/10 bg-red-500/[0.025] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
            <CheckCircle2 className="h-4 w-4 text-red-400" />
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-200">
              Why the system recommends monitoring
            </div>

            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              The combined environmental signals cross the model's high-risk
              threshold. Authorities should prioritize slope monitoring,
              rainfall surveillance, and preparedness actions in the affected
              area.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Signal({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
      <div className="text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-1 text-sm font-semibold text-slate-200">
        {value}
      </div>

      <div className="mt-1 text-[10px] text-slate-500">
        {detail}
      </div>
    </div>
  );
}