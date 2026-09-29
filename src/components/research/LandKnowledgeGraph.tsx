import React, { useState } from 'react';
import { KNOWLEDGE_GRAPH_NODES, KNOWLEDGE_GRAPH_LINKS } from '../../data/knowledgeGraphData';
import { EvidenceNode, EvidenceLink } from '../../types';
import { Layers, Search, Filter, ShieldCheck, Info, ExternalLink, X } from 'lucide-react';

export const LandKnowledgeGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<EvidenceNode>(KNOWLEDGE_GRAPH_NODES[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fixed coordinates for clean readable presentation of the 12 nodes
  const nodePositions: Record<string, { x: number; y: number }> = {
    'pol-01': { x: 200, y: 100 },
    'pol-02': { x: 400, y: 80 },
    'reg-01': { x: 320, y: 220 },
    'reg-02': { x: 540, y: 200 },
    'infra-01': { x: 180, y: 240 },
    'lu-01': { x: 320, y: 340 },
    'clim-01': { x: 480, y: 340 },
    'econ-01': { x: 200, y: 360 },
    'pap-01': { x: 460, y: 440 },
    'pap-02': { x: 620, y: 320 },
    'ds-01': { x: 340, y: 460 },
    'ds-02': { x: 200, y: 460 }
  };

  const filteredNodes = KNOWLEDGE_GRAPH_NODES.filter(n => {
    const matchesFilter = filterType === 'all' || n.type === filterType;
    const matchesSearch = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getNodeColor = (type: EvidenceNode['type']) => {
    switch (type) {
      case 'policy': return '#4338CA'; // Indigo
      case 'region': return '#D97706'; // Amber
      case 'infrastructure': return '#7E22CE'; // Purple
      case 'indicator': return '#059669'; // Emerald
      case 'paper': return '#2563EB'; // Blue
      case 'dataset': return '#0F766E'; // Teal
      default: return '#475569';
    }
  };

  // Connected links for selected node
  const activeLinks = KNOWLEDGE_GRAPH_LINKS.filter(
    l => l.source === selectedNode.id || l.target === selectedNode.id
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
              <Layers className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-base text-slate-900">
              Land Knowledge Graph: Ontological Evidence Network
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Interactive multi-relational network connecting policies, geography, infrastructure, hydrology, indicators, and peer research.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search graph nodes..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
          >
            <option value="all">All Node Types</option>
            <option value="policy">Policies</option>
            <option value="region">Regions</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="indicator">Indicators</option>
            <option value="paper">Research Papers</option>
            <option value="dataset">Datasets</option>
          </select>
        </div>
      </div>

      {/* Main Graph Grid (SVG + Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Graph Canvas (Col 8) */}
        <div className="lg:col-span-8 bg-[#070D1F] rounded-xl p-4 relative min-h-[460px] overflow-hidden flex items-center justify-center">
          
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #38BDF8 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          <svg viewBox="100 40 600 480" className="w-full h-full max-h-[450px]">
            {/* Draw Links */}
            {KNOWLEDGE_GRAPH_LINKS.map((link, idx) => {
              const src = nodePositions[link.source];
              const tgt = nodePositions[link.target];
              if (!src || !tgt) return null;
              const isConnected = link.source === selectedNode.id || link.target === selectedNode.id;

              return (
                <g key={idx}>
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={tgt.x}
                    y2={tgt.y}
                    stroke={isConnected ? '#FBBF24' : '#334155'}
                    strokeWidth={isConnected ? 2.5 : 1}
                    strokeDasharray={link.strength === 'hypothetical' ? '4 2' : undefined}
                    opacity={isConnected ? 0.95 : 0.4}
                  />
                  {isConnected && (
                    <text
                      x={(src.x + tgt.x) / 2}
                      y={(src.y + tgt.y) / 2 - 4}
                      fill="#FDE68A"
                      fontSize="8"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="select-none pointer-events-none"
                    >
                      {link.relationship}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Draw Nodes */}
            {filteredNodes.map((node) => {
              const pos = nodePositions[node.id];
              if (!pos) return null;
              const isSelected = selectedNode.id === node.id;
              const color = getNodeColor(node.type);

              return (
                <g 
                  key={node.id} 
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode(node)}
                >
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 18 : 14}
                    fill={color}
                    stroke={isSelected ? '#FBBF24' : '#FFFFFF'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-200"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 26}
                    fill={isSelected ? '#FDE68A' : '#E2E8F0'}
                    fontSize="9"
                    fontWeight={isSelected ? 'bold' : '500'}
                    textAnchor="middle"
                    className="pointer-events-none select-none drop-shadow"
                  >
                    {node.label}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y - 18}
                    fill="#94A3B8"
                    fontSize="7"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="pointer-events-none select-none uppercase tracking-wider"
                  >
                    {node.type}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Canvas Legend */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 flex items-center gap-3 text-[10px] text-slate-300">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" /> Policy</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Region</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block" /> Infra</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Indicator</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Paper</span>
          </div>
        </div>

        {/* Node Inspector Deck (Col 4) */}
        <div className="lg:col-span-4 p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 font-bold block">
                Selected Knowledge Entity ({selectedNode.type})
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">
                {selectedNode.label}
              </h4>
              <span className="text-xs text-slate-500">
                Source: <strong>{selectedNode.source}</strong>
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedNode.description}
            </p>

            {/* Node Metrics */}
            {selectedNode.metrics && (
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-800 block">
                  Ground-Truth Metrics:
                </span>
                {Object.entries(selectedNode.metrics).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs">
                    <span className="text-slate-500 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-mono font-semibold text-slate-800 tabular-nums">{String(v)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Connected Links */}
            <div>
              <span className="text-xs font-semibold text-slate-900 block mb-1.5">
                Active Relational Connections ({activeLinks.length}):
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {activeLinks.map((link, idx) => {
                  const targetNode = KNOWLEDGE_GRAPH_NODES.find(n => n.id === (link.source === selectedNode.id ? link.target : link.source));
                  return (
                    <div key={idx} className="p-2 bg-white rounded border border-slate-200 text-xs flex items-center justify-between">
                      <span className="text-slate-600 truncate max-w-[150px]">
                        {targetNode?.label}
                      </span>
                      <span className="text-[10px] font-mono text-blue-900 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
                        {link.relationship}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Graph Confidence: <strong>{selectedNode.confidence || 95}%</strong></span>
            <span className="text-emerald-700 font-medium">Grounded Edge</span>
          </div>
        </div>

      </div>
    </div>
  );
};
