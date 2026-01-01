import { Signal } from "../gateway/signal";

const INTENT_PATTERNS = [
  "steal",
  "hack",
  "bypass security",
  "write malware",
  "malware",
  "keylogger",
  "phishing",
  "ddos",
  "exfiltrate",
  "data breach",
];

export function intentFilter(prompt: string): Signal | null {
  const normalized = prompt.toLowerCase();

  for (const pattern of INTENT_PATTERNS) {
    if (normalized.includes(pattern)) {
      return {
        type: "SUSPICIOUS_INTENT",
        confidence: 0.8,
        message: "Prompt expresses potentially malicious or harmful intent",
      };
    }
  }

  return null;
}
