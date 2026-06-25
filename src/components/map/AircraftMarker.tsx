import { memo } from 'react';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import type { FlightState } from '@/types/flight';
import {
  getAltitudeCategory,
  ALTITUDE_COLORS,
  formatAltitude,
  formatSpeed,
  formatHeading,
  formatVerticalRate,
} from '@/lib/units';

interface AircraftMarkerProps {
  flight: FlightState;
}

/**
 * Create a rotating airplane SVG icon as a Leaflet DivIcon.
 * Color-coded by altitude: green=low, yellow=mid, red=high, gray=ground.
 */
function createAircraftIcon(heading: number, onGround: boolean, baroAlt: number): L.DivIcon {
  const category = getAltitudeCategory(baroAlt, onGround);
  const color = ALTITUDE_COLORS[category];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <g transform="rotate(${heading}, 12, 12)">
        <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011.5 2 1.5 1.5 0 0010 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
          fill="${color}" stroke="${color}" stroke-width="0.5"/>
      </g>
    </svg>
  `;

  return L.divIcon({
    className: 'aircraft-marker',
    html: svg,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    tooltipAnchor: [0, -12],
    popupAnchor: [0, -12],
  });
}

/**
 * Single aircraft marker on the map.
 * - SVG airplane icon rotated by heading
 * - Color-coded by altitude
 * - Tooltip on hover (callsign, altitude)
 * - Click → popup with details + navigate link
 */
const AircraftMarker = memo(function AircraftMarker({ flight }: AircraftMarkerProps) {
  const navigate = useNavigate();

  const heading = flight.true_track ?? 0;
  const icon = createAircraftIcon(heading, flight.on_ground, flight.baro_altitude);

  const handleClick = () => {
    navigate(`/aircraft/${flight.icao24}`);
  };

  // Only render if we have valid position
  if (!flight.latitude || !flight.longitude) return null;

  return (
    <Marker
      position={[flight.latitude, flight.longitude]}
      icon={icon}
      eventHandlers={{
        click: () => {
          // Show popup on click, navigate on double-click or button
        },
        dblclick: handleClick,
      }}
    >
      {/* Tooltip on hover */}
      <Tooltip
        direction="top"
        offset={[0, -20]}
        className="aircraft-tooltip"
        permanent={false}
      >
        <div className="text-xs font-mono whitespace-nowrap">
          <strong>{flight.callsign || flight.icao24}</strong>
          <br />
          {formatAltitude(flight.baro_altitude)} · {formatSpeed(flight.velocity)}
        </div>
      </Tooltip>

      {/* Popup on click */}
      <Popup className="aircraft-popup" maxWidth={280} minWidth={220}>
        <div className="text-sm space-y-1">
          <h3 className="font-bold text-base border-b pb-1 mb-2">
            {flight.callsign || 'N/A'}
          </h3>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
            <span className="text-gray-500">ICAO24:</span>
            <span className="font-mono">{flight.icao24}</span>

            <span className="text-gray-500">Country:</span>
            <span>{flight.origin_country || 'Unknown'}</span>

            <span className="text-gray-500">Altitude:</span>
            <span className="font-mono">{formatAltitude(flight.baro_altitude)}</span>

            <span className="text-gray-500">Speed:</span>
            <span className="font-mono">{formatSpeed(flight.velocity)}</span>

            <span className="text-gray-500">Heading:</span>
            <span className="font-mono">{formatHeading(heading)}</span>

            <span className="text-gray-500">Vert. Rate:</span>
            <span className="font-mono">{formatVerticalRate(flight.vertical_rate)}</span>

            <span className="text-gray-500">Squawk:</span>
            <span className="font-mono">{flight.squawk || 'N/A'}</span>

            <span className="text-gray-500">On Ground:</span>
            <span>{flight.on_ground ? 'Yes' : 'No'}</span>
          </div>
          <button
            className="mt-2 w-full py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
            onClick={handleClick}
          >
            View Aircraft Details
          </button>
        </div>
      </Popup>
    </Marker>
  );
});

export default AircraftMarker;
