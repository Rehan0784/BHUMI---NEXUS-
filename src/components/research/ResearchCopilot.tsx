import React, { useState } from 'react';
import { api, CopilotResponse } from '../../services/api';
import { 
  Cpu, 
  Send, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  BookOpen, 
  Database, 
  Layers, 
  Bookmark, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ResearchCopilotProps {
  onAddToWorkspace?: (finding: any) => void;
  onSelectPaper?: (paperId: string) => void;
}

export const ResearchCopilot: React.FC<ResearchCopilotProps> = ({ onAddToWorkspace, onSelectPaper }) => {
  const [query, setQuery] = useState('Why is agricultural land changing around Patna?');
  const [response, setResponse] = useState<CopilotResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const sampleQueries = [
    'Why is agricultural land changing around Patna?',
    'What is the flood risk on Ganga embankments near Danapur?',
    'Show urban expansion around Bihta logistics corridor.',
    'Compare 2018 vs 2024 cropland loss in Middle Gangetic Basin.',
    'What did Mishra et al. 2025 conclude regarding cadastral parcel fragmentation?'
  ];

  const handleSearch = async (textToSearch?: string) => {
    const q = textToSearch || query;
    if (!q.trim()) return;
    setLoading(true);
    setSavedSuccess(false);
    try {
      const res = await api.queryCopilot(q);
      setResponse(res);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToWorkspace = () => {
    if (!response) return;
    if (onAddToWorkspace) {
      onAddToWorkspace({
        id: 'finding-' + Date.now(),
        question: query,
        answer: response.answer,
        confidence: response.confidence,
        timestamp: new Date().toISOString()
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Copilot Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
              <Cpu className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Research Copilot: Evidence Fusion Engine
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Synthesizes peer-reviewed studies, satellite remote sensing, cadastral records, and policy archives with strict hallucination guards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>AI Hallucination Guard Active</span>
          </span>
        </div>
      </div>

      {/* Query Bar & Suggestions */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask any research question on land governance, cropland change, or spatial policy..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 text-slate-900"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{loading ? 'Synthesizing...' : 'Inquire Copilot'}</span>
          </button>
        </form>

        {/* Suggestion Chips */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 text-[11px] font-medium">Quick Inquiries:</span>
          {sampleQueries.map((sq, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(sq);
                handleSearch(sq);
              }}
              className="text-[11px] text-slate-600 hover:text-blue-950 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-3 bg-slate-100 rounded w-full" />
          <div className="h-3 bg-slate-100 rounded w-5/6" />
          <div className="h-3 bg-slate-100 rounded w-3/4" />
          <div className="grid grid-cols-4 gap-3 pt-3">
            <div className="h-16 bg-slate-100 rounded" />
            <div className="h-16 bg-slate-100 rounded" />
            <div className="h-16 bg-slate-100 rounded" />
            <div className="h-16 bg-slate-100 rounded" />
          </div>
        </div>
      )}

      {/* Response Display */}
      {response && !loading && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Main Answer Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-semibold text-sm text-slate-900">
                  Grounded Evidence Synthesis
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 tabular-nums">
                  Confidence: {response.confidence}%
                </span>
                <button
                  onClick={handleSaveToWorkspace}
                  className="flex items-center gap-1 text-xs text-blue-900 hover:text-blue-700 font-medium cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{savedSuccess ? 'Saved in Workspace!' : 'Save Finding'}</span>
                </button>
              </div>
            </div>

            {/* Answer Text */}
            <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-line font-sans">
              {response.answer}
            </div>

            {/* Key Numeric Findings (Tabular Numbers) */}
            {response.keyDataPoints && response.keyDataPoints.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
                {response.keyDataPoints.map((dp, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[11px] text-slate-500 block truncate">{dp.label}</span>
                    <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                      {dp.value}
                    </span>
                    {dp.trend && (
                      <span className="text-[10px] text-slate-600 block mt-0.5 capitalize">
                        Status: {dp.trend}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Evidence Chain Visual Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-900" />
              <span>Inspection of the Evidence Chain (Provenanced Trace)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {response.evidenceChain.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-blue-900 font-bold">
                        0{idx + 1}.
                      </span>
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                        {step.nodeType}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-800 block mb-1">
                      {step.step}
                    </span>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sourced Citations & Datasets */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-600" />
              <span>Verified Sourced Literature & Official Datasets</span>
            </h4>

            <div className="space-y-2.5">
              {response.sources.map((src, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-semibold text-slate-900">
                        {src.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Citation: <strong className="text-slate-800">{src.citation}</strong> {src.year ? `(${src.year})` : ''}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded whitespace-nowrap">
                    {src.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
