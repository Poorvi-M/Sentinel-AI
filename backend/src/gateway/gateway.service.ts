import { Injectable } from "@nestjs/common";
import { structuralFilter } from "src/filters/structural.filter";

enum Decision{
    ALLOW = "ALLOW",
    BLOCK = "BLOCK",
}

@Injectable()
export class GatewayService{
    checkPrompt(prompt:string):Decision{
        const signal = structuralFilter(prompt);

        if(signal){
            return Decision.BLOCK;
        }
        
        return Decision.ALLOW;
    }
}