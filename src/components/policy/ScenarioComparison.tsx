import React from 'react';
import { POLICY_SCENARIOS } from '../../data/mockDatabase';
import { ArrowLeftRight, CheckCircle2, AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface ScenarioComparisonProps {
  onClose?: () => void;
  onSelectScenario?: (id: string) => void;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({ onClose, onSelectScenario }) => {
  const scenA = POLICY_SCENARIOS[0]; // High Agri Protection
  const scenB = POLICY_SCENARIOS[1]; // Transit TOD

  const metrics = [
    { label: 'Cropland Preserved', baseline: '1,510 km²', scenA: '1,420 km² (+8.2%)', scenB: '1,210 km² (-19.8%)', note: 'Scenario A maximizes high-fertility soil protection' },
    { label: 'Built-Up Expansion Permitted', baseline: '1,260 km²', scenA: '240 km²', scenB: '450 km²', note: 'Scenario B accommodates regional logistics and warehousing' },
    { label: 'Flood Risk Reduction', baseline: '0.0%', scenA: '-38.5%', scenB: '-22.0%', note: 'Scenario A enforces a strict 2.0 km riparian easement' },
    { label: 'Groundwater Recharge Index', baseline: '55.0 / 100', scenA: '78.4 / 100', scenB: '64.0 / 100', note: 'Higher green cover preserves alluvial percolation' },
    { label: 'Annual Staple Food Yield', baseline: '510k Tons', scenA: '685k Tons', scenB: '540k Tons', note: 'Sustains local cereal and vegetable supply' },
    { label: 'Economic Productivity Score', baseline: '62.0 / 100', scenA: '74.2 / 100', scenB: '89.5 / 100', note: 'Scenario B accelerates freight and industrial logistics' },
    { label: 'Agrarian Displacement Risk', baseline: '45.0 / 100', scenA: '18.0 / 100', scenB: '34.0 / 100', note: 'Scenario A minimizes smallholder tenancy disruption' },
    { label: 'Uncertainty Interval', baseline: '±0.0%', scenA: '±6.2%', scenB: '±8.5%', note: 'Based on multi-year remote sensing variance' }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-blue-900" />
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Scenario Comparison Matrix: Counterfactual Policy Trade-Offs
            </h3>
            <p className="text-xs text-slate-500">
              Multi-criteria evaluation for Patna Metropolitan & Bihta Regional Planning
            </p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Non-Partisan Integrity Warning */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 mb-5 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block">Decision Neutrality Principle:</span>
          <span>
            BHUMI-NEXUS does not declare any scenario universally "optimal." Land governance involves unavoidable political and social trade-offs between agricultural food security and industrial transit expansion.
          </span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg mb-5">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <th className="p-3 font-semibold">Evaluation Indicator</th>
              <th className="p-3 font-semibold text-slate-500">2026 Baseline</th>
              <th className="p-3 font-semibold text-emerald-800 bg-emerald-50/50">
                Scenario A: Agri Preservation
              </th>
              <th className="p-3 font-semibold text-blue-800 bg-blue-50/50">
                Scenario B: Transit TOD Nodes
              </th>
              <th className="p-3 font-semibold text-slate-500">Governing Dynamic</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {metrics.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-medium text-slate-900">{row.label}</td>
                <td className="p-3 font-mono text-slate-500 tabular-nums">{row.baseline}</td>
                <td className="p-3 font-mono font-semibold text-emerald-900 bg-emerald-50/20 tabular-nums">
                  {row.scenA}
                </td>
                <td className="p-3 font-mono font-semibold text-blue-900 bg-blue-50/20 tabular-nums">
                  {row.scenB}
                </td>
                <td className="p-3 text-[11px] text-slate-500">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trade-off Decision Insight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-lg">
          <h4 className="font-semibold text-xs text-emerald-900 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Scenario A Strategic Merit:</span>
          </h4>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            Prioritizes inter-generational food sovereignty and riverine flood defense. Requisite policy tools: Section 143 conversion moratorium, agricultural TDR credits, and strict drone surveillance on floodplains.
          </p>
        </div>

        <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-xs text-blue-900 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Scenario B Strategic Merit:</span>
          </h4>
          <p className="text-[11px] text-blue-800 leading-relaxed">
            Optimizes state logistics competitiveness and freight corridor synergy. Requisite policy tools: Multi-storey compact warehousing mandates, centralized water injection wells, and structured job skilling for agrarian displaced youth.
          </p>
        </div>
      </div>
    </div>
  );
};
