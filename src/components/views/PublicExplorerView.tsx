import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RealisticWorldMap } from '../map/RealisticWorldMap';
import { WhatChangedComparison } from '../map/WhatChangedComparison';
import { WhyHereAnalysis } from '../map/WhyHereAnalysis';
import { PILOT_REGIONS, RESEARCH_PAPERS, SOURCED_DATASETS } from '../../data/mockDatabase';
import { 
  Database, 
  MapPin, 
  BookOpen, 
  Search, 
  Filter, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ExternalLink,
  Layers,
  TrendingDown,
  ArrowRight
} from 'lucide-react';

interface PublicExplorerProps {
  onOpenLogin: (type: 'institutional' | 'researcher') => void;
  onOpenWhyHere: (id: string) => void;
  onOpenWhatChanged: (id: string) => void;
}

export const PublicExplorerView: React.FC<PublicExplorerProps> = ({
  onOpenLogin,
  onOpenWhyHere,
  onOpenWhatChanged
}) => {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<'map' | 'datasets' | 'papers' | 'insights'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');

  const filteredPapers = RESEARCH_PAPERS.filter(p => {
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredDatasets = SOURCED_DATASETS.filter(d => {
    const matchesSearch = !searchQuery || d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.agency.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Level 1 Public Access Banner */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-wrap items-center justify-between gap-3 text-xs text-blue-950 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-blue-900 text-white">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <div>
            <strong className="block text-slate-900">
              Level 1: Public Citizen & Student Access
            </strong>
            <span className="text-slate-600">
              Open land intelligence, published satellite layers, and open-access research. No account or password required.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 hidden sm:inline">Need institutional authority or research tools?</span>
          <button
            onClick={() => onOpenLogin('institutional')}
            className="px-3 py-1.5 bg-blue-900 hover:bg-slate-800 text-white font-semibold rounded-lg cursor-pointer"
          >
            Institutional Portal
          </button>
        </div>
      </div>

      {/* Explorer Navigation Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              activeTab === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Public GIS Map</span>
          </button>
          <button
            onClick={() => setActiveTab('datasets')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              activeTab === 'datasets' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Open Datasets ({SOURCED_DATASETS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('papers')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              activeTab === 'papers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Research Repository ({RESEARCH_PAPERS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              activeTab === 'insights' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Land Governance Insights</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search public records, studies, or districts..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 text-slate-900"
          />
        </div>

      </div>

      {/* Tab Content 1: Map */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <RealisticWorldMap 
            onOpenWhyHere={onOpenWhyHere}
            onOpenWhatChanged={onOpenWhatChanged}
          />
        </div>
      )}

      {/* Tab Content 2: Open Datasets */}
      {activeTab === 'datasets' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDatasets.map((ds) => (
              <div key={ds.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      {ds.agency}
                    </span>
                    <div className="flex items-center gap-2">
                      {ds.isRestricted ? (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Lock className="w-3 h-3" />
                          Institutional Cadastre
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Open Public Data
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        Health: {ds.healthScore}/100
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {ds.title}
                  </h3>

                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    {ds.methodology}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-500 space-y-1 mb-4">
                    <div>Coverage: <span className="font-semibold text-slate-700">{ds.coverage}</span></div>
                    <div>Cadence: <span className="font-semibold text-slate-700">{ds.frequency}</span></div>
                    <div>Limitations: <span className="italic">{ds.limitations}</span></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[10px]">Updated: {ds.lastUpdated}</span>
                  {ds.isRestricted ? (
                    <button
                      onClick={() => onOpenLogin('institutional')}
                      className="text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Institutional Login to Access</span>
                      <Lock className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(`Downloaded public metadata dossier for ${ds.title} (GeoJSON/CSV format).`)}
                      className="text-blue-900 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Download Public Metadata</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Research Papers */}
      {activeTab === 'papers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPapers.map((paper) => (
              <div key={paper.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-blue-900 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                      {paper.topic}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {paper.year} · {paper.citationsCount} Citations
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                    {paper.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 mb-2">
                    {paper.authors.join(', ')} · <em>{paper.journal}</em>
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {paper.abstract}
                  </p>

                  {/* Key Findings */}
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-slate-800 block mb-1">
                      Key Empirical Findings:
                    </span>
                    <ul className="text-xs space-y-1 text-slate-600 list-disc list-inside">
                      {paper.keyFindings.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[10px]">DOI: {paper.doi}</span>
                  <button
                    onClick={() => alert(`Full open-access study preview:\n\n${paper.title}\n\nKey Findings:\n- ${paper.keyFindings.join('\n- ')}`)}
                    className="text-blue-900 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Paper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Insights */}
      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <span>Patna Peri-Urban Cropland Dynamics</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Between 2018 and 2026, 230 km² of fertile Gangetic alluvium was converted to non-agricultural built-up infill. Speculative land acquisition results in 28% of recently converted holdings lying uncultivated.
            </p>
            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="font-mono text-slate-500">Source: NRSC LULC & DILRMP</span>
              <button onClick={() => onOpenWhyHere('patna')} className="text-blue-900 font-semibold cursor-pointer">
                Examine Why Here →
              </button>
            </div>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Riparian Flood Hazard Encroachment</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Masonry developments within the 500m high-flood line of River Ganga have diminished aquifer percolation by 19% while intensifying localized monsoon waterlogging risks in Danapur and Digha.
            </p>
            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="font-mono text-slate-500">Source: NIH Hydrological Model</span>
              <button onClick={() => onOpenWhatChanged('patna')} className="text-blue-900 font-semibold cursor-pointer">
                Satellite Comparison →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
