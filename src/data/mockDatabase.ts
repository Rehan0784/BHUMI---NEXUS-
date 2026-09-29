import { Region, SourcedDataset, ResearchPaper, LandUseChangeStat, PolicyScenario, ImpactKPI, EarlySignal, AuditLog } from '../types';

export const PILOT_REGIONS: Region[] = [
  {
    id: 'patna',
    name: 'Patna District',
    state: 'Bihar',
    code: 'BR-PAT',
    type: 'district',
    areaSqKm: 3202,
    population: 5838465,
    urbanShare: 43.1,
    croplandShare: 48.6,
    forestShare: 1.4,
    coordinates: [25.5941, 85.1376],
    riskLevel: 'High',
    riskScore: 78,
    confidence: 94,
    lastUpdated: '2026-09-15',
  },
  {
    id: 'nalanda',
    name: 'Nalanda District',
    state: 'Bihar',
    code: 'BR-NAL',
    type: 'district',
    areaSqKm: 2355,
    population: 2874523,
    urbanShare: 15.8,
    croplandShare: 72.3,
    forestShare: 2.1,
    coordinates: [25.1982, 85.5149],
    riskLevel: 'Moderate',
    riskScore: 52,
    confidence: 91,
    lastUpdated: '2026-09-10',
  },
  {
    id: 'vaishali',
    name: 'Vaishali District',
    state: 'Bihar',
    code: 'BR-VAI',
    type: 'district',
    areaSqKm: 2036,
    population: 3495058,
    urbanShare: 12.2,
    croplandShare: 76.9,
    forestShare: 0.9,
    coordinates: [25.6842, 85.2155],
    riskLevel: 'Moderate',
    riskScore: 58,
    confidence: 89,
    lastUpdated: '2026-09-12',
  },
  {
    id: 'muzaffarpur',
    name: 'Muzaffarpur District',
    state: 'Bihar',
    code: 'BR-MUZ',
    type: 'district',
    areaSqKm: 3172,
    population: 4801062,
    urbanShare: 18.5,
    croplandShare: 71.4,
    forestShare: 1.2,
    coordinates: [26.1209, 85.3647],
    riskLevel: 'High',
    riskScore: 71,
    confidence: 92,
    lastUpdated: '2026-09-14',
  },
  {
    id: 'gaya',
    name: 'Gaya District',
    state: 'Bihar',
    code: 'BR-GAY',
    type: 'district',
    areaSqKm: 4976,
    population: 4391418,
    urbanShare: 21.0,
    croplandShare: 59.2,
    forestShare: 12.6,
    coordinates: [24.7914, 85.0002],
    riskLevel: 'Moderate',
    riskScore: 49,
    confidence: 90,
    lastUpdated: '2026-09-08',
  },
  {
    id: 'bhagalpur',
    name: 'Bhagalpur District',
    state: 'Bihar',
    code: 'BR-BHA',
    type: 'district',
    areaSqKm: 2569,
    population: 3037766,
    urbanShare: 19.8,
    croplandShare: 66.5,
    forestShare: 3.4,
    coordinates: [25.2425, 86.9842],
    riskLevel: 'Moderate',
    riskScore: 56,
    confidence: 88,
    lastUpdated: '2026-09-11',
  },
  {
    id: 'saran',
    name: 'Saran District',
    state: 'Bihar',
    code: 'BR-SAR',
    type: 'district',
    areaSqKm: 2641,
    population: 3951862,
    urbanShare: 11.4,
    croplandShare: 78.1,
    forestShare: 1.1,
    coordinates: [25.7811, 84.7497],
    riskLevel: 'Moderate',
    riskScore: 46,
    confidence: 87,
    lastUpdated: '2026-09-05',
  },
  {
    id: 'rohtas',
    name: 'Rohtas District',
    state: 'Bihar',
    code: 'BR-ROH',
    type: 'district',
    areaSqKm: 3850,
    population: 2959918,
    urbanShare: 14.5,
    croplandShare: 68.3,
    forestShare: 14.1,
    coordinates: [24.9547, 84.0152],
    riskLevel: 'Low',
    riskScore: 34,
    confidence: 93,
    lastUpdated: '2026-09-02',
  }
];

