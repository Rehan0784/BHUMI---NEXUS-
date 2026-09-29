import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RealisticWorldMap } from '../map/RealisticWorldMap';
import { WhatChangedComparison } from '../map/WhatChangedComparison';
import { WhyHereAnalysis } from '../map/WhyHereAnalysis';
import { PILOT_REGIONS, RESEARCH_PAPERS, SOURCED_DATASETS, EARLY_SIGNALS } from '../../data/mockDatabase';
import { Logo } from '../layout/Logo';
import { 
  Search, 
  MapPin, 
  Compass, 
  Sliders, 
  Activity, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Database, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Building,
  GraduationCap
} from 'lucide-react';

interface HomeViewProps {
  onOpenLogin: (type: 'institutional' | 'researcher') => void;
  onOpenWhyHere: (regionId: string) => void;
  onOpenWhatChanged: (regionId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenLogin, onOpenWhyHere, onOpenWhatChanged }) => {
  const { setActiveView, switchDemoRole } = useAuth();
  const [universalQuery, setUniversalQuery] = useState('');
  const [showWhatChangedTeaser, setShowWhatChangedTeaser] = useState(false);
  const [showWhyHereTeaser, setShowWhyHereTeaser] = useState(false);

  const sampleQueries = [
    'Why is agricultural land changing around Patna?',
    'Show urban expansion in Bihar.',
    'Find research on land-use change.',
    'Compare land-use trends.',
    'What changed in this district?',
    'Show climate-risk indicators.'
  ];

  const handleUniversalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!universalQuery.trim()) {
      setActiveView('public-explorer');
      return;
    }
    // Navigate to explorer with query
    setActiveView('public-explorer');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B132B] text-white pt-16 pb-20 border-b border-slate-800">
        
        {/* Subtle geospatial grid background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #38BDF8 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl space-y-6">
            
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart India Hackathon 2026 · PS 26019 Architecture</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight text-balance">
              BHUMI-NEXUS
            </h1>

            {/* Sub-headline */}
            <h2 className="text-xl sm:text-2xl font-medium text-slate-200 tracking-tight">
              Evidence-to-Policy Intelligence for Land Governance
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              From fragmented evidence to smarter land governance. Discover empirical findings, understand coupled human-landscape dynamics, explore counterfactual scenarios, and monitor real-world impact.
            </p>

            {/* 3-Level Access CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveView('public-explorer')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-lg hover:shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Public Data</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenLogin('institutional')}
                className="px-5 py-3 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm rounded-lg border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Building className="w-4 h-4 text-blue-400" />
                <span>Institutional Login</span>
              </button>

              <button
                onClick={() => onOpenLogin('researcher')}
                className="px-5 py-3 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm rounded-lg border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Researcher Login</span>
              </button>
            </div>

            {/* Non-Intrusive Quick Note for Citizens */}
            <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Public Access: No account, username, or password required for citizens & students.</span>
            </div>

          </div>

          {/* Sourced Satellite Backdrop Card Preview */}
          <div className="mt-12 p-3 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur-md shadow-2xl">
            <div className="relative rounded-xl overflow-hidden aspect-21/9 max-h-72 w-full bg-slate-950 flex items-center justify-center">
              <img
                src="/src/assets/images/bhumi_satellite_land_cover_1790660498711.jpg"
                alt="High-resolution satellite remote-sensing imagery of agricultural floodplains"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-70"
                onError={(e) => {
                  // Fallback container
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold block">
                  Pilot Jurisdiction: Bihar & Middle Gangetic Basin
                </span>
                <span className="text-sm font-semibold text-white drop-shadow">
                  High-Resolution Multi-Temporal Spatial Telemetry (Patna-Bihta Agro-Ecological Corridor)
                </span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* Section 1: Universal Search Engine */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 -mt-10 relative z-20">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Ask about land, research, policy or geography...
            </h3>

            <form onSubmit={handleUniversalSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={universalQuery}
                  onChange={(e) => setUniversalQuery(e.target.value)}
                  placeholder="e.g. 'Why is agricultural land changing around Patna?' or 'Show flood risk in Bihar'"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 text-slate-900 shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#0B132B] hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Search Evidence
              </button>
            </form>

            {/* Example Queries */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-medium">Try asking:</span>
              {sampleQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUniversalQuery(q);
                    setActiveView('public-explorer');
                  }}
                  className="text-xs text-blue-900 hover:text-blue-950 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Section 2: Interactive India & Bihar GIS Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              India Intelligence Map
            </h3>
            <p className="text-xs text-slate-500">
              Public multi-layer GIS portal covering land-use classification, urban infill, and climate hazards.
            </p>
          </div>
          <button
            onClick={() => setActiveView('public-map')}
            className="text-xs text-blue-900 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Open Fullscreen Map View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <RealisticWorldMap 
          onOpenWhyHere={(id) => setShowWhyHereTeaser(true)}
          onOpenWhatChanged={(id) => setShowWhatChangedTeaser(true)}
        />

        {/* Modal Teasers */}
        {showWhatChangedTeaser && (
          <div className="mt-4">
            <WhatChangedComparison onClose={() => setShowWhatChangedTeaser(false)} />
          </div>
        )}

        {showWhyHereTeaser && (
          <div className="mt-4">
            <WhyHereAnalysis onClose={() => setShowWhyHereTeaser(false)} />
          </div>
        )}
      </section>

      {/* Section 3: Public Intelligence Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">
            Public Civic Intelligence
          </h3>
          <p className="text-xs text-slate-500">
            Emerging trends, research insights, and verified regional signals across the Middle Gangetic plain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Emerging Trends */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
                Emerging Trend
              </span>
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Peri-Urban Alluvial Cropland Loss
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Satellite remote sensing confirms a <strong>14.8% net decline</strong> in double-cropped fertile soil around Patna metropolitan fringes, driven by transit expressway speculation.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Source: NRSC & DILRMP</span>
              <button 
                onClick={() => setActiveView('public-explorer')}
                className="text-blue-900 font-semibold cursor-pointer"
              >
                Inspect Trend →
              </button>
            </div>
          </div>

          {/* Card 2: Research Insight */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-purple-900 uppercase tracking-wider">
                Research Insight
              </span>
              <BookOpen className="w-4 h-4 text-purple-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Ganga Riparian Buffer Violations
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hydrodynamic modeling documents 42 permanent masonry footings within the active 1-in-25-year flood inundation zone, increasing localized backwater drainage risk by <strong>34%</strong>.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Senapati et al. (2024)</span>
              <button 
                onClick={() => setActiveView('public-research')}
                className="text-blue-900 font-semibold cursor-pointer"
              >
                Read Paper →
              </button>
            </div>
          </div>

          {/* Card 3: Regional Signal */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-amber-900 uppercase tracking-wider">
                Regional Signal
              </span>
              <Activity className="w-4 h-4 text-amber-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Bihta Logistics Transit Pressure
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Completion of the 6-lane elevated expressway has triggered a <strong>240% acceleration</strong> in built-up infill above the 5-year moving baseline, stressing local aquifer recharge.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Early Signal Engine (Q3)</span>
              <button 
                onClick={() => onOpenWhyHere('patna')}
                className="text-blue-900 font-semibold cursor-pointer"
              >
                Why Here? →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Section 4: How BHUMI-NEXUS Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 space-y-8 relative overflow-hidden">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold block">
              Architectural Paradigm
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              How BHUMI-NEXUS Works
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Connecting raw spatial data to gazetted policy interventions through an evidence-grounded feedback loop.
            </p>
          </div>

          {/* 8-Stage Architecture Flow Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono text-blue-400 font-bold block">01. DATA</span>
              <h5 className="text-xs font-bold text-white">Multi-Source Ingestion</h5>
              <p className="text-[11px] text-slate-400 leading-snug">
                Satellite radar/optical, digitized cadastral records (DILRMP), and piezometers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold block">02. EVIDENCE</span>
              <h5 className="text-xs font-bold text-white">Scientific Provenance</h5>
              <p className="text-[11px] text-slate-400 leading-snug">
                Peer-reviewed econometric studies and spatial ground-truthing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold block">03. INTELLIGENCE</span>
              <h5 className="text-xs font-bold text-white">Evidence Fusion</h5>
              <p className="text-[11px] text-slate-400 leading-snug">
                Ontological knowledge graph & Research Copilot with strict hallucination guards.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold block">04. SIMULATION</span>
              <h5 className="text-xs font-bold text-white">Policy Lab Engine</h5>
              <p className="text-[11px] text-slate-400 leading-snug">
                Multi-parameter counterfactual scenario models and trade-off matrices.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold block">05. DECISION</span>
              <h5 className="text-xs font-bold text-white">Decision Center</h5>
              <p className="text-[11px] text-slate-400 leading-snug">
                Structured 11-section executive policy briefs supporting human authority.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold block">06. IMPLEMENT</span>
              <h5 className="text-xs font-bold text-white">Cadastral Gazette</h5>
              <p className="text-[11px] text-slate-400 leading-snug">
                Automated Section 143 mutation curbs and TDR compensation quotas.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono text-teal-400 font-bold block">07. IMPACT</span>
              <h5 className="text-xs font-bold text-white">Impact Monitor</h5>
              <p className="text-[11px] text-slate-400 leading-snug">
                Continuous post-policy KPI deviation tracking and early anomaly alarms.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold block">08. LEARNING</span>
              <h5 className="text-xs font-bold text-white">Model Recalibration</h5>
              <p className="text-[11px] text-slate-400 leading-snug">
                Continuous Bayesian model refinement from ground-truth feedback.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
