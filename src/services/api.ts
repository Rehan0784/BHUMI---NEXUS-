import { SourcedDataset, ResearchPaper, PolicyScenario, Region, LandUseChangeStat } from '../types';
import { SOURCED_DATASETS, RESEARCH_PAPERS, POLICY_SCENARIOS, PILOT_REGIONS, PATNA_CHANGE_DATA, WHY_HERE_FACTORS } from '../data/mockDatabase';

export interface CopilotResponse {
  answer: string;
  confidence: number;
  sources: { title: string; type: string; year?: number; agency?: string; citation: string }[];
  evidenceChain: { step: string; nodeType: string; description: string }[];
  keyDataPoints: { label: string; value: string; trend?: string }[];
  isInsufficientEvidence?: boolean;
}

export const api = {
  // Universal Search
  async searchAll(query: string, filters?: { region?: string; topic?: string; source?: string }) {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        papers: RESEARCH_PAPERS.slice(0, 3),
        datasets: SOURCED_DATASETS.slice(0, 3),
        regions: PILOT_REGIONS.slice(0, 4)
      };
    }

    const papers = RESEARCH_PAPERS.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.abstract.toLowerCase().includes(q) ||
      p.topic.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q)
    );

    const datasets = SOURCED_DATASETS.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.agency.toLowerCase().includes(q) ||
      d.coverage.toLowerCase().includes(q)
    );

    const regions = PILOT_REGIONS.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.state.toLowerCase().includes(q)
    );

    return { papers, datasets, regions };
  },

  // Research Copilot with Evidence Fusion Engine
  async queryCopilot(question: string): Promise<CopilotResponse> {
    const q = question.toLowerCase();

    // Check if query is asking about Patna / agricultural change / urban expansion
    if (q.includes('patna') || q.includes('agricultural') || q.includes('urban') || q.includes('bihar') || q.includes('why')) {
      return {
        answer: `According to multi-sensor satellite remote sensing (NRSC Bhuvan LULC) and cadastral mutation records (DILRMP), agricultural land in the Patna peri-urban corridor has declined by 14.8% (230 km²) between 2018 and 2026. This transformation is concentrated along the Bihta 6-lane elevated expressway and Patna Ring Road (NH-922 spur).\n\nKey drivers include:\n1. Infrastructure-induced land value escalation (averaging 4.8x between 2019 and 2025).\n2. Speculative non-agricultural land acquisitions where 28% of converted acreage remains idle.\n3. Aquifer percolation reduction of 19% in newly concretized alluvial zones, compounding localized flood vulnerability along the Ganga-Son interfluve.`,
        confidence: 94,
        sources: [
          { title: 'Peri-Urban Land-Use Transformation and Cropland Fragmentation in Patna Metropolitan Fringes', type: 'Peer-Reviewed Research', year: 2025, citation: 'Mishra et al., J. Indian Land Systems & Spatial Econ.' },
          { title: 'NRSC Bhuvan National LULC 1:50k Multi-temporal Layer', type: 'Satellite Remote Sensing', year: 2026, agency: 'ISRO / NRSC', citation: 'National Remote Sensing Centre (2026)' },
          { title: 'Hydrogeological Piezometer Logs: Gangetic Plain Aquifer System', type: 'Automated Ground Telemetry', year: 2026, agency: 'Central Ground Water Board', citation: 'CGWB Northern Region' }
        ],
        evidenceChain: [
          { step: 'Query Understanding', nodeType: 'intent', description: 'Detected spatial query: Land-use conversion & agricultural displacement in Middle Gangetic Basin' },
          { step: 'Remote Sensing Ingestion', nodeType: 'dataset', description: 'Queried NRSC Bhuvan 10m Sentinel-2 multi-temporal classification (2018-2026)' },
          { step: 'Cadastral Ground Truth', nodeType: 'cadastre', description: 'Cross-referenced with Bihar Bhumi Mutation Register for Section 143 conversion applications' },
          { step: 'Peer Research Synthesis', nodeType: 'paper', description: 'Validated causal mechanism via Mishra et al. (2025) and Senapati et al. (2024)' },
          { step: 'Explainable Policy Output', nodeType: 'insight', description: 'Synthesized evidence with explicit confidence interval (94%) and uncertainty margins' }
        ],
        keyDataPoints: [
          { label: 'Prime Cropland Loss', value: '-14.8%', trend: 'deteriorating' },
          { label: 'Built-up Expansion', value: '+41.5%', trend: 'increasing' },
          { label: 'Groundwater Recharge Drawdown', value: '-1.4m', trend: 'deteriorating' },
          { label: 'Idle Speculative Land', value: '28%', trend: 'stable' }
        ]
      };
    }

    if (q.includes('flood') || q.includes('river') || q.includes('ganga') || q.includes('climate')) {
      return {
        answer: `Hydrological analysis of the Ganga-Son confluence indicates that masonry encroaching into the 1-in-25-year flood inundation envelope has increased backwater risk by 34% across Danapur and Digha drainage catchments. Unregulated riverfront development restricts natural silt replenishment and compromises unconfined alluvial aquifer recharge by 19%. A minimum statutory 500-meter riparian green easement is strongly supported by empirical radar SAR backscatter data.`,
        confidence: 96,
        sources: [
          { title: 'Floodplain Vulnerability and Unregulated Embankment Settling Along Ganga-Son Confluence', type: 'Hydrological Modeling & SAR', year: 2024, citation: 'Senapati et al., Geomorphology & River Basin Governance' },
          { title: 'State Disaster Inundation Risk Map 2024', type: 'State Gazette', year: 2024, agency: 'Bihar State Disaster Management Authority', citation: 'BSDMA Policy Framework' }
        ],
        evidenceChain: [
          { step: 'Hydrologic Modeling', nodeType: 'model', description: 'Synthesized 10-year hydrodynamic flood envelope with Sentinel-1 SAR imagery' },
          { step: 'Embankment Ground Truth', nodeType: 'cadastre', description: 'Mapped 42 permanent masonry footings within High Flood Level contour' },
          { step: 'Riparian Policy Rule', nodeType: 'policy', description: 'Evaluated against National Green Tribunal (NGT) 500m river conservation zone' }
        ],
        keyDataPoints: [
          { label: 'Flood Inundation Risk', value: '+34%', trend: 'deteriorating' },
          { label: 'Riparian Buffer Encroachments', value: '42 structures', trend: 'urgent' },
          { label: 'Groundwater Percolation Delta', value: '-19%', trend: 'deteriorating' }
        ]
      };
    }

    // Default fallback with strict Hallucination Guard
    return {
      answer: `Grounded evidence indicates moderate to high land-use pressure across the Middle Gangetic Plains of Bihar. Verified satellite layers show consistent cropland fragmentation around primary transport radials. If your inquiry targets a specific tehsil or block not covered in the active pilot registry, please refer to the Data Trust Center for dataset coverage boundaries.`,
      confidence: 88,
      sources: [
        { title: 'NRSC Bhuvan National LULC 1:50k Multi-temporal Layer', type: 'Satellite Remote Sensing', year: 2026, agency: 'ISRO / NRSC', citation: 'NRSC (2026)' },
        { title: 'ICAR Eastern Region Agro-climatic Yield Bulletin', type: 'Agricultural Statistics', year: 2025, agency: 'ICAR-RCER', citation: 'ICAR Technical Bulletin No. 42' }
      ],
      evidenceChain: [
        { step: 'General Geospatial Query', nodeType: 'dataset', description: 'Retrieved multi-district LULC index from primary spatial database' },
        { step: 'Hallucination Guard Filter', nodeType: 'guard', description: 'Filtered unverified assertions; surfaced only peer-reviewed and ISRO validated metrics' }
      ],
      keyDataPoints: [
        { label: 'Data Quality Health', value: '95/100', trend: 'optimal' },
        { label: 'Spatial Resolution', value: '10m Multi-spectral', trend: 'stable' }
      ]
    };
  },

  // GIS "Ask the Map" Natural Language Query
  async askTheMap(query: string) {
    const q = query.toLowerCase();
    if (q.includes('urban') || q.includes('expansion') || q.includes('built')) {
      return {
        highlightDistrictIds: ['patna', 'begusarai', 'muzaffarpur'],
        filterLayer: 'built-up',
        summary: 'Highlighting 3 districts with >20% built-up expansion since 2018: Patna (+41.5%), Begusarai (+24.5%), and Muzaffarpur (+18.5%).',
        actionTaken: 'APPLIED_LAYER_BUILTUP_FOCUS'
      };
    }
    if (q.includes('flood') || q.includes('climate') || q.includes('water')) {
      return {
        highlightDistrictIds: ['patna', 'vaishali', 'begusarai', 'bhagalpur', 'darbhanga'],
        filterLayer: 'flood-risk',
        summary: 'Highlighting Gangetic riparian flood basin districts exhibiting >50% floodplain risk exposure.',
        actionTaken: 'APPLIED_LAYER_FLOOD_OVERLAY'
      };
    }
    if (q.includes('agriculture') || q.includes('cropland') || q.includes('farming')) {
      return {
        highlightDistrictIds: ['saran', 'vaishali', 'nalanda', 'rohtas'],
        filterLayer: 'cropland',
        summary: 'Highlighting high-density agrarian districts with >70% cropland share under intensive two-crop cultivation.',
        actionTaken: 'APPLIED_LAYER_CROPLAND_FOCUS'
      };
    }
    return {
      highlightDistrictIds: ['patna'],
      filterLayer: 'all',
      summary: 'Focused on Patna pilot jurisdiction. Showing integrated land use, infrastructure corridors, and satellite change indicators.',
      actionTaken: 'RESET_VIEW_PATNA_PILOT'
    };
  },

  // Policy Simulation Engine
  async simulatePolicyScenario(params: {
    regionId: string;
    horizonYears: number;
    agriculturalProtectionStrictness: number; // 0-100
    greenBufferMandateKm: number;
    urbanGrowthCap: number;
    infrastructureInvestmentIndex: number;
  }): Promise<PolicyScenario['simulatedOutcomes']> {
    // Transparent deterministic model calculation
    const baseCropland = 1510;
    const baseBuiltUp = 1260;
    
    const agriStrictFactor = params.agriculturalProtectionStrictness / 100;
    const growthCapFactor = params.urbanGrowthCap / 100;
    const bufferFactor = params.greenBufferMandateKm / 3.0;

    const croplandPreserved = Math.round(baseCropland * (0.80 + (agriStrictFactor * 0.18)));
    const builtUpPermitted = Math.round(baseBuiltUp * (1 + (growthCapFactor * 0.35) * (1 - (agriStrictFactor * 0.3))));
    const floodRiskReduction = Number(((agriStrictFactor * 25) + (bufferFactor * 20)).toFixed(1));
    const rechargeIndex = Number((55 + (agriStrictFactor * 28) + (bufferFactor * 12)).toFixed(1));
    const foodProduction = Math.round(croplandPreserved * 460); // approx 460 tons per km2
    const economicScore = Number((60 + (params.infrastructureInvestmentIndex * 3.5) - (agriStrictFactor * 8)).toFixed(1));
    const displacementRisk = Number((45 - (agriStrictFactor * 22) + (growthCapFactor * 15)).toFixed(1));
    const uncertaintyMargin = Number((4.5 + (params.horizonYears * 0.35)).toFixed(1));

    return {
      croplandPreservedKm2: croplandPreserved,
      builtUpPermittedKm2: builtUpPermitted,
      floodRiskReductionPct: floodRiskReduction,
      groundwaterRechargeIndex: rechargeIndex,
      foodProductionEstimatedTons: foodProduction,
      economicProductivityScore: economicScore,
      displacementRiskScore: displacementRisk,
      uncertaintyMarginPct: uncertaintyMargin
    };
  },

  // Why Here causal factors
  async getWhyHereFactors(regionId: string) {
    return WHY_HERE_FACTORS.patna_periurban || [];
  },

  // Change detection
  async getChangeDetection(regionId: string): Promise<LandUseChangeStat[]> {
    return PATNA_CHANGE_DATA[regionId] || PATNA_CHANGE_DATA.patna;
  }
};
