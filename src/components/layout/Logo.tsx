import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true, light = false }) => {
  const iconDimensions = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const titleSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subtitleSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Insignia Emblem Badge */}
      <div className={`relative ${iconDimensions} rounded-xl bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#070D1F] p-0.5 shadow-md flex items-center justify-center border border-amber-400/40 group`}>
        {/* Subtle geometric quadrant cross-lines */}
        <div className="absolute inset-1 rounded-lg border border-amber-400/20 pointer-events-none" />
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-amber-400/30 to-transparent pointer-events-none" />
        
        {/* Central Sanskrit Character 'भ' in Royal Gold */}
        <span className="font-bold text-amber-400 tracking-wider text-lg leading-none drop-shadow-sm font-serif">
          भ
        </span>

        {/* Orbital Nexus Dot */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B132B] shadow-xs animate-pulse" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-bold tracking-tight font-sans ${titleSize} ${light ? 'text-white' : 'text-[#0B132B]'}`}>
            BHUMI
          </span>
          <span className="text-amber-500 font-bold font-mono tracking-widest text-xs">
            ·
          </span>
          <span className={`font-bold tracking-tight font-sans ${titleSize} ${light ? 'text-blue-300' : 'text-blue-900'}`}>
            NEXUS
          </span>
        </div>
        
        {showSubtitle && (
          <span className={`font-medium tracking-wider uppercase font-mono mt-0.5 ${subtitleSize} ${light ? 'text-slate-400' : 'text-slate-500'}`}>
            Evidence-to-Policy Platform
          </span>
        )}
      </div>
    </div>
  );
};
