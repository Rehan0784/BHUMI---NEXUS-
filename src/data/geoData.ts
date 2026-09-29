export interface GeoDistrict {
  id: string;
  name: string;
  code: string;
  path: string; // SVG path representation calibrated to the Bihar projection
  center: [number, number]; // [x, y] in SVG canvas coordinates (800x500)
  latLng: [number, number];
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  riskScore: number;
  croplandShare: number;
  builtUpShare: number;
  floodplainRiskPct: number;
  majorCorridor: string;
}

// 800x500 viewport calibrated representation of Bihar districts centered on Patna
export const BIHAR_DISTRICTS: GeoDistrict[] = [
  {
    id: 'patna',
    name: 'Patna',
    code: 'BR-PAT',
    path: 'M 320 220 L 440 215 L 470 240 L 440 270 L 370 275 L 310 255 Z',
    center: [390, 245],
    latLng: [25.5941, 85.1376],
    riskLevel: 'High',
    riskScore: 78,
    croplandShare: 48.6,
    builtUpShare: 43.1,
    floodplainRiskPct: 62.4,
    majorCorridor: 'NH-30 & Bihta Expressway',
  },
  {
    id: 'vaishali',
    name: 'Vaishali',
    code: 'BR-VAI',
    path: 'M 330 160 L 430 155 L 440 215 L 320 220 L 310 185 Z',
    center: [375, 185],
    latLng: [25.6842, 85.2155],
    riskLevel: 'Moderate',
    riskScore: 58,
    croplandShare: 76.9,
    builtUpShare: 12.2,
    floodplainRiskPct: 54.0,
    majorCorridor: 'Gandak River Riparian Zone',
  },
  {
    id: 'muzaffarpur',
    name: 'Muzaffarpur',
    code: 'BR-MUZ',
    path: 'M 340 100 L 440 95 L 450 155 L 330 160 Z',
    center: [390, 125],
    latLng: [26.1209, 85.3647],
    riskLevel: 'High',
    riskScore: 71,
    croplandShare: 71.4,
    builtUpShare: 18.5,
    floodplainRiskPct: 48.2,
    majorCorridor: 'NH-28 Commercial Spine',
  },
  {
    id: 'nalanda',
    name: 'Nalanda',
    code: 'BR-NAL',
    path: 'M 370 275 L 440 270 L 460 330 L 400 345 L 360 305 Z',
    center: [415, 305],
    latLng: [25.1982, 85.5149],
    riskLevel: 'Moderate',
    riskScore: 52,
    croplandShare: 72.3,
    builtUpShare: 15.8,
    floodplainRiskPct: 24.5,
    majorCorridor: 'NH-20 Heritage Corridor',
  },
  {
    id: 'gaya',
    name: 'Gaya',
    code: 'BR-GAY',
    path: 'M 310 320 L 400 345 L 390 420 L 290 410 L 280 345 Z',
    center: [340, 375],
    latLng: [24.7914, 85.0002],
    riskLevel: 'Moderate',
    riskScore: 49,
    croplandShare: 59.2,
    builtUpShare: 21.0,
    floodplainRiskPct: 18.0,
    majorCorridor: 'Grand Trunk Road / NH-19',
  },
  {
    id: 'saran',
    name: 'Saran (Chapra)',
    code: 'BR-SAR',
    path: 'M 240 170 L 320 185 L 310 255 L 230 230 Z',
    center: [275, 210],
    latLng: [25.7811, 84.7497],
    riskLevel: 'Moderate',
    riskScore: 46,
    croplandShare: 78.1,
    builtUpShare: 11.4,
    floodplainRiskPct: 58.5,
    majorCorridor: 'Ganga-Ghaghara Doab',
  },
  {
    id: 'rohtas',
    name: 'Rohtas',
    code: 'BR-ROH',
    path: 'M 160 280 L 280 290 L 280 370 L 170 380 Z',
    center: [220, 330],
    latLng: [24.9547, 84.0152],
    riskLevel: 'Low',
    riskScore: 34,
    croplandShare: 68.3,
    builtUpShare: 14.5,
    floodplainRiskPct: 12.0,
    majorCorridor: 'Sone Canal Agri Belt',
  },
  {
    id: 'bhagalpur',
    name: 'Bhagalpur',
    code: 'BR-BHA',
    path: 'M 520 220 L 630 210 L 640 280 L 530 290 Z',
    center: [580, 250],
    latLng: [25.2425, 86.9842],
    riskLevel: 'Moderate',
    riskScore: 56,
    croplandShare: 66.5,
    builtUpShare: 19.8,
    floodplainRiskPct: 65.0,
    majorCorridor: 'Vikramshila River Corridor',
  },
  {
    id: 'begusarai',
    name: 'Begusarai',
    code: 'BR-BEG',
    path: 'M 440 215 L 520 215 L 530 265 L 440 270 Z',
    center: [480, 240],
    latLng: [25.4182, 86.1272],
    riskLevel: 'High',
    riskScore: 68,
    croplandShare: 62.0,
    builtUpShare: 24.5,
    floodplainRiskPct: 70.0,
    majorCorridor: 'Barauni Industrial Refinery Hub',
  },
  {
    id: 'darbhanga',
    name: 'Darbhanga',
    code: 'BR-DAR',
    path: 'M 440 95 L 530 90 L 540 160 L 450 155 Z',
    center: [490, 125],
    latLng: [26.1542, 85.8918],
    riskLevel: 'Moderate',
    riskScore: 54,
    croplandShare: 74.0,
    builtUpShare: 15.0,
    floodplainRiskPct: 74.0,
    majorCorridor: 'Kamala-Balan Wetland Belt',
  }
];

