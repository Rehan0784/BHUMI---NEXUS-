import React, { useState } from 'react';
import { INITIAL_RESEARCH_PROJECTS, RESEARCH_PAPERS, SOURCED_DATASETS } from '../../data/mockDatabase';
import { 
  BookOpen, 
  FolderPlus, 
  FileText, 
  Database, 
  Download, 
  Trash2, 
  Bookmark, 
  CheckCircle2, 
  Plus, 
  Share2, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export const ResearchWorkspace: React.FC = () => {
  const [projects, setProjects] = useState(INITIAL_RESEARCH_PROJECTS);
  const [activeTab, setActiveTab] = useState<'projects' | 'findings' | 'citations'>('projects');
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [savedFindings, setSavedFindings] = useState([
    {
      id: 'f-1',
      question: 'Why is agricultural land changing around Patna?',
      finding: '14.8% net loss in prime alluvial cropland between 2018-2026. Bihta Expressway induced 4.8x land value spike, with 28% speculative uncultivated parcels.',
      date: '2026-09-26',
      confidence: 94
    },
    {
      id: 'f-2',
      question: 'What is the flood risk on Ganga embankments near Danapur?',
      finding: '42 permanent masonry footings within High Flood Level zone; hydrodynamic backwater risk increased by 34% in Danapur drainage basin.',
      date: '2026-09-24',
      confidence: 96
    }
  ]);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;
    const newProj = {
      id: 'proj-' + Date.now(),
      title: newProjectTitle,
      updatedAt: new Date().toISOString().substring(0, 10),
      papersCount: 2,
      datasetsCount: 1,
      scenariosCount: 0,
      notes: 'Initial investigation dossier created in BHUMI-NEXUS Research Workspace.',
      tags: ['New Pilot', 'Middle Gangetic', 'Spatial Economics']
    };
    setProjects([newProj, ...projects]);
    setNewProjectTitle('');
    setShowNewModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Research Workspace & Collaboration Lab
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Dedicated research dossiers, saved AI evidence briefs, cited literature bundles, and peer spatial experiments.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <FolderPlus className="w-4 h-4 text-amber-400" />
          <span>New Research Project</span>
        </button>
      </div>

      {/* Workspace Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            activeTab === 'projects' ? 'bg-[#0B132B] text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Research Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('findings')}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            activeTab === 'findings' ? 'bg-[#0B132B] text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Saved AI Findings ({savedFindings.length})
        </button>
        <button
          onClick={() => setActiveTab('citations')}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            activeTab === 'citations' ? 'bg-[#0B132B] text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Citation Library ({RESEARCH_PAPERS.length})
        </button>
      </div>

      {/* Tab 1: Projects Grid */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div key={proj.id} className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    Updated: {proj.updatedAt}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-blue-900 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                      {proj.papersCount} Papers
                    </span>
                    <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      {proj.datasetsCount} Datasets
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {proj.notes}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Principal Investigator: Dr. Anand Mishra</span>
                <button
                  onClick={() => alert(`Project dossier "${proj.title}" exported as BibTeX & PDF digest.`)}
                  className="text-xs text-blue-900 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Dossier</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Saved Findings */}
      {activeTab === 'findings' && (
        <div className="space-y-3">
          {savedFindings.map((f) => (
            <div key={f.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-900" />
                  <span>{f.question}</span>
                </h4>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Confidence: {f.confidence}%
                  </span>
                  <span className="text-slate-400 font-mono">{f.date}</span>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {f.finding}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Citations */}
      {activeTab === 'citations' && (
        <div className="space-y-3">
          {RESEARCH_PAPERS.map((paper) => (
            <div key={paper.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">
                  {paper.title}
                </h4>
                <p className="text-[11px] text-slate-600 mb-2">
                  {paper.authors.join(', ')} · <em>{paper.journal}</em> ({paper.year})
                </p>
                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                  <span>Region: {paper.region}</span>
                  <span>·</span>
                  <span>Citations: {paper.citationsCount}</span>
                  <span>·</span>
                  <span>DOI: {paper.doi}</span>
                </div>
              </div>
              <button
                onClick={() => alert(`Citation in APA format:\n${paper.authors[0]} et al. (${paper.year}). ${paper.title}. ${paper.journal}. https://doi.org/${paper.doi}`)}
                className="px-2.5 py-1 text-xs border border-slate-300 rounded hover:bg-slate-50 whitespace-nowrap text-slate-700 cursor-pointer"
              >
                Copy Citation (APA)
              </button>
            </div>
          ))}
        </div>
      )}

      {/* New Project Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Create Research Investigation Dossier
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Organize satellite layers, cadastral queries, and counterfactual models under one project.
            </p>
            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="e.g. Sone Canal Irrigation & Peri-Urban Cropland Resilience"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Create Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