export const PATNA_CHANGE_DATA: { [key: string]: LandUseChangeStat[] } = {
  patna: [
    { year: 2018, croplandKm2: 1740, builtUpKm2: 890, forestKm2: 48, waterBodiesKm2: 244, fallowKm2: 280 },
    { year: 2020, croplandKm2: 1680, builtUpKm2: 975, forestKm2: 47, waterBodiesKm2: 236, fallowKm2: 264 },
    { year: 2022, croplandKm2: 1610, builtUpKm2: 1080, forestKm2: 45, waterBodiesKm2: 228, fallowKm2: 239 },
    { year: 2024, croplandKm2: 1555, builtUpKm2: 1180, forestKm2: 44, waterBodiesKm2: 220, fallowKm2: 203 },
    { year: 2026, croplandKm2: 1510, builtUpKm2: 1260, forestKm2: 43, waterBodiesKm2: 215, fallowKm2: 174 },
  ]
};

export const SOURCED_DATASETS: SourcedDataset[] = [
  {
    id: 'ds-nrsc-lulc',
    title: 'NRSC Bhuvan National Land Use Land Cover (LULC 1:50k)',
    agency: 'National Remote Sensing Centre (ISRO)',
    frequency: 'Annual Multi-Spectral Synthesis',
    coverage: 'State-wide Bihar (38 Districts) & National',
    lastUpdated: '2026-06-30',
    confidence: 96,
    completeness: 98.4,
    healthScore: 97,
    methodology: 'Sentinel-2 & Resourcesat-2 LISS-IV classified with random forest & ground truthed via RoR benchmarks',
    limitations: 'Resolution limit in micro-parcels < 0.25 hectares; cloudy monsoon scenes gap-filled using Sentinel-1 SAR',
    isRestricted: false,
    category: 'satellite',
  },
  {
    id: 'ds-bhoomi-cadastral',
    title: 'Bihar Bhumi Records & Digital Cadastral Map Registry (RoR)',
    agency: 'Department of Revenue & Land Reforms, Govt. of Bihar',
    frequency: 'Bi-weekly Transactional Sync',
    coverage: 'Patna, Nalanda, Vaishali, Muzaffarpur, Gaya',
    lastUpdated: '2026-09-20',
    confidence: 92,
    completeness: 94.2,
    healthScore: 93,
    methodology: 'Modern Land Records Modernization Programme (DILRMP) digitized Khatiyan & mutation records',
    limitations: 'Inheritance disputes pending in 6.4% parcels; ongoing spatial reconciliation with drone survey orthophotos',
    isRestricted: true,
    category: 'cadastral',
  },
  {
    id: 'ds-cgwb-aquifer',
    title: 'Central Ground Water Board District Hydrogeological Profile',
    agency: 'Ministry of Jal Shakti / CGWB Northern Region',
    frequency: 'Quarterly Piezometer Log',
    coverage: 'Gangetic Plain Aquifer System (Patna-Bihta Corridor)',
    lastUpdated: '2026-08-15',
    confidence: 94,
    completeness: 91.0,
    healthScore: 92,
    methodology: 'Automated digital water level recorders across 142 observation stations in alluvial tracts',
    limitations: 'Sparse sensor density in southern peri-urban blocks experiencing private borewell extraction',
    isRestricted: false,
    category: 'climate',
  },
  {
    id: 'ds-nhai-corridors',
    title: 'NHAI & Bihar State Road Development Master Network (BSRDCL)',
    agency: 'National Highways Authority of India & BSRDC',
    frequency: 'Project Milestone Tracking',
    coverage: 'NH-30, Bihta Ring Expressway, DFC Sone River Alignment',
    lastUpdated: '2026-07-28',
    confidence: 97,
    completeness: 99.1,
    healthScore: 98,
    methodology: 'DGPS surveyed right-of-way corridor polygons & notification gazette records',
    limitations: 'Phase-3 feeder connector alignments currently under draft public comment stage',
    isRestricted: false,
    category: 'infrastructure',
  },
  {
    id: 'ds-icar-crop-yield',
    title: 'ICAR Eastern Region Agro-climatic Yield & Soil Health Index',
    agency: 'Indian Council of Agricultural Research (ICAR-RCER Patna)',
    frequency: 'Seasonal (Kharif / Rabi)',
    coverage: 'Middle Gangetic Plains (Zone III-A & III-B)',
    lastUpdated: '2026-05-18',
    confidence: 95,
    completeness: 93.6,
    healthScore: 94,
    methodology: 'Soil nutrient grid sampling (10ha grid) integrated with MODIS NDVI seasonal biomass tracking',
    limitations: 'Micro-nutrient tracking limited in fragmented urban fringe agricultural holdings',
    isRestricted: false,
    category: 'socioeconomic',
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-001',
    title: 'Peri-Urban Land-Use Transformation and Cropland Fragmentation in the Patna Metropolitan Fringes (2014-2024)',
    authors: ['Dr. Anand V. Mishra', 'Prof. Sunita Kumari', 'Dr. Rajesh K. Jha'],
    journal: 'Journal of Indian Land Systems & Spatial Economics',
    year: 2025,
    doi: '10.1016/j.jilsse.2025.10482',
    region: 'Patna District, Bihar',
    topic: 'Peri-Urban Cropland Conversion',
    abstract: 'Investigating satellite remote sensing and cadastral records across the Patna-Bihta and Phulwari Sharif corridors. Results indicate a 14.8% net decline in prime two-crop alluvial cropland, primarily driven by real estate speculative investments anticipating transit corridors, reducing local staple food output by 42,000 metric tons.',
    keyFindings: [
      'Built-up expansion accelerated from 3.2% p.a. (2014-2019) to 7.4% p.a. (2020-2024)',
      '68% of converted cropland was high-fertility alluvial soil with double-cropping capacity',
      'Speculative holding resulted in 24% of converted land remaining idle/fallow for over 3 years'
    ],
    citationsCount: 47,
    evidenceConfidence: 94,
    isOpenAccess: true,
    datasetIds: ['ds-nrsc-lulc', 'ds-bhoomi-cadastral']
  },
  {
    id: 'paper-002',
    title: 'Floodplain Vulnerability and Unregulated Embankment Settling Along the Ganga-Son Confluence: A 10-Year Hydrological Assessment',
    authors: ['Dr. P. Senapati', 'R. Choudhury', 'K. N. Prasad'],
    journal: 'Geomorphology and River Basin Governance',
    year: 2024,
    doi: '10.1080/grbg.2024.18942',
    region: 'Patna & Vaishali Districts',
    topic: 'Eco-Hydrological Risk',
    abstract: 'Using hydrodynamic flood modelling combined with Sentinel-1 SAR imagery during monsoons 2016-2024. Documents illegal masonry construction within the 1-in-25-year flood inundation envelope, increasing backwater risk by 34% in Danapur and Digha drainage catchments.',
    keyFindings: [
      'Inundation return period buffer has decreased due to riverfront masonry encroachment',
      'Groundwater recharge rates in the unconfined alluvial aquifer dropped by 19% in built zones',
      'Recommends an absolute 500-meter riparian green preservation easement'
    ],
    citationsCount: 62,
    evidenceConfidence: 96,
    isOpenAccess: true,
    datasetIds: ['ds-nrsc-lulc', 'ds-cgwb-aquifer']
  },
  {
    id: 'paper-003',
    title: 'Land Record Digitization (Bhoomi/DILRMP) and Dispute Resolution Latency in North & Central Bihar Courts',
    authors: ['Justice (Retd.) B. N. Roy', 'Dr. Meera Swaminathan'],
    journal: 'National Law School of India Policy Review',
    year: 2025,
    doi: '10.2139/ssrn.4819024',
    region: 'Bihar State (Patna, Muzaffarpur, Gaya)',
    topic: 'Cadastral Governance & Dispute Resolution',
    abstract: 'Empirical analysis of 14,200 revenue court petitions post-digital land record deployment. Identifies that while initial digitization increased mutation transparency, lack of spatial boundary adjudication triggered a temporary 28% spike in boundary litigation between co-sharers.',
    keyFindings: [
      'Spatial mismatch between textual Khatiyan records and drone orthophotos was root cause of 41% disputes',
      'Pre-mutation public notice windows reduced subsequent appellate disputes by 53%',
      'Integrated GIS parcel mapping is essential before full digital title guarantee can be statutory'
    ],
    citationsCount: 38,
    evidenceConfidence: 91,
    isOpenAccess: true,
    datasetIds: ['ds-bhoomi-cadastral']
  },
  {
    id: 'paper-004',
    title: 'Agro-Ecological Trade-Offs of Industrial Corridors in the Middle Gangetic Plains: Food Security vs Logistics Yield',
    authors: ['Dr. Arvind K. Singh', 'T. Raghavan', 'Prof. Nalini Thakur'],
    journal: 'Economic & Political Weekly',
    year: 2026,
    doi: '10.5132/epw.2026.0421',
    region: 'Bihar & Eastern UP Corridor',
    topic: 'Industrial Land vs Agriculture Trade-offs',
    abstract: 'Models the multiplier impact of Eastern Dedicated Freight Corridor logistics hubs against agricultural displacement. Concludes that compact vertical warehousing with strict zero-loss fertile soil protection saves 3.2x more agrarian livelihood than ribbon highway sprawl.',
    keyFindings: [
      'Compact multi-modal parks require 60% less contiguous agricultural acreage than linear corridor zoning',
      'Farmer livelihood transition requires 5-year structured skilling and co-investment equity models',
      'Compensatory farmland enrichment funds should be mandated for conversion approvals'
    ],
    citationsCount: 29,
    evidenceConfidence: 93,
    isOpenAccess: true,
    datasetIds: ['ds-nhai-corridors', 'ds-icar-crop-yield']
  }
];

