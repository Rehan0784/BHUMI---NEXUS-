import React, { useState } from 'react';
import { Activity, AlertCircle, Compass, HelpCircle, MapPin, Database, BookOpen } from 'lucide-react';

export const ResearchGapDetector: React.FC = () => {
  const [filterTopic, setFilterTopic] = useState<'all' | 'cadastral' | 'climate' | 'periurban'>('all');

  const researchGaps = [
    {
      id: 'gap-01',
      region: 'Saran & Siwan Doab',
      topic: 'Unrecorded Tenancy & Sharecropping Conversion',
      category: 'cadastral',
      severity: 'Critical Deficit',
      gapDescription: 'High density of informal bataidari (sharecropping) contracts with zero digital cadastral documentation; satellite LULC cannot discern tenant displacement.',
      missingData: 'Informal agrarian lease survey & micro-credit flow telemetry',
      existingStudiesCount: 2,
      dataHealthDeficit: '64% Blind Spot',
      recommendedCall: 'Initiate field enumeration of bataidar rights prior to Gandak canal modernization.'
    },
    {
      id: 'gap-02',
      region: 'Kosi-Seemanchal Flood Belt',
      topic: 'Siltation-Induced Land Abandonment & Shifting River Courses',
      category: 'climate',
      severity: 'High Deficit',
      gapDescription: 'Coarse sand deposition (balu-burd) renders thousands of hectares temporarily fallow without clear cadastral compensation guidelines.',
      missingData: 'Multi-year post-flood soil fertility restoration satellite indices',
      existingStudiesCount: 4,
      dataHealthDeficit: '48% Blind Spot',
      recommendedCall: 'Commission joint ICAR-ISRO high-frequency optical-radar silt restoration mapping.'
    },
    {
      id: 'gap-03',
      region: 'Begusarai-Barauni Petrochemical Belt',
      topic: 'Industrial Soil Contamination & Heavy Metal Seepage into Crop Fields',
      category: 'periurban',
      severity: 'High Deficit',
      gapDescription: 'Zero peer-reviewed spatial studies analyzing heavy metal accumulation in alluvial croplands bordering older refinery zones.',
      missingData: 'Systematic 100m grid soil toxicology and heavy metal ICP-MS logs',
      existingStudiesCount: 1,
      dataHealthDeficit: '78% Blind Spot',
      recommendedCall: 'State Pollution Control Board (BSPCB) spatial GIS soil testing mandate.'
    },
    {
      id: 'gap-04',
      region: 'Kaimur Plateau & Rohtas Escarpment',
      topic: 'Forest Rights Act (FRA) Community Forest Resource Boundary Reconciliations',
      category: 'cadastral',
      severity: 'Moderate Deficit',
      gapDescription: 'Tribal community forest rights (CFR) claims have not been harmonized with the digitized Survey of India topo-sheets.',
      missingData: 'Participatory DGPS boundary polygons for traditional hamlet grazing commons',
      existingStudiesCount: 3,
      dataHealthDeficit: '42% Blind Spot',
      recommendedCall: 'Deploy handheld DGPS mobile mapper for Gram Sabha verified boundary marking.'
    }
  ];

  const filteredGaps = researchGaps.filter(g => filterTopic === 'all' || g.category === filterTopic);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
              <Activity className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-base text-slate-900">
              Research Gap Detector: Geographic & Thematic Blind Spots
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Automated detection of under-researched agro-ecological zones, missing dataset frequencies, and literature blind spots.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setFilterTopic('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filterTopic === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Gaps (4)
          </button>
          <button
            onClick={() => setFilterTopic('cadastral')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filterTopic === 'cadastral' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cadastral Tenancy
          </button>
          <button
            onClick={() => setFilterTopic('climate')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filterTopic === 'climate' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Climate & Siltation
          </button>
          <button
            onClick={() => setFilterTopic('periurban')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filterTopic === 'periurban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Industrial Seepage
          </button>
        </div>
      </div>

      {/* Gap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGaps.map((gap) => (
          <div key={gap.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-xs font-bold text-blue-900">
                  <MapPin className="w-3.5 h-3.5 text-blue-800" />
                  {gap.region}
                </span>
                <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                  gap.severity === 'Critical Deficit' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {gap.dataHealthDeficit}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-slate-900 mb-2">
                {gap.topic}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {gap.gapDescription}
              </p>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs mb-3 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Database className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold">Missing Dataset:</span>
                </div>
                <p className="text-[11px] text-slate-500">{gap.missingData}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80">
              <span className="text-[11px] font-semibold text-blue-950 block mb-1">
                Actionable Call for Research Proposals:
              </span>
              <p className="text-[11px] text-slate-600 italic">
                {gap.recommendedCall}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
