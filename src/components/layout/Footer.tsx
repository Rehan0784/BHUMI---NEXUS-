import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Activity, Database, FileText } from 'lucide-react';

interface FooterProps {
  onOpenHealth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHealth }) => {
  const { setActiveView } = useAuth();

  return (
    <footer className="bg-[#0B132B] text-slate-300 border-t border-slate-800 text-xs mt-auto">
      {/* Evidence-to-Policy Loop Banner */}
      <div className="border-b border-slate-800/80 bg-[#070D1F] py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
          <div className="text-[11px] text-slate-400 font-mono">
            CORE PARADIGM:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-300 font-medium">
            <span className="text-blue-400">DATA</span>
            <span className="text-slate-600">→</span>
            <span className="text-emerald-400">EVIDENCE</span>
            <span className="text-slate-600">→</span>
            <span className="text-amber-400">INTELLIGENCE</span>
            <span className="text-slate-600">→</span>
            <span className="text-purple-400">SIMULATION</span>
            <span className="text-slate-600">→</span>
            <span className="text-cyan-400">DECISION</span>
            <span className="text-slate-600">→</span>
            <span className="text-rose-400">IMPLEMENTATION</span>
            <span className="text-slate-600">→</span>
            <span className="text-teal-400">IMPACT</span>
            <span className="text-slate-600">→</span>
            <span className="text-indigo-400">LEARNING</span>
          </div>
          <div className="text-[11px] text-amber-400/90 font-medium">
            Smart India Hackathon 2026 · PS 26019
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Purpose */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-blue-900 flex items-center justify-center text-amber-400 font-bold text-sm">
              भ
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              BHUMI-NEXUS
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Evidence-to-Policy Intelligence Platform for Land Governance. Turning fragmented land evidence into explainable intelligence, scenario-based policy insight, and measurable impact.
          </p>
          <div className="text-[11px] text-slate-500">
            Pilot Jurisdiction: Middle Gangetic Plain & Bihar State
          </div>
        </div>

        {/* Public Access & Data */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
            Public Access
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button 
                onClick={() => setActiveView('public-explorer')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Public Data Explorer
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('public-map')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                India Intelligence Map
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('public-knowledge')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Knowledge Repository
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('public-research')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Peer-Reviewed Studies
              </button>
            </li>
          </ul>
        </div>

        {/* Institutional & Policy */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
            Governance & Research
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button 
                onClick={() => setActiveView('policy-lab')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Policy Simulation Lab
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('decision-center')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Decision Center & Briefs
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('impact-monitor')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Policy Impact Monitor
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('trust-center')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Data Trust & Provenance
              </button>
            </li>
          </ul>
        </div>

        {/* Trust & System Health */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
            Integrity & Assurance
          </h4>
          <div className="space-y-2 text-xs">
            <button
              onClick={onOpenHealth}
              className="flex items-center gap-2 p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left w-full transition-colors cursor-pointer"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="font-medium text-slate-200">System Telemetry</div>
                <div className="text-[10px] text-emerald-400">PostGIS · pgvector · AI Guard Active</div>
              </div>
            </button>

            <button
              onClick={() => setActiveView('trust-center')}
              className="flex items-center gap-2 p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left w-full transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <div>
                <div className="font-medium text-slate-200">Data Health Scores</div>
                <div className="text-[10px] text-slate-400">Verified Sourced Datasets (ISRO/DILRMP)</div>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-4 px-4 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>BHUMI-NEXUS © 2026. National Land Governance Intelligence Architecture.</span>
          <div className="flex items-center gap-4">
            <span>Non-partisan AI Hallucination Guard</span>
            <span>·</span>
            <span>REST & OpenAPI Ready</span>
            <span>·</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
