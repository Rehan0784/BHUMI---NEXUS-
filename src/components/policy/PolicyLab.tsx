import React, { useState } from 'react';
import { POLICY_SCENARIOS } from '../../data/mockDatabase';
import { PolicyScenario } from '../../types';
import { api } from '../../services/api';
import { 
  Sliders, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  FileText,
  Activity,
  Layers
} from 'lucide-react';

interface PolicyLabProps {
  onGenerateBrief?: (scenario: PolicyScenario) => void;
  onCompareScenarios?: () => void;
}

export const PolicyLab: React.FC<PolicyLabProps> = ({ onGenerateBrief, onCompareScenarios }) => {
  // Scenario simulation parameters
  const [horizonYears, setHorizonYears] = useState<number>(10);
  const [agriculturalProtection, setAgriculturalProtection] = useState<number>(85);
  const [greenBufferKm, setGreenBufferKm] = useState<number>(2.0);
  const [urbanGrowthCap, setUrbanGrowthCap] = useState<number>(25);
  const [infrastructureIndex, setInfrastructureIndex] = useState<number>(6);
  const [taxIncentive, setTaxIncentive] = useState<boolean>(true);

  // Active scenario outcomes
  const [outcomes, setOutcomes] = useState<PolicyScenario['simulatedOutcomes']>(
    POLICY_SCENARIOS[0].simulatedOutcomes
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const runSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await api.simulatePolicyScenario({
        regionId: 'patna',
        horizonYears,
        agriculturalProtectionStrictness: agriculturalProtection,
        greenBufferMandateKm: greenBufferKm,
        urbanGrowthCap,
        infrastructureInvestmentIndex: infrastructureIndex
      });
      setOutcomes(res);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleReset = () => {
    setHorizonYears(10);
    setAgriculturalProtection(85);
    setGreenBufferKm(2.0);
    setUrbanGrowthCap(25);
    setInfrastructureIndex(6);
    setTaxIncentive(true);
    setOutcomes(POLICY_SCENARIOS[0].simulatedOutcomes);
  };

  const currentScenarioObject: PolicyScenario = {
    id: 'custom-' + Date.now(),
    name: `Custom Simulation: ${agriculturalProtection}% Agri Strictness · ${greenBufferKm}km Buffer`,
    targetRegionId: 'patna',
    targetRegionName: 'Patna District & Bihta Corridor',
    horizonYears,
    urbanGrowthCap,
    agriculturalProtectionStrictness: agriculturalProtection,
    greenBufferMandateKm: greenBufferKm,
    infrastructureInvestmentIndex: infrastructureIndex,
    climateResilienceTaxIncentive: taxIncentive,
    simulatedOutcomes: outcomes,
    tradeOffs: [
      {
        tradeOff: 'Staple Food Security (Rice-Wheat)',
        impact: agriculturalProtection >= 70 ? 'Positive' : 'Negative',
        magnitude: `${outcomes.foodProductionEstimatedTons.toLocaleString()} metric tons preserved`,
        evidenceBacking: 'ICAR Agro-Climatic Yield Model'
      },
      {
        tradeOff: 'Commercial Warehouse Space Permitted',
        impact: urbanGrowthCap <= 30 ? 'Negative' : 'Positive',
        magnitude: `${outcomes.builtUpPermittedKm2} km² available for enterprise`,
        evidenceBacking: 'Bihar Industrial Area Development Authority (BIADA)'
      },
      {
        tradeOff: 'Riparian Flood Inundation Buffer',
        impact: greenBufferKm >= 1.5 ? 'Positive' : 'Neutral',
        magnitude: `${outcomes.floodRiskReductionPct}% hazard reduction in Danapur catchment`,
        evidenceBacking: 'NIH Hydrodynamic Model 2024'
      }
    ],
    assumptions: [
      'Digital Section 143 mutation curbs enforced at block level',
      'Continuous satellite SAR monitoring every 12 days',
      'Transferable development rights established for affected landholders'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
              <Sliders className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Policy Lab: Land Governance Simulation Engine
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Define multi-parameter land-use rules, test counterfactual scenarios, and analyze trade-offs before gazette publication.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onCompareScenarios && (
            <button
              onClick={onCompareScenarios}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 transition-colors cursor-pointer"
            >
              Compare Scenarios Side-by-Side
            </button>
          )}

          {onGenerateBrief && (
            <button
              onClick={() => onGenerateBrief(currentScenarioObject)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Generate Policy Brief</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Simulation Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Parameter Control Deck (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-sm text-slate-900">
              Scenario Control Parameters
            </h3>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Parameter 1: Agricultural Protection Strictness */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">Agricultural Protection Strictness</span>
              <span className="font-mono font-bold text-blue-900">{agriculturalProtection}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={agriculturalProtection}
              onChange={(e) => setAgriculturalProtection(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Laissez-Faire (0%)</span>
              <span>Strict Cadastral Curbs (100%)</span>
            </div>
          </div>

          {/* Parameter 2: Green Riparian Buffer Mandate */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">Ganga Riparian Buffer Width</span>
              <span className="font-mono font-bold text-blue-900">{greenBufferKm} km</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="4.0"
              step="0.5"
              value={greenBufferKm}
              onChange={(e) => setGreenBufferKm(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>500 meters (NGT min)</span>
              <span>4.0 km (Full Flood Envelope)</span>
            </div>
          </div>

          {/* Parameter 3: Urban Growth Cap */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">Peri-Urban Growth Cap</span>
              <span className="font-mono font-bold text-blue-900">+{urbanGrowthCap}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              step="5"
              value={urbanGrowthCap}
              onChange={(e) => setUrbanGrowthCap(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Compact Density (+10%)</span>
              <span>Unrestricted Sprawl (+70%)</span>
            </div>
          </div>

          {/* Parameter 4: Infrastructure Investment Index */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">Corridor Transit Investment</span>
              <span className="font-mono font-bold text-blue-900">Tier {infrastructureIndex} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={infrastructureIndex}
              onChange={(e) => setInfrastructureIndex(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Maintenance Only</span>
              <span>Rapid Multimodal Expressways</span>
            </div>
          </div>

          {/* Parameter 5: Horizon Years & Climate Tax */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Time Horizon</label>
              <select
                value={horizonYears}
                onChange={(e) => setHorizonYears(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              >
                <option value={5}>5-Year Horizon (2031)</option>
                <option value={10}>10-Year Horizon (2036)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Green Credit Incentive</label>
              <button
                type="button"
                onClick={() => setTaxIncentive(!taxIncentive)}
                className={`w-full py-1.5 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  taxIncentive ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-50 text-slate-600 border-slate-300'
                }`}
              >
                {taxIncentive ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          {/* Execute Simulation CTA */}
          <div className="pt-3">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="w-full py-2.5 px-4 bg-[#0B132B] hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>{isSimulating ? 'Recalculating Model...' : 'Execute Simulation Run'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Simulated Outcomes & Trade-Off Matrix (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Simulated Output Metrics (Tabular Numbers) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-semibold text-sm text-slate-900">
                Simulated {horizonYears}-Year Landscape Trajectory
              </h3>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Uncertainty Margin: ±{outcomes.uncertaintyMarginPct}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="text-[11px] text-emerald-800 font-medium block">Cropland Saved</span>
                <span className="text-xl font-bold font-mono text-emerald-900 tabular-nums">
                  {outcomes.croplandPreservedKm2} km²
                </span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">
                  High fertility alluvial
                </span>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <span className="text-[11px] text-amber-800 font-medium block">Permitted Built-Up</span>
                <span className="text-xl font-bold font-mono text-amber-900 tabular-nums">
                  {outcomes.builtUpPermittedKm2} km²
                </span>
                <span className="text-[10px] text-amber-700 block mt-0.5">
                  Managed density zone
                </span>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-[11px] text-blue-800 font-medium block">Flood Hazard Cut</span>
                <span className="text-xl font-bold font-mono text-blue-900 tabular-nums">
                  -{outcomes.floodRiskReductionPct}%
                </span>
                <span className="text-[10px] text-blue-700 block mt-0.5">
                  Riparian easement gain
                </span>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <span className="text-[11px] text-purple-800 font-medium block">Food Production</span>
                <span className="text-xl font-bold font-mono text-purple-900 tabular-nums">
                  {(outcomes.foodProductionEstimatedTons / 1000).toFixed(0)}k Tons
                </span>
                <span className="text-[10px] text-purple-700 block mt-0.5">
                  Annual staple crop yield
                </span>
              </div>
            </div>

            {/* Displacement & Economic Indexes */}
            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Economic Productivity Score</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">{outcomes.economicProductivityScore} / 100</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Agrarian Displacement Risk</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">{outcomes.displacementRiskScore} / 100</span>
              </div>
            </div>
          </div>

          {/* Trade-Off Analysis Deck */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-900" />
              <span>Multi-Dimensional Trade-Off Matrix</span>
            </h3>

            <div className="space-y-2.5">
              {currentScenarioObject.tradeOffs.map((trade, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`w-2 h-2 rounded-full ${
                        trade.impact === 'Positive' ? 'bg-emerald-500' :
                        trade.impact === 'Negative' ? 'bg-red-500' : 'bg-slate-400'
                      }`} />
                      <span className="text-xs font-semibold text-slate-800">
                        {trade.tradeOff}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Evidence: {trade.evidenceBacking}
                    </span>
                  </div>
                  <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded whitespace-nowrap ${
                    trade.impact === 'Positive' ? 'bg-emerald-100 text-emerald-800' :
                    trade.impact === 'Negative' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {trade.magnitude}
                  </span>
                </div>
              ))}
            </div>

            {/* Model Invariants & Transparency */}
            <div className="mt-4 p-3 bg-slate-100/70 rounded-lg text-[11px] text-slate-600">
              <span className="font-semibold block text-slate-800 mb-0.5">Model Assumptions & Limitations:</span>
              <span>
                Simulated outputs assume baseline climate trends from CMIP6 ensemble models and do not guarantee private market land transactions. Decision-makers must corroborate with field revenue ground-truthing before statutory gazetting.
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
