import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

type DashboardMetrics = {
    promptsInspected: number;
    blockedAttempts: number;
    avgLatencyMs: number;
    topRiskCategory: string;
    incidentsEscalated: number;
  };
  
@Controller("dashboard")
export class DashboardController{
    constructor(private readonly dashboardService: DashboardService){}

    @Get("summary")
    getSummary(): DashboardMetrics {
        return this.dashboardService.getDashboardMetrics();
    }
}