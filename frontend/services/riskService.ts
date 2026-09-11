import { RiskAnalysis } from "@/types/risk";

const API_URL = "http://127.0.0.1:8000";

export interface AnalyzeRiskRequest {
  latitude: number;
  longitude: number;
}

export async function analyzeRisk(
  request: AnalyzeRiskRequest
): Promise<RiskAnalysis> {
  const response = await fetch(`${API_URL}/api/risk/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Risk analysis failed: ${response.status}`);
  }

  return response.json();
}