import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Sparkles, HelpCircle, CheckCircle2, ChevronRight, X, Play } from 'lucide-react';

export const DemoRibbon: React.FC = () => {
  const { session, switchDemoRole, isDemoMode, setIsDemoMode } = useAuth();
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [activeStoryStep, setActiveStoryStep] = useState(0);

  if (!isDemoMode) return null;

  const storySteps = [
    {
      time: '0:00 – 0:20',
      title: 'Problem Statement & Public Entry',
      summary: 'Fragmented evidence across land records, satellite layers, and policy documents causes land misgovernance.',
      role: 'PUBLIC',
      actionPrompt: 'Open public homepage and examine the universal search and civic intelligence loop.'
    },
    {
      time: '0:20 – 0:40',
      title: 'Public Geospatial Explorer',
      summary: 'Explore public land-use layers and Bihar/Patna pilot without login friction.',
      role: 'PUBLIC',
      actionPrompt: 'Click "Explore Public Data" to interact with the map, time slider, and public statistics.'
    },
    {
      time: '0:40 – 1:00',
      title: 'Researcher Intelligence & Copilot',
      summary: 'Query: "Why is agricultural land changing around Patna?" Grounded AI with zero hallucination.',
      role: 'RESEARCHER',
      actionPrompt: 'Inspect the evidence chain, peer citations (Mishra et al. 2025), and confidence metrics.'
    },
    {
      time: '1:00 – 1:25',
      title: 'Spatial Causality: "Why Here?"',
      summary: 'Deconstruct transit pressure, speculative holding, and flood vulnerability with evidence links.',
      role: 'RESEARCHER',
      actionPrompt: 'Open the "Why Here?" causal factor panel on Patna peri-urban corridor.'
    },
    {
      time: '1:25 – 1:50',
      title: 'Policy Maker: Policy Lab Simulation',
      summary: 'Model multi-parameter policy interventions (Agricultural protection strictness, riparian buffer).',
      role: 'POLICY_MAKER',
      actionPrompt: 'Adjust the sliders and observe instantaneous deterministic outcome recalculations.'
    },
    {
      time: '1:50 – 2:15',
      title: 'Scenario Comparison & Trade-Offs',
      summary: 'Evaluate Baseline vs Scenario A (Agri Protection) vs Scenario B (Transit TOD) trade-offs.',
      role: 'POLICY_MAKER',
      actionPrompt: 'Review the Trade-off matrix, uncertainty intervals, and generate an 11-section Policy Brief.'
    },
    {
      time: '2:15 – 2:35',
      title: 'Impact Monitor & Early Signals',
      summary: 'Closed-loop governance: Track actual post-policy indicators against targets with automated alerts.',
      role: 'OFFICER',
      actionPrompt: 'Review Critical Alerts (e.g., +64.8% prime cropland conversion deviation in Bihta corridor).'
    },
    {
      time: '2:35 – 3:00',
      title: 'Complete Evidence-to-Policy Loop',
      summary: 'DATA → EVIDENCE → INTELLIGENCE → SIMULATION → DECISION → IMPLEMENTATION → IMPACT → LEARNING',
      role: 'POLICY_MAKER',
      actionPrompt: 'Closing summary: BHUMI-NEXUS provides an evidence layer for smarter, resilient land governance.'
    }
  ];

  return (
    <>
      <div className="bg-[#0B132B] text-white border-b border-slate-700/60 px-3 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            <Sparkles className="w-3 h-3" />
            SIH 2026 PS 26019
          </span>
          <span className="hidden sm:inline text-slate-300 font-medium">
            Demo Environment:
          </span>
        </div>

        {/* Role Quick Switchers */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => switchDemoRole('PUBLIC')}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              session.role === 'PUBLIC'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Public Experience
          </button>

          <button
            onClick={() => switchDemoRole('OFFICER')}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              session.role === 'OFFICER'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Officer Demo
          </button>

          <button
            onClick={() => switchDemoRole('POLICY_MAKER')}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              session.role === 'POLICY_MAKER'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Policy Maker Demo
          </button>

          <button
            onClick={() => switchDemoRole('RESEARCHER')}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              session.role === 'RESEARCHER'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Researcher Demo
          </button>

          {/* 3-Minute Demo Guide CTA */}
          <button
            onClick={() => setShowStoryModal(true)}
            className="flex items-center gap-1 ml-1 px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-medium cursor-pointer"
          >
            <Play className="w-3 h-3" />
            <span>3-Min Demo Script</span>
          </button>
        </div>
      </div>

      {/* 3-Minute SIH Presentation Guide Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden">
            <div className="bg-[#0B132B] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base text-amber-400">
                  SIH 2026 Demo Walkthrough (3-Minute Script)
                </h3>
                <p className="text-xs text-slate-300">
                  Step-by-step roadmap designed for evaluation judges
                </p>
              </div>
              <button 
                onClick={() => setShowStoryModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4">
              <div className="grid gap-3">
                {storySteps.map((step, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-lg border transition-all ${
                      activeStoryStep === idx 
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                        : 'border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                          {step.time}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900">
                          {step.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-medium text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                        {step.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      {step.summary}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <span className="text-[11px] text-slate-500 italic">
                        {step.actionPrompt}
                      </span>
                      <button
                        onClick={() => {
                          switchDemoRole(step.role as any);
                          setActiveStoryStep(idx);
                          setShowStoryModal(false);
                        }}
                        className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        Switch Role & Go <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowStoryModal(false)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Close Script
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