export const WHY_HERE_FACTORS = {
  patna_periurban: [
    { factor: 'Infrastructure Transit Pressure', weight: '+++', score: 88, source: 'NHAI Corridor Dataset / Master Plan 2031', detail: 'Completion of 6-lane Bihta Expressway and Ring Road reduced transit travel times to the state capital by 55%, triggering a 210% increase in real estate transactions along the corridor.' },
    { factor: 'Urban Speculative Holding', weight: '+++', score: 84, source: 'Bihar Bhumi Cadastral Registry (DILRMP)', detail: 'High capital gains reinvestment from Tier-1 diaspora purchasing un-notified farmland, with 28% of bought parcels kept fallow rather than cultivated.' },
    { factor: 'Agricultural Return Disparity', weight: '++', score: 67, source: 'ICAR Eastern Region Socioeconomic Bulletin', detail: 'Net agricultural profit of ₹48,000/acre/year contrasts sharply with commercial plot sales valuations exceeding ₹85,00,000/acre in peri-urban fringes.' },
    { factor: 'Riparian & Floodplain Exposure', weight: '+', score: 45, source: 'CGWB & Ganga Basin Authority', detail: 'Encroachment in active seasonal flood inundation lines (Digha/Danapur) increasing localized runoff and reducing seasonal silt recharge.' }
  ]
};

