"use client";

import {
  CloudRain,
  Cpu,
  Globe2,
  Menu,
  Satellite,
  Wifi,
} from "lucide-react";

export default function TopBar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#090f17]/95 px-4 backdrop-blur-xl lg:px-6">
      <div className="flex items-center gap-4">
        <button className="rounded-lg border border-white/10 p-2 text-slate-400 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
            Disaster Intelligence Network
          </div>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span className="text-sm font-medium text-slate-200">
              North Eastern Region
            </span>
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-6 md:flex">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Satellite className="h-4 w-4 text-cyan-400" />
          SATELLITE
          <span className="text-emerald-400">ONLINE</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <CloudRain className="h-4 w-4 text-cyan-400" />
          WEATHER
          <span className="text-emerald-400">LIVE</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Cpu className="h-4 w-4 text-cyan-400" />
          AI ENGINE
          <span className="text-emerald-400">READY</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 sm:flex">
          <Wifi className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">
            System Online
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Globe2 className="h-4 w-4" />
          <span>NER</span>
        </div>
      </div>
    </header>
  );
}