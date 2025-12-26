import { Injectable } from "@nestjs/common";

type DashboardMetrics = {
    promptsInspected: number;
    blockedAttempts: number;
    avgLatencyMs: number;
    topRiskCategory: string;
    incidentsEscalated: number;
  };

@Injectable()
export class DashboardService{
    getDashboardMetrics(): DashboardMetrics {
        return{
            promptsInspected : 4320,
            blockedAttempts : 87,
            avgLatencyMs : 12,
            topRiskCategory : "PII & credentials",
            incidentsEscalated : 5,
        };
    }
}