export const POLICY_SCENARIOS: PolicyScenario[] = [
  {
    id: 'scenario-strict-agri',
    name: 'Scenario A: High Agricultural Protection & Green Riparian Easement',
    targetRegionId: 'patna',
    targetRegionName: 'Patna District',
    horizonYears: 10,
    urbanGrowthCap: 25,
    agriculturalProtectionStrictness: 85,
    greenBufferMandateKm: 2.0,
    infrastructureInvestmentIndex: 6,
    climateResilienceTaxIncentive: true,
    simulatedOutcomes: {
      croplandPreservedKm2: 1420,
      builtUpPermittedKm2: 240,
      floodRiskReductionPct: 38.5,
      groundwaterRechargeIndex: 78.4,
      foodProductionEstimatedTons: 685000,
      economicProductivityScore: 74.2,
      displacementRiskScore: 18.0,
      uncertaintyMarginPct: 6.2,
    },
    tradeOffs: [
      { tradeOff: 'Staple Cereal Output', impact: 'Positive', magnitude: '+14.2% preservation', evidenceBacking: 'ICAR Zone III-A Soil Quality Survey' },
      { tradeOff: 'Commercial Warehouse Expansion', impact: 'Negative', magnitude: '-22% development space', evidenceBacking: 'BSRDC Logistics Zone Feasibility Study' },
      { tradeOff: 'Riparian Flood Risk', impact: 'Positive', magnitude: '-38.5% inundation vulnerability', evidenceBacking: 'NIH Hydrodynamic Model 2024' },
      { tradeOff: 'Municipal Tax Revenue Growth', impact: 'Neutral', magnitude: '+2.1% (offset by land green credit)', evidenceBacking: 'Urban Finance Directorate' }
    ],
    assumptions: [
      'Strict enforcement of Section 143 conversion permissions through digital cadastral checks',
      'No building sanctions within 500m of high flood level (HFL) of River Ganga and Son',
      'Mandatory transferable development rights (TDR) for farmers in protected zones'
    ]
  },
  {
    id: 'scenario-balanced-transit',
    name: 'Scenario B: Transit-Oriented Compact Growth (TOD) & Logistics Nodes',
    targetRegionId: 'patna',
    targetRegionName: 'Patna District',
    horizonYears: 10,
    urbanGrowthCap: 50,
    agriculturalProtectionStrictness: 55,
    greenBufferMandateKm: 1.0,
    infrastructureInvestmentIndex: 9,
    climateResilienceTaxIncentive: true,
    simulatedOutcomes: {
      croplandPreservedKm2: 1210,
      builtUpPermittedKm2: 450,
      floodRiskReductionPct: 22.0,
      groundwaterRechargeIndex: 64.0,
      foodProductionEstimatedTons: 540000,
      economicProductivityScore: 89.5,
      displacementRiskScore: 34.0,
      uncertaintyMarginPct: 8.5,
    },
    tradeOffs: [
      { tradeOff: 'Industrial & Logistics Employment', impact: 'Positive', magnitude: '+44,000 formal jobs created', evidenceBacking: 'Bihar Industrial Area Development Authority (BIADA)' },
      { tradeOff: 'Prime Two-Crop Cropland Area', impact: 'Negative', magnitude: '-16.8% converted in corridor nodes', evidenceBacking: 'NRSC LULC 2024 Dataset' },
      { tradeOff: 'Transit Efficiency (Avg Commute)', impact: 'Positive', magnitude: '-28 minutes travel time', evidenceBacking: 'Patna Metropolitan Transport Master Plan' },
      { tradeOff: 'Groundwater Table Depletion', impact: 'Negative', magnitude: '-1.4m per decade drop in localized nodes', evidenceBacking: 'CGWB Piezometer Logs' }
    ],
    assumptions: [
      'High-density vertical zoning allowed strictly within 1.5km of designated expressway corridors',
      'Multi-storey warehousing mandated to economize agricultural land consumption',
      'Rainwater harvesting injection wells mandated for all plots exceeding 1000 sq. meters'
    ]
  }
];

