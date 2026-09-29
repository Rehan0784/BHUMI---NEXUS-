import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { IndiaIntelligenceMap } from '../map/IndiaIntelligenceMap';
import { PILOT_REGIONS, SOURCED_DATASETS, IMPACT_KPIS, EARLY_SIGNALS } from '../../data/mockDatabase';
import { 
  ShieldCheck, 
  MapPin, 
  Database, 
  Activity, 
  AlertTriangle, 
  FileText, 
  Download, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  TrendingDown,
  Building
} from 'lucide-react';

interface OfficerDashboardProps {
  onOpenWhyHere: (id: string) => void;
  onOpenWhatChanged: (id: string) => void;
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({ onOpenWhyHere, onOpenWhatChanged }) => {
  const { session, addAuditLog } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'geo' | 'cadastre' | 'monitoring' | 'alerts'>('overview');

  const handleExportReport = () => {
    addAuditLog('EXPORT_DISTRICT_REGIONAL_REPORT', 'PATNA_DISTRICT_CADASTRE_LULC_2026.PDF');
    alert('District Intelligence Report exported successfully for official administrative record.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Officer Identity & Status Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider">
              Level 2: Institutional Access · Authorized Government Officer
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            District Revenue Command Center · {session.organization || 'Patna District Revenue Division'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Officer In-Charge: <strong>{session.name}</strong> ({session.designation || 'ADM Revenue'}) · Clearance: Official Cadastre & Mutation Audit
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0B132B] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Export District Intelligence Report</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs border border-slate-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            activeTab === 'overview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Overview Command Deck
        </button>
        <button
          onClick={() => setActiveTab('geo')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            activeTab === 'geo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Geo Intelligence & Corridors
        </button>
        <button
          onClick={() => setActiveTab('cadastre')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            activeTab === 'cadastre' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Cadastral Records & RoR (Restricted)
        </button>
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            activeTab === 'monitoring' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Policy Monitoring ({IMPACT_KPIS.length})
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            activeTab === 'alerts' ? 'bg-red-600 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Anomaly Alerts ({EARLY_SIGNALS.length})
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 block">Patna District Farmland</span>
              <span className="text-xl font-bold font-mono text-emerald-800 tabular-nums">
                1,510 km²
              </span>
              <span className="text-[10px] text-red-600 font-medium block mt-1">
                -14.8% net drop since 2018
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 block">Active Section 143 Curbs</span>
              <span className="text-xl font-bold font-mono text-blue-900 tabular-nums">
                184 Parcels
              </span>
              <span className="text-[10px] text-emerald-600 font-medium block mt-1">
                Under Bihta radial stay
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 block">Undisputed Mutation Time</span>
              <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                18 Days
              </span>
              <span className="text-[10px] text-emerald-600 font-medium block mt-1">
                Ahead of 21-day statutory SLA
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 block">High Flood Violations</span>
              <span className="text-xl font-bold font-mono text-red-700 tabular-nums">
                42 Structures
              </span>
              <span className="text-[10px] text-red-600 font-medium block mt-1">
                Digha-Danapur Diara zone
              </span>
            </div>
          </div>

          {/* Map Preview & Urgent Signals */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <IndiaIntelligenceMap 
                onOpenWhyHere={onOpenWhyHere}
                onOpenWhatChanged={onOpenWhatChanged}
              />
            </div>

            <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Urgent Enforcement Queue</span>
              </h3>

              <div className="space-y-3">
                {EARLY_SIGNALS.map((sig) => (
                  <div key={sig.id} className="p-3 bg-red-50/50 rounded-lg border border-red-200 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-red-900">{sig.region}</span>
                      <span className="text-[10px] font-mono font-semibold bg-red-100 text-red-800 px-1.5 py-0.2 rounded">
                        {sig.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700">{sig.signalType}: {sig.magnitude}</p>
                    <div className="pt-1 flex justify-between items-center text-[10px] text-slate-500">
                      <span>Confidence: {sig.confidence}%</span>
                      <button 
                        onClick={() => alert(`Issued official inquiry to Circle Officer (CO) for ${sig.region}.`)}
                        className="text-red-700 font-bold hover:underline cursor-pointer"
                      >
                        Dispatch CO →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Geo */}
      {activeTab === 'geo' && (
        <IndiaIntelligenceMap 
          onOpenWhyHere={onOpenWhyHere}
          onOpenWhatChanged={onOpenWhatChanged}
        />
      )}

      {/* Tab 3: Cadastre */}
      {activeTab === 'cadastre' && (
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Restricted Cadastral Register & Mutation Telemetry (Bihar Bhumi DILRMP)
              </h3>
              <p className="text-xs text-slate-500">
                Authorized Officer View: Full Record of Rights (RoR), Khatiyan plot coordinates, and mutation audit logs.
              </p>
            </div>
            <span className="flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Privileged Access Cleared</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SOURCED_DATASETS.map((ds) => (
              <div key={ds.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">{ds.agency}</span>
                <h4 className="font-bold text-slate-900">{ds.title}</h4>
                <p className="text-slate-600 text-[11px]">{ds.coverage}</p>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-mono text-emerald-800 font-semibold">Health: {ds.healthScore}%</span>
                  <button 
                    onClick={() => alert(`Accessing secure raw data for ${ds.title}... Synchronized via NIC gateway.`)}
                    className="text-blue-900 font-semibold cursor-pointer"
                  >
                    Query Raw RoR →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Monitoring */}
      {activeTab === 'monitoring' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {IMPACT_KPIS.map((kpi) => (
              <div key={kpi.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500">{kpi.policyName}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    kpi.status === 'Critical Alert' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {kpi.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{kpi.indicator}</h4>
                <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded border text-xs">
                  <div>Target: <strong className="block">{kpi.targetValue} {kpi.unit}</strong></div>
                  <div>Actual: <strong className="block">{kpi.actualValue} {kpi.unit}</strong></div>
                  <div>Deviation: <strong className="block text-red-700">+{kpi.deviationPct}%</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Alerts */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {EARLY_SIGNALS.map((sig) => (
            <div key={sig.id} className="p-5 bg-white rounded-xl border border-red-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-900">{sig.region} · {sig.signalType}</h4>
                <span className="text-xs font-mono font-semibold text-red-800 bg-red-100 px-2.5 py-0.5 rounded">
                  {sig.severity} Severity
                </span>
              </div>
              <p className="text-xs text-slate-700">{sig.magnitude}</p>
              <div className="p-3 bg-slate-50 rounded text-xs">
                <strong>Recommended Statutory Action:</strong> {sig.recommendedAction}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
