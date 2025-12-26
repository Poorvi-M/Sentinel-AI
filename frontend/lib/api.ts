import { DashboardMetrics } from "../../packages/shared/src";

export async function getDashboardMetrics(): Promise<DashboardMetrics>{
    return{
        promptsInspected: 4320,
        blockedAttempts: 87,
        avgLatencyMs: 12,
        topRiskCategory: "PII & Credentials",
        incidentsEscalated: 5,
    };
}