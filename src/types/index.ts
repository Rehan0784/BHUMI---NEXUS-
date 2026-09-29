export type UserRole = 'PUBLIC' | 'OFFICER' | 'POLICY_MAKER' | 'RESEARCHER' | 'ADMIN';

export interface UserSession {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  organization?: string;
  department?: string;
  designation?: string;
  avatar?: string;
  token?: string;
  permissions: string[];
  isAnonymous?: boolean;
}

export interface Region {
  id: string;
  name: string;
  state: string;
  code: string;
  type: 'state' | 'district' | 'block';
  areaSqKm: number;
  population: number;
  urbanShare: number; // percentage
  croplandShare: number; // percentage
  forestShare: number; // percentage
  coordinates: [number, number]; // [lat, lng]
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  riskScore: number; // 0-100
  confidence: number; // percentage
  lastUpdated: string;
}

export interface LandUseChangeStat {
  year: number;
  croplandKm2: number;
  builtUpKm2: number;
  forestKm2: number;
  waterBodiesKm2: number;
  fallowKm2: number;
}

export interface SourcedDataset {
  id: string;
  title: string;
  agency: string;
  frequency: string;
  coverage: string;
  lastUpdated: string;
  confidence: number;
  completeness: number;
  healthScore: number;
  methodology: string;
  limitations: string;
  isRestricted: boolean;
  category: 'satellite' | 'cadastral' | 'socioeconomic' | 'infrastructure' | 'climate';
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  region: string;
  topic: string;
  abstract: string;
  keyFindings: string[];
  citationsCount: number;
  evidenceConfidence: number;
  isOpenAccess: boolean;
  datasetIds: string[];
}

export interface EvidenceNode {
  id: string;
  label: string;
  type: 'insight' | 'paper' | 'dataset' | 'region' | 'indicator' | 'policy' | 'infrastructure';
  description: string;
  source?: string;
  confidence?: number;
  metrics?: Record<string, string | number>;
}

export interface EvidenceLink {
  source: string;
  target: string;
  relationship: string;
  strength: 'high' | 'medium' | 'hypothetical';
}

export interface PolicyScenario {
  id: string;
  name: string;
  targetRegionId: string;
  targetRegionName: string;
  horizonYears: number; // e.g. 5, 10
  urbanGrowthCap: number; // % cap
  agriculturalProtectionStrictness: number; // 0-100
  greenBufferMandateKm: number; // buffer width in km
  infrastructureInvestmentIndex: number; // 1-10
  climateResilienceTaxIncentive: boolean;
  simulatedOutcomes: {
    croplandPreservedKm2: number;
    builtUpPermittedKm2: number;
    floodRiskReductionPct: number;
    groundwaterRechargeIndex: number;
    foodProductionEstimatedTons: number;
    economicProductivityScore: number;
    displacementRiskScore: number;
    uncertaintyMarginPct: number;
  };
  tradeOffs: {
    tradeOff: string;
    impact: 'Positive' | 'Negative' | 'Neutral';
    magnitude: string;
    evidenceBacking: string;
  }[];
  assumptions: string[];
}

export interface ImpactKPI {
  id: string;
  policyName: string;
  indicator: string;
  targetValue: number;
  actualValue: number;
  unit: string;
  deviationPct: number;
  status: 'On Track' | 'Moderate Deviation' | 'Critical Alert';
  trend: 'improving' | 'stable' | 'deteriorating';
  lastAuditDate: string;
  responsibleOfficer: string;
  sourceDataset: string;
}

export interface EarlySignal {
  id: string;
  region: string;
  signalType: 'Rapid Built-up Expansion' | 'Aquifer Stress' | 'Prime Cropland Conversion' | 'Floodplain Encroachment' | 'Dispute Cluster';
  severity: 'Warning' | 'Urgent' | 'Critical';
  detectedDate: string;
  magnitude: string;
  baselinePeriod: string;
  currentPeriod: string;
  contributingFactors: string[];
  recommendedAction: string;
  confidence: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  resource: string;
  ipAddress: string;
  status: 'SUCCESS' | 'DENIED' | 'FLAGGED';
}

export interface ResearchWorkspaceProject {
  id: string;
  title: string;
  updatedAt: string;
  papersCount: number;
  datasetsCount: number;
  scenariosCount: number;
  notes: string;
  tags: string[];
}
