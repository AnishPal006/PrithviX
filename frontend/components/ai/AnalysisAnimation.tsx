"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  CloudRain,
  Mountain,
  Satellite,
  BrainCircuit,
  Activity,
} from "lucide-react";

const analysisSteps = [
  {
    label: "Terrain analysis",
    icon: Mountain,
  },
  {
    label: "Rainfall analysis",
    icon: CloudRain,
  },
  {
    label: "Satellite assessment",
    icon: Satellite,
  },
  {
    label: "Historical event analysis",
    icon: Activity,
  },
  {
    label: "AI inference",
    icon: BrainCircuit,
  },
];

export default function AnalysisAnimation({
  onCompleteAction,
}: {
  onCompleteAction: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-[1000] flex items-center justify-center bg-[#05090f]/90 backdrop-blur-md"
    >
      <div className="w-full max-w-md rounded-2xl border border-cyan-400/20 bg-[#081018] p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
            <BrainCircuit className="h-6 w-6 text-cyan-400" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-white">
            AI Risk Analysis
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Processing environmental intelligence
          </p>
        </div>

        {/* Analysis Steps */}
        <div className="space-y-3">
          {analysisSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.7,
                  duration: 0.3,
                }}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                onAnimationComplete={
                  index === analysisSteps.length - 1
                    ? onCompleteAction
                    : undefined
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-cyan-400" />

                  <span className="text-xs text-slate-300">
                    {step.label}
                  </span>
                </div>

                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </motion.div>
            );
          })}
        </div>

        {/* Processing Status */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cyan-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
          Calculating risk
        </div>
      </div>
    </motion.div>
  );
}