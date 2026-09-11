"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  HardHat,
  ShieldAlert,
  Siren,
  Users,
} from "lucide-react";

import { mockRiskAnalysis } from "@/mock/risk";

type Role = "CITIZEN" | "GOVERNMENT" | "ROAD_AUTHORITY";

const roles: {
  id: Role;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "CITIZEN",
    label: "Citizen",
    description: "Safety actions for people in the affected area",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "GOVERNMENT",
    label: "Government",
    description: "Emergency preparedness and monitoring",
    icon: <ShieldAlert className="h-4 w-4" />,
  },
  {
    id: "ROAD_AUTHORITY",
    label: "Road Authority",
    description: "Road corridor inspection and protection",
    icon: <HardHat className="h-4 w-4" />,
  },
];

export default function RecommendationPanel() {
  const [selectedRole, setSelectedRole] =
    useState<Role>("GOVERNMENT");

  const recommendations = mockRiskAnalysis.recommendations.filter(
    (recommendation) => recommendation.role === selectedRole
  );

  const selectedRoleData = roles.find(
    (role) => role.id === selectedRole
  );

  return (
    <section className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Siren className="h-4 w-4 text-orange-400" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-400">
            Decision Support
          </span>
        </div>

        <h2 className="mt-2 text-lg font-semibold text-white">
          Recommended Actions
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          AI-generated response recommendations based on current risk
        </p>
      </div>

      {/* Role selector */}
      <div className="grid gap-2 md:grid-cols-3">
        {roles.map((role) => {
          const active = selectedRole === role.id;

          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`group rounded-xl border p-4 text-left transition ${
                active
                  ? "border-cyan-400/30 bg-cyan-400/[0.07]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active
                      ? "bg-cyan-400/10 text-cyan-400"
                      : "bg-white/5 text-slate-500"
                  }`}
                >
                  {role.icon}
                </div>

                {active && (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                )}
              </div>

              <div className="mt-3 text-xs font-semibold text-slate-200">
                {role.label}
              </div>

              <div className="mt-1 text-[10px] leading-relaxed text-slate-600">
                {role.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Recommendation area */}
      <div className="rounded-2xl border border-white/10 bg-[#0a1018] p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
              Active response profile
            </div>

            <div className="mt-1 flex items-center gap-2">
              {selectedRoleData?.icon}

              <span className="text-sm font-semibold text-white">
                {selectedRoleData?.label}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-right">
            <div className="text-[9px] uppercase tracking-wider text-slate-600">
              Current risk
            </div>

            <div className="font-mono text-sm font-bold text-red-400">
              {mockRiskAnalysis.riskScore} / 100
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {recommendations.map((recommendation, index) => (
            <div
              key={recommendation.title}
              className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-orange-400/20 hover:bg-orange-400/[0.02]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/5">
                  <span className="font-mono text-xs font-bold text-red-400">
                    0{index + 1}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xs font-semibold text-slate-200">
                      {recommendation.title}
                    </h3>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                        recommendation.priority === "CRITICAL"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-orange-500/10 text-orange-400"
                      }`}
                    >
                      {recommendation.priority}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {recommendation.description}
                  </p>
                </div>

                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-700 transition group-hover:text-orange-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Response readiness */}
        <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-400/10 bg-emerald-400/[0.025] px-4 py-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />

            <span className="text-xs text-slate-400">
              Response recommendation generated
            </span>
          </div>

          <span className="font-mono text-[10px] text-emerald-400">
            AI READY
          </span>
        </div>
      </div>
    </section>
  );
}