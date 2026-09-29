import { EvidenceNode, EvidenceLink } from '../types';

export const KNOWLEDGE_GRAPH_NODES: EvidenceNode[] = [
  {
    id: 'pol-01',
    label: 'Bihar Agri Land Preservation Ordinance',
    type: 'policy',
    description: 'Mandates strict Section 143 conversion curbs on multi-crop Gangetic alluvial parcels.',
    source: 'Gazette of Bihar (Ordinance No. 04/2024)',
    confidence: 98,
    metrics: { status: 'Enacted', targetReduction: '-40% conversion' }
  },
  {
    id: 'pol-02',
    label: 'Patna Master Plan 2031 (Zoning)',
    type: 'policy',
    description: 'Statutory development plan establishing outer urban growth limits and green belt zones.',
    source: 'Urban Development & Housing Department, Bihar',
    confidence: 94,
    metrics: { horizon: '2031', coverageArea: '1,167 km²' }
  },
  {
    id: 'reg-01',
    label: 'Patna-Bihta Peri-Urban Corridor',
    type: 'region',
    description: 'Rapidly transforming rural-urban fringe along the NH-922 / Bihta Expressway corridor.',
    source: 'Census & NRSC Bhuvan Spatial Grid',
    confidence: 96,
    metrics: { builtUpGrowth: '+44% (5y)', baselineAgriShare: '68%' }
  },
  {
    id: 'reg-02',
    label: 'Digha-Danapur Ganga Floodplain',
    type: 'region',
    description: 'Active riparian seasonal inundation zone along the southern bank of River Ganga.',
    source: 'Central Water Commission / NIH',
    confidence: 95,
    metrics: { highFloodElevation: '50.2m MSL', encroachmentCount: '42 structures' }
  },
  {
    id: 'infra-01',
    label: 'Bihta 6-Lane Elevated Expressway',
    type: 'infrastructure',
    description: 'High-speed transit spine connecting Patna ring road with the new Bihta Civil Enclave.',
    source: 'NHAI Project Registry',
    confidence: 97,
    metrics: { length: '21.5 km', travelTimeDelta: '-55%' }
  },
  {
    id: 'lu-01',
    label: 'Two-Crop Prime Alluvial Cropland',
    type: 'indicator',
    description: 'High fertility silty-loam soil sustaining paddy-wheat rotation and local vegetables.',
    source: 'ICAR Eastern Regional Centre',
    confidence: 95,
    metrics: { soilOrganicCarbon: '0.62%', stapleYieldTons: '4.8 t/ha' }
  },
  {
    id: 'clim-01',
    label: 'Unconfined Alluvial Aquifer Recharge',
    type: 'indicator',
    description: 'Piezometric subsurface aquifer supplying drinking and irrigation water across Gangetic plain.',
    source: 'Central Ground Water Board (CGWB)',
    confidence: 92,
    metrics: { rechargeDrop: '-19% in built zones', seasonalFluctuation: '3.2m' }
  },
  {
    id: 'econ-01',
    label: 'Speculative Peri-Urban Land Valuation',
    type: 'indicator',
    description: 'Market value escalation driven by infrastructure announcement vs agricultural capitalization.',
    source: 'Dept of Registration & Stamps, Bihar',
    confidence: 91,
    metrics: { priceEscalation: '4.8x in 6 years', agriculturalRentRatio: '1:170' }
  },
  {
    id: 'pap-01',
    label: 'Mishra et al. 2025 (JILSSE)',
    type: 'paper',
    description: 'Empirical remote sensing & cadastral evidence on Patna cropland fragmentation.',
    source: 'Journal of Indian Land Systems & Spatial Economics',
    confidence: 94,
    metrics: { citations: 47, sampleSize: '14,000 ha' }
  },
  {
    id: 'pap-02',
    label: 'Senapati et al. 2024 (GRBG)',
    type: 'paper',
    description: 'SAR hydrodynamic inundation analysis of Ganga-Son confluence masonry infill.',
    source: 'Geomorphology and River Basin Governance',
    confidence: 96,
    metrics: { citations: 62, method: 'Sentinel-1 SAR' }
  },
  {
    id: 'ds-01',
    label: 'NRSC Bhuvan LULC 1:50k',
    type: 'dataset',
    description: 'Multi-temporal satellite land-use classification by ISRO with verified accuracy.',
    source: 'National Remote Sensing Centre',
    confidence: 97,
    metrics: { resolution: '10m', healthScore: '97/100' }
  },
  {
    id: 'ds-02',
    label: 'Bihar Bhumi Cadastral RoR',
    type: 'dataset',
    description: 'Digitized Record of Rights, plot boundaries (khesra), and mutation logs.',
    source: 'Govt of Bihar Revenue Dept',
    confidence: 92,
    metrics: { digitizedVillages: '44,000+', healthScore: '93/100' }
  }
];

export const KNOWLEDGE_GRAPH_LINKS: EvidenceLink[] = [
  { source: 'infra-01', target: 'reg-01', relationship: 'bisects_and_stimulates', strength: 'high' },
  { source: 'reg-01', target: 'econ-01', relationship: 'triggers_spike_in', strength: 'high' },
  { source: 'econ-01', target: 'lu-01', relationship: 'pressures_conversion_of', strength: 'high' },
  { source: 'lu-01', target: 'clim-01', relationship: 'reduces_percolation_to', strength: 'high' },
  { source: 'pap-01', target: 'lu-01', relationship: 'documents_net_loss_of', strength: 'high' },
  { source: 'pap-01', target: 'ds-01', relationship: 'sourced_from', strength: 'high' },
  { source: 'pap-01', target: 'ds-02', relationship: 'cross_referenced_with', strength: 'high' },
  { source: 'pol-01', target: 'lu-01', relationship: 'legally_protects', strength: 'high' },
  { source: 'pol-02', target: 'reg-01', relationship: 'designates_zoning_for', strength: 'medium' },
  { source: 'reg-02', target: 'pap-02', relationship: 'empirically_studied_in', strength: 'high' },
  { source: 'pap-02', target: 'clim-01', relationship: 'quantifies_backwater_risk_to', strength: 'high' },
  { source: 'pol-01', target: 'reg-01', relationship: 'enforcement_boundary_covers', strength: 'high' }
];
