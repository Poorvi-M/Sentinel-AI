import { Injectable } from "@nestjs/common";
import { structuralFilter } from "../filters/structural.filter";
import { Signal } from "./signal";

enum Decision {
  ALLOW = "ALLOW",
  BLOCK = "BLOCK",
}

const BLOCK_THRESHOLD = 0.8;

@Injectable()
export class GatewayService {
  checkPrompt(prompt: string): {
    decision: Decision;
    signals: Signal[];
  } {
    const signals: Signal[] = [];

    const structuralSignal = structuralFilter(prompt);
    if (structuralSignal) {
      signals.push(structuralSignal);
    }

    const shouldBlock = signals.some(
      (signal) => signal.confidence >= BLOCK_THRESHOLD
    );

    return {
      decision: shouldBlock ? Decision.BLOCK : Decision.ALLOW,
      signals,
    };
  }
}
