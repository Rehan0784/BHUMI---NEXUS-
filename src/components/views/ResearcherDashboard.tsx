import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ResearchCopilot } from '../research/ResearchCopilot';
import { EvidenceChainView } from '../research/EvidenceChainView';
import { LandKnowledgeGraph } from '../research/LandKnowledgeGraph';
import { ResearchGapDetector } from '../research/ResearchGapDetector';
import { ResearchWorkspace } from '../research/ResearchWorkspace';
import { IndiaIntelligenceMap } from '../map/IndiaIntelligenceMap';
import { 
  GraduationCap, 
  Cpu, 
  Layers, 
  Activity, 
  BookOpen, 
  MapPin, 
  ShieldCheck, 
  FileText,
  Bookmark
} from 'lucide-react';

export const ResearcherDashboard: React.FC = () => {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<'copilot' | 'chain' | 'graph' | 'gaps' | 'workspace' | 'geo'>('copilot');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Researcher Identity & Clearance Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-900">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono font-bold text-amber-900 uppercase tracking-wider">
              Level 3: Research Access · Academic & Scientific Workbench
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Centre for Spatial Economics & Land Governance Laboratory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Principal Investigator: <strong>{session.name}</strong> · {session.organization || 'IIT Patna / ICAR Fellow'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Strict Evidence Grounding Active</span>
          </span>
        </div>
      </div>

      {/* Researcher Sub-Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs border border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('copilot')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'copilot' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Research Copilot</span>
        </button>

        <button
          onClick={() => setActiveTab('chain')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'chain' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Evidence Chain</span>
        </button>

        <button
          onClick={() => setActiveTab('graph')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'graph' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Knowledge Graph</span>
        </button>

        <button
          onClick={() => setActiveTab('gaps')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'gaps' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Research Gap Detector</span>
        </button>

        <button
          onClick={() => setActiveTab('workspace')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'workspace' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Research Workspace</span>
        </button>

        <button
          onClick={() => setActiveTab('geo')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'geo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>GIS Spatial Explorer</span>
        </button>
      </div>

      {/* Tab Render */}
      {activeTab === 'copilot' && (
        <ResearchCopilot />
      )}

      {activeTab === 'chain' && (
        <EvidenceChainView />
      )}

      {activeTab === 'graph' && (
        <LandKnowledgeGraph />
      )}

      {activeTab === 'gaps' && (
        <ResearchGapDetector />
      )}

      {activeTab === 'workspace' && (
        <ResearchWorkspace />
      )}

      {activeTab === 'geo' && (
        <IndiaIntelligenceMap />
      )}

    </div>
  );
};
