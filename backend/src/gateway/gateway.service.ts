import { Injectable } from "@nestjs/common";
import { structuralFilter } from "../filters/structural.filter";
import { intentFilter } from "../filters/intent.filter";
import { Signal } from "./signal";
import { randomUUID } from "crypto";
import { MetricsService } from "../metrics/metrics.service";
import { LogsService } from "../database/logs/logs.service";

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
  constructor(
    private readonly metricsService: MetricsService,
    private readonly logsService: LogsService, // ✅ FIX
  ) {}

  checkPrompt(prompt: string): {
    decision: Decision;
    latencyMs: number;
    requestId: string;
    riskScore: number;
    signals: Signal[];
  } {
    const startTime = Date.now(); // ✅ start timing FIRST

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

    const latencyMs = Date.now() - startTime;
    const requestId = randomUUID();

    // ✅ Metrics (fast, in-memory)
    this.metricsService.recordDecision(decision, latencyMs, signals);

    // ✅ Fire-and-forget Mongo logging (DO NOT await)
    this.logsService.savePromptLog({
      requestId,
      prompt,
      decision,
      riskScore: Math.round(riskScore),
      signals,
      latencyMs,
    });

    return {
      requestId,
      decision,
      latencyMs,
      riskScore: Math.round(riskScore),
      signals,
    };
  }
}
