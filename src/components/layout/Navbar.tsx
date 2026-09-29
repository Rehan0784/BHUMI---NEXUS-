import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from './Logo';
import { 
  Search, 
  MapPin, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Sliders, 
  Activity, 
  LogOut, 
  User, 
  Compass, 
  Database,
  BarChart2,
  Cpu,
  Menu,
  X,
  Mic,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenLogin: (type: 'institutional' | 'researcher') => void;
  onOpenCommand: () => void;
  onOpenHealth: () => void;
  onOpenVoice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenLogin, 
  onOpenCommand, 
  onOpenHealth,
  onOpenVoice
}) => {
  const { session, isAuthenticated, activeView, setActiveView, logoutToPublic, loginWithGoogleFirebase } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic navigation links based on RBAC
  const getNavLinks = () => {
    switch (session.role) {
      case 'OFFICER':
        return [
          { id: 'officer', label: 'Overview', icon: ShieldCheck },
          { id: 'geo-intel', label: 'Real GIS Map', icon: MapPin },
          { id: 'data-assets', label: 'Cadastre & RoR', icon: Database },
          { id: 'monitoring', label: 'Monitoring', icon: Activity },
          { id: 'alerts', label: 'Early Alerts', icon: Layers },
          { id: 'trust-center', label: 'Trust & Audit', icon: FileText },
        ];
      case 'POLICY_MAKER':
        return [
          { id: 'policy-maker', label: 'Policy Intelligence', icon: BarChart2 },
          { id: 'geo-intel', label: 'Real GIS Map', icon: MapPin },
          { id: 'policy-lab', label: 'Policy Lab', icon: Sliders },
          { id: 'decision-center', label: 'Decision Center', icon: Cpu },
          { id: 'impact-monitor', label: 'Impact Monitor', icon: Activity },
          { id: 'trust-center', label: 'Data Trust', icon: ShieldCheck },
        ];
      case 'RESEARCHER':
        return [
          { id: 'researcher', label: 'Research Copilot', icon: Cpu },
          { id: 'geo-intel', label: 'Real GIS Map', icon: MapPin },
          { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Layers },
          { id: 'gap-detector', label: 'Gap Detector', icon: Activity },
          { id: 'research-workspace', label: 'Workspace', icon: BookOpen },
          { id: 'trust-center', label: 'Datasets & Trust', icon: Database },
        ];
      case 'PUBLIC':
      default:
        return [
          { id: 'home', label: 'Home', icon: Compass },
          { id: 'public-explorer', label: 'Explore Data', icon: Database },
          { id: 'public-map', label: 'Real GIS Map', icon: MapPin },
          { id: 'public-knowledge', label: 'Knowledge Hub', icon: BookOpen },
          { id: 'public-research', label: 'Research Papers', icon: FileText },
          { id: 'trust-center', label: 'Data Trust', icon: ShieldCheck },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Enhanced Government-Grade Logo Wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveView('home')} 
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="BHUMI-NEXUS Home"
          >
            <Logo size="sm" showSubtitle={true} />
          </button>
        </div>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-sm font-medium transition-colors cursor-pointer py-1 relative whitespace-nowrap ${
                  isActive 
                    ? 'text-blue-900 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions, Voice AI & Access Gate */}
        <div className="flex items-center gap-2">
          
          {/* Real-time Voice Agent Button (Gemini Live API) */}
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Open Voice Assistant (Live API)"
          >
            <Mic className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="hidden sm:inline">Voice AI</span>
          </button>

          {/* Global search trigger */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 cursor-pointer"
            title="Press Ctrl+K or Cmd+K to search"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <kbd className="hidden md:inline-block px-1 py-0.2 text-[10px] font-mono bg-white border border-slate-300 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Conditional Access Buttons */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-900 truncate max-w-[130px]">
                  {session.name}
                </span>
                <span className="text-[10px] text-slate-500 truncate max-w-[130px]">
                  {session.role === 'OFFICER' ? 'Officer' : session.role === 'POLICY_MAKER' ? 'Policy Maker' : 'Researcher'}
                </span>
              </div>
              <button
                onClick={logoutToPublic}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-red-700 bg-slate-100 hover:bg-red-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Sign out to Public Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenLogin('institutional')}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Institutional Login
              </button>
              <button
                onClick={() => onOpenLogin('researcher')}
                className="px-3 py-1.5 text-xs font-medium text-white bg-[#0B132B] hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
              >
                Researcher Login
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-left ${
                activeView === item.id 
                  ? 'bg-blue-50 text-blue-900 font-semibold' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-4 h-4 text-slate-500" />
              <span>{item.label}</span>
            </button>
          ))}
          {!isAuthenticated && (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenLogin('institutional');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-xs font-medium text-slate-800 bg-slate-100 rounded-lg text-center"
              >
                Institutional Access (Officers & Policy Makers)
              </button>
              <button
                onClick={() => {
                  onOpenLogin('researcher');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-xs font-medium text-white bg-[#0B132B] rounded-lg text-center"
              >
                Researcher Access
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
