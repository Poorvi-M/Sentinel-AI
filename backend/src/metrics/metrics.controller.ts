import { Controller, Get } from "@nestjs/common";
import { MetricsService } from "./metrics.service";

@Controller("dashboard")
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getDashboardMetrics() {
    return this.metricsService.getMetrics();
  }
}
