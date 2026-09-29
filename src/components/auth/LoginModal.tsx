import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../layout/Logo';
import { Shield, Eye, EyeOff, Lock, Building, GraduationCap, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  initialType?: 'institutional' | 'researcher';
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  initialType = 'institutional',
  onClose
}) => {
  const { loginAsInstitutional, loginAsResearcher, loginWithGoogleFirebase, setActiveView } = useAuth();
  const [tab, setTab] = useState<'institutional' | 'researcher'>(initialType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (tab === 'institutional') {
        const res = await loginAsInstitutional({ email, pass: password });
        if (res.success) {
          onClose();
        } else {
          setError(res.error || 'Authentication failed. Please verify credentials.');
        }
      } else {
        const res = await loginAsResearcher({ email, pass: password });
        if (res.success) {
          onClose();
        } else {
          setError(res.error || 'Authentication failed. Please verify credentials.');
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Server authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginWithGoogleFirebase();
      if (res.success) {
        onClose();
      } else {
        setError(res.error || 'Google sign-in was cancelled or encountered an error.');
      }
    } catch (err: any) {
      setError(err?.message || 'Google sign-in error');
    } finally {
      setLoading(false);
    }
  };

  const handleSSO = async () => {
    setLoading(true);
    setError(null);
    try {
      if (tab === 'institutional') {
        await loginAsInstitutional({
          email: 'director.land@bihar.gov.in',
          pass: 'demo',
          sso: true
        });
      } else {
        await loginAsResearcher({
          email: 'a.mishra@iitp.ac.in',
          pass: 'demo',
          sso: true
        });
      }
      onClose();
    } catch {
      setError('SSO Handshake failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070D1F]/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden relative">
        
        {/* Header Ribbon */}
        <div className="bg-[#0B132B] text-white p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <Logo size="sm" light={true} showSubtitle={false} />
            <button
              onClick={() => {
                setActiveView('public-explorer');
                onClose();
              }}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Explore Public</span>
            </button>
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            Secure Access Portal
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Access role-based land intelligence, simulation models, and research tools.
          </p>

          {/* Access Level Selector Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setTab('institutional');
                setError(null);
                setEmail('officer.patna@bihar.gov.in');
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                tab === 'institutional'
                  ? 'bg-blue-900 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              Institutional
            </button>

            <button
              type="button"
              onClick={() => {
                setTab('researcher');
                setError(null);
                setEmail('a.mishra@iitp.ac.in');
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                tab === 'researcher'
                  ? 'bg-blue-900 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Research
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Google Sign-In with Firebase Auth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-3 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2.5 mb-4 shadow-2xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.09C3.26 21.39 7.34 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.41l4.04-3.09z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.61 1.24 6.59l4.04 3.09c.95-2.83 3.6-4.93 6.72-4.93z"/>
            </svg>
            <span>Continue with Google (Firebase Auth)</span>
          </button>

          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-2 text-slate-400 font-semibold">Or Institutional Credentials</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {tab === 'institutional' ? 'Official Government / Work Email' : 'Institutional / Academic Email'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tab === 'institutional' ? 'officer.patna@bihar.gov.in' : 'a.mishra@iitp.ac.in'}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 bg-white text-slate-900"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 bg-white text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="rounded border-slate-300 text-blue-900 focus:ring-blue-900/30"
                />
                <span>Remember this device</span>
              </label>
              <button
                type="button"
                onClick={() => setError('Password reset instructions dispatched to your official agency administrator.')}
                className="text-blue-900 hover:underline cursor-pointer text-[11px]"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#0B132B] hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating & Verifying Role...' : 'SIGN IN'}
            </button>

            {/* SSO Abstraction Button */}
            <button
              type="button"
              onClick={handleSSO}
              disabled={loading}
              className="w-full py-2 px-3 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Continue with State SSO (JanParichay / e-Pramaan)</span>
            </button>
          </form>

          {/* Footer notice */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Secure · Auditable · Role-Based</span>
            <button
              onClick={() => {
                setActiveView('public-explorer');
                onClose();
              }}
              className="text-blue-900 hover:underline font-medium cursor-pointer"
            >
              ← Explore Public Data
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
