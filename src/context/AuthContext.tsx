import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserSession, AuditLog } from '../types';
import { AUDIT_LOGS } from '../data/mockDatabase';
import { auth, signInWithGoogle, signOutUser } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  session: UserSession;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  activeView: string;
  auditLogs: AuditLog[];
  setActiveView: (view: string) => void;
  setIsDemoMode: (val: boolean) => void;
  loginAsInstitutional: (credentials: { email: string; pass: string; sso?: boolean }) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  loginAsResearcher: (credentials: { email: string; pass: string; sso?: boolean }) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  loginWithGoogleFirebase: () => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  switchDemoRole: (role: UserRole) => void;
  logoutToPublic: () => void;
  hasPermission: (permission: string) => boolean;
  addAuditLog: (action: string, resource: string, status?: 'SUCCESS' | 'DENIED' | 'FLAGGED') => void;
}

const PUBLIC_SESSION: UserSession = {
  id: 'anon-citizen-' + Math.random().toString(36).substring(2, 8),
  name: 'Public Citizen / Student',
  role: 'PUBLIC',
  isAnonymous: true,
  permissions: [
    'public_search',
    'public_maps',
    'public_data',
    'public_reports',
    'public_knowledge',
    'public_indicators',
    'public_trends'
  ]
};

const OFFICER_PERMISSIONS = [
  'public_search',
  'public_maps',
  'public_data',
  'public_reports',
  'public_knowledge',
  'institutional_data',
  'cadastral_access',
  'geo_intelligence',
  'monitoring',
  'reports',
  'alerts',
  'export_district_reports'
];

const POLICY_MAKER_PERMISSIONS = [
  ...OFFICER_PERMISSIONS,
  'policy_lab',
  'simulation',
  'decision_center',
  'policy_briefs',
  'impact_monitor',
  'policy_memory',
  'scenario_builder',
  'trade_off_analysis'
];

