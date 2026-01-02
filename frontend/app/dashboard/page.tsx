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

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  if (!metrics) {
    return <div className="p-6 text-white/70">Loading dashboard…</div>;
  }

  return (
    <AppLayout active="dashboard">
      <div className="px-8 py-12">
        <h1 className="section-title mb-6">Live Safety Dashboard</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Total Prompts" value={metrics.totalPrompts} />
          <StatCard title="Blocked" value={metrics.blockedPrompts} />
          <StatCard title="Allowed" value={metrics.allowedPrompts} />
          <StatCard title="Avg Latency (ms)" value={metrics.avgLatencyMs} />
          <StatCard title="Top Risk" value={metrics.topRiskCategory} />
        </div>
      </div>
    </AppLayout>
  );
  
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="glass p-4 rounded-xl">
      <div className="text-sm text-white/60">{title}</div>
      <div className="text-2xl font-bold text-white mt-1">{value}</div>
    </div>
  );
}
