import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import type { FlightState, MapBounds } from '@/types/flight';
import { useFlightsByBbox } from '@/hooks/useFlights';
import AircraftMarker from '@/components/map/AircraftMarker';
import 'leaflet/dist/leaflet.css';

// --- Tile layer definitions ---
const TILE_LAYERS = {
  dark: {
    name: 'Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  satellite: {
    name: 'Satellite',
    url: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    attribution: '&copy; Google',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  },
  terrain: {
    name: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
  },
  osm: {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
  },
} as const;

type TileLayerKey = keyof typeof TILE_LAYERS;

// --- MapController: handles bounds tracking + fit on load ---
interface MapControllerProps {
  onBoundsChange: (bounds: MapBounds) => void;
  flights: FlightState[];
}

function MapController({ onBoundsChange, flights }: MapControllerProps) {
  const map = useMap();
  const [initialFit, setInitialFit] = useState(false);

  // Track bounds changes
  const handleMoveEnd = useCallback(() => {
    const b = map.getBounds();
    onBoundsChange({
      lamin: b.getSouth(),
      lomin: b.getWest(),
      lamax: b.getNorth(),
      lomax: b.getEast(),
    });
  }, [map, onBoundsChange]);

  useEffect(() => {
    map.on('moveend', handleMoveEnd);
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map, handleMoveEnd]);

  // Fit bounds to visible aircraft on first load
  useEffect(() => {
    if (initialFit || flights.length === 0) return;
    setInitialFit(true);

    const validFlights = flights.filter(
      (f) => f.latitude !== 0 && f.longitude !== 0
    );
    if (validFlights.length === 0) return;

    const bounds = L.latLngBounds(
      validFlights.map((f) => [f.latitude, f.longitude] as L.LatLngTuple)
    );

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
    }
  }, [flights, map, initialFit]);

  return null;
}

// --- Default bounds (roughly continental US) ---
const DEFAULT_BOUNDS: MapBounds = {
  lamin: 24.0,
  lomin: -125.0,
  lamax: 50.0,
  lomax: -66.0,
};

// --- FlightMap Component ---
interface FlightMapProps {
  flights?: FlightState[];
  initialBounds?: MapBounds;
  className?: string;
  onAircraftSelect?: (aircraft: FlightState) => void;
}

function FlightMap({ flights: externalFlights, initialBounds = DEFAULT_BOUNDS, className = '' }: FlightMapProps) {
  const [bounds, setBounds] = useState<MapBounds>(initialBounds);
  const [activeLayer, setActiveLayer] = useState<TileLayerKey>('dark');

  // Use external flights if provided, otherwise fetch by bounds
  const { data: fetchedFlights = [] } = useFlightsByBbox(externalFlights ? null : bounds);
  const flights = externalFlights ?? fetchedFlights;

  // Center from initial bounds
  const center = useMemo<L.LatLngTuple>(
    () => [
      (initialBounds.lamin + initialBounds.lamax) / 2,
      (initialBounds.lomin + initialBounds.lomax) / 2,
    ],
    [initialBounds]
  );

  const handleBoundsChange = useCallback((newBounds: MapBounds) => {
    setBounds(newBounds);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Layer toggle buttons (custom, outside Leaflet) */}
      <div className="absolute top-3 right-3 z-[1000] flex gap-1 bg-black/70 backdrop-blur-sm rounded-lg p-1 shadow-lg">
        {(Object.keys(TILE_LAYERS) as TileLayerKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveLayer(key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeLayer === key
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {TILE_LAYERS[key].name}
          </button>
        ))}
      </div>

      {/* Flight count badge */}
      <div className="absolute top-3 left-3 z-[1000] bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
        <span className="text-xs text-gray-300">
          <span className="text-green-400 font-bold">{flights.length.toLocaleString()}</span>
          {' '}aircraft tracked
        </span>
      </div>

      <MapContainer
        center={center}
        zoom={5}
        className="w-full h-full"
        zoomControl={true}
        attributionControl={true}
      >
        {/* Active tile layer */}
        <TileLayer
          key={activeLayer}
          url={TILE_LAYERS[activeLayer].url}
          attribution={TILE_LAYERS[activeLayer].attribution}
          {...(TILE_LAYERS[activeLayer] as Record<string, unknown>).subdomains
            ? { subdomains: [...((TILE_LAYERS[activeLayer] as Record<string, unknown>).subdomains as string[])] }
            : {}}
        />

        {/* Map controller for bounds tracking + auto-fit */}
        <MapController
          onBoundsChange={handleBoundsChange}
          flights={flights}
        />

        {/* Render aircraft markers */}
        {flights.map((flight) => (
          <AircraftMarker key={flight.icao24} flight={flight} />
        ))}
      </MapContainer>
    </div>
  );
}

export default FlightMap;
export { TILE_LAYERS, type TileLayerKey };
