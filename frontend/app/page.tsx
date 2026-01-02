import StatCard from "@/components/stat-card";
import { fetchDashboardMetrics } from "@/lib/api";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b0036] via-[#12001a] to-black text-white">

      {/* NAVBAR (UNCHANGED) */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
          <div>
            <div className="font-bold text-lg">Sentinel AI</div>
            <div className="text-xs text-white/60">LLM SAFETY GATEWAY</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-white/80">
          <a href="/" className="font-medium text-white border-b-2 border-violet-400 pb-1">
            Home
          </a>
          <a href="/tester" className="hover:text-white">Tester</a>
          <a href="/live" className="hover:text-white">Live Traffic</a>
          <a href="/dashboard" className="hover:text-white">Dashboard</a>
          <button className="px-3 py-1 rounded-full border border-white/20 text-xs">
            Dark
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="px-8 py-16 max-w-6xl mx-auto space-y-20">

        {/* INTRO */}
        <section>
          <h1 className="text-4xl font-extrabold mb-4">
            Sentinel AI Architecture
          </h1>
          <p className="text-white/70 max-w-3xl">
            Sentinel AI acts as a real-time security gateway for large language
            models. Every prompt is inspected, scored, and policy-checked
            before it ever reaches the model.
          </p>
        </section>

        {/* ARCHITECTURE */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            System Architecture
          </h2>

          <div className="glass rounded-xl p-6">
            <img
              src="/Architecture.jpeg"
              alt="Sentinel AI Architecture Diagram"
              className="w-full rounded-lg"
            />
          </div>

          <p className="text-sm text-white/60 mt-4">
            Prompt ingestion → safety filters → risk scoring → policy enforcement →
            metrics & observability.
          </p>
        </section>

        {/* WHY SENTINEL */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Why Sentinel AI?
          </h2>

          <ul className="space-y-3 text-white/70 list-disc list-inside max-w-4xl">
            <li>Prevents prompt injection, jailbreaks, and malicious intent</li>
            <li>Zero changes required to existing LLM providers</li>
            <li>Explainable decisions with signals and confidence scores</li>
            <li>Built for real-time enforcement, not post-incident analysis</li>
            <li>Designed as a gateway, not a model-side patch</li>
          </ul>
        </section>

        {/* ROADMAP */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Future Roadmap
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/70">
            <div className="glass p-5 rounded-xl">
              <h3 className="font-semibold mb-2">Persistence & Scale</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>MongoDB for prompt & incident storage</li>
                <li>Redis for low-latency signal caching</li>
                <li>Multi-tenant support</li>
              </ul>
            </div>

            <div className="glass p-5 rounded-xl">
              <h3 className="font-semibold mb-2">Advanced Intelligence</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>LLM-based semantic risk analysis</li>
                <li>Adaptive policies per tenant</li>
                <li>Human-in-the-loop review workflows</li>
              </ul>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
