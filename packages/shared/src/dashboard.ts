export type DashboardMetrics = {
    promptsInspected : number;
    blockedAttempts : number;
    avgLatencyMs : number;
    topRiskCategory : string;
    incidentsEscalated : number;
};