const RESEARCHER_PERMISSIONS = [
  'public_search',
  'public_maps',
  'public_data',
  'public_reports',
  'public_knowledge',
  'research_search',
  'research_data',
  'research_copilot',
  'research_workspace',
  'GIS_analysis',
  'collaboration',
  'evidence_chain_extract',
  'knowledge_graph_query',
  'gap_detector'
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession>(() => {
    const saved = localStorage.getItem('bhumi_nexus_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return PUBLIC_SESSION;
      }
    }
    return PUBLIC_SESSION;
  });

  const [activeView, setActiveView] = useState<string>('home');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(AUDIT_LOGS);

  // Sync session with LocalStorage
  useEffect(() => {
    localStorage.setItem('bhumi_nexus_session', JSON.stringify(session));
  }, [session]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && session.isAnonymous) {
        // Upgrade anonymous session to authenticated Firebase user
        const newSession: UserSession = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Authorized Official',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || undefined,
          role: 'OFFICER',
          organization: 'Government of India / National Land Governance Portal',
          department: 'Revenue & Land Governance Directorate',
          designation: 'Certified Government Officer',
          token: 'firebase_jwt_' + firebaseUser.uid,
          permissions: OFFICER_PERMISSIONS,
          isAnonymous: false
        };
        setSession(newSession);
      }
    });
    return () => unsubscribe();
  }, []);

  const addAuditLog = (action: string, resource: string, status: 'SUCCESS' | 'DENIED' | 'FLAGGED' = 'SUCCESS') => {
    const newEntry: AuditLog = {
      id: 'aud-' + Date.now().toString(36),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: session.email || (session.isAnonymous ? 'anon.public@citizen' : session.name),
      role: session.role,
      action,
      resource,
      ipAddress: '10.14.82.' + Math.floor(Math.random() * 50 + 1),
      status
    };
    setAuditLogs(prev => [newEntry, ...prev.slice(0, 40)]);
  };

  const hasPermission = (permission: string): boolean => {
    return session.permissions.includes(permission);
  };

  const loginWithGoogleFirebase = async () => {
    try {
      const { user, role, profileData } = await signInWithGoogle();
      const perms = role === 'POLICY_MAKER' ? POLICY_MAKER_PERMISSIONS :
                    role === 'RESEARCHER' ? RESEARCHER_PERMISSIONS :
                    OFFICER_PERMISSIONS;

      const newSession: UserSession = {
        id: user.uid,
        name: user.displayName || 'Authorized User',
        email: user.email || '',
        avatar: user.photoURL || undefined,
        role: role as UserRole,
        organization: profileData.organization,
        department: profileData.department,
        designation: 'Verified Identity (Firebase Auth)',
        token: 'fb_token_' + user.uid,
        permissions: perms,
        isAnonymous: false
      };

      setSession(newSession);
      setActiveView(role === 'POLICY_MAKER' ? 'policy-maker' : role === 'RESEARCHER' ? 'researcher' : 'officer');
      addAuditLog('FIREBASE_GOOGLE_AUTH_SUCCESS', `UID_${user.uid}_ROLE_${role}`);
      return { success: true, role: role as UserRole };
    } catch (err: any) {
      addAuditLog('FIREBASE_AUTH_FAILED', err?.message || 'POPUP_CANCELLED', 'DENIED');
      return { success: false, error: err?.message || 'Google sign-in failed.' };
    }
  };

  const loginAsInstitutional = async (credentials: { email: string; pass: string; sso?: boolean }) => {
    if (credentials.sso) {
      const isPolicy = credentials.email.toLowerCase().includes('policy') || credentials.email.toLowerCase().includes('director');
      const role: UserRole = isPolicy ? 'POLICY_MAKER' : 'OFFICER';
      const newSession: UserSession = {
        id: 'usr-inst-' + Date.now(),
        name: isPolicy ? 'Dr. R. K. Varma, IAS' : 'Shri Alok Kumar, BAS',
        email: credentials.email || (isPolicy ? 'director.land@bihar.gov.in' : 'adm.patna@bihar.gov.in'),
        role,
        organization: isPolicy ? 'State Land Policy Directorate' : 'District Revenue & Collectorate',
        department: isPolicy ? 'Dept. of Land Reforms' : 'Patna District Revenue Division',
        designation: isPolicy ? 'Principal Secretary / Directorate Head' : 'Additional District Magistrate (Revenue)',
        token: 'jwt_inst_' + Math.random().toString(36),
        permissions: isPolicy ? POLICY_MAKER_PERMISSIONS : OFFICER_PERMISSIONS,
        isAnonymous: false
      };
      setSession(newSession);
      setActiveView(isPolicy ? 'policy-maker' : 'officer');
      addAuditLog('SSO_AUTHENTICATION_SUCCESS', `ROLE_${role}_GRANTED`);
      return { success: true, role };
    }

    if (!credentials.email || !credentials.pass) {
      addAuditLog('AUTH_FAILURE_EMPTY_CREDENTIALS', 'INSTITUTIONAL_PORTAL', 'DENIED');
      return { success: false, error: 'Email and password are required.' };
    }

    if (credentials.pass.length < 4) {
      addAuditLog('AUTH_FAILURE_INVALID_PASSWORD', credentials.email, 'DENIED');
      return { success: false, error: 'Invalid password. Check credentials.' };
    }

    const isPolicy = credentials.email.toLowerCase().includes('policy') || credentials.email.toLowerCase().includes('director');
    const role: UserRole = isPolicy ? 'POLICY_MAKER' : 'OFFICER';

    const newSession: UserSession = {
      id: 'usr-inst-' + Date.now(),
      name: isPolicy ? 'Dr. R. K. Varma, IAS' : 'Shri Alok Kumar, BAS',
      email: credentials.email,
      role,
      organization: isPolicy ? 'State Land Policy Directorate' : 'District Revenue & Collectorate',
      department: isPolicy ? 'Dept. of Land Reforms' : 'Patna District Revenue Division',
      designation: isPolicy ? 'Principal Secretary / Directorate Head' : 'Additional District Magistrate (Revenue)',
      token: 'jwt_inst_' + Math.random().toString(36),
      permissions: isPolicy ? POLICY_MAKER_PERMISSIONS : OFFICER_PERMISSIONS,
      isAnonymous: false
    };

    setSession(newSession);
    setActiveView(isPolicy ? 'policy-maker' : 'officer');
    addAuditLog('PASSWORD_AUTH_SUCCESS', `ROLE_${role}_GRANTED`);
    return { success: true, role };
  };

  const loginAsResearcher = async (credentials: { email: string; pass: string; sso?: boolean }) => {
    if (credentials.sso) {
      const role: UserRole = 'RESEARCHER';
      const newSession: UserSession = {
        id: 'usr-res-' + Date.now(),
        name: 'Dr. Anand V. Mishra',
        email: credentials.email || 'a.mishra@iitp.ac.in',
        role,
        organization: 'Centre for Spatial Economics & Land Governance, IIT Patna',
        department: 'Dept. of Civil & Environmental Engineering',
        designation: 'Associate Professor & Principal Investigator',
        token: 'jwt_res_' + Math.random().toString(36),
        permissions: RESEARCHER_PERMISSIONS,
        isAnonymous: false
      };
      setSession(newSession);
      setActiveView('researcher');
      addAuditLog('RESEARCHER_SSO_AUTH_SUCCESS', 'ROLE_RESEARCHER_GRANTED');
      return { success: true, role };
    }

    if (!credentials.email || !credentials.pass) {
      addAuditLog('AUTH_FAILURE_EMPTY_CREDENTIALS', 'RESEARCH_PORTAL', 'DENIED');
      return { success: false, error: 'Institutional email and password required.' };
    }

    const role: UserRole = 'RESEARCHER';
    const newSession: UserSession = {
      id: 'usr-res-' + Date.now(),
      name: 'Dr. Anand V. Mishra',
      email: credentials.email,
      role,
      organization: 'Centre for Spatial Economics & Land Governance, IIT Patna',
      department: 'Dept. of Civil & Environmental Engineering',
      designation: 'Associate Professor & Principal Investigator',
      token: 'jwt_res_' + Math.random().toString(36),
      permissions: RESEARCHER_PERMISSIONS,
      isAnonymous: false
    };

    setSession(newSession);
    setActiveView('researcher');
    addAuditLog('RESEARCHER_AUTH_SUCCESS', 'ROLE_RESEARCHER_GRANTED');
    return { success: true, role };
  };

  const switchDemoRole = (role: UserRole) => {
    if (role === 'PUBLIC') {
      setSession(PUBLIC_SESSION);
      setActiveView('public-explorer');
      addAuditLog('DEMO_ROLE_SWITCH', 'ROLE_PUBLIC');
    } else if (role === 'OFFICER') {
      setSession({
        id: 'usr-demo-officer',
        name: 'Shri Alok Kumar, BAS',
        email: 'officer.patna@bihar.gov.in',
        role: 'OFFICER',
        organization: 'Patna District Revenue Collectorate',
        department: 'Land Acquisition & Mutation Division',
        designation: 'Additional District Magistrate (ADM-Revenue)',
        token: 'demo_token_officer_patna',
        permissions: OFFICER_PERMISSIONS,
        isAnonymous: false
      });
      setActiveView('officer');
      addAuditLog('DEMO_ROLE_SWITCH', 'ROLE_OFFICER_PATNA');
    } else if (role === 'POLICY_MAKER') {
      setSession({
        id: 'usr-demo-policymaker',
        name: 'Dr. R. K. Varma, IAS',
        email: 'director.landpolicy@bihar.gov.in',
        role: 'POLICY_MAKER',
        organization: 'State Directorate of Land Governance & Spatial Planning',
        department: 'Policy Simulation & Master Planning Directorate',
        designation: 'Director & Special Secretary',
        token: 'demo_token_policymaker_state',
        permissions: POLICY_MAKER_PERMISSIONS,
        isAnonymous: false
      });
      setActiveView('policy-maker');
      addAuditLog('DEMO_ROLE_SWITCH', 'ROLE_POLICY_MAKER_STATE');
    } else if (role === 'RESEARCHER') {
      setSession({
        id: 'usr-demo-researcher',
        name: 'Dr. Anand V. Mishra',
        email: 'a.mishra@iitp.ac.in',
        role: 'RESEARCHER',
        organization: 'Centre for Spatial Economics, IIT Patna / ICAR Fellow',
        department: 'Spatial Econometrics & Land Dynamics Lab',
        designation: 'Senior Geospatial Research Fellow',
        token: 'demo_token_researcher_academic',
        permissions: RESEARCHER_PERMISSIONS,
        isAnonymous: false
      });
      setActiveView('researcher');
      addAuditLog('DEMO_ROLE_SWITCH', 'ROLE_RESEARCHER_ACADEMIC');
    }
  };

  const logoutToPublic = async () => {
    try {
      await signOutUser();
    } catch {
      // ignore
    }
    setSession(PUBLIC_SESSION);
    setActiveView('home');
    addAuditLog('USER_LOGOUT', 'SESSION_TERMINATED');
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !session.isAnonymous,
        isDemoMode,
        activeView,
        auditLogs,
        setActiveView,
        setIsDemoMode,
        loginAsInstitutional,
        loginAsResearcher,
        loginWithGoogleFirebase,
        switchDemoRole,
        logoutToPublic,
        hasPermission,
        addAuditLog
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
