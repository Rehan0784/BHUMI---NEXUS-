import React, { useState } from 'react';
import { BIHAR_DISTRICTS, GIS_OVERLAYS, GeoDistrict } from '../../data/geoData';
import { PILOT_REGIONS } from '../../data/mockDatabase';
import { 
  Layers, 
  MapPin, 
  Search, 
  Maximize2, 
  Info, 
  Calendar, 
  Eye, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  Compass,
  ArrowRight
} from 'lucide-react';

interface IndiaIntelligenceMapProps {
  onSelectDistrict?: (district: GeoDistrict) => void;
  onOpenWhyHere?: (districtId: string) => void;
  onOpenWhatChanged?: (districtId: string) => void;
  onAskMap?: (query: string) => void;
}

export const IndiaIntelligenceMap: React.FC<IndiaIntelligenceMapProps> = ({
  onSelectDistrict,
  onOpenWhyHere,
  onOpenWhatChanged,
  onAskMap
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<GeoDistrict>(BIHAR_DISTRICTS[0]); // default Patna
  const [activeLayer, setActiveLayer] = useState<'all' | 'cropland' | 'builtup' | 'flood' | 'infrastructure'>('all');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [nlQuery, setNlQuery] = useState('');
  const [highlightIds, setHighlightIds] = useState<string[]>([]);
  const [mapScale, setMapScale] = useState(1);

  const handleDistrictClick = (dist: GeoDistrict) => {
    setSelectedDistrict(dist);
    if (onSelectDistrict) onSelectDistrict(dist);
  };

  const handleAskMapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlQuery.trim()) return;
    const q = nlQuery.toLowerCase();
    if (q.includes('urban') || q.includes('expansion') || q.includes('built')) {
      setActiveLayer('builtup');
      setHighlightIds(['patna', 'begusarai', 'muzaffarpur']);
    } else if (q.includes('flood') || q.includes('ganga') || q.includes('river')) {
      setActiveLayer('flood');
      setHighlightIds(['patna', 'vaishali', 'begusarai', 'bhagalpur']);
    } else if (q.includes('agri') || q.includes('crop') || q.includes('farmer')) {
      setActiveLayer('cropland');
      setHighlightIds(['saran', 'vaishali', 'nalanda', 'rohtas']);
    } else {
      setHighlightIds(['patna']);
    }
    if (onAskMap) onAskMap(nlQuery);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Map Control Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        
        {/* Natural Language "Ask the Map" GIS Input */}
        <form onSubmit={handleAskMapSubmit} className="flex-1 min-w-[280px] max-w-md flex items-center gap-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              placeholder='Ask the Map: "Show rapid built-up growth" or "Floodplain risk"'
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-[#0B132B] hover:bg-slate-800 text-white rounded-lg text-xs font-medium cursor-pointer shrink-0"
          >
            Ask Map
          </button>
        </form>

        {/* Layer Filter Buttons */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => { setActiveLayer('all'); setHighlightIds([]); }}
            className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
              activeLayer === 'all' ? 'bg-[#0B132B] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Layers
          </button>
          <button
            onClick={() => { setActiveLayer('cropland'); setHighlightIds([]); }}
            className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
              activeLayer === 'cropland' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cropland Cover
          </button>
          <button
            onClick={() => { setActiveLayer('builtup'); setHighlightIds([]); }}
            className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
              activeLayer === 'builtup' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Built-Up Expansion
          </button>
          <button
            onClick={() => { setActiveLayer('flood'); setHighlightIds([]); }}
            className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
              activeLayer === 'flood' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Flood Inundation
          </button>
          <button
            onClick={() => { setActiveLayer('infrastructure'); setHighlightIds([]); }}
            className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
              activeLayer === 'infrastructure' ? 'bg-purple-700 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Corridors & DFC
          </button>
        </div>

        {/* Time Slider */}
        <div className="flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 font-medium">Timeline:</span>
          <div className="flex items-center gap-1">
            {[2018, 2020, 2022, 2024, 2026].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums cursor-pointer ${
                  selectedYear === yr 
                    ? 'bg-blue-900 text-white font-semibold' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map Canvas & Side Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 relative min-h-[480px]">
        
        {/* SVG GIS Canvas (Col 8) */}
        <div className="lg:col-span-8 bg-[#070D1F] relative overflow-hidden flex items-center justify-center p-4">
          
          {/* Subtle Grid Lines & Geographic Legend */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #38BDF8 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          {/* Coordinate Watermark */}
          <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400/80 bg-slate-900/60 px-2 py-1 rounded backdrop-blur-sm">
            EPSG:4326 · 25.5941° N, 85.1376° E · Middle Gangetic Basin
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className="text-[10px] text-amber-300 font-mono bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
              Pilot Jurisdiction: Bihar (Patna Centroid)
            </span>
          </div>

          {/* SVG Map Canvas */}
          <svg
            viewBox="140 80 540 360"
            className="w-full h-full max-h-[440px] drop-shadow-lg transition-transform duration-200"
          >
            <defs>
              <linearGradient id="croplandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064E3B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="builtupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#78350F" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="floodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Render District Polygons */}
            {BIHAR_DISTRICTS.map((dist) => {
              const isSelected = selectedDistrict.id === dist.id;
              const isHighlighted = highlightIds.length === 0 || highlightIds.includes(dist.id);
              
              // Dynamic Fill based on active layer
              let fill = '#1E293B'; // neutral base
              if (activeLayer === 'cropland') {
                fill = dist.croplandShare > 70 ? '#065F46' : dist.croplandShare > 55 ? '#047857' : '#0F766E';
              } else if (activeLayer === 'builtup') {
                fill = dist.builtUpShare > 30 ? '#B45309' : dist.builtUpShare > 18 ? '#D97706' : '#334155';
              } else if (activeLayer === 'flood') {
                fill = dist.floodplainRiskPct > 60 ? '#1D4ED8' : dist.floodplainRiskPct > 40 ? '#2563EB' : '#1E293B';
              } else if (isSelected) {
                fill = '#1E3A8A';
              }

              return (
                <g key={dist.id} className="cursor-pointer group" onClick={() => handleDistrictClick(dist)}>
                  <path
                    d={dist.path}
                    fill={fill}
                    fillOpacity={isHighlighted ? 0.85 : 0.25}
                    stroke={isSelected ? '#FBBF24' : isHighlighted ? '#64748B' : '#334155'}
                    strokeWidth={isSelected ? 2.5 : 1}
                    className="transition-all duration-200 hover:fill-blue-800 hover:stroke-amber-300"
                  />
                  {/* District Label */}
                  <text
                    x={dist.center[0]}
                    y={dist.center[1]}
                    fill={isSelected ? '#FDE68A' : '#F8FAFC'}
                    fontSize={dist.id === 'patna' ? '12' : '10'}
                    fontWeight={isSelected ? 'bold' : '500'}
                    textAnchor="middle"
                    className="pointer-events-none select-none drop-shadow"
                  >
                    {dist.name}
                  </text>
                  <text
                    x={dist.center[0]}
                    y={dist.center[1] + 12}
                    fill="#94A3B8"
                    fontSize="8"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                  >
                    {activeLayer === 'cropland' ? `${dist.croplandShare}% Agri` : 
                     activeLayer === 'builtup' ? `${dist.builtUpShare}% Built` : 
                     activeLayer === 'flood' ? `${dist.floodplainRiskPct}% Flood` : 
                     `Risk: ${dist.riskScore}`}
                  </text>
                </g>
              );
            })}

            {/* Hydrological Layer: River Ganga & Son */}
            {(activeLayer === 'all' || activeLayer === 'flood') && (
              <>
                <path
                  d={GIS_OVERLAYS.gangaRiverPath}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                <path
                  d={GIS_OVERLAYS.sonRiverPath}
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                {/* River Labels */}
                <text x="380" y="218" fill="#7DD3FC" fontSize="9" fontWeight="600" className="pointer-events-none">
                  River Ganga
                </text>
                <text x="250" y="320" fill="#38BDF8" fontSize="8" fontWeight="600" className="pointer-events-none">
                  River Son
                </text>
              </>
            )}

            {/* Flood Inundation Envelopes */}
            {(activeLayer === 'all' || activeLayer === 'flood') && (
              GIS_OVERLAYS.floodRiskPolygons.map((poly, idx) => (
                <path
                  key={idx}
                  d={poly}
                  fill="url(#floodGrad)"
                  stroke="#60A5FA"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              ))
            )}

            {/* Transport & Infrastructure Layer */}
            {(activeLayer === 'all' || activeLayer === 'infrastructure' || activeLayer === 'builtup') && (
              <>
                {/* NH-30 & Expressway */}
                <path
                  d={GIS_OVERLAYS.expresswayPath}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />
                {/* Dedicated Freight Corridor (DFC) */}
                <path
                  d={GIS_OVERLAYS.dfcFreightPath}
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                />
                {/* Built-up Urban Growth Clusters */}
                {GIS_OVERLAYS.builtUpClusters.map((cluster, idx) => (
                  <circle
                    key={idx}
                    cx={cluster.x}
                    cy={cluster.y}
                    r={cluster.r * (selectedYear >= 2024 ? 1.25 : 1.0)}
                    fill="#EF4444"
                    fillOpacity="0.4"
                    stroke="#F87171"
                    strokeWidth="1.2"
                  />
                ))}
              </>
            )}

            {/* Selected District Highlight Marker */}
            <circle
              cx={selectedDistrict.center[0]}
              cy={selectedDistrict.center[1] - 8}
              r="4"
              fill="#FBBF24"
              className="animate-pulse"
            />
          </svg>

          {/* Bottom GIS Legend */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 flex items-center gap-4 text-[10px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" />
              <span>Cropland</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-600 inline-block" />
              <span>Built-Up</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 inline-block" />
              <span>Waterways</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              <span>Expansion Cluster</span>
            </div>
          </div>
        </div>

        {/* Selected District Inspector & Causal Action Panel (Col 4) */}
        <div className="lg:col-span-4 p-5 bg-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  District Profile
                </span>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-900" />
                  {selectedDistrict.name} District
                </h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                selectedDistrict.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                selectedDistrict.riskLevel === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                Risk: {selectedDistrict.riskScore}/100
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Major corridor: <strong className="text-slate-800">{selectedDistrict.majorCorridor}</strong>
            </p>

            {/* Quantitative Indicator Metrics (Tabular Numbers) */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Cropland Share</span>
                <span className="text-base font-bold font-mono text-emerald-800 tabular-nums">
                  {selectedDistrict.croplandShare}%
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Built-Up Share</span>
                <span className="text-base font-bold font-mono text-amber-800 tabular-nums">
                  {selectedDistrict.builtUpShare}%
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Floodplain Exposure</span>
                <span className="text-base font-bold font-mono text-blue-800 tabular-nums">
                  {selectedDistrict.floodplainRiskPct}%
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Data Confidence</span>
                <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                  94.2%
                </span>
              </div>
            </div>

            {/* Timeline Change Note */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg mb-5 text-xs text-amber-900">
              <div className="font-semibold mb-1 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                <span>Observed 2018–{selectedYear} Dynamic:</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                {selectedDistrict.id === 'patna' 
                  ? 'Built-up infill expanded +41.5% along the Bihta-Naubatpur radial axis, converting 230 km² of prime double-cropped alluvial soil.'
                  : `Moderate urban sprawl infill along arterial state corridors with agricultural parcel fragmentation.`}
              </p>
            </div>
          </div>

          {/* Action CTAs: What Changed & Why Here */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => onOpenWhyHere && onOpenWhyHere(selectedDistrict.id)}
              className="w-full py-2 px-3 bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-medium rounded-lg flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Explain Spatial Factors ("Why Here?")</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenWhatChanged && onOpenWhatChanged(selectedDistrict.id)}
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-lg flex items-center justify-between transition-colors border border-slate-200 cursor-pointer"
            >
              <span>Satellite Change Detector (2018 vs 2024)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
