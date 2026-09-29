import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Compass, 
  Navigation, 
  Maximize2, 
  Info, 
  Search, 
  Crosshair, 
  ExternalLink,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface RealLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: 'Administration' | 'Corridor' | 'Riparian' | 'Agrarian' | 'Industrial';
  croplandShare: number;
  builtUpShare: number;
  riskScore: number;
  description: string;
  cadastralCode: string;
}

export const REAL_LOCATIONS: RealLocation[] = [
  {
    id: 'patna_core',
    name: 'Patna District Collectorate & High Court',
    lat: 25.6093,
    lng: 85.1376,
    category: 'Administration',
    croplandShare: 12.4,
    builtUpShare: 78.5,
    riskScore: 78,
    description: 'Metropolitan core along the southern bank of River Ganga; primary seat of district land revenue administration.',
    cadastralCode: 'BR-PAT-ADM-01'
  },
  {
    id: 'bihta_corridor',
    name: 'Bihta Elevated Expressway & Civil Enclave',
    lat: 25.5658,
    lng: 84.8728,
    category: 'Corridor',
    croplandShare: 58.2,
    builtUpShare: 34.6,
    riskScore: 84,
    description: 'Rapid peri-urban logistics corridor. Experienced +240% built-up expansion above baseline with high speculative acquisitions.',
    cadastralCode: 'BR-PAT-BIH-04'
  },
  {
    id: 'digha_diara',
    name: 'Digha-Danapur Ganga Riparian Floodplain',
    lat: 25.6425,
    lng: 85.1114,
    category: 'Riparian',
    croplandShare: 44.0,
    builtUpShare: 28.0,
    riskScore: 92,
    description: 'Active seasonal inundation envelope. 42 permanent masonry footings identified within the High Flood Level (HFL).',
    cadastralCode: 'BR-PAT-DGH-12'
  },
  {
    id: 'nalanda_basin',
    name: 'Nalanda South Agrarian & Aquifer Basin',
    lat: 25.1357,
    lng: 85.4435,
    category: 'Agrarian',
    croplandShare: 74.5,
    builtUpShare: 15.2,
    riskScore: 52,
    description: 'Traditional ahar-pyne community irrigation network sustaining high-yield paddy-wheat rotations.',
    cadastralCode: 'BR-NAL-AGR-08'
  },
  {
    id: 'vaishali_doab',
    name: 'Vaishali Riparian Doab & Wetland',
    lat: 25.6842,
    lng: 85.2155,
    category: 'Riparian',
    croplandShare: 76.9,
    builtUpShare: 12.2,
    riskScore: 58,
    description: 'Ganga-Gandak interfluve floodplain. High agricultural fertility counterbalanced by seasonal monsoon backwaters.',
    cadastralCode: 'BR-VAI-DOA-02'
  },
  {
    id: 'gaya_hub',
    name: 'Gaya Bodh-Gaya Heritage Radial',
    lat: 24.7914,
    lng: 85.0002,
    category: 'Corridor',
    croplandShare: 59.2,
    builtUpShare: 21.0,
    riskScore: 49,
    description: 'Falgu River alluvial tract connecting NH-19 (Grand Trunk Road) with international tourism nodes.',
    cadastralCode: 'BR-GAY-TRN-03'
  },
  {
    id: 'muzaffarpur_spine',
    name: 'Muzaffarpur NH-28 Commercial Spine',
    lat: 26.1209,
    lng: 85.3647,
    category: 'Corridor',
    croplandShare: 71.4,
    builtUpShare: 18.5,
    riskScore: 71,
    description: 'North Bihar agro-logistics gateway. Rapid strip commercial infill along the national highway radial.',
    cadastralCode: 'BR-MUZ-SPN-07'
  },
  {
    id: 'begusarai_refinery',
    name: 'Begusarai-Barauni Industrial Petrochemical Hub',
    lat: 25.4182,
    lng: 86.1272,
    category: 'Industrial',
    croplandShare: 62.0,
    builtUpShare: 24.5,
    riskScore: 68,
    description: 'Heavy industrial node bordering fertile Gangetic tal lands; soil environmental monitoring zone.',
    cadastralCode: 'BR-BEG-IND-05'
  }
];

interface RealisticWorldMapProps {
  onSelectLocation?: (loc: RealLocation) => void;
  onOpenWhyHere?: (id: string) => void;
  onOpenWhatChanged?: (id: string) => void;
}

