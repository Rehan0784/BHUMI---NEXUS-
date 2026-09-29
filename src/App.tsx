import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DemoRibbon } from './components/layout/DemoRibbon';
import { CommandPalette } from './components/layout/CommandPalette';
import { LoginModal } from './components/auth/LoginModal';
import { SystemHealthModal } from './components/trust/SystemHealthModal';
import { VoiceConversationAgent } from './components/voice/VoiceConversationAgent';
import { WhatChangedComparison } from './components/map/WhatChangedComparison';
import { WhyHereAnalysis } from './components/map/WhyHereAnalysis';

// Views
import { HomeView } from './components/views/HomeView';
import { PublicExplorerView } from './components/views/PublicExplorerView';
import { OfficerDashboard } from './components/views/OfficerDashboard';
import { PolicyMakerDashboard } from './components/views/PolicyMakerDashboard';
import { ResearcherDashboard } from './components/views/ResearcherDashboard';
import { RealisticWorldMap } from './components/map/RealisticWorldMap';
import { IndiaIntelligenceMap } from './components/map/IndiaIntelligenceMap';
import { DataTrustCenter } from './components/trust/DataTrustCenter';
import { AuditLogViewer } from './components/trust/AuditLogViewer';
import { Lock, ShieldAlert, ArrowLeft } from 'lucide-react';

const AppContent: React.FC = () => {
  const { session, isAuthenticated, activeView, setActiveView, hasPermission } = useAuth();
  
  // Modal states
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginType, setLoginType] = useState<'institutional' | 'researcher'>('institutional');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [healthModalOpen, setHealthModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  
  const [whyHereRegionId, setWhyHereRegionId] = useState<string | null>(null);
  const [whatChangedRegionId, setWhatChangedRegionId] = useState<string | null>(null);

  const handleOpenLogin = (type: 'institutional' | 'researcher') => {
    setLoginType(type);
    setLoginModalOpen(true);
  };

  // Render view based on state & RBAC access
  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomeView
            onOpenLogin={handleOpenLogin}
            onOpenWhyHere={(id) => setWhyHereRegionId(id)}
            onOpenWhatChanged={(id) => setWhatChangedRegionId(id)}
          />
        );

      case 'public-explorer':
      case 'public-knowledge':
      case 'public-research':
        return (
          <PublicExplorerView
            onOpenLogin={handleOpenLogin}
            onOpenWhyHere={(id) => setWhyHereRegionId(id)}
            onOpenWhatChanged={(id) => setWhatChangedRegionId(id)}
          />
        );

      case 'public-map':
      case 'geo-intel':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  National & Bihar Geospatial Intelligence Portal
                </h2>
                <p className="text-xs text-slate-500">
                  High-resolution satellite imagery, verified cadastre parcels, and real-world location tracking.
                </p>
              </div>
            </div>
            <RealisticWorldMap
              onOpenWhyHere={(id) => setWhyHereRegionId(id)}
              onOpenWhatChanged={(id) => setWhatChangedRegionId(id)}
            />
          </div>
        );

      // Officer Views
      case 'officer':
      case 'data-assets':
      case 'monitoring':
      case 'alerts':
        if (session.role !== 'OFFICER' && session.role !== 'POLICY_MAKER') {
          return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Institutional Officer Clearance Required
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                This module contains restricted cadastral Record of Rights (RoR) and enforcement workflows. Please authenticate via the Institutional Gateway.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => handleOpenLogin('institutional')}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                >
                  Institutional Login
                </button>
                <button
                  onClick={() => setActiveView('public-explorer')}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Return to Public Explorer
                </button>
              </div>
            </div>
          );
        }
        return (
          <OfficerDashboard
            onOpenWhyHere={(id) => setWhyHereRegionId(id)}
            onOpenWhatChanged={(id) => setWhatChangedRegionId(id)}
          />
        );

      // Policy Maker Views
      case 'policy-maker':
      case 'policy-lab':
      case 'decision-center':
      case 'impact-monitor':
        if (session.role !== 'POLICY_MAKER') {
          return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                State Policy Directorate Clearance Required
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Policy Lab simulations, counterfactual scenarios, and statutory policy briefs require State Policy Directorate authorization.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => handleOpenLogin('institutional')}
                  className="px-4 py-2 bg-[#0B132B] text-white rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                >
                  Institutional Directorate Login
                </button>
                <button
                  onClick={() => setActiveView('public-explorer')}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Return to Public Explorer
                </button>
              </div>
            </div>
          );
        }
        return <PolicyMakerDashboard />;

      // Researcher Views
      case 'researcher':
      case 'knowledge-graph':
      case 'gap-detector':
      case 'research-workspace':
        if (session.role !== 'RESEARCHER') {
          return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Academic & Research Access Required
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Research Copilot, Evidence Chain extractor, and collaboration workspaces require verified academic or scientific credentials.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => handleOpenLogin('researcher')}
                  className="px-4 py-2 bg-amber-950 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                >
                  Researcher Login
                </button>
                <button
                  onClick={() => setActiveView('public-explorer')}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Return to Public Explorer
                </button>
              </div>
            </div>
          );
        }
        return <ResearcherDashboard />;

      // Trust & Audit
      case 'trust-center':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <DataTrustCenter />
            <AuditLogViewer />
          </div>
        );

      default:
        return (
          <HomeView
            onOpenLogin={handleOpenLogin}
            onOpenWhyHere={(id) => setWhyHereRegionId(id)}
            onOpenWhatChanged={(id) => setWhatChangedRegionId(id)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* SIH 2026 Demo Environment Banner & Role Switcher */}
      <DemoRibbon />

      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        onOpenLogin={handleOpenLogin}
        onOpenCommand={() => setCommandPaletteOpen(true)}
        onOpenHealth={() => setHealthModalOpen(true)}
        onOpenVoice={() => setVoiceModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Institutional Civic Footer */}
      <Footer onOpenHealth={() => setHealthModalOpen(true)} />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Real-Time Voice Conversation Agent Modal (Gemini Live API) */}
      <VoiceConversationAgent
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />

      {/* Government-Grade Secure Access Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        initialType={loginType}
        onClose={() => setLoginModalOpen(false)}
      />

      {/* System Health Telemetry Console Modal */}
      <SystemHealthModal
        isOpen={healthModalOpen}
        onClose={() => setHealthModalOpen(false)}
      />

      {/* Why Here Modal Popup */}
      {whyHereRegionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="max-w-2xl w-full">
            <WhyHereAnalysis
              regionId={whyHereRegionId}
              onClose={() => setWhyHereRegionId(null)}
              onExplorePaper={() => {
                setWhyHereRegionId(null);
                setActiveView('public-research');
              }}
            />
          </div>
        </div>
      )}

      {/* What Changed Satellite Comparison Modal */}
      {whatChangedRegionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="max-w-3xl w-full">
            <WhatChangedComparison
              regionId={whatChangedRegionId}
              onClose={() => setWhatChangedRegionId(null)}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
