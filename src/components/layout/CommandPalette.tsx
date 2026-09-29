import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, MapPin, Sliders, Cpu, Activity, Database, FileText, X, ArrowRight } from 'lucide-react';
import { PILOT_REGIONS, SOURCED_DATASETS, RESEARCH_PAPERS } from '../../data/mockDatabase';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { setActiveView, switchDemoRole } = useAuth();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNav = [
    { label: 'Public India & Bihar GIS Map', view: 'public-map', icon: MapPin, desc: 'Interactive LULC, floodplains & infrastructure layers' },
    { label: 'Policy Lab & Scenario Simulator', view: 'policy-lab', icon: Sliders, desc: 'Model urban growth caps & agricultural buffers' },
    { label: 'Research Copilot & Evidence Engine', view: 'researcher', icon: Cpu, desc: 'Query verified land governance literature & citations' },
    { label: 'Impact Monitor & Deviation Tracking', view: 'impact-monitor', icon: Activity, desc: 'Track actual vs target land preservation KPIs' },
    { label: 'Data Trust Center & Health Scores', view: 'trust-center', icon: Database, desc: 'Dataset provenance, completeness & methodology' },
    { label: 'Knowledge Repository & Publications', view: 'public-knowledge', icon: FileText, desc: 'Browse peer-reviewed papers & cadastral reports' },
  ];

  const filteredNav = quickNav.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) || 
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRegions = PILOT_REGIONS.filter(r => 
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPapers = RESEARCH_PAPERS.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.topic.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, district, dataset, or research topic..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-slate-400 text-slate-900"
            autoFocus
          />
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results / Navigation Lists */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-3">
          
          {/* Navigation Items */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">
              Modules & Dashboards
            </div>
            <div className="space-y-1">
              {filteredNav.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveView(item.view);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-slate-500 group-hover:text-blue-900" />
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Region Matches if query present */}
          {query && filteredRegions.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">
                Districts & Regions
              </div>
              <div className="space-y-1">
                {filteredRegions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => {
                      setActiveView('public-map');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-slate-800">
                        {region.name} ({region.state})
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Risk: {region.riskLevel} ({region.riskScore}/100)
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Papers Matches if query present */}
          {query && filteredPapers.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">
                Research Publications
              </div>
              <div className="space-y-1">
                {filteredPapers.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => {
                      setActiveView('public-knowledge');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-slate-800 truncate max-w-md">
                        {paper.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {paper.year}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer shortcuts helper */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with mouse or keyboard</span>
          <div className="flex items-center gap-2">
            <span>ESC to close</span>
          </div>
        </div>

      </div>
    </div>
  );
};