// Specific GIS infrastructure overlays
export const GIS_OVERLAYS = {
  gangaRiverPath: 'M 180 230 C 260 225, 330 220, 390 225 C 440 230, 480 235, 540 225 C 600 215, 660 230, 720 235',
  sonRiverPath: 'M 220 380 C 260 330, 280 280, 310 240',
  expresswayPath: 'M 240 240 L 330 235 L 390 245 L 450 240 L 540 235 L 620 230',
  dfcFreightPath: 'M 160 310 L 260 305 L 370 300 L 460 305 L 560 310',
  builtUpClusters: [
    { x: 385, y: 240, r: 18, name: 'Patna Core Metropolitan', growth: '+28%' },
    { x: 345, y: 242, r: 12, name: 'Bihta Satellite Hub', growth: '+44%' },
    { x: 395, y: 130, r: 10, name: 'Muzaffarpur Urban Ring', growth: '+19%' },
    { x: 345, y: 380, r: 11, name: 'Gaya Bodh-Gaya Corridor', growth: '+16%' },
    { x: 580, y: 245, r: 12, name: 'Bhagalpur Silk City', growth: '+21%' }
  ],
  floodRiskPolygons: [
    'M 315 210 L 440 205 L 475 225 L 435 235 L 315 230 Z', // Digha - Danapur Diara active inundation
    'M 470 215 L 540 210 L 550 235 L 475 238 Z' // Mokama Tal flood basin
  ]
};

// All India Key States for national context overview
export const INDIA_STATES_DATA = [
  { id: 'BR', name: 'Bihar', pilot: true, risk: 'High', lulcStress: 78, changeRate: '+6.4% Built-up p.a.', area: '94,163 km²' },
  { id: 'UP', name: 'Uttar Pradesh', pilot: false, risk: 'Moderate', lulcStress: 64, changeRate: '+4.8% Built-up p.a.', area: '243,286 km²' },
  { id: 'WB', name: 'West Bengal', pilot: false, risk: 'High', lulcStress: 72, changeRate: '+5.1% Built-up p.a.', area: '88,752 km²' },
  { id: 'JH', name: 'Jharkhand', pilot: false, risk: 'Moderate', lulcStress: 51, changeRate: '+3.9% Built-up p.a.', area: '79,714 km²' },
  { id: 'MP', name: 'Madhya Pradesh', pilot: false, risk: 'Low', lulcStress: 38, changeRate: '+2.8% Built-up p.a.', area: '308,245 km²' },
  { id: 'MH', name: 'Maharashtra', pilot: false, risk: 'High', lulcStress: 76, changeRate: '+5.9% Built-up p.a.', area: '307,713 km²' },
  { id: 'KA', name: 'Karnataka', pilot: false, risk: 'High', lulcStress: 74, changeRate: '+6.1% Built-up p.a.', area: '191,791 km²' },
  { id: 'TN', name: 'Tamil Nadu', pilot: false, risk: 'Moderate', lulcStress: 61, changeRate: '+4.2% Built-up p.a.', area: '130,058 km²' },
  { id: 'GJ', name: 'Gujarat', pilot: false, risk: 'Moderate', lulcStress: 59, changeRate: '+4.9% Built-up p.a.', area: '196,024 km²' },
  { id: 'RJ', name: 'Rajasthan', pilot: false, risk: 'Low', lulcStress: 32, changeRate: '+2.4% Built-up p.a.', area: '342,239 km²' }
];
