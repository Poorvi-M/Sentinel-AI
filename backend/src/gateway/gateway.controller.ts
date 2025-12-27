import { Body,Controller,Post } from "@nestjs/common";
import { GatewayService } from "./gateway.service";

@Controller("gateway")
export class GatewayController{
    constructor(private readonly gatewayService: GatewayService){}

    @Post("check")
    checkPrompt(@Body("prompt") prompt: string):{ decision: "ALLOW" | "BLOCK" }{
        const decision = this.gatewayService.checkPrompt(prompt);

        return{
            decision,
        };
    }
}