export const IMPACT_KPIS: ImpactKPI[] = [
  {
    id: 'kpi-01',
    policyName: 'Bihar Agricultural Land Preservation Ordinance 2024',
    indicator: 'Prime Cropland Conversion Rate (Ha/Quarter)',
    targetValue: 250,
    actualValue: 412,
    unit: 'hectares/quarter',
    deviationPct: 64.8,
    status: 'Critical Alert',
    trend: 'deteriorating',
    lastAuditDate: '2026-08-30',
    responsibleOfficer: 'District Magistrate & Revenue Collector, Patna',
    sourceDataset: 'NRSC Sentinel LULC + DILRMP Mutation Audit',
  },
  {
    id: 'kpi-02',
    policyName: 'Ganga Riparian Buffer & Wetland Conservation Guideline',
    indicator: 'Eco-Sensitive Zone Construction Clearance Violations',
    targetValue: 0,
    actualValue: 14,
    unit: 'reported infractions',
    deviationPct: 100.0,
    status: 'Moderate Deviation',
    trend: 'improving',
    lastAuditDate: '2026-09-01',
    responsibleOfficer: 'Patna Urban Development & Municipal Corp (PMC)',
    sourceDataset: 'Drone Orthophoto Surveillance Layer',
  },
  {
    id: 'kpi-03',
    policyName: 'Digital Cadastral Record Mutational Reconciliation Program',
    indicator: 'Undisputed Mutation Time To Finalization',
    targetValue: 21,
    actualValue: 18,
    unit: 'working days',
    deviationPct: -14.2,
    status: 'On Track',
    trend: 'improving',
    lastAuditDate: '2026-09-18',
    responsibleOfficer: 'Director of Land Records & Surveys (DLRS)',
    sourceDataset: 'Bihar Bhumi Online Portal Telemetry',
  },
  {
    id: 'kpi-04',
    policyName: 'Industrial Land Bank & Brownfield Redevelopment Strategy',
    indicator: 'Fallow / Unutilized Industrial Plot Recirculation',
    targetValue: 70,
    actualValue: 68.4,
    unit: 'percentage reallocated',
    deviationPct: -2.3,
    status: 'On Track',
    trend: 'stable',
    lastAuditDate: '2026-08-15',
    responsibleOfficer: 'BIADA Managing Director',
    sourceDataset: 'BIADA Spatial Land Asset Register',
  }
];

