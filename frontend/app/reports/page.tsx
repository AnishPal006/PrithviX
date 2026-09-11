"use client";

import {
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  CloudRain,
  Download,
  FileText,
  MapPin,
  Mountain,
  ShieldCheck,
  Users,
} from "lucide-react";

import { mockRiskAnalysis } from "@/mock/risk";

export default function ReportsPage() {
  const risk = mockRiskAnalysis;

  const generateReport = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#05090f] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-cyan-400" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
                PrithviX Intelligence
              </span>
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight">
              Landslide Risk Assessment Report
            </h1>

            <p className="mt-2 text-xs text-slate-500">
              AI-powered environmental risk assessment and decision support
            </p>
          </div>

          <button
            onClick={generateReport}
            className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-xs font-semibold text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/15"
          >
            <Download className="h-4 w-4" />
            Generate Report
          </button>
        </div>

        {/* Report */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]">
          {/* Report identity */}
          <div className="border-b border-white/10 bg-white/[0.015] p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-mono text-xs font-bold tracking-[0.3em] text-cyan-400">
                  PRITHVIX
                </div>

                <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-slate-600">
                  AI-Powered Landslide Risk Intelligence
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-[9px] uppercase tracking-wider text-slate-600">
                  Assessment ID
                </div>

                <div className="mt-1 font-mono text-xs text-slate-400">
                  PRX-EKH-26001
                </div>

                <div className="mt-1 text-[9px] text-slate-600">
                  Generated {new Date(risk.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="grid gap-4 border-b border-white/10 p-6 sm:grid-cols-3 sm:p-8">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-400" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Assessment Location
                </span>
              </div>

              <h2 className="mt-2 text-xl font-bold text-white">
                {risk.location.name}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {risk.location.state} • Northeast India
              </p>

              <div className="mt-3 font-mono text-[10px] text-slate-600">
                {risk.location.latitude.toFixed(4)}° N{" "}
                {risk.location.longitude.toFixed(4)}° E
              </div>
            </div>

            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4">
              <div className="text-[9px] uppercase tracking-wider text-slate-600">
                Current Risk
              </div>

              <div className="mt-2 font-mono text-4xl font-bold text-red-400">
                {risk.riskScore}
              </div>

              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-red-400">
                {risk.riskLevel}
              </div>
            </div>
          </div>

          {/* Executive summary */}
          <div className="border-b border-white/10 p-6 sm:p-8">
            <SectionTitle
              icon={<BrainCircuit className="h-4 w-4" />}
              title="Executive Assessment"
            />

            <div className="mt-4 rounded-xl border border-red-500/10 bg-red-500/[0.025] p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

                <p className="text-sm leading-7 text-slate-400">
                  PrithviX has identified a{" "}
                  <span className="font-semibold text-red-400">
                    critical landslide risk
                  </span>{" "}
                  for the selected location. Multiple environmental
                  indicators, including rainfall, terrain slope, historical
                  events, vegetation and soil conditions, are contributing to
                  the elevated risk.
                </p>
              </div>
            </div>
          </div>

          {/* Risk metrics */}
          <div className="border-b border-white/10 p-6 sm:p-8">
            <SectionTitle
              icon={<ShieldCheck className="h-4 w-4" />}
              title="AI Risk Metrics"
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Metric
                label="Risk Score"
                value={`${risk.riskScore}/100`}
                detail="Critical threshold exceeded"
              />

              <Metric
                label="Model Confidence"
                value={`${risk.confidence}%`}
                detail="High confidence"
              />

              <Metric
                label="Risk Classification"
                value={risk.riskLevel}
                detail="Immediate monitoring"
              />
            </div>
          </div>

          {/* Factors */}
          <div className="border-b border-white/10 p-6 sm:p-8">
            <SectionTitle
              icon={<Mountain className="h-4 w-4" />}
              title="Primary Risk Factors"
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {risk.factors.map((factor) => (
                <div
                  key={factor.name}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">
                      {factor.name}
                    </span>

                    <span className="font-mono text-sm font-bold text-red-400">
                      +{factor.contribution}
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{
                        width: `${Math.min(
                          factor.contribution * 3,
                          100
                        )}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-[10px] leading-relaxed text-slate-600">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Forecast */}
          <div className="border-b border-white/10 p-6 sm:p-8">
            <SectionTitle
              icon={<CloudRain className="h-4 w-4" />}
              title="72-Hour Risk Forecast"
            />

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {risk.forecast.map((forecast) => (
                <div
                  key={forecast.horizon}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    {forecast.horizon}
                  </div>

                  <div className="mt-3 font-mono text-2xl font-bold text-white">
                    {forecast.riskScore}
                  </div>

                  <div
                    className={`mt-1 text-[9px] font-bold ${
                      forecast.riskScore >= 76
                        ? "text-red-400"
                        : forecast.riskScore >= 51
                          ? "text-orange-400"
                          : "text-yellow-400"
                    }`}
                  >
                    {forecast.riskLevel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="border-b border-white/10 p-6 sm:p-8">
            <SectionTitle
              icon={<Users className="h-4 w-4" />}
              title="Potential Impact"
            />

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
              <Impact
                label="Population"
                value={risk.impact.population.toLocaleString()}
              />

              <Impact
                label="Roads"
                value={risk.impact.roads.toString()}
              />

              <Impact
                label="Villages"
                value={risk.impact.villages.toString()}
              />

              <Impact
                label="Hospitals"
                value={risk.impact.hospitals.toString()}
              />

              <Impact
                label="Schools"
                value={risk.impact.schools.toString()}
              />
            </div>
          </div>

          {/* Recommendations */}
          <div className="border-b border-white/10 p-6 sm:p-8">
            <SectionTitle
              icon={<CheckCircle2 className="h-4 w-4" />}
              title="Recommended Actions"
            />

            <div className="mt-4 space-y-3">
              {risk.recommendations.map((recommendation) => (
                <div
                  key={recommendation.title}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400">
                      {recommendation.role.replace("_", " ")}
                    </span>

                    <span className="text-slate-700">•</span>

                    <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">
                      {recommendation.priority}
                    </span>
                  </div>

                  <h3 className="mt-2 text-xs font-semibold text-slate-200">
                    {recommendation.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {recommendation.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 bg-white/[0.015] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">
                PRITHVIX • DISASTER INTELLIGENCE NETWORK
              </div>

              <div className="mt-1 text-[9px] text-slate-700">
                AI-generated assessment for decision-support purposes.
              </div>
            </div>

            <div className="font-mono text-[9px] text-emerald-400">
              SYSTEM VERIFIED
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-cyan-400">{icon}</div>

      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-300">
        {title}
      </h2>
    </div>
  );
}

function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-2 font-mono text-xl font-bold text-white">
        {value}
      </div>

      <div className="mt-1 text-[10px] text-slate-600">{detail}</div>
    </div>
  );
}

function Impact({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-2 font-mono text-xl font-bold text-slate-200">
        {value}
      </div>
    </div>
  );
}