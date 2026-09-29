import React from 'react';
import { WHY_HERE_FACTORS } from '../../data/mockDatabase';
import { HelpCircle, ExternalLink, ShieldCheck, CheckCircle2, X } from 'lucide-react';

interface WhyHereProps {
  regionId?: string;
  onClose?: () => void;
  onExplorePaper?: (paperId: string) => void;
}

export const WhyHereAnalysis: React.FC<WhyHereProps> = ({ regionId = 'patna', onClose, onExplorePaper }) => {
  const factors = WHY_HERE_FACTORS.patna_periurban;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Why Here? Spatial Causal Factor Decomposition
            </h3>
            <p className="text-xs text-slate-500">
              Evidence-grounded causal attribution for Patna Peri-Urban & Bihta Corridor
            </p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Trust Notice */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2.5 mb-5">
        <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block">Integrity Constraint:</span>
          <span>
            Every factor below is derived from peer-reviewed econometric analysis and multi-source cadastral telemetry. Non-corroborated causal speculations are strictly excluded.
          </span>
        </div>
      </div>

      {/* Causal Factor Cards List */}
      <div className="space-y-3.5">
        {factors.map((item, idx) => (
          <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                  {item.weight}
                </span>
                <h4 className="text-sm font-semibold text-slate-900">
                  {item.factor}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-slate-700 tabular-nums">
                  Impact Score: {item.score}/100
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {item.detail}
            </p>

            {/* Sourced Evidence Anchor */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/80">
              <span className="flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Evidence Source: <strong className="text-slate-700">{item.source}</strong>
              </span>
              <button
                onClick={() => onExplorePaper && onExplorePaper('paper-001')}
                className="text-blue-900 hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>View Citation Chain</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Synthesis */}
      <div className="mt-5 p-4 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
        <span className="font-semibold block mb-1">Policy Inference:</span>
        <p className="text-[11px] text-amber-800 leading-relaxed">
          Highway infrastructure investment without concurrent high-fertility zoning protection creates a 1:170 valuation arbitrage that overwhelms traditional agricultural returns. Interventions must combine Transferable Development Rights (TDR) with digitized Section 143 conversion checks.
        </p>
      </div>
    </div>
  );
};
