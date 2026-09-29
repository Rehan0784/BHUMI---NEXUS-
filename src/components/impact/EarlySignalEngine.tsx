import React from 'react';
import { EARLY_SIGNALS } from '../../data/mockDatabase';
import { EarlySignal } from '../../types';
import { AlertCircle, AlertTriangle, ShieldAlert, CheckCircle2, ArrowRight, Eye, Radio } from 'lucide-react';

export const EarlySignalEngine: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-red-100 text-red-700 animate-pulse">
              <Radio className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Early Signal Engine: Automated Spatial Anomaly Detection
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Detects high-velocity land transformations, illegal infill, and hydrological stressors ahead of annual cadastral survey publications.
          </p>
        </div>

        <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Telemetry Cycle: Q3 2026 Sentinel-1 & 2 Synthesis
        </span>
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {EARLY_SIGNALS.map((sig) => {
          const isCritical = sig.severity === 'Critical';
          const isUrgent = sig.severity === 'Urgent';

          return (
            <div
              key={sig.id}
              className={`p-5 rounded-xl bg-white border transition-all shadow-xs ${
                isCritical 
                  ? 'border-red-300 bg-red-50/20 ring-1 ring-red-200' 
                  : isUrgent 
                  ? 'border-amber-300 bg-amber-50/20' 
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    isCritical ? 'bg-red-600 animate-ping' : isUrgent ? 'bg-amber-600' : 'bg-blue-600'
                  }`} />
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                    {sig.region}
                  </span>
                  <span className="text-slate-300">·</span>
                  <h3 className="text-sm font-bold text-slate-900">
                    {sig.signalType}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    isCritical ? 'bg-red-100 text-red-800' : isUrgent ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {sig.severity} Severity
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-700 tabular-nums">
                    Confidence: {sig.confidence}%
                  </span>
                </div>
              </div>

              {/* Anomaly Magnitude Metric Banner */}
              <div className="p-3 bg-white rounded-lg border border-slate-200 mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] text-slate-500 block">Observed Anomaly Magnitude</span>
                  <span className="text-base font-bold font-mono text-red-700 tabular-nums">
                    {sig.magnitude}
                  </span>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <div>Baseline: <span className="font-mono text-slate-700">{sig.baselinePeriod}</span></div>
                  <div>Current: <span className="font-mono text-slate-700">{sig.currentPeriod}</span></div>
                </div>
              </div>

              {/* Contributing Factors */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-800 block mb-1.5">
                  Remote Sensing & Cadastral Drivers:
                </span>
                <ul className="text-xs space-y-1 text-slate-600 list-disc list-inside">
                  {sig.contributingFactors.map((factor, idx) => (
                    <li key={idx}>{factor}</li>
                  ))}
                </ul>
              </div>

              {/* Recommended Administrative Action */}
              <div className="p-3 bg-slate-100/80 rounded-lg text-xs flex items-start justify-between gap-3">
                <div>
                  <strong className="text-slate-900 block mb-0.5">Recommended Statutory Protocol:</strong>
                  <p className="text-slate-700">{sig.recommendedAction}</p>
                </div>
                <button
                  onClick={() => alert(`Official Gazette Directive generated for "${sig.region}". Notice dispatched to Sub-Divisional Magistrate (SDM).`)}
                  className="px-3 py-1.5 bg-[#0B132B] hover:bg-slate-800 text-white rounded text-xs font-semibold shrink-0 cursor-pointer"
                >
                  Issue Directive
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
