import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PolicyLab } from '../policy/PolicyLab';
import { ScenarioComparison } from '../policy/ScenarioComparison';
import { PolicyDigitalTwin } from '../policy/PolicyDigitalTwin';
import { DecisionCenter } from '../policy/DecisionCenter';
import { ImpactMonitor } from '../impact/ImpactMonitor';
import { EarlySignalEngine } from '../impact/EarlySignalEngine';
import { IndiaIntelligenceMap } from '../map/IndiaIntelligenceMap';
import { PolicyBriefModal } from '../policy/PolicyBriefModal';
import { POLICY_SCENARIOS } from '../../data/mockDatabase';
import { PolicyScenario } from '../../types';
import { 
  BarChart2, 
  Sliders, 
  Cpu, 
  Activity, 
  MapPin, 
  FileText, 
  ArrowLeftRight, 
  ShieldCheck, 
  CheckCircle2, 
  Download,
  Layers,
  Sparkles
} from 'lucide-react';

export const PolicyMakerDashboard: React.FC = () => {
  const { session } = useAuth();
  const [activeModule, setActiveModule] = useState<'policy-lab' | 'decision-center' | 'comparison' | 'digital-twin' | 'impact-monitor' | 'geo'>('policy-lab');
  const [briefScenario, setBriefScenario] = useState<PolicyScenario | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Policy Directorate Status Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-900">
              <BarChart2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono font-bold text-purple-900 uppercase tracking-wider">
              Level 2: Institutional Access · State Land Policy Directorate
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Policy Directorate & Spatial Simulation Lab
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Director / Principal Secretary: <strong>{session.name}</strong> · Directorate of Spatial Planning & Master Land Policy
          </p>
        </div>

        <button
          onClick={() => setBriefScenario(POLICY_SCENARIOS[0])}
          className="flex items-center gap-2 px-4 py-2 bg-[#0B132B] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Generate Executive Policy Brief</span>
        </button>
      </div>

      {/* Policy Maker Module Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs border border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveModule('policy-lab')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeModule === 'policy-lab' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Policy Lab (Simulator)</span>
        </button>

        <button
          onClick={() => setActiveModule('decision-center')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeModule === 'decision-center' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Decision Center</span>
        </button>

        <button
          onClick={() => setActiveModule('comparison')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeModule === 'comparison' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Scenario Comparison</span>
        </button>

        <button
          onClick={() => setActiveModule('digital-twin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeModule === 'digital-twin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Policy Digital Twin</span>
        </button>

        <button
          onClick={() => setActiveModule('impact-monitor')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeModule === 'impact-monitor' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Impact Monitor</span>
        </button>

        <button
          onClick={() => setActiveModule('geo')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeModule === 'geo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Geo Intelligence</span>
        </button>
      </div>

      {/* Module Rendering */}
      {activeModule === 'policy-lab' && (
        <PolicyLab 
          onGenerateBrief={(scen) => setBriefScenario(scen)}
          onCompareScenarios={() => setActiveModule('comparison')}
        />
      )}

      {activeModule === 'decision-center' && (
        <DecisionCenter />
      )}

      {activeModule === 'comparison' && (
        <ScenarioComparison />
      )}

      {activeModule === 'digital-twin' && (
        <PolicyDigitalTwin />
      )}

      {activeModule === 'impact-monitor' && (
        <div className="space-y-6">
          <ImpactMonitor />
          <EarlySignalEngine />
        </div>
      )}

      {activeModule === 'geo' && (
        <IndiaIntelligenceMap />
      )}

      {/* Brief Generator Modal */}
      {briefScenario && (
        <PolicyBriefModal
          scenario={briefScenario}
          onClose={() => setBriefScenario(null)}
        />
      )}

    </div>
  );
};
