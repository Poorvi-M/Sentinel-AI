import { Module } from "@nestjs/common";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";
import { MetricsModule } from "../metrics/metrics.module";

@Module({
    imports: [MetricsModule],
    controllers: [GatewayController],
    providers: [GatewayService],
})
export class GatewayModule{}