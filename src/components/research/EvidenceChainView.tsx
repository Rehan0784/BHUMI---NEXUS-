import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Database, 
  MapPin, 
  Activity, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  ShieldCheck
} from 'lucide-react';

export const EvidenceChainView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      type: 'AI INSIGHT',
      title: 'Peri-Urban Alluvial Cropland Loss',
      icon: Sparkles,
      color: 'border-blue-900 bg-blue-50/70 text-blue-900',
      summary: '14.8% net conversion of high-fertility multi-crop soil across the Patna-Bihta corridor from 2018 to 2026.',
      details: 'Synthesized inference generated through multi-sensor cross-validation and verified cadastral mutation logs with 94% statistical confidence.',
      provenance: 'BHUMI-NEXUS Evidence Fusion Engine'
    },
    {
      type: 'RESEARCH PAPER',
      title: 'Mishra et al. 2025 (JILSSE)',
      icon: BookOpen,
      color: 'border-purple-800 bg-purple-50/70 text-purple-900',
      summary: 'Peer-reviewed econometric study on land fragmentation along arterial expressways in Bihar.',
      details: 'Sample size: 14,000 hectares across 8 peri-urban blocks. Documents a 4.8x land value spike inducing smallholder distress sales.',
      provenance: 'DOI: 10.1016/j.jilsse.2025.10482 · 47 Citations'
    },
    {
      type: 'SOURCED DATASET',
      title: 'NRSC Bhuvan LULC (10m Multispectral)',
      icon: Database,
      color: 'border-emerald-800 bg-emerald-50/70 text-emerald-900',
      summary: 'ISRO verified multi-temporal Sentinel-2 and Resourcesat-2 LISS-IV classified layers.',
      details: 'Cross-validated against drone orthophotos with 98.4% completeness score and 97/100 Data Health Score.',
      provenance: 'National Remote Sensing Centre (ISRO) · June 2026 Release'
    },
    {
      type: 'GEOGRAPHIC REGION',
      title: 'Patna District & Bihta Radial Corridor',
      icon: MapPin,
      color: 'border-amber-800 bg-amber-50/70 text-amber-900',
      summary: 'Census 2021 & Master Plan 2031 statutory jurisdiction (3,202 km²).',
      details: 'Intersection of River Ganga, River Son, NH-922, and the new Bihta Civil Enclave multimodal spur.',
      provenance: 'Survey of India & Urban Development Dept., Bihar'
    },
    {
      type: 'MONITORED INDICATOR',
      title: 'Prime Cropland Conversion Rate',
      icon: Activity,
      color: 'border-rose-800 bg-rose-50/70 text-rose-900',
      summary: 'Quarterly conversion exceeding baseline target (412 ha actual vs 250 ha target).',
      details: 'Generates automated Critical Alert on district collectorate dashboard under Section 143 surveillance rules.',
      provenance: 'DILRMP Transactional Mutation Telemetry'
    },
    {
      type: 'STATUTORY POLICY',
      title: 'Agri Preservation Ordinance 2024',
      icon: Sliders,
      color: 'border-indigo-800 bg-indigo-50/70 text-indigo-900',
      summary: 'Gazetted statutory framework mandating 2km riparian buffer and Section 143 restrictions.',
      details: 'Empowers District Revenue Collectorates to freeze unapproved layout mutations and mandate compensatory green afforestation.',
      provenance: 'Bihar Gazette (Ordinance No. 04/2024)'
    }
  ];

  const activeStepData = steps[activeStep];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <h3 className="font-bold text-base text-slate-900">
            The Evidence Chain: End-to-End Provenance Architecture
          </h3>
        </div>
        <p className="text-xs text-slate-500">
          Inspect the rigorous verification chain behind every AI insight — from raw satellite datasets to peer citations and gazetted policies.
        </p>
      </div>

      {/* Chain Flow Visualization Bar */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {steps.map((step, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer relative ${
                isSelected 
                  ? 'border-blue-900 bg-blue-50/80 shadow-xs ring-1 ring-blue-900' 
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-slate-400 font-bold">
                  0{idx + 1}
                </span>
                <step.icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-900' : 'text-slate-400'}`} />
              </div>
              <span className="text-[10px] font-mono font-semibold block uppercase tracking-wider text-slate-500 mb-0.5">
                {step.type}
              </span>
              <span className="text-xs font-semibold text-slate-900 block truncate">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Step Deep Dive Inspector */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <activeStepData.icon className="w-5 h-5 text-blue-900" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 font-bold">
                Step 0{activeStep + 1} · {activeStepData.type}
              </span>
              <h4 className="text-base font-bold text-slate-900">
                {activeStepData.title}
              </h4>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
            Provenance Verified
          </span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed mb-3">
          {activeStepData.summary}
        </p>

        <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 mb-3">
          <span className="font-semibold text-slate-800 block mb-0.5">Methodology & Substantiation:</span>
          <span>{activeStepData.details}</span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
          <span>Authority / Source: <strong className="text-slate-800">{activeStepData.provenance}</strong></span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="text-slate-600 hover:text-slate-900 text-xs cursor-pointer font-medium"
            >
              ← Previous
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveStep(prev => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="text-blue-900 hover:text-blue-700 text-xs cursor-pointer font-medium"
            >
              Next Link →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
