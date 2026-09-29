import React, { useState } from 'react';
import { POLICY_SCENARIOS, PILOT_REGIONS } from '../../data/mockDatabase';
import { PolicyBriefModal } from './PolicyBriefModal';
import { PolicyScenario } from '../../types';
import { 
  Cpu, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  MapPin, 
  BarChart2, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const DecisionCenter: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<PolicyScenario>(POLICY_SCENARIOS[0]);
  const [showBriefModal, setShowBriefModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
              <Cpu className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Decision Center: Evidence Synthesis & Executive Clearance
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Actionable intelligence digests supporting administrative decisions without replacing human statutory authority.
          </p>
        </div>

        <button
          onClick={() => setShowBriefModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Generate Official Policy Brief</span>
        </button>
      </div>

      {/* Decision Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Executive Synthesis (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Executive Evidence Summary Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-900" />
              <span>Grounded Executive Summary</span>
            </h3>

            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              Satellite remote sensing (NRSC) indicates a net conversion of <strong>230 km²</strong> of prime double-cropped Gangetic cropland across Patna District since 2018. Transit development along the Bihta Expressway has escalated land transaction values by <strong>4.8x</strong>, causing a speculative holdout rate of <strong>28%</strong> on idle converted parcels. Concurrently, unconfined aquifer recharge has dropped <strong>19%</strong> in built infill zones.
            </p>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-950">
              <strong className="block mb-1">Recommended Policy Direction:</strong>
              <span>
                Adopt <strong>Scenario A</strong> (High Agricultural Protection & Riparian Buffer) with statutory Transferable Development Rights (TDR) for peri-urban farmers, while channeling commercial warehousing into brownfield industrial nodes.
              </span>
            </div>
          </div>

          {/* Key Regional Indicators Table */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-slate-600" />
              <span>Regional Indicators & Vulnerability Spectrum</span>
            </h3>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-2.5 font-semibold">District</th>
                    <th className="p-2.5 font-semibold">Cropland %</th>
                    <th className="p-2.5 font-semibold">Built-Up %</th>
                    <th className="p-2.5 font-semibold">Flood Risk</th>
                    <th className="p-2.5 font-semibold">Composite Stress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PILOT_REGIONS.slice(0, 5).map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-medium text-slate-900">{r.name}</td>
                      <td className="p-2.5 font-mono text-emerald-800 tabular-nums">{r.croplandShare}%</td>
                      <td className="p-2.5 font-mono text-amber-800 tabular-nums">{r.urbanShare}%</td>
                      <td className="p-2.5 text-blue-800">{r.riskLevel}</td>
                      <td className="p-2.5 font-mono font-semibold text-slate-800 tabular-nums">{r.riskScore}/100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Scenario Review & Trade-Offs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Active Scenario Parameters</span>
            </h3>

            <div className="space-y-2">
              {POLICY_SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => setActiveScenario(scen)}
                  className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    activeScenario.id === scen.id
                      ? 'border-blue-900 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{scen.name}</span>
                    <span className="text-[10px] font-mono text-blue-900 bg-blue-100 px-1.5 py-0.5 rounded">
                      {scen.horizonYears} yr
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-600">
                    <span>Agri: {scen.agriculturalProtectionStrictness}%</span>
                    <span>·</span>
                    <span>Buffer: {scen.greenBufferMandateKm} km</span>
                    <span>·</span>
                    <span>Saved: {scen.simulatedOutcomes.croplandPreservedKm2} km²</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-900 mb-2">
                Mandatory Monitoring KPIs:
              </h4>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Prime Cropland conversion ceiling &lt; 250 ha/quarter</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>500m Riparian building moratorium compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Cadastral RoR mutation latency &lt; 21 working days</span>
                </li>
              </ul>
            </div>

            <div className="pt-3">
              <button
                onClick={() => setShowBriefModal(true)}
                className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Export Formal 11-Section Brief</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Brief Modal */}
      {showBriefModal && (
        <PolicyBriefModal
          scenario={activeScenario}
          onClose={() => setShowBriefModal(false)}
        />
      )}
    </div>
  );
};
