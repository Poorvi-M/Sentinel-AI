import { Signal } from "src/gateway/signal";

export type StructuralSignal = {
    type: "STRUCTURAL_MANIPULATION";
    confidence: number;
};

const SUSPICIOUS_PATTERNS = [
    "ignore previous",
    "ignore all previous",
    "system prompt",
    "you are now",
    "act as",
    "developer message",
    "override",
    "bypass",
];

export function structuralFilter(prompt:string): Signal | null {
    const normalized = prompt.toLowerCase();

    for(const pattern of SUSPICIOUS_PATTERNS){
        if(normalized.includes(pattern)){
            return{
                type: "STRUCTURAL_MANIPULATION",
                confidence : 0.9,
                message: "Prompt attempts to override system instructions"
            };
        }
    }

    return null;
}