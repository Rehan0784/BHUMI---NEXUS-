import React, { useState } from 'react';
import { SOURCED_DATASETS } from '../../data/mockDatabase';
import { SourcedDataset } from '../../types';
import { ShieldCheck, Database, Calendar, Activity, CheckCircle2, AlertCircle, Info, Lock } from 'lucide-react';

export const DataTrustCenter: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedDataset, setSelectedDataset] = useState<SourcedDataset>(SOURCED_DATASETS[0]);

  const filteredDatasets = SOURCED_DATASETS.filter(d => 
    filterCategory === 'all' || d.category === filterCategory
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Data Trust Center & Health Audit
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Transparent provenance, completeness scores, update cadence, and scientific limitations for all ingested datasets.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filterCategory === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Datasets ({SOURCED_DATASETS.length})
          </button>
          <button
            onClick={() => setFilterCategory('satellite')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filterCategory === 'satellite' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Satellite Remote Sensing
          </button>
          <button
            onClick={() => setFilterCategory('cadastral')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filterCategory === 'cadastral' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cadastral RoR
          </button>
          <button
            onClick={() => setFilterCategory('climate')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filterCategory === 'climate' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hydrogeology
          </button>
        </div>
      </div>

      {/* Datasets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* List Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredDatasets.map((ds) => {
            const isSelected = selectedDataset.id === ds.id;
            return (
              <div
                key={ds.id}
                onClick={() => setSelectedDataset(ds)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-blue-900 bg-blue-50/40 shadow-xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Database className={`w-4 h-4 ${isSelected ? 'text-blue-900' : 'text-slate-400'}`} />
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      {ds.agency}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {ds.isRestricted && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Lock className="w-3 h-3" />
                        Restricted Cadastre
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 tabular-nums">
                      Health: {ds.healthScore}/100
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {ds.title}
                </h3>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                  <div>Coverage: <span className="font-medium text-slate-800">{ds.coverage}</span></div>
                  <div>Frequency: <span className="font-medium text-slate-800">{ds.frequency}</span></div>
                  <div>Last Updated: <span className="font-medium text-slate-800">{ds.lastUpdated}</span></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dataset Methodology & Inspector Column (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 font-bold block">
              Dataset Technical Dossier
            </span>
            <h4 className="text-base font-bold text-slate-900 mt-1">
              {selectedDataset.title}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Governing Agency: <strong className="text-slate-800">{selectedDataset.agency}</strong>
            </p>
          </div>

          {/* Health Metrics Radar */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-500 block">Health Score</span>
              <span className="text-base font-bold font-mono text-emerald-800 tabular-nums">
                {selectedDataset.healthScore}%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Completeness</span>
              <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                {selectedDataset.completeness}%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Confidence</span>
              <span className="text-base font-bold font-mono text-blue-900 tabular-nums">
                {selectedDataset.confidence}%
              </span>
            </div>
          </div>

          {/* Methodology */}
          <div>
            <h5 className="text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ingestion Methodology:</span>
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed p-2.5 bg-slate-50 rounded border border-slate-100">
              {selectedDataset.methodology}
            </p>
          </div>

          {/* Limitations */}
          <div>
            <h5 className="text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>Known Constraints & Limitations:</span>
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed p-2.5 bg-amber-50/50 rounded border border-amber-100">
              {selectedDataset.limitations}
            </p>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 font-mono">
            Cryptographic SHA-256 Checksum: Verified by National Informatics Centre (NIC)
          </div>
        </div>

      </div>
    </div>
  );
};
