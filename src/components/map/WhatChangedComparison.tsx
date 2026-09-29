import React, { useState } from 'react';
import { PATNA_CHANGE_DATA } from '../../data/mockDatabase';
import { Layers, ArrowLeftRight, TrendingDown, TrendingUp, Calendar, Info, X } from 'lucide-react';

interface WhatChangedProps {
  regionId?: string;
  onClose?: () => void;
}

export const WhatChangedComparison: React.FC<WhatChangedProps> = ({ regionId = 'patna', onClose }) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const stats = PATNA_CHANGE_DATA[regionId] || PATNA_CHANGE_DATA.patna;
  const startStat = stats[0]; // 2018
  const endStat = stats[stats.length - 2]; // 2024

  const croplandDelta = endStat.croplandKm2 - startStat.croplandKm2;
  const croplandDeltaPct = Number(((croplandDelta / startStat.croplandKm2) * 100).toFixed(1));

  const builtUpDelta = endStat.builtUpKm2 - startStat.builtUpKm2;
  const builtUpDeltaPct = Number(((builtUpDelta / startStat.builtUpKm2) * 100).toFixed(1));

  const waterDelta = endStat.waterBodiesKm2 - startStat.waterBodiesKm2;
  const fallowDelta = endStat.fallowKm2 - startStat.fallowKm2;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg p-5">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-blue-900" />
          <div>
            <h3 className="font-bold text-base text-slate-900">
              What Changed? Multi-Temporal Satellite Change Detector
            </h3>
            <p className="text-xs text-slate-500">
              Comparing Sentinel-2 & Resourcesat LISS-IV multi-spectral classification (2018 vs 2024)
            </p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* KPI Comparison Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-red-800 font-medium">Cropland Conversion</span>
            <TrendingDown className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-xl font-bold font-mono text-red-900 tabular-nums">
            {croplandDelta} km²
          </div>
          <span className="text-[10px] text-red-700 font-medium">
            {croplandDeltaPct}% from 2018 baseline
          </span>
        </div>

        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-amber-800 font-medium">Built-Up Expansion</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold font-mono text-amber-900 tabular-nums">
            +{builtUpDelta} km²
          </div>
          <span className="text-[10px] text-amber-700 font-medium">
            +{builtUpDeltaPct}% urban infill
          </span>
        </div>

        <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-sky-800 font-medium">Waterbody Shrinkage</span>
            <TrendingDown className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-bold font-mono text-sky-900 tabular-nums">
            {waterDelta} km²
          </div>
          <span className="text-[10px] text-sky-700 font-medium">
            -9.8% riparian floodplains
          </span>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-700 font-medium">Idle Fallow Shift</span>
            <Layers className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 tabular-nums">
            {fallowDelta} km²
          </div>
          <span className="text-[10px] text-slate-600 font-medium">
            Speculative holding infill
          </span>
        </div>
      </div>

      {/* Visual Satellite Comparison Slider Simulator */}
      <div className="relative rounded-xl overflow-hidden bg-slate-900 h-64 border border-slate-300 mb-4 select-none">
        
        {/* Left View: 2018 Baseline */}
        <div 
          className="absolute inset-0 bg-[#064E3B] flex items-center justify-center overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          {/* Subtle agricultural grid */}
          <div className="absolute inset-0 opacity-25" style={{
            backgroundImage: 'linear-gradient(to right, #047857 1px, transparent 1px), linear-gradient(to bottom, #047857 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-mono">
            2018 Baseline · 1,740 km² Cropland (74.2%)
          </div>
          <div className="text-center text-emerald-200/90 font-medium text-sm">
            High Density Double-Crop Alluvial Soil
          </div>
        </div>

        {/* Right View: 2024 Transformed */}
        <div 
          className="absolute inset-0 bg-[#78350F] flex items-center justify-center overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          {/* Subtle urban cluster pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle, #D97706 2px, transparent 2px)',
            backgroundSize: '16px 16px'
          }} />
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-amber-300 px-3 py-1 rounded text-xs font-mono">
            2024 Observed · 1,180 km² Built-Up (+32.5%)
          </div>
          <div className="text-center text-amber-200 font-medium text-sm">
            Transit Corridors & Ribbon Urban Infill
          </div>
        </div>

        {/* Divider Bar & Slider Dragger */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-2xl z-20"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-lg border border-slate-300 text-xs font-bold">
            ↔
          </div>
        </div>

        {/* Range Input for Accessible Dragging */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
          aria-label="Satellite comparison slider"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>← Drag slider left/right to compare 2018 vs 2024 satellite land cover</span>
        <span className="font-mono text-[11px]">Source: NRSC Bhuvan LULC (ISRO) · Resolution: 10m</span>
      </div>
    </div>
  );
};
