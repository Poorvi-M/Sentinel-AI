import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from "./dashboard/dashboard.module";
import { GatewayModule } from './gateway/gateway.module';
import { MetricsModule } from "./metrics/metrics.module";
import { LogsModule } from "./database/logs/logs.module";



@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || "mongodb://localhost:27017/sentinel"
    ),
    DashboardModule, GatewayModule, MetricsModule, LogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
