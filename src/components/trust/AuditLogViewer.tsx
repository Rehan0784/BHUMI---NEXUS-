import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Clock, FileText, CheckCircle2, AlertTriangle, Search } from 'lucide-react';

export const AuditLogViewer: React.FC = () => {
  const { auditLogs } = useAuth();
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = auditLogs.filter(log =>
    log.user.toLowerCase().includes(filterQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
    log.resource.toLowerCase().includes(filterQuery.toLowerCase()) ||
    log.role.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
              <Shield className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-base text-slate-900">
              Security Audit Log & Immutable Compliance Trail
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Real-time logging of authentication events, dataset downloads, scenario runs, and privilege verifications.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search audit trail..."
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
          />
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-xs border-collapse font-sans">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <th className="p-3 font-semibold">Timestamp</th>
              <th className="p-3 font-semibold">User Identity</th>
              <th className="p-3 font-semibold">Role</th>
              <th className="p-3 font-semibold">Security Action</th>
              <th className="p-3 font-semibold">Target Resource</th>
              <th className="p-3 font-semibold">Client IP</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                <td className="p-3 font-sans font-medium text-slate-900">{log.user}</td>
                <td className="p-3 font-sans">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    log.role === 'OFFICER' ? 'bg-blue-100 text-blue-800' :
                    log.role === 'POLICY_MAKER' ? 'bg-purple-100 text-purple-800' :
                    log.role === 'RESEARCHER' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {log.role}
                  </span>
                </td>
                <td className="p-3 text-slate-800">{log.action}</td>
                <td className="p-3 text-slate-600 truncate max-w-xs">{log.resource}</td>
                <td className="p-3 text-slate-500">{log.ipAddress}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    log.status === 'SUCCESS' ? 'text-emerald-700 bg-emerald-50' :
                    log.status === 'DENIED' ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
