"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Mail,
  MessageSquare,
  Radio,
  Send,
  ShieldAlert,
  X,
} from "lucide-react";

type Channel = "DASHBOARD" | "SMS" | "EMAIL";

export default function AlertCenter() {
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const sendAlert = () => {
    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSent(true);

      setTimeout(() => {
        setShowModal(false);
        setSent(false);
      }, 1800);
    }, 1600);
  };

  return (
    <section className="relative space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-red-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400">
              Emergency Communications
            </span>
          </div>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Alert Center
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Monitor and distribute AI-generated early warnings
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/5 px-3 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

          <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">
            3 Active
          </span>
        </div>
      </div>

      {/* Active warning */}
      <div className="overflow-hidden rounded-2xl border border-red-500/20 bg-[#0a1018]">
        <div className="border-b border-red-500/10 bg-red-500/[0.035] px-5 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                <ShieldAlert className="h-5 w-5 text-red-400" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
                    Active Early Warning
                  </span>

                  <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[8px] font-bold text-red-400">
                    CRITICAL
                  </span>
                </div>

                <h3 className="mt-1 text-base font-semibold text-white">
                  East Khasi Hills
                </h3>

                <p className="mt-1 text-[10px] text-slate-600">
                  Meghalaya • Risk Score 82/100
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-red-400"
            >
              <Send className="h-3.5 w-3.5" />
              Send Early Warning
            </button>
          </div>
        </div>

        {/* Trigger */}
        <div className="grid gap-3 p-5 md:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-orange-400" />

              <span className="text-[9px] uppercase tracking-wider text-slate-600">
                Alert Trigger
              </span>
            </div>

            <div className="mt-3 text-sm font-semibold text-slate-200">
              Risk threshold exceeded
            </div>

            <div className="mt-1 text-[10px] text-slate-500">
              Current risk 82 &gt; critical threshold 75
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />

              <span className="text-[9px] uppercase tracking-wider text-slate-600">
                Recommended Priority
              </span>
            </div>

            <div className="mt-3 text-sm font-semibold text-red-400">
              Immediate action
            </div>

            <div className="mt-1 text-[10px] text-slate-500">
              Increase monitoring and prepare response teams
            </div>
          </div>
        </div>

        {/* Channels */}
        <div className="border-t border-white/5 p-5">
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Communication Channels
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <Channel
              icon={<Radio className="h-4 w-4" />}
              label="Dashboard"
              status="READY"
            />

            <Channel
              icon={<MessageSquare className="h-4 w-4" />}
              label="SMS"
              status="READY"
            />

            <Channel
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              status="READY"
            />
          </div>
        </div>
      </div>

      {/* Recent alerts */}
      <div className="rounded-2xl border border-white/10 bg-[#0a1018] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-300">
            Recent Alert Activity
          </div>

          <span className="font-mono text-[9px] text-slate-600">
            LAST 24 HOURS
          </span>
        </div>

        <div className="space-y-3">
          <AlertHistory
            time="06:42"
            location="East Khasi Hills"
            message="Critical risk threshold exceeded"
            level="CRITICAL"
          />

          <AlertHistory
            time="05:18"
            location="Ri-Bhoi"
            message="Risk level increased to HIGH"
            level="HIGH"
          />

          <AlertHistory
            time="02:51"
            location="West Khasi Hills"
            message="Monitoring alert generated"
            level="MODERATE"
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-red-500/20 bg-[#081018] p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />

                  <span className="text-sm font-semibold text-white">
                    Send Early Warning
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Confirm distribution of the critical-risk warning.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-red-500/10 bg-red-500/5 p-4">
              <div className="text-[9px] font-bold uppercase tracking-wider text-red-400">
                Warning Message
              </div>

              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Critical landslide risk detected in East Khasi Hills.
                Residents and authorities are advised to avoid vulnerable
                slopes and increase monitoring of exposed areas.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <ChannelSmall
                icon={<Radio className="h-3.5 w-3.5" />}
                label="Dashboard"
              />

              <ChannelSmall
                icon={<MessageSquare className="h-3.5 w-3.5" />}
                label="SMS"
              />

              <ChannelSmall
                icon={<Mail className="h-3.5 w-3.5" />}
                label="Email"
              />
            </div>

            <button
              onClick={sendAlert}
              disabled={sending || sent}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-xs font-bold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Warning Distributed
                </>
              ) : sending ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Distributing Warning...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Confirm & Send Warning
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Channel({
  icon,
  label,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex items-center gap-3">
        <div className="text-slate-500">{icon}</div>

        <span className="text-xs text-slate-300">{label}</span>
      </div>

      <span className="text-[8px] font-bold text-emerald-400">
        {status}
      </span>
    </div>
  );
}

function ChannelSmall({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] py-2 text-[9px] text-slate-400">
      {icon}
      {label}
    </div>
  );
}

function AlertHistory({
  time,
  location,
  message,
  level,
}: {
  time: string;
  location: string;
  message: string;
  level: "CRITICAL" | "HIGH" | "MODERATE";
}) {
  const levelClass =
    level === "CRITICAL"
      ? "text-red-400"
      : level === "HIGH"
        ? "text-orange-400"
        : "text-yellow-400";

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
      <div className="font-mono text-[10px] text-slate-600">{time}</div>

      <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />

      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-slate-300">
          {location}
        </div>

        <div className="mt-0.5 text-[10px] text-slate-600">
          {message}
        </div>
      </div>

      <div className={`text-[9px] font-bold ${levelClass}`}>
        {level}
      </div>
    </div>
  );
}