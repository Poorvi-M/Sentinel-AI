import { Injectable } from "@nestjs/common";

@Injectable()
export class MetricsService {
  private totalPrompts = 0;
  private blockedPrompts = 0;
  private allowedPrompts = 0;
  private totalLatency = 0;

  private riskCategoryCount: Record<string, number> = {};

  recordDecision(
    decision: "ALLOW" | "BLOCK",
    latencyMs: number,
    signals: { type: string }[]
  ) {
    this.totalPrompts++;
    this.totalLatency += latencyMs;

    if (decision === "BLOCK") this.blockedPrompts++;
    else this.allowedPrompts++;

    for (const signal of signals) {
      this.riskCategoryCount[signal.type] =
        (this.riskCategoryCount[signal.type] || 0) + 1;
    }
  }

  getMetrics() {
    return {
      totalPrompts: this.totalPrompts,
      blockedPrompts: this.blockedPrompts,
      allowedPrompts: this.allowedPrompts,
      avgLatencyMs:
        this.totalPrompts === 0
          ? 0
          : Math.round(this.totalLatency / this.totalPrompts),
      topRiskCategory:
        Object.entries(this.riskCategoryCount).sort(
          (a, b) => b[1] - a[1]
        )[0]?.[0] || "None",
    };
  }
}
