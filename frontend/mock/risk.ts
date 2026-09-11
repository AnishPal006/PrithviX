import { RiskAnalysis } from "@/types/risk";

export const mockRiskAnalysis: RiskAnalysis = {
  location: {
    id: "east-khasi-hills",
    name: "East Khasi Hills",
    state: "Meghalaya",
    latitude: 25.537,
    longitude: 91.893,
  },

  riskScore: 82,

  riskLevel: "CRITICAL",

  confidence: 94,

  factors: [
    {
      name: "Rainfall",
      contribution: 31,
      direction: "positive",
      description:
        "High cumulative rainfall is increasing soil saturation and slope instability.",
    },
    {
      name: "Slope",
      contribution: 24,
      direction: "positive",
      description:
        "Steep terrain significantly increases the probability of slope failure.",
    },
    {
      name: "Historical Events",
      contribution: 15,
      direction: "positive",
      description:
        "Previous landslide activity indicates elevated susceptibility in this region.",
    },
    {
      name: "Vegetation",
      contribution: 12,
      direction: "positive",
      description:
        "Reduced vegetation stability contributes to increased surface erosion.",
    },
    {
      name: "Soil",
      contribution: 8,
      direction: "positive",
      description:
        "Current soil conditions indicate increased moisture retention.",
    },
  ],

  forecast: [
    {
      horizon: "NOW",
      riskScore: 82,
      riskLevel: "CRITICAL",
    },
    {
      horizon: "24H",
      riskScore: 86,
      riskLevel: "CRITICAL",
    },
    {
      horizon: "48H",
      riskScore: 79,
      riskLevel: "CRITICAL",
    },
    {
      horizon: "72H",
      riskScore: 61,
      riskLevel: "HIGH",
    },
  ],

  impact: {
    population: 24850,
    roads: 18,
    villages: 12,
    hospitals: 3,
    schools: 21,
  },

  recommendations: [
    {
      role: "CITIZEN",
      priority: "CRITICAL",
      title: "Avoid high-risk slopes",
      description:
        "Avoid unnecessary travel near steep slopes and known landslide-prone areas.",
    },
    {
      role: "GOVERNMENT",
      priority: "CRITICAL",
      title: "Activate monitoring protocol",
      description:
        "Increase monitoring of critical slopes and prepare local response teams.",
    },
    {
      role: "ROAD_AUTHORITY",
      priority: "HIGH",
      title: "Inspect vulnerable road sections",
      description:
        "Prioritize inspection and clearance readiness for exposed road corridors.",
    },
  ],

  timestamp: new Date().toISOString(),
};