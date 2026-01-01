"use client";

import { useState } from "react";

type Signal = {
  type: string;
  confidence: number;
  message: string;
};

export default function TesterPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [decision, setDecision] = useState<"ALLOW" | "BLOCK" | null>(null);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setError("");
    setDecision(null);
    setSignals([]);
    setRiskScore(null);

    if (!prompt.trim()) {
      setError("Please enter a prompt to test.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3001/gateway/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setDecision(data.decision);
      setSignals(data.signals || []);
      setRiskScore(data.riskScore);
    } catch (err) {
      console.error(err);
      setError("Request failed. Check backend or network.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-page min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="section-title">Prompt tester</h1>
        <p className="text-sm text-[#dbc7ff] mb-4">
          Submit a prompt and the gateway will indicate whether it would be allowed or blocked.
        </p>

        <form onSubmit={submit} className="glass p-4 space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            placeholder="Enter a prompt to test..."
            className="w-full bg-transparent text-white placeholder:text-slate-300 outline-none p-2"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow disabled:opacity-50"
            >
              {loading ? "Checking…" : "Check prompt"}
            </button>

            <button
              type="button"
              onClick={() => {
                setPrompt("");
                setDecision(null);
                setSignals([]);
                setRiskScore(null);
                setError("");
              }}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/90"
            >
              Clear
            </button>
          </div>

          {error && <div className="text-rose-300 text-sm">{error}</div>}

          {decision && (
            <div
              className={`p-3 rounded-md ${
                decision === "ALLOW"
                  ? "bg-emerald-900/40"
                  : "bg-rose-900/40"
              }`}
            >
              {riskScore !== null && (
                <div className="mb-2 flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      riskScore >= 70
                        ? "bg-rose-500/20 text-rose-300"
                        : riskScore >= 31
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    {riskScore >= 70
                      ? "HIGH RISK"
                      : riskScore >= 31
                      ? "MEDIUM RISK"
                      : "LOW RISK"}
                  </span>

                  <span className="text-sm text-[#e4d4ff]">
                    Risk Score: <b>{riskScore}</b> / 100
                  </span>
                </div>
              )}

              <div className="font-semibold mb-1">
                {decision === "ALLOW" ? "Allowed" : "Blocked"}
              </div>

              {signals.length > 0 ? (
                <div className="space-y-2 text-sm text-[#e4d4ff]">
                  {signals.map((signal, idx) => (
                    <div
                      key={idx}
                      className="border border-white/10 rounded p-2"
                    >
                      <div><b>Type:</b> {signal.type}</div>
                      <div><b>Confidence:</b> {signal.confidence}</div>
                      <div><b>Reason:</b> {signal.message}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-[#e4d4ff]">
                  No risk signals detected.
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
