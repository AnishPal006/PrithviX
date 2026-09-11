"use client";

import dynamic from "next/dynamic";

const RiskMap = dynamic(() => import("./RiskMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[560px] items-center justify-center rounded-2xl border border-white/10 bg-[#081018]">
      <div className="flex items-center gap-3 text-xs text-cyan-400">
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
        Loading geospatial intelligence...
      </div>
    </div>
  ),
});

export default function RiskMapClient() {
  return <RiskMap />;
}