export const EARLY_SIGNALS: EarlySignal[] = [
  {
    id: 'sig-01',
    region: 'Bihta-Naubatpur Belt (Patna Peri-Urban)',
    signalType: 'Rapid Built-up Expansion',
    severity: 'Critical',
    detectedDate: '2026-09-22',
    magnitude: '+240% above 5-year moving baseline',
    baselinePeriod: '2019-2023 Average',
    currentPeriod: 'Q1-Q3 2026 Remote Sensing Synthesis',
    contributingFactors: [
      'Expressway spur road completion connecting to NH-922',
      'Informal subdivision of ancestral khesra parcels prior to zoning gazette',
      'Borewell drilling requests increased 3.1x in agricultural panchayats'
    ],
    recommendedAction: 'Issue immediate Section 144 stay on unapproved layout subdivisions; mandate cadastral boundary validation before electricity energization.',
    confidence: 96
  },
  {
    id: 'sig-02',
    region: 'Digha-Danapur Diara Belt (River Ganga Banks)',
    signalType: 'Floodplain Encroachment',
    severity: 'Urgent',
    detectedDate: '2026-09-14',
    magnitude: '42 permanent concrete footings within High Flood Level zone',
    baselinePeriod: 'Monsoon 2021 Embankment Survey',
    currentPeriod: 'September 2026 Post-Monsoon Receding Water Survey',
    contributingFactors: [
      'Low flood level in preceding summer months encouraged seasonal land squatting',
      'Misuse of agricultural temporary lease for permanent commercial banqueting'
    ],
    recommendedAction: 'Coordinate joint demolition eviction drive with Water Resources Department and Patna District Police.',
    confidence: 92
  },
  {
    id: 'sig-03',
    region: 'Nalanda South Agrarian Plain (Hilsa Block)',
    signalType: 'Aquifer Stress',
    severity: 'Warning',
    detectedDate: '2026-08-28',
    magnitude: 'Water table lowered 1.8 meters below seasonal historical norm',
    baselinePeriod: 'CGWB 10-Year Autumn Piezometer Index',
    currentPeriod: 'August 2026 Automated Telemetry Log',
    contributingFactors: [
      'Prolonged dry dry-spell between August rain spells',
      'Conversion of traditional ahar-pyne community irrigation channels into paved paths'
    ],
    recommendedAction: 'Trigger MGNREGA ahar-pyne desiltation priority works; restrict deep commercial boring.',
    confidence: 89
  }
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'aud-101', timestamp: '2026-09-28 21:14:02', user: 'officer.patna@bihar.gov.in', role: 'OFFICER', action: 'EXPORT_DISTRICT_REGIONAL_REPORT', resource: 'PATNA_DISTRICT_CADASTRE_LULC_2026.PDF', ipAddress: '10.14.82.9', status: 'SUCCESS' },
  { id: 'aud-102', timestamp: '2026-09-28 20:45:18', user: 'policymaker.director@state.gov.in', role: 'POLICY_MAKER', action: 'SIMULATION_SCENARIO_EXECUTE', resource: 'SCENARIO_TRANSIT_ORIENTED_GROWTH_v3', ipAddress: '10.14.82.14', status: 'SUCCESS' },
  { id: 'aud-103', timestamp: '2026-09-28 19:30:45', user: 'anon.citizen@public', role: 'PUBLIC', action: 'PUBLIC_EXPLORE_MAP_QUERY', resource: 'BIHAR_LULC_PUBLIC_LAYER', ipAddress: '157.38.12.8', status: 'SUCCESS' },
  { id: 'aud-104', timestamp: '2026-09-28 18:22:10', user: 'unauthenticated.crawler@ip', role: 'PUBLIC', action: 'ACCESS_RESTRICTED_DATASET_CADASTRE', resource: '/api/cadastral/restricted/ROR_RAW_PNC', ipAddress: '194.26.29.4', status: 'DENIED' },
  { id: 'aud-105', timestamp: '2026-09-28 17:05:44', user: 'researcher.jha@iitp.ac.in', role: 'RESEARCHER', action: 'COPILOT_EVIDENCE_CHAIN_EXTRACT', resource: 'PERI_URBAN_PATNA_QUERY_001', ipAddress: '14.139.214.2', status: 'SUCCESS' },
];

export const INITIAL_RESEARCH_PROJECTS = [
  {
    id: 'proj-01',
    title: 'Ganga-Son Interfluve Land Conversion & Groundwater Dynamic (2018-2028)',
    updatedAt: '2026-09-24',
    papersCount: 8,
    datasetsCount: 4,
    scenariosCount: 2,
    notes: 'Focusing on the Phulwari-Bihta corridor transition and aquifer drawdown correlations.',
    tags: ['Peri-Urban', 'Alluvial Aquifer', 'Bhoomi RoR', 'Remote Sensing']
  },
  {
    id: 'proj-02',
    title: 'Comparative Analysis of DILRMP Spatial Accuracy in Gangetic Floodplains',
    updatedAt: '2026-09-20',
    papersCount: 5,
    datasetsCount: 3,
    scenariosCount: 1,
    notes: 'Benchmarking satellite radar SAR flood boundaries against digitized village maps (RoR).',
    tags: ['Cadastral', 'SAR Radar', 'Flood Risk', 'Land Rights']
  }
];
