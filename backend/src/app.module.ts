import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from "./dashboard/dashboard.module";
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [DashboardModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