export const RealisticWorldMap: React.FC<RealisticWorldMapProps> = ({
  onSelectLocation,
  onOpenWhyHere,
  onOpenWhatChanged
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [basemapMode, setBasemapMode] = useState<'satellite' | 'street' | 'topo'>('satellite');
  const [selectedLoc, setSelectedLoc] = useState<RealLocation>(REAL_LOCATIONS[0]);
  const [clickedCoord, setClickedCoord] = useState<{ lat: number; lng: number } | null>(null);
  const [userGps, setUserGps] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create map centered on Patna, Bihar
      const map = L.map(mapContainerRef.current, {
        center: [25.5941, 85.1376],
        zoom: 11,
        zoomControl: false,
      });

      // Add zoom control top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Default Basemap: Esri World Imagery (High-Resolution Satellite)
      const satelliteTiles = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 18,
        }
      ).addTo(map);

      tileLayerRef.current = satelliteTiles;

      // Group for markers
      const markerGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markerGroup;

      // Map click handler to inspect real coordinates
      map.on('click', (e: L.LeafletMouseEvent) => {
        setClickedCoord({
          lat: Number(e.latlng.lat.toFixed(5)),
          lng: Number(e.latlng.lng.toFixed(5))
        });
      });

      // Draw real River Ganga riparian corridor polyline
      const gangaCoords: [number, number][] = [
        [25.68, 84.85],
        [25.66, 84.95],
        [25.64, 85.05],
        [25.635, 85.13],
        [25.62, 85.22],
        [25.58, 85.35],
        [25.55, 85.45],
        [25.51, 85.60]
      ];
      L.polyline(gangaCoords, {
        color: '#38BDF8',
        weight: 6,
        opacity: 0.8,
        lineCap: 'round',
      }).addTo(map).bindPopup('<strong>River Ganga Riparian Reserve</strong><br>Statutory 500m Eco-Sensitive Zone');

      // Draw Patna Metropolitan Regulatory Boundary Polygon
      const patnaBoundary: [number, number][] = [
        [25.67, 85.00],
        [25.65, 85.26],
        [25.52, 85.34],
        [25.48, 85.15],
        [25.53, 84.85],
        [25.62, 84.86]
      ];
      L.polygon(patnaBoundary, {
        color: '#F59E0B',
        weight: 2,
        fillColor: '#F59E0B',
        fillOpacity: 0.1,
        dashArray: '5, 5'
      }).addTo(map).bindPopup('<strong>Patna District Planning Boundary</strong><br>3,202 km² Area · Master Plan 2031 Horizon');

      mapInstanceRef.current = map;
    }

    return () => {
      // cleanup on unmount
    };
  }, []);

  // Update Markers when locations change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    REAL_LOCATIONS.forEach((loc) => {
      const isSelected = selectedLoc.id === loc.id;
      
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background: ${isSelected ? '#F59E0B' : '#0B132B'};
            color: #FFFFFF;
            width: ${isSelected ? '32px' : '26px'};
            height: ${isSelected ? '32px' : '26px'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 11px;
            border: 2px solid ${isSelected ? '#FFFFFF' : '#38BDF8'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            transition: all 0.2s ease;
          ">
            ${loc.category === 'Administration' ? '🏛️' : loc.category === 'Riparian' ? '🌊' : loc.category === 'Agrarian' ? '🌾' : '📍'}
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon })
        .addTo(markersLayerRef.current!)
        .bindPopup(`
          <div style="font-family: sans-serif; padding: 4px;">
            <strong style="color: #0B132B; font-size: 13px;">${loc.name}</strong><br/>
            <span style="font-size: 11px; color: #64748B;">Cadastre: ${loc.cadastralCode}</span><br/>
            <div style="margin-top: 4px; font-size: 11px;">
              <strong>Cropland:</strong> ${loc.croplandShare}% | <strong>Built-up:</strong> ${loc.builtUpShare}%<br/>
              <strong>Risk Score:</strong> <span style="color: #DC2626; font-weight: bold;">${loc.riskScore}/100</span>
            </div>
          </div>
        `);

      marker.on('click', () => {
        setSelectedLoc(loc);
        if (onSelectLocation) onSelectLocation(loc);
      });
    });
  }, [selectedLoc, onSelectLocation]);

  // Handle Basemap Switcher
  const handleBasemapChange = (mode: 'satellite' | 'street' | 'topo') => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    setBasemapMode(mode);

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    let newUrl = '';
    let attribution = '';

    if (mode === 'satellite') {
      newUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri World Imagery (High-Resolution Satellite · No API Key Required)';
    } else if (mode === 'street') {
      newUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors · CartoDB (Open Civic Data · No API Key Required)';
    } else {
      // High-reliability Esri World Topographic relief contours - 100% uptime with NO API key needed
      newUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri World Topographic & National Geographic (No API Key Required)';
    }

    const newLayer = L.tileLayer(newUrl, { 
      attribution, 
      maxZoom: 18,
      crossOrigin: true
    });
    newLayer.addTo(mapInstanceRef.current);
    tileLayerRef.current = newLayer;
  };

  // Fly to location
  const handleFlyTo = (loc: RealLocation) => {
    setSelectedLoc(loc);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([loc.lat, loc.lng], 13, { duration: 1.5 });
    }
    if (onSelectLocation) onSelectLocation(loc);
  };

  // Geolocation trigger
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const { latitude, longitude } = pos.coords;
        setUserGps({ lat: latitude, lng: longitude });

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 14, { duration: 1.5 });
          
          L.circle([latitude, longitude], {
            radius: pos.coords.accuracy || 100,
            color: '#3B82F6',
            fillColor: '#93C5FD',
            fillOpacity: 0.3
          }).addTo(mapInstanceRef.current).bindPopup('<strong>Your Real-World Location</strong>').openPopup();
        }
      },
      (err) => {
        setLocating(false);
        console.warn('Geolocation error:', err);
        // Default to Patna
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([25.6093, 85.1376], 13);
        }
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
      
      {/* Top Map Toolbar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        
        {/* Fly to Location Selector */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-900" />
          <span className="text-xs font-semibold text-slate-700">Real Location:</span>
          <select
            value={selectedLoc.id}
            onChange={(e) => {
              const found = REAL_LOCATIONS.find(l => l.id === e.target.value);
              if (found) handleFlyTo(found);
            }}
            className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 font-medium shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-900/20"
          >
            {REAL_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.category})
              </option>
            ))}
          </select>
        </div>

        {/* Basemap Mode Toggles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => handleBasemapChange('satellite')}
              className={`px-3 py-1 rounded font-semibold transition-colors cursor-pointer ${
                basemapMode === 'satellite' ? 'bg-[#0B132B] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite Imagery
            </button>
            <button
              onClick={() => handleBasemapChange('street')}
              className={`px-3 py-1 rounded font-semibold transition-colors cursor-pointer ${
                basemapMode === 'street' ? 'bg-[#0B132B] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Street (OSM)
            </button>
            <button
              onClick={() => handleBasemapChange('topo')}
              className={`px-3 py-1 rounded font-semibold transition-colors cursor-pointer ${
                basemapMode === 'topo' ? 'bg-[#0B132B] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Topographic (Esri Relief)
            </button>
          </div>

          <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            No API Key Required (Public OGC Tiles)
          </span>
        </div>

        {/* GPS Locate Me Button */}
        <button
          onClick={handleLocateMe}
          disabled={locating}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer"
        >
          <Crosshair className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
          <span>{locating ? 'Locating...' : 'Locate My Real GPS'}</span>
        </button>

      </div>

      {/* Map Viewport & Real-World Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        
        {/* Leaflet Map Canvas (Col 8) */}
        <div className="lg:col-span-8 relative bg-slate-950">
          <div ref={mapContainerRef} className="w-full h-[520px] z-10" />

          {/* Coordinate HUD Overlay */}
          <div className="absolute top-3 left-3 z-20 bg-[#0B132B]/85 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-slate-700/80 text-[11px] font-mono shadow-md flex items-center gap-3">
            <div>
              <span className="text-slate-400">Lat:</span> {selectedLoc.lat.toFixed(4)}° N
            </div>
            <div>
              <span className="text-slate-400">Lng:</span> {selectedLoc.lng.toFixed(4)}° E
            </div>
            <div className="hidden sm:block text-amber-400 font-semibold">
              WGS-84 / EPSG:4326
            </div>
          </div>

          {/* Click to inspect tooltip banner */}
          {clickedCoord && (
            <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-300 text-xs shadow-lg text-slate-800 flex items-center gap-2">
              <Crosshair className="w-3.5 h-3.5 text-blue-900" />
              <span>
                Clicked Coordinate: <strong className="font-mono">{clickedCoord.lat}, {clickedCoord.lng}</strong>
              </span>
            </div>
          )}

          {/* Legend badge */}
          <div className="absolute bottom-3 right-3 z-20 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" /> Ganga Buffer</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Patna Boundary</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical Infill</span>
          </div>
        </div>

        {/* Selected Location Profile Deck (Col 4) */}
        <div className="lg:col-span-4 p-6 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 font-bold bg-blue-50 px-2 py-0.5 rounded">
                  {selectedLoc.category} Jurisdiction
                </span>
                <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  Risk: {selectedLoc.riskScore}/100
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {selectedLoc.name}
              </h3>
              <span className="text-xs font-mono text-slate-500 block">
                Cadastral ID: {selectedLoc.cadastralCode}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedLoc.description}
            </p>

            {/* Land Cover Indicators */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-[11px] text-emerald-800 font-semibold block">Cropland Share</span>
                <span className="text-xl font-bold font-mono text-emerald-950 tabular-nums">
                  {selectedLoc.croplandShare}%
                </span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">
                  Gangetic Silty Loam
                </span>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-[11px] text-amber-800 font-semibold block">Built-Up Share</span>
                <span className="text-xl font-bold font-mono text-amber-950 tabular-nums">
                  {selectedLoc.builtUpShare}%
                </span>
                <span className="text-[10px] text-amber-700 block mt-0.5">
                  Urban & Infill Corridors
                </span>
              </div>
            </div>

            {/* Google Maps Real-World External Link */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selectedLoc.lat},${selectedLoc.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-900" />
                <span>Open in Google Maps Satellite</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Street View</span>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => onOpenWhyHere && onOpenWhyHere('patna')}
              className="w-full py-2.5 px-3 bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center justify-between transition-colors shadow-2xs cursor-pointer"
            >
              <span>Explain Spatial Drivers ("Why Here?")</span>
              <span>→</span>
            </button>

            <button
              onClick={() => onOpenWhatChanged && onOpenWhatChanged('patna')}
              className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-between transition-colors border border-slate-300 cursor-pointer"
            >
              <span>Satellite Change Timeline (2018 vs 2024)</span>
              <span>↔</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
