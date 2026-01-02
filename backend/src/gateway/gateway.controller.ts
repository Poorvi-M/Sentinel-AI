import { Body,Controller,Post } from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { Signal } from "./signal";

@Controller("gateway")
export class GatewayController{
    constructor(private readonly gatewayService: GatewayService){}

    @Post("check")
    checkPrompt(@Body("prompt") prompt: string):{ requestID: string;decision: "ALLOW" | "BLOCK"; riskScore: number; signals: Signal[] }{
        const decision = this.gatewayService.checkPrompt(prompt);

        return this.gatewayService.checkPrompt(prompt);
    }
}