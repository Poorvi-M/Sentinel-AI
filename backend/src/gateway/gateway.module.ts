import { Module } from "@nestjs/common";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";
import { MetricsModule } from "../metrics/metrics.module";
import { LogsModule } from "../database/logs/logs.module";

@Module({
    imports: [MetricsModule, LogsModule],
    controllers: [GatewayController],
    providers: [GatewayService],
})
export class GatewayModule{}