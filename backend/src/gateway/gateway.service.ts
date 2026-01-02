import { Injectable } from "@nestjs/common";
import { structuralFilter } from "../filters/structural.filter";
import { intentFilter } from "../filters/intent.filter";
import { Signal } from "./signal";
import { randomUUID } from "crypto";
import { MetricsService } from "../metrics/metrics.service";

enum Decision {
  ALLOW = "ALLOW",
  BLOCK = "BLOCK",
}

const RISK_WEIGHTS: Record<string, number> = {
  STRUCTURAL_MANIPULATION: 50,
  SUSPICIOUS_INTENT: 60,
};

const BLOCK_THRESHOLD = 70;

@Injectable()
export class GatewayService {
  constructor(private readonly metricsService: MetricsService) {}
  checkPrompt(prompt: string): {
    decision: Decision;
    latencyMs: number;
    requestID: string;
    riskScore: number;
    signals: Signal[];
  } {
    const signals: Signal[] = [];

    const structuralSignal = structuralFilter(prompt);
    if (structuralSignal) signals.push(structuralSignal);

    const intentSignal = intentFilter(prompt);
    if (intentSignal) signals.push(intentSignal);

    const riskScore = signals.reduce((total, signal) => {
      const weight = RISK_WEIGHTS[signal.type] ?? 0;
      return total + signal.confidence * weight;
    }, 0);

    const decision =
      riskScore >= BLOCK_THRESHOLD ? Decision.BLOCK : Decision.ALLOW;

    const requestId = randomUUID();
    const startTime = Date.now();
    const latencyMs = Date.now() - startTime;

    this.metricsService.recordDecision(
      decision,
      latencyMs,
      signals
    );
    


    return {
        requestID: requestId,
        decision,
        latencyMs,
        riskScore: Math.round(riskScore),
        signals,
    };
  }
}
