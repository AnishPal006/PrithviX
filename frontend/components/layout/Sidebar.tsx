"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Activity,
  Bell,
  Brain,
  FileText,
  Gauge,
  Map,
  Radio,
  ShieldAlert,
  Siren,
  Target,
  TrendingUp,
} from "lucide-react";

const menuItems = [
  {
    label: "Command Center",
    icon: Gauge,
    href: "/",
  },
  {
    label: "Risk Forecast",
    icon: TrendingUp,
    href: "/forecast",
  },
  {
    label: "Impact Assessment",
    icon: Target,
    href: "/impact",
  },
  {
    label: "Risk Map",
    icon: Map,
    href: "/map",
  },
  {
    label: "AI Intelligence",
    icon: Brain,
    href: "/ai",
  },
  {
    label: "Alert Center",
    icon: Bell,
    href: "/alerts",
  },
  {
    label: "Reports",
    icon: FileText,
    href: "/reports",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#080d14] lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
          <Activity className="h-5 w-5 text-cyan-400" />
        </div>

        <div>
          <div className="text-lg font-bold tracking-[0.18em] text-white">
            PRITHVIX
          </div>

          <div className="text-[9px] uppercase tracking-[0.25em] text-cyan-400/70">
            Risk Intelligence
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-6">
        <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Intelligence
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                  isActive
                    ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] ${
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                />

                <span>{item.label}</span>

                {item.label === "Alert Center" && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500/20 px-1.5 text-[10px] font-bold text-red-400">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Monitoring */}
        <div className="mb-3 mt-10 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Monitoring
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Radio className="h-4 w-4 text-cyan-400" />

            <span className="text-xs font-medium text-slate-300">
              Live Monitoring
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-[11px] text-emerald-400">
              Systems operational
            </span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 p-4">
        <Link
          href="/alerts"
          className="flex items-center gap-3 rounded-lg border border-red-400/10 bg-red-400/5 p-3 transition hover:border-red-400/20 hover:bg-red-400/10"
        >
          <Siren className="h-4 w-4 text-red-400" />

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-red-400">
              Active Risk
            </div>

            <div className="mt-0.5 text-[11px] text-slate-400">
              3 critical zones
            </div>
          </div>

          <ShieldAlert className="ml-auto h-4 w-4 text-red-400/60" />
        </Link>
      </div>
    </aside>
  );
}