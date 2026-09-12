"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import ExplainableAI from "@/components/ai/ExplainableAI";

export default function AIPage() {
  return (
    <main className="flex min-h-screen bg-[#03070b] text-white overflow-hidden">
      <Sidebar />

      <div className="flex-1 w-full flex flex-col">
        <TopBar />

        <div className="p-8 flex-1 overflow-y-auto">
          <div className="mb-8">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Artificial Intelligence
            </div>

            <h1 className="text-3xl font-bold">AI Intelligence</h1>

            <p className="mt-2 text-sm text-slate-400">
              Explainable AI analysis behind the landslide risk prediction.
            </p>
          </div>

          <ExplainableAI />
        </div>
      </div>
    </main>
  );
}
