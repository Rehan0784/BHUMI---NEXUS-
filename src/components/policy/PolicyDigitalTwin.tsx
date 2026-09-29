import React, { useState } from 'react';
import { Layers, Users, Building, Trees, Sliders, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

export const PolicyDigitalTwin: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<'land' | 'people' | 'infrastructure' | 'environment' | 'policy'>('land');

  const pillars = [
    {
      id: 'land',
      title: 'Land Systems',
      icon: Layers,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      headline: 'Cadastral & Agro-Ecological Foundation',
      metrics: [
        { label: 'Total Agricultural Base', value: '48.6% (1,510 km²)', trend: '-14.8% since 2018' },
        { label: 'Cadastral RoR Records', value: '44,210 Parcels', trend: '94.2% Digitized' },
        { label: 'Soil Organic Carbon', value: '0.62% Silty Loam', trend: 'High Fertility' }
      ],
      description: 'Represents physical parcel geometry, agricultural double-cropping suitability, and land ownership status derived from Bihar Bhumi and ISRO NRSC satellite layers.'
    },
    {
      id: 'people',
      title: 'Human Systems',
      icon: Users,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      headline: 'Demography, Livelihoods & Tenancy',
      metrics: [
        { label: 'District Population', value: '5.84 Million', trend: '+18.4% Urbanizing' },
        { label: 'Agrarian Workforce', value: '42.8% of Total', trend: 'Smallholder Majority' },
        { label: 'Displacement Vulnerability', value: '18 / 100 Index', trend: 'Managed Tier' }
      ],
      description: 'Models population density pressures, agricultural wage labor dependency, peri-urban migration corridors, and smallholder tenancy stability.'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      icon: Building,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      headline: 'Transit Logistics & Built Assets',
      metrics: [
        { label: 'Bihta Elevated Corridor', value: '21.5 km (6-Lane)', trend: '-55% Travel Time' },
        { label: 'Dedicated Freight Corridor', value: 'Sone River Spur', trend: 'Logistics Node' },
        { label: 'Land Value Escalation', value: '4.8x Multiple', trend: 'Transit Premium' }
      ],
      description: 'Captures high-speed expressways, multi-modal logistics hubs, industrial corridors, and drainage infrastructure stimulating speculative conversion.'
    },
    {
      id: 'environment',
      title: 'Environment & Climate',
      icon: Trees,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      headline: 'Hydrology, Aquifers & Flood Envelopes',
      metrics: [
        { label: '1-in-25-Yr Flood Envelope', value: '42 Violations', trend: 'Riparian Stress' },
        { label: 'Aquifer Recharge Rate', value: '-19% in Infill', trend: 'Piezometric Drop' },
        { label: 'Ganga Green Buffer', value: '2.0 km Proposed', trend: 'Easement Zone' }
      ],
      description: 'Integrates hydrodynamic flood inundation lines, alluvial aquifer percolation rates, and climate hazard exposure along the Middle Gangetic plain.'
    },
    {
      id: 'policy',
      title: 'Policy & Regulatory Rules',
      icon: Sliders,
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      headline: 'Statutory Zoning & Conversion Enactments',
      metrics: [
        { label: 'Section 143 Moratorium', value: 'Prime Cropland', trend: 'Enacted' },
        { label: 'Transferable Dev Rights', value: 'TDR Mechanism', trend: 'In Drafting' },
        { label: 'Automated Cadastral Flag', value: 'Instant Rejection', trend: 'Active in RoR' }
      ],
      description: 'The regulatory control levers: master planning zoning restrictions, green belt covenants, transferable development rights, and environmental buffers.'
    }
  ];

  const activePillarData = pillars.find(p => p.id === selectedPillar)!;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-5 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
            <Activity className="w-5 h-5" />
          </span>
          <h3 className="font-bold text-base text-slate-900">
            Policy Digital Twin: Coupled Human-Landscape Simulation Model
          </h3>
        </div>
        <p className="text-xs text-slate-500">
          Visualizing the feedback dynamics between Land, People, Infrastructure, Environment, and Policy rules.
        </p>
      </div>

      {/* 5-Pillar Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {pillars.map((p) => {
          const isSelected = selectedPillar === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPillar(p.id as any)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isSelected 
                  ? 'border-blue-900 bg-blue-50/70 shadow-xs' 
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <p.icon className={`w-4 h-4 ${isSelected ? 'text-blue-900' : 'text-slate-500'}`} />
                <span className="text-xs font-semibold text-slate-900">{p.title}</span>
              </div>
              <span className="text-[10px] text-slate-500 block truncate">
                {p.headline}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailed Pillar Inspector Card */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <activePillarData.icon className="w-5 h-5 text-blue-900" />
            <h4 className="text-sm font-bold text-slate-900">
              {activePillarData.headline}
            </h4>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded">
            Coupled Model Subsystem: {activePillarData.title}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {activePillarData.description}
        </p>

        {/* Pillar Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activePillarData.metrics.map((m, idx) => (
            <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 block">{m.label}</span>
              <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                {m.value}
              </span>
              <span className="text-[10px] text-blue-800 font-medium block mt-0.5">
                {m.trend}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
