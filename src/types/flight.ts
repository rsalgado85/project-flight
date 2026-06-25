export interface Aircraft {
  icao24: string;
  callsign?: string;
  origin_country?: string;
  time_position?: number;
  last_contact?: number;
  longitude?: number;
  latitude?: number;
  baro_altitude?: number;
  geo_altitude?: number;
  velocity?: number;
  heading?: number;
  true_track?: number;
  vertical_rate?: number;
  on_ground?: boolean;
  squawk?: string;
  spi?: boolean;
  category?: number;
  position_source?: number;
}

export interface Airport {
  id: string;
  ident: string;
  type: string;
  name: string;
  latitude_deg: number;
  longitude_deg: number;
  elevation_ft?: number;
  continent: string;
  iso_country: string;
  municipality?: string;
  scheduled_service: boolean;
  gps_code?: string;
  iata_code?: string;
  local_code?: string;
  home_link?: string;
  wikipedia_link?: string;
  keywords?: string;
}

export interface FlightState {
  icao24: string;
  callsign: string;
  origin_country: string;
  time_position: number;
  last_contact: number;
  longitude: number;
  latitude: number;
  baro_altitude: number;
  geo_altitude: number;
  velocity: number;
  true_track: number;
  vertical_rate: number;
  on_ground: boolean;
  squawk: string;
  position_source: number;
}

/** OpenSky raw state array index mapping */
export const OPENSKY_STATE_INDEX = {
  icao24: 0,
  callsign: 1,
  origin_country: 2,
  time_position: 3,
  last_contact: 4,
  longitude: 5,
  latitude: 6,
  baro_altitude: 7,
  on_ground: 8,
  velocity: 9,
  true_track: 10,
  vertical_rate: 11,
  sensors: 12,
  geo_altitude: 13,
  squawk: 14,
  spi: 15,
  position_source: 16,
} as const;

/** Normalize a raw OpenSky state array to a FlightState object */
export function normalizeFlightState(raw: (unknown)[] | null): FlightState | null {
  if (!raw || !Array.isArray(raw) || raw.length < 17) return null;
  const idx = OPENSKY_STATE_INDEX;
  return {
    icao24: (raw[idx.icao24] as string)?.trim() ?? '',
    callsign: (raw[idx.callsign] as string)?.trim() ?? '',
    origin_country: (raw[idx.origin_country] as string)?.trim() ?? '',
    time_position: Number(raw[idx.time_position]) || 0,
    last_contact: Number(raw[idx.last_contact]) || 0,
    longitude: Number(raw[idx.longitude]) || 0,
    latitude: Number(raw[idx.latitude]) || 0,
    baro_altitude: Number(raw[idx.baro_altitude]) || 0,
    geo_altitude: Number(raw[idx.geo_altitude]) || 0,
    velocity: Number(raw[idx.velocity]) || 0,
    true_track: Number(raw[idx.true_track]) || 0,
    vertical_rate: Number(raw[idx.vertical_rate]) || 0,
    on_ground: Boolean(raw[idx.on_ground]),
    squawk: (raw[idx.squawk] as string)?.trim() ?? '',
    position_source: Number(raw[idx.position_source]) || 0,
  };
}

/** Check if a FlightState has valid position data */
export function hasValidPosition(state: FlightState): boolean {
  return (
    state.latitude !== 0 &&
    state.longitude !== 0 &&
    state.latitude !== null &&
    state.longitude !== null
  );
}

/** Map bounds interface */
export interface MapBounds {
  lamin: number;
  lomin: number;
  lamax: number;
  lomax: number;
}

/** Dashboard statistics */
export interface DashboardStats {
  totalFlights: number;
  flightsInAir: number;
  flightsOnGround: number;
  avgSpeed: number;
  avgAltitude: number;
  countries: number;
  emergencies: number;
}

/** Unit types */
export type SpeedUnit = 'knots' | 'kmh' | 'mph';
export type AltitudeUnit = 'feet' | 'meters';
export type DistanceUnit = 'km' | 'miles' | 'nm';

/** Search result for global search */
export interface SearchResult {
  type: 'aircraft' | 'airport' | 'airline' | 'flight';
  id: string;
  label: string;
  sublabel?: string;
  data?: unknown;
}
