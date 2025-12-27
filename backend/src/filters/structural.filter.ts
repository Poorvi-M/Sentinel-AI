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

export function structuralFilter(prompt:string): StructuralSignal | null {
    const normalized = prompt.toLowerCase();

    for(const pattern of SUSPICIOUS_PATTERNS){
        if(normalized.includes(pattern)){
            return{
                type: "STRUCTURAL_MANIPULATION",
                confidence : 0.9,
            };
        }
    }

    return null;
}