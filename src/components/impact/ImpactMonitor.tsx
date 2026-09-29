import React, { useState } from 'react';
import { IMPACT_KPIS } from '../../data/mockDatabase';
import { ImpactKPI } from '../../types';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  TrendingUp, 
  ShieldCheck, 
  FileText,
  Clock,
  User,
  ArrowRight
} from 'lucide-react';

export const ImpactMonitor: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedKpi, setSelectedKpi] = useState<ImpactKPI | null>(null);

  const filteredKpis = IMPACT_KPIS.filter(k => {
    if (filterStatus === 'alerts') return k.status !== 'On Track';
    if (filterStatus === 'critical') return k.status === 'Critical Alert';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Policy Impact Monitor: Closed-Loop Governance
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            POLICY → TARGETS → ACTUAL DATA → DEVIATION → ALERTS → ADMINISTRATIVE INTERVENTION.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filterStatus === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Indicators ({IMPACT_KPIS.length})
          </button>
          <button
            onClick={() => setFilterStatus('alerts')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filterStatus === 'alerts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Deviations & Alerts (2)
          </button>
          <button
            onClick={() => setFilterStatus('critical')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filterStatus === 'critical' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Critical Only (1)
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredKpis.map((kpi) => {
          const isCritical = kpi.status === 'Critical Alert';
          const isModerate = kpi.status === 'Moderate Deviation';

          return (
            <div
              key={kpi.id}
              className={`p-5 rounded-xl bg-white border transition-all flex flex-col justify-between shadow-xs ${
                isCritical 
                  ? 'border-red-300 ring-1 ring-red-200' 
                  : isModerate 
                  ? 'border-amber-300' 
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Policy: {kpi.policyName}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    isCritical 
                      ? 'bg-red-100 text-red-800' 
                      : isModerate 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {kpi.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  {kpi.indicator}
                </h3>

                {/* Target vs Actual (Tabular Numbers) */}
                <div className="grid grid-cols-3 gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 mb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Mandated Target</span>
                    <span className="text-base font-bold font-mono text-slate-700 tabular-nums">
                      {kpi.targetValue}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{kpi.unit}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block">Actual Observed</span>
                    <span className={`text-base font-bold font-mono tabular-nums ${
                      isCritical ? 'text-red-700' : isModerate ? 'text-amber-700' : 'text-emerald-700'
                    }`}>
                      {kpi.actualValue}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{kpi.unit}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block">Deviation</span>
                    <span className={`text-base font-bold font-mono tabular-nums ${
                      kpi.deviationPct > 0 ? (isCritical ? 'text-red-700' : 'text-amber-700') : 'text-emerald-700'
                    }`}>
                      {kpi.deviationPct > 0 ? `+${kpi.deviationPct}%` : `${kpi.deviationPct}%`}
                    </span>
                    <span className="text-[10px] text-slate-400 block">from benchmark</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600 mb-3">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Jurisdiction: <strong>{kpi.responsibleOfficer}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Audit Date: {kpi.lastAuditDate} (Telemetry Ground Truthed)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] truncate max-w-[200px]">
                  Source: {kpi.sourceDataset}
                </span>
                <button
                  onClick={() => alert(`Enforcement Protocol Triggered:\nNotified ${kpi.responsibleOfficer} regarding deviation in "${kpi.indicator}". Inspection team dispatched under Section 143.`)}
                  className={`font-semibold flex items-center gap-1 cursor-pointer ${
                    isCritical ? 'text-red-700 hover:text-red-900' : 'text-blue-900 hover:text-blue-700'
                  }`}
                >
                  <span>Trigger Enforcement Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
