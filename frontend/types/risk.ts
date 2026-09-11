export type RiskLevel =
  | "SAFE"
  | "MODERATE"
  | "HIGH"
  | "CRITICAL";

export interface Location {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface RiskFactor {
  name: string;
  contribution: number;
  direction: "positive" | "negative";
  description?: string;
}

export interface RiskForecast {
  horizon: "NOW" | "24H" | "48H" | "72H";
  riskScore: number;
  riskLevel: RiskLevel;
  timestamp?: string;
}

export interface ImpactAssessment {
  population: number;
  roads: number;
  villages: number;
  hospitals: number;
  schools: number;
}

export interface Recommendation {
  role: "CITIZEN" | "GOVERNMENT" | "ROAD_AUTHORITY";
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  title: string;
  description: string;
}

export interface RiskAnalysis {
  location: Location;
  riskScore: number;
  riskLevel: RiskLevel;
  confidence: number;
  factors: RiskFactor[];
  forecast: RiskForecast[];
  impact: ImpactAssessment;
  recommendations: Recommendation[];
  timestamp: string;
}