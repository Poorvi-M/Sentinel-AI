import StatCard from "@/components/stat-card";
import { getDashboardMetrics } from "@/lib/api";

export default async function Home(){
  const metrics = await getDashboardMetrics();

  return(
    <main className = "min-h-screen bg-[#0b0b0f] p-6 text-white">
      
      <h1 className = "mb-6 text-2xl font-semibold">
        Sentinel-AI Dashboard
      </h1>

      <div className = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title = "Prompts Inspected"
          value = {metrics.promptsInspected}
        />
        
        <StatCard 
          title = "Blocked Attempts"
          value = {metrics.blockedAttempts}
        />

        <StatCard 
          title = "Average Latency (ms)"
          value = {metrics.avgLatencyMs}
        />

        <StatCard
          title = "Top Risk Category"
          value = {metrics.topRiskCategory}
        />

        <StatCard
          title = "Incidents Escalated"
          value = {metrics.incidentsEscalated}
        />
      </div>
    </main>
  );
}