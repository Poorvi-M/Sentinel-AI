"use client";

import { useEffect, useState } from "react";
import { fetchDashboardMetrics } from "../../lib/api";
import AppLayout from "@/components/applayout";

type Metrics = {
  totalPrompts: number;
  blockedPrompts: number;
  allowedPrompts: number;
  avgLatencyMs: number;
  topRiskCategory: string;
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState("");

  async function loadMetrics() {
    try {
      const data = await fetchDashboardMetrics();
      setMetrics(data);
    } catch {
      setError("Failed to load dashboard metrics");
    }
  }

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppLayout active="dashboard">
      <div className="px-8 py-14">
        <div className="max-w-3xl mx-auto">

          {/* OUTER DASHBOARD BUBBLE */}
          <div className="glass rounded-3xl p-8 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.18)]">

            <h1 className="text-2xl font-bold mb-6">
              Live Safety Dashboard
            </h1>

            {error && (
              <div className="text-rose-400 text-sm mb-4">{error}</div>
            )}

            {!metrics ? (
              <div className="text-white/60">Loading dashboard…</div>
            ) : (
              <div className="space-y-4">

                <StatCard
                  title="Total Prompts"
                  value={metrics.totalPrompts}
                />

                <StatCard
                  title="Blocked"
                  value={metrics.blockedPrompts}
                />

                <StatCard
                  title="Allowed"
                  value={metrics.allowedPrompts}
                />

                <StatCard
                  title="Avg Latency (ms)"
                  value={metrics.avgLatencyMs}
                />

                <StatCard
                  title="Top Risk Category"
                  value={metrics.topRiskCategory}
                />

              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <div className="text-sm text-white/60">{title}</div>
      <div className="text-2xl font-bold text-white mt-1">
        {value}
      </div>
    </div>
  